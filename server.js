"use strict";

const crypto = require("node:crypto");
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const { promisify } = require("node:util");

const root = __dirname;
const dataDirectory = path.join(root, "data");
const databasePath = path.join(dataDirectory, "accounts.json");
const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || "127.0.0.1";
const scrypt = promisify(crypto.scrypt);
const sessions = new Map();
const loginAttempts = new Map();
const sessionLifetimeMs = 7 * 24 * 60 * 60 * 1000;
const maxRequestBytes = 4 * 1024 * 1024;
const passwordSalt = crypto.randomBytes(16);
let dummyPasswordHash;

class HttpError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}

function readDatabase() {
    try {
        const parsed = JSON.parse(fs.readFileSync(databasePath, "utf8"));
        return parsed && Array.isArray(parsed.accounts) ? parsed : { accounts: [] };
    } catch (error) {
        if (error.code === "ENOENT") return { accounts: [] };
        throw error;
    }
}

function writeDatabase(database) {
    fs.mkdirSync(dataDirectory, { recursive: true });
    const temporaryPath = `${databasePath}.${crypto.randomBytes(6).toString("hex")}.tmp`;
    fs.writeFileSync(temporaryPath, JSON.stringify(database, null, 2), { mode: 0o600 });
    fs.renameSync(temporaryPath, databasePath);
}

function sendJson(response, status, payload, extraHeaders = {}) {
    response.writeHead(status, {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
        ...extraHeaders
    });
    response.end(JSON.stringify(payload));
}

function parseCookies(header = "") {
    const cookies = new Map();
    header.split(";").forEach((part) => {
        const separator = part.indexOf("=");
        if (separator < 0) return;
        const name = part.slice(0, separator).trim();
        const value = part.slice(separator + 1).trim();
        if (name) cookies.set(name, value);
    });
    return cookies;
}

function cookieOptions(request) {
    const secure = process.env.NODE_ENV === "production" || Boolean(request.socket.encrypted);
    return `Path=/; HttpOnly; SameSite=Lax; Max-Age=${Math.floor(sessionLifetimeMs / 1000)}${secure ? "; Secure" : ""}`;
}

function currentAccount(request) {
    const sessionId = parseCookies(request.headers.cookie).get("gomigo_session");
    if (!sessionId) return null;
    const session = sessions.get(sessionId);
    if (!session || session.expiresAt <= Date.now()) {
        sessions.delete(sessionId);
        return null;
    }
    const account = readDatabase().accounts.find((item) => item.id === session.accountId);
    if (!account) sessions.delete(sessionId);
    return account || null;
}

function publicUser(account) {
    return { id: account.id, name: account.name, email: account.email };
}

function requireSameOrigin(request) {
    const origin = request.headers.origin;
    if (!origin || !request.headers.host) throw new HttpError(403, "This request could not be verified.");
    let originHost = "";
    try {
        originHost = new URL(origin).host;
    } catch {
        throw new HttpError(403, "This request could not be verified.");
    }
    if (originHost !== request.headers.host) throw new HttpError(403, "This request could not be verified.");
}

async function readJson(request) {
    if (!String(request.headers["content-type"] || "").toLowerCase().includes("application/json")) {
        throw new HttpError(415, "Send this request as JSON.");
    }
    const chunks = [];
    let size = 0;
    for await (const chunk of request) {
        size += chunk.length;
        if (size > maxRequestBytes) throw new HttpError(413, "That request is too large.");
        chunks.push(chunk);
    }
    try {
        const value = JSON.parse(Buffer.concat(chunks).toString("utf8"));
        if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Object expected");
        return value;
    } catch {
        throw new HttpError(400, "That request is not valid JSON.");
    }
}

function cleanText(value, maxLength) {
    return String(value || "").replace(/[\u0000-\u001f\u007f]/g, "").trim().slice(0, maxLength);
}

function normalizeEmail(value) {
    return cleanText(value, 254).toLowerCase();
}

function accountData(account) {
    return {
        profile: {
            name: account.name,
            email: account.email,
            home: account.profile?.home || "",
            style: account.profile?.style || "Balanced",
            photo: account.profile?.photo || ""
        },
        saved: account.saved || [],
        trips: account.trips || []
    };
}

async function hashPassword(password, salt = crypto.randomBytes(16)) {
    const derived = await scrypt(password, salt, 64, { N: 32768, r: 8, p: 1, maxmem: 64 * 1024 * 1024 });
    return { salt: salt.toString("hex"), hash: Buffer.from(derived).toString("hex") };
}

function loginRateLimitKey(request, email) {
    return `${request.socket.remoteAddress || "unknown"}:${email}`;
}

function checkLoginRateLimit(request, email) {
    const key = loginRateLimitKey(request, email);
    const now = Date.now();
    const entry = loginAttempts.get(key);
    if (!entry || now - entry.startedAt > 15 * 60 * 1000) {
        loginAttempts.set(key, { startedAt: now, count: 1 });
        return;
    }
    if (entry.count >= 10) throw new HttpError(429, "Too many attempts. Please wait a few minutes and try again.");
    entry.count += 1;
}

function createSession(account, request, response) {
    const sessionId = crypto.randomBytes(32).toString("base64url");
    sessions.set(sessionId, { accountId: account.id, expiresAt: Date.now() + sessionLifetimeMs });
    response.setHeader("Set-Cookie", `gomigo_session=${sessionId}; ${cookieOptions(request)}`);
}

function formatLocalDate(date) {
    return `${String(date.getFullYear()).padStart(4, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function allowedTripDateRange() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const year = today.getFullYear() + 2;
    const lastDay = new Date(year, today.getMonth() + 1, 0).getDate();
    const latest = new Date(year, today.getMonth(), Math.min(today.getDate(), lastDay));
    return { min: formatLocalDate(today), max: formatLocalDate(latest) };
}

function validateTrips(input, previousTrips = []) {
    if (!Array.isArray(input) || input.length > 500) throw new HttpError(400, "The trip list is not valid.");
    const ids = new Set();
    const previousDates = new Map((Array.isArray(previousTrips) ? previousTrips : []).map((trip) => [trip.id, trip.dates || ""]));
    return input.map((trip) => {
        if (!trip || typeof trip !== "object" || Array.isArray(trip)) throw new HttpError(400, "A trip in this list is not valid.");
        const id = cleanText(trip.id, 100);
        const destination = cleanText(trip.destination, 100);
        const budget = Number(trip.budget);
        if (!id || ids.has(id) || !destination || !Number.isSafeInteger(budget) || budget < 100) {
            throw new HttpError(400, "A trip in this list is missing required details.");
        }
        ids.add(id);
        const dates = cleanText(trip.dates, 10);
        const dateRange = allowedTripDateRange();
        const dateOutsideRange = dates && (dates < dateRange.min || dates > dateRange.max);
        if (dates && (!/^\d{4}-\d{2}-\d{2}$/.test(dates) || (dateOutsideRange && previousDates.get(id) !== dates))) {
            throw new HttpError(400, "Trip dates must be between today and two years from now.");
        }
        return {
            schemaVersion: 1,
            id,
            destination,
            dates,
            duration: cleanText(trip.duration, 24),
            travelers: cleanText(trip.travelers, 40),
            style: cleanText(trip.style, 80),
            budget,
            interests: Array.isArray(trip.interests) ? trip.interests.slice(0, 20).map((item) => cleanText(item, 60)).filter(Boolean) : [],
            requests: cleanText(trip.requests, 300),
            createdAt: cleanText(trip.createdAt, 50),
            createdAtISO: cleanText(trip.createdAtISO, 50)
        };
    });
}

async function handleApi(request, response, url) {
    const route = url.pathname;
    const method = request.method;

    if (route === "/api/auth/session" && method === "GET") {
        const account = currentAccount(request);
        sendJson(response, 200, account ? { authenticated: true, user: publicUser(account) } : { authenticated: false });
        return;
    }

    if (route === "/api/auth/signup" && method === "POST") {
        requireSameOrigin(request);
        const body = await readJson(request);
        const name = cleanText(body.name, 60);
        const email = normalizeEmail(body.email);
        const password = String(body.password || "");
        if (name.length < 2) throw new HttpError(400, "Enter your name.");
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new HttpError(400, "Enter a valid email address.");
        if (password.length < 8 || password.length > 128) throw new HttpError(400, "Use a password between 8 and 128 characters.");
        checkLoginRateLimit(request, email);
        const passwordRecord = await hashPassword(password);
        // Read after hashing so concurrent sign-ups cannot both pass the
        // duplicate-email check against the same stale database snapshot.
        const database = readDatabase();
        if (database.accounts.some((account) => account.email === email)) throw new HttpError(409, "An account with that email already exists. Sign in instead.");
        const legacy = body.legacy && typeof body.legacy === "object" ? body.legacy : {};
        let migratedTrips = [];
        try {
            const legacyTrips = Array.isArray(legacy.trips) ? legacy.trips : [];
            migratedTrips = validateTrips(legacyTrips, legacyTrips);
        } catch { /* Ignore malformed legacy entries; the new account still succeeds. */ }
        const migratedSaved = Array.isArray(legacy.saved)
            ? Array.from(new Set(legacy.saved.map((item) => cleanText(item, 100)).filter(Boolean))).slice(0, 500)
            : [];
        const legacyProfile = legacy.profile && typeof legacy.profile === "object" ? legacy.profile : {};
        const legacyPhoto = typeof legacyProfile.photo === "string" && legacyProfile.photo.length <= 500_000 && /^data:image\/(?:jpeg|png|webp);base64,/.test(legacyProfile.photo)
            ? legacyProfile.photo
            : "";
        const account = {
            id: crypto.randomUUID(),
            name,
            email,
            passwordSalt: passwordRecord.salt,
            passwordHash: passwordRecord.hash,
            createdAt: new Date().toISOString(),
            profile: {
                home: cleanText(legacyProfile.home, 80),
                style: cleanText(legacyProfile.style || "Balanced", 80),
                photo: legacyPhoto
            },
            saved: migratedSaved,
            trips: migratedTrips
        };
        database.accounts.push(account);
        writeDatabase(database);
        createSession(account, request, response);
        sendJson(response, 201, { user: publicUser(account) });
        return;
    }

    if (route === "/api/auth/login" && method === "POST") {
        requireSameOrigin(request);
        const body = await readJson(request);
        const email = normalizeEmail(body.email);
        const password = String(body.password || "");
        checkLoginRateLimit(request, email);
        const database = readDatabase();
        const account = database.accounts.find((item) => item.email === email);
        const passwordRecord = account
            ? { salt: account.passwordSalt, hash: account.passwordHash }
            : { salt: passwordSalt.toString("hex"), hash: dummyPasswordHash };
        const verification = await hashPassword(password, Buffer.from(passwordRecord.salt, "hex"));
        const matches = account && crypto.timingSafeEqual(Buffer.from(verification.hash, "hex"), Buffer.from(passwordRecord.hash, "hex"));
        if (!matches) throw new HttpError(401, "Email or password is incorrect.");
        loginAttempts.delete(loginRateLimitKey(request, email));
        createSession(account, request, response);
        sendJson(response, 200, { user: publicUser(account) });
        return;
    }

    if (route === "/api/auth/logout" && method === "POST") {
        requireSameOrigin(request);
        const sessionId = parseCookies(request.headers.cookie).get("gomigo_session");
        if (sessionId) sessions.delete(sessionId);
        const secure = process.env.NODE_ENV === "production" || Boolean(request.socket.encrypted);
        sendJson(response, 200, { success: true }, {
            "Set-Cookie": `gomigo_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${secure ? "; Secure" : ""}`
        });
        return;
    }

    const account = currentAccount(request);
    if (!account) throw new HttpError(401, "Sign in to access your account.");

    if (route === "/api/account" && method === "GET") {
        sendJson(response, 200, accountData(account));
        return;
    }

    if (route === "/api/account/profile" && method === "PATCH") {
        requireSameOrigin(request);
        const body = await readJson(request);
        const database = readDatabase();
        const storedAccount = database.accounts.find((item) => item.id === account.id);
        const name = cleanText(body.name, 60);
        if (name.length < 2) throw new HttpError(400, "Enter your name.");
        const home = cleanText(body.home, 80);
        const style = cleanText(body.style || "Balanced", 80);
        const photo = String(body.photo || "");
        if (photo && (!/^data:image\/(?:jpeg|png|webp);base64,/.test(photo) || photo.length > 500_000)) {
            throw new HttpError(400, "Choose a smaller profile image.");
        }
        storedAccount.name = name;
        storedAccount.profile = { home, style, photo };
        writeDatabase(database);
        sendJson(response, 200, { profile: accountData(storedAccount).profile });
        return;
    }

    if (route === "/api/account/saved" && method === "PUT") {
        requireSameOrigin(request);
        const body = await readJson(request);
        if (!Array.isArray(body.saved) || body.saved.length > 500) throw new HttpError(400, "The saved places list is not valid.");
        const saved = Array.from(new Set(body.saved.map((item) => cleanText(item, 100)).filter(Boolean)));
        const database = readDatabase();
        const storedAccount = database.accounts.find((item) => item.id === account.id);
        storedAccount.saved = saved;
        writeDatabase(database);
        sendJson(response, 200, { saved });
        return;
    }

    if (route === "/api/account/trips" && method === "PUT") {
        requireSameOrigin(request);
        const body = await readJson(request);
        const trips = validateTrips(body.trips, account.trips || []);
        const database = readDatabase();
        const storedAccount = database.accounts.find((item) => item.id === account.id);
        storedAccount.trips = trips;
        writeDatabase(database);
        sendJson(response, 200, { trips });
        return;
    }

    throw new HttpError(404, "That account request was not found.");
}

const mimeTypes = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".webp": "image/webp",
    ".ico": "image/x-icon",
    ".woff2": "font/woff2"
};

function serveStatic(request, response, url) {
    if (request.method !== "GET" && request.method !== "HEAD") {
        response.writeHead(405, { Allow: "GET, HEAD" });
        response.end("Method not allowed");
        return;
    }
    let requestedPath;
    try {
        requestedPath = decodeURIComponent(url.pathname);
    } catch {
        response.writeHead(400);
        response.end("Bad request");
        return;
    }
    if (requestedPath === "/") requestedPath = "/landing_page.html";
    const filePath = path.resolve(root, `.${requestedPath}`);
    const relativePath = path.relative(root, filePath);
    const hiddenPath = relativePath.split(path.sep).some((part) => part === ".git" || part === "data" || part.startsWith("."));
    if (relativePath.startsWith("..") || path.isAbsolute(relativePath) || hiddenPath || path.basename(filePath) === "server.js") {
        response.writeHead(404);
        response.end("Not found");
        return;
    }
    let stats;
    try {
        stats = fs.statSync(filePath);
    } catch {
        response.writeHead(404);
        response.end("Not found");
        return;
    }
    if (!stats.isFile()) {
        response.writeHead(404);
        response.end("Not found");
        return;
    }
    const contentType = mimeTypes[path.extname(filePath).toLowerCase()];
    if (!contentType) {
        response.writeHead(404);
        response.end("Not found");
        return;
    }
    response.writeHead(200, {
        "Content-Type": contentType,
        "Cache-Control": "no-store",
        "X-Content-Type-Options": "nosniff",
        "X-Frame-Options": "DENY",
        "Referrer-Policy": "strict-origin-when-cross-origin"
    });
    if (request.method === "HEAD") response.end();
    else fs.createReadStream(filePath).pipe(response);
}

async function handleRequest(request, response) {
    try {
        const url = new URL(request.url, `http://${request.headers.host || "localhost"}`);
        if (url.pathname.startsWith("/api/")) await handleApi(request, response, url);
        else serveStatic(request, response, url);
    } catch (error) {
        if (response.headersSent) {
            response.destroy();
            return;
        }
        const status = error instanceof HttpError ? error.status : 500;
        const message = error instanceof HttpError ? error.message : "The request could not be completed.";
        if (status === 500) console.error(error);
        sendJson(response, status, { error: message });
    }
}

async function start() {
    dummyPasswordHash = (await hashPassword("dummy-password-not-for-login", passwordSalt)).hash;
    const server = http.createServer((request, response) => { void handleRequest(request, response); });
    server.listen(port, host, () => {
        console.log(`GoMigo is running at http://${host}:${port}`);
    });
}

start().catch((error) => {
    console.error("GoMigo server could not start.", error);
    process.exitCode = 1;
});
