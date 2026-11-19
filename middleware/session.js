const crypto = require('crypto');

const COOKIE_NAME = 'gomigo.sid';
const SESSION_LIFETIME = 7 * 24 * 60 * 60 * 1000;
const sessions = new Map();

function readCookie(req, name) {
  const cookieHeader = req.headers.cookie || '';
  for (const part of cookieHeader.split(';')) {
    const separator = part.indexOf('=');
    if (separator < 0) continue;
    if (part.slice(0, separator).trim() === name) {
      try { return decodeURIComponent(part.slice(separator + 1).trim()); } catch { return ''; }
    }
  }
  return '';
}

function sessionMiddleware(req, res, next) {
  const now = Date.now();
  for (const [id, session] of sessions) {
    if (session.expiresAt <= now) sessions.delete(id);
  }

  const id = readCookie(req, COOKIE_NAME);
  const session = id ? sessions.get(id) : null;
  if (session && session.expiresAt > now) {
    session.expiresAt = now + SESSION_LIFETIME;
    req.authUserId = session.userId;
  } else {
    if (id) sessions.delete(id);
    req.authUserId = null;
  }

  req.createAuthSession = (userId) => {
    const sessionId = crypto.randomBytes(32).toString('hex');
    sessions.set(sessionId, { userId: String(userId), expiresAt: Date.now() + SESSION_LIFETIME });
    const secure = req.secure ? '; Secure' : '';
    res.setHeader('Set-Cookie', `${COOKIE_NAME}=${encodeURIComponent(sessionId)}; Path=/; Max-Age=${SESSION_LIFETIME / 1000}; HttpOnly; SameSite=Lax${secure}`);
    req.authUserId = String(userId);
  };

  req.clearAuthSession = () => {
    if (id) sessions.delete(id);
    const secure = req.secure ? '; Secure' : '';
    res.setHeader('Set-Cookie', `${COOKIE_NAME}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax${secure}`);
    req.authUserId = null;
  };

  next();
}

function requireAuth(req, res, next) {
  if (req.authUserId) return next();
  if (req.path.startsWith('/api/')) return res.status(401).json({ error: 'Please sign in to continue.' });
  return res.redirect(`/login?next=${encodeURIComponent(req.originalUrl || '/')}`);
}

module.exports = { sessionMiddleware, requireAuth };
