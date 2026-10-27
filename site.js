(() => {
    "use strict";

    const keys = {
        user: "gomigo.user",
        profile: "gomigo.profile",
        trips: "gomigo.trips",
        saved: "gomigo.saved-destinations",
        flash: "gomigo.flash-message"
    };

    const destinations = [
        { name: "Greece", image: "main-menu-assets/greece.png", description: "Islands, culture and sunsets" },
        { name: "Switzerland", image: "main-menu-assets/switzerland.png", description: "Mountains, lakes and more" },
        { name: "Japan", image: "main-menu-assets/japan.png", description: "Tradition meets modern" },
        { name: "Jaipur", image: "main-menu-assets/jaipur.png", description: "Royal charm, vibrant streets" },
        { name: "Paris", image: "explore_assets/paris.png", description: "The city of light, art, and endless little cafés.", alt: "Paris and the Eiffel Tower" },
        { name: "Agra", image: "explore_assets/india.png", description: "Timeless architecture and stories carved in stone.", alt: "The Taj Mahal in Agra" },
        { name: "Rome", image: "explore_assets/colosseum.png", description: "Ancient wonders, lively piazzas, and la dolce vita.", alt: "The Colosseum in Rome" },
        { name: "Dubai", image: "explore_assets/burjKhalifa.png", description: "A global city with iconic sights and desert adventures.", alt: "Burj Khalifa in Dubai" },
        { name: "Santorini", image: "explore_assets/santorini.png", description: "Whitewashed villages above a brilliant blue sea.", alt: "Santorini on the Aegean Sea" },
        { name: "Colombo", image: "explore_assets/colombo.png", description: "A lively coastal city with golden beaches and rich history.", alt: "Colombo waterfront in Sri Lanka" },
        { name: "Canada", image: "explore_assets/canada.png", description: "Wide-open landscapes, welcoming cities, and fresh air.", alt: "A Canadian travel destination" },
        { name: "Iceland", image: "explore_assets/iceland.png", description: "Dramatic coastlines, waterfalls, and volcanic landscapes.", alt: "An Icelandic landscape" },
        { name: "Portugal", image: "explore_assets/portugal.png", description: "Coastal towns, tiled streets, and long, relaxed meals.", alt: "A destination in Portugal" },
        { name: "Kyoto", image: "explore_assets/japan.png", description: "Quiet temples, gardens, and lanes rich with history.", alt: "Traditional Japanese streets and mountain scenery" },
        { name: "Lucerne", image: "main-menu-assets/switzerland.png", description: "Lake views, mountain railways, and a charming old town.", alt: "A Swiss alpine lake and mountain village" },
        { name: "Cairo", image: "landing_assets/Pyramids.png", description: "Ancient landmarks, Nile evenings, and bustling markets.", alt: "The pyramids of Egypt" },
        { name: "Pisa", image: "landing_assets/Tower Of Pisa.png", description: "A beautiful Tuscan square and a landmark known around the world.", alt: "The Leaning Tower of Pisa" },
        { name: "Bali", image: "explore_assets/beach.png", description: "Green rice terraces, coastal sunsets, and a slower island rhythm.", alt: "A tropical beach for a Bali getaway" },
        { name: "Marrakech", image: "explore_assets/culture.png", description: "Garden courtyards, tiled architecture, and the old medina.", alt: "Cultural details for a Marrakech trip" },
        { name: "Bangkok", image: "explore_assets/dining.png", description: "Street food, river temples, and energetic neighborhoods.", alt: "Food and city inspiration for Bangkok" },
        { name: "Queenstown", image: "explore_assets/adventure.png", description: "Alpine lakes, dramatic peaks, and days made for the outdoors.", alt: "Mountain scenery for a Queenstown escape" },
        { name: "Cape Town", image: "explore_assets/colombo.png", description: "Ocean drives, mountain views, and a vibrant waterfront.", alt: "Coastal city scenery for Cape Town inspiration" },
        { name: "Vancouver", image: "explore_assets/canada.png", description: "A lively city framed by forest, water, and mountain trails.", alt: "A Canadian landscape for Vancouver travel inspiration" },
        { name: "Lisbon", image: "explore_assets/portugal.png", description: "Hillside viewpoints, tiled streets, and long, relaxed meals.", alt: "Colorful streets in Portugal" }
    ];
    const memoryStore = new Map();

    function readJSON(key, fallback) {
        try {
            const value = window.localStorage.getItem(key);
            return value === null ? fallback : JSON.parse(value);
        } catch {
            return memoryStore.has(key) ? memoryStore.get(key) : fallback;
        }
    }

    function readArray(key) {
        const value = readJSON(key, []);
        return Array.isArray(value) ? value : [];
    }

    function writeJSON(key, value) {
        memoryStore.set(key, value);
        try {
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch {
            // Keep the value in memory for this page if browser storage is unavailable.
        }
    }

    function removeStored(key) {
        memoryStore.delete(key);
        try {
            window.localStorage.removeItem(key);
        } catch {
            // Storage may be disabled for local files.
        }
    }

    function showToast(message) {
        document.querySelector(".site-toast")?.remove();
        const toast = document.createElement("div");
        toast.className = "site-toast";
        toast.setAttribute("role", "status");
        toast.textContent = message;
        document.body.append(toast);
        window.setTimeout(() => toast.remove(), 4200);
    }

    function setUserName(name) {
        const text = name ? "Hey, " + name + "!" : "Hey, Explorer!";
        document.querySelectorAll("[data-user-name]").forEach((element) => {
            element.textContent = text;
        });
    }

    function takeFlashMessage() {
        const message = readJSON(keys.flash, "");
        removeStored(keys.flash);
        if (message) showToast(message);
    }

    function initLandingNavigation() {
        const menuButton = document.querySelector(".menu-button");
        const navigation = document.querySelector("#site-navigation");
        if (!menuButton || !navigation) return;

        menuButton.addEventListener("click", () => {
            const open = navigation.classList.toggle("is-open");
            menuButton.setAttribute("aria-expanded", String(open));
        });
        navigation.addEventListener("click", (event) => {
            if (!event.target.closest("a")) return;
            navigation.classList.remove("is-open");
            menuButton.setAttribute("aria-expanded", "false");
        });
    }

    function redirectSignedInPublicPage() {
        const appPage = document.body.dataset.signedInPage;
        const user = readJSON(keys.user, null);
        if (!appPage || !user || !user.email) return false;
        window.location.replace(appPage);
        return true;
    }

    function initAuthForms() {
        const loginForm = document.querySelector("#login-form");
        const signupForm = document.querySelector("#signup-form");
        if (!loginForm && !signupForm) return;

        function continueIntoGoMigo(user) {
            writeJSON(keys.user, user);
            writeJSON(keys.profile, Object.assign({}, readJSON(keys.profile, {}), user));
            writeJSON(keys.flash, "Welcome to GoMigo, " + user.name + ".");

            const redirectParams = new URLSearchParams(window.location.search);
            const requestedTarget = redirectParams.get("next") || "";
            const requestedPage = requestedTarget.split("?", 1)[0];
            const safePages = ["main-menu.html", "my-trips.html", "trip-planner.html", "explore-app.html", "destinations.html", "saved.html", "travel-guide.html", "profile.html"];
            let destination = safePages.includes(requestedPage) ? requestedPage : "main-menu.html";
            const targetQuery = new URLSearchParams(requestedTarget.split("?").slice(1).join("?"));
            const requestedDestination = redirectParams.get("destination") || targetQuery.get("destination");
            if (destination === "trip-planner.html" && requestedDestination) {
                destination += "?destination=" + encodeURIComponent(requestedDestination.slice(0, 100));
            }
            window.location.href = destination;
        }

        if (loginForm) {
            loginForm.addEventListener("submit", (event) => {
                event.preventDefault();
                if (!loginForm.reportValidity()) return;
                const data = new FormData(loginForm);
                const email = String(data.get("email") || "").trim();
                const existing = Object.assign({}, readJSON(keys.profile, {}), readJSON(keys.user, {}));
                const fallbackName = email.split("@")[0].replace(/[._-]+/g, " ");
                const name = existing.name || fallbackName || "Explorer";
                continueIntoGoMigo({ name, email });
            });
        }

        if (signupForm) {
            signupForm.addEventListener("submit", (event) => {
                event.preventDefault();
                if (!signupForm.reportValidity()) return;
                const data = new FormData(signupForm);
                const password = String(data.get("password") || "");
                const confirmation = String(data.get("confirm") || "");
                if (password !== confirmation) {
                    showToast("Those passwords don’t match yet.");
                    signupForm.elements.namedItem("confirm").focus();
                    return;
                }
                continueIntoGoMigo({
                    name: String(data.get("name") || "Explorer").trim(),
                    email: String(data.get("email") || "").trim()
                });
            });
        }
    }

    function initAppNavigation() {
        const body = document.body;
        if (!body.classList.contains("app-page")) return;

        const profile = Object.assign({}, readJSON(keys.profile, {}), readJSON(keys.user, {}));
        setUserName(profile.name);

        const pageMap = {
            "main-menu.html": "home",
            "trip-planner.html": "plan",
            "my-trips.html": "trips",
            "explore-app.html": "explore",
            "itineraries.html": "trips",
            "saved.html": "saved",
            "travel-guide.html": "guide",
            "profile.html": "profile"
        };
        const currentPage = window.location.pathname.split("/").pop() || "main-menu.html";
        const activePage = pageMap[currentPage] || "home";
        document.querySelectorAll("[data-nav]").forEach((link) => {
            const active = link.dataset.nav === activePage;
            link.classList.toggle("active", active);
            if (active) link.setAttribute("aria-current", "page");
            else link.removeAttribute("aria-current");
        });

        document.querySelectorAll("[data-sign-out]").forEach((button) => {
            button.addEventListener("click", () => {
                removeStored(keys.user);
                window.location.href = "landing_page.html";
            });
        });
        takeFlashMessage();
    }

    function initPlanner() {
        const form = document.querySelector("#trip-form");
        if (!form) return;

        const budget = form.querySelector(".budget-slider");
        const budgetText = form.querySelector(".budget-heading strong");
        const requests = form.querySelector("textarea");
        const counter = form.querySelector(".character-count");
        const destinationField = form.querySelector("#destination");
        const suggestedDestination = new URLSearchParams(window.location.search).get("destination");

        if (suggestedDestination && destinationField) destinationField.value = suggestedDestination;
        if (budget && budgetText) {
            const updateBudget = () => {
                budgetText.textContent = "₹" + Number(budget.value).toLocaleString("en-IN") + "/day";
            };
            budget.addEventListener("input", updateBudget);
            updateBudget();
        }
        if (requests && counter) {
            const updateCounter = () => {
                counter.textContent = requests.value.length + "/300";
            };
            requests.addEventListener("input", updateCounter);
            updateCounter();
        }

        form.querySelectorAll("[data-interest]").forEach((button) => {
            button.setAttribute("aria-pressed", String(button.classList.contains("selected")));
            button.addEventListener("click", () => {
                const selected = button.classList.toggle("selected");
                button.setAttribute("aria-pressed", String(selected));
            });
        });
        form.querySelector("[data-clear-destination]")?.addEventListener("click", () => {
            destinationField.value = "";
            destinationField.focus();
        });

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            if (!form.reportValidity()) return;
            const data = new FormData(form);
            const trip = {
                id: Date.now() + "-" + Math.random().toString(16).slice(2),
                destination: String(data.get("destination") || "").trim(),
                dates: String(data.get("dates") || "").trim(),
                duration: String(data.get("duration") || ""),
                travelers: String(data.get("travelers") || ""),
                style: String(data.get("style") || ""),
                budget: Number(data.get("budget") || 0),
                interests: Array.from(form.querySelectorAll("[data-interest].selected"), (button) => button.textContent.trim()),
                requests: String(data.get("requests") || "").trim(),
                createdAt: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
            };
            const trips = readArray(keys.trips);
            trips.unshift(trip);
            writeJSON(keys.trips, trips);
            writeJSON(keys.flash, "Your " + trip.destination + " trip is saved in My Trips.");
            window.location.href = "my-trips.html";
        });
    }

    function createDestinationCard(destination, saved) {
        const card = document.createElement("article");
        card.className = "destination-card";
        card.dataset.destinationCard = "";

        const imageWrap = document.createElement("div");
        imageWrap.className = "destination-image";
        const image = document.createElement("img");
        image.src = destination.image;
        image.alt = destination.alt || destination.name;

        const heart = document.createElement("button");
        heart.type = "button";
        heart.className = "heart";
        heart.dataset.favoriteToggle = "";
        heart.dataset.destination = destination.name;
        heart.textContent = saved ? "♥" : "♡";
        heart.setAttribute("aria-pressed", String(saved));
        heart.setAttribute("aria-label", saved ? "Remove " + destination.name + " from saved places" : "Save " + destination.name);
        imageWrap.append(image, heart);

        const info = document.createElement("div");
        info.className = "destination-info";
        const heading = document.createElement("h2");
        heading.textContent = destination.name;
        const description = document.createElement("p");
        description.textContent = destination.description;
        const planLink = document.createElement("a");
        planLink.href = "trip-planner.html?destination=" + encodeURIComponent(destination.name);
        planLink.textContent = "Plan a trip →";
        info.append(heading, description, planLink);
        card.append(imageWrap, info);
        return card;
    }

    function updateFavoriteButtons() {
        const saved = readArray(keys.saved);
        document.querySelectorAll("[data-favorite-toggle]").forEach((button) => {
            const name = button.dataset.destination;
            const isSaved = saved.includes(name);
            button.textContent = isSaved ? "♥" : "♡";
            button.classList.toggle("is-saved", isSaved);
            button.setAttribute("aria-pressed", String(isSaved));
            button.setAttribute("aria-label", isSaved ? "Remove " + name + " from saved places" : "Save " + name);
        });
    }

    function renderSavedPage() {
        const grid = document.querySelector("#saved-grid");
        if (!grid) return;
        grid.replaceChildren();
        const savedNames = readArray(keys.saved);

        if (!savedNames.length) {
            const empty = document.createElement("div");
            empty.className = "empty-state";
            empty.append("No saved places yet. ");
            const link = document.createElement("a");
            link.href = "explore-app.html";
            link.textContent = "Explore destinations";
            empty.append(link, " and tap a heart to keep one here.");
            grid.append(empty);
            return;
        }

        savedNames.forEach((name) => {
            const destination = destinations.find((item) => item.name === name);
            if (destination) grid.append(createDestinationCard(destination, true));
        });
    }

    function initDestinationPages() {
        if (document.body.classList.contains("itineraries-page")) return;

        const legacySavedItems = readJSON("gomigo-saved-items-v1", []);
        if (Array.isArray(legacySavedItems) && legacySavedItems.length) {
            const migratedNames = legacySavedItems.map((item) => item && (item.title || item.name)).filter(Boolean);
            const mergedNames = Array.from(new Set(readArray(keys.saved).concat(migratedNames)));
            writeJSON(keys.saved, mergedNames);
        }

        updateFavoriteButtons();
        renderSavedPage();

        document.addEventListener("click", (event) => {
            const button = event.target.closest("[data-favorite-toggle]");
            if (!button) return;
            const name = button.dataset.destination;
            const saved = readArray(keys.saved);
            const next = saved.includes(name) ? saved.filter((item) => item !== name) : saved.concat(name);
            writeJSON(keys.saved, next);
            updateFavoriteButtons();
            renderSavedPage();
            showToast(next.includes(name) ? name + " saved to your places." : name + " removed from saved places.");
        });

        const search = document.querySelector("#destination-search");
        const publicCards = Array.from(document.querySelectorAll(".destination-grid .destination-card"));
        if (publicCards.length) {
            const filters = Array.from(document.querySelectorAll(".filter[data-filter]"));
            const empty = document.querySelector("#empty-state");
            let activeFilter = "all";
            const updatePublicCards = () => {
                const query = search ? search.value.trim().toLocaleLowerCase() : "";
                let visibleCount = 0;
                publicCards.forEach((card) => {
                    const imageAlt = card.querySelector("img")?.alt || "";
                    const matchesText = (card.textContent + " " + imageAlt).toLocaleLowerCase().includes(query);
                    const tags = (card.dataset.tags || "").split(/\s+/);
                    const matchesFilter = activeFilter === "all" || tags.includes(activeFilter);
                    card.hidden = !(matchesText && matchesFilter);
                    if (!card.hidden) visibleCount += 1;
                });
                if (empty) empty.hidden = visibleCount > 0;
            };
            search?.addEventListener("input", updatePublicCards);
            filters.forEach((button) => button.addEventListener("click", () => {
                activeFilter = button.dataset.filter || "all";
                filters.forEach((item) => item.classList.toggle("active", item === button));
                updatePublicCards();
            }));
            document.querySelectorAll(".style-card[data-style]").forEach((link) => link.addEventListener("click", () => {
                activeFilter = link.dataset.style || "all";
                filters.forEach((item) => item.classList.toggle("active", item.dataset.filter === activeFilter));
                updatePublicCards();
            }));
            document.addEventListener("keydown", (event) => {
                if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
                    event.preventDefault();
                    search?.focus();
                }
            });
            updatePublicCards();
            return;
        }

        if (search) {
            search.addEventListener("input", () => {
                const query = search.value.trim().toLocaleLowerCase();
                document.querySelectorAll("[data-destination-card]").forEach((card) => {
                    card.hidden = !card.textContent.toLocaleLowerCase().includes(query);
                });
            });
        }
    }

    function initTripsPage() {
        if (document.body.classList.contains("itineraries-page")) return;

        const list = document.querySelector("#trip-list");
        if (!list) return;

        function render() {
            const trips = readArray(keys.trips);
            list.replaceChildren();

            if (!trips.length) {
                const empty = document.createElement("div");
                empty.className = "empty-state";
                empty.append("No trips saved yet. ");
                const link = document.createElement("a");
                link.href = "trip-planner.html";
                link.textContent = "Plan your first trip";
                empty.append(link, " and your plan will appear here.");
                list.append(empty);
                return;
            }

            trips.forEach((trip) => {
                const card = document.createElement("article");
                card.className = "trip-card";
                const heading = document.createElement("h2");
                heading.textContent = trip.destination;
                card.append(heading);

                const details = [trip.dates, trip.duration, trip.travelers].filter(Boolean).join(" · ");
                if (details) {
                    const detailLine = document.createElement("p");
                    detailLine.textContent = details;
                    card.append(detailLine);
                }

                const budgetLine = document.createElement("p");
                budgetLine.textContent = "₹" + Number(trip.budget).toLocaleString("en-IN") + " per day · " + trip.style;
                card.append(budgetLine);
                if (trip.interests && trip.interests.length) {
                    const interests = document.createElement("p");
                    interests.textContent = "Interests: " + trip.interests.join(", ");
                    card.append(interests);
                }
                if (trip.createdAt) {
                    const created = document.createElement("p");
                    created.className = "trip-created-at";
                    created.textContent = "Saved " + trip.createdAt;
                    card.append(created);
                }

                const remove = document.createElement("button");
                remove.type = "button";
                remove.dataset.removeTrip = trip.id;
                remove.textContent = "Remove trip";
                card.append(remove);
                list.append(card);
            });
        }

        list.addEventListener("click", (event) => {
            const button = event.target.closest("[data-remove-trip]");
            if (!button) return;
            const remaining = readArray(keys.trips).filter((trip) => trip.id !== button.dataset.removeTrip);
            writeJSON(keys.trips, remaining);
            showToast("Trip removed from My Trips.");
            render();
        });
        render();
    }

    function initProfilePage() {
        const form = document.querySelector("#profile-form");
        if (!form) return;
        const profile = Object.assign({}, readJSON(keys.user, {}), readJSON(keys.profile, {}));
        form.elements.namedItem("name").value = profile.name || "";
        form.elements.namedItem("email").value = profile.email || "";
        form.elements.namedItem("home").value = profile.home || "";
        form.elements.namedItem("style").value = profile.style || "Balanced";

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            if (!form.reportValidity()) return;
            const data = new FormData(form);
            const updated = Object.assign({}, readJSON(keys.profile, {}), {
                name: String(data.get("name") || "").trim(),
                email: String(data.get("email") || "").trim(),
                home: String(data.get("home") || "").trim(),
                style: String(data.get("style") || "Balanced")
            });
            writeJSON(keys.profile, updated);
            writeJSON(keys.user, { name: updated.name, email: updated.email });
            setUserName(updated.name);
            showToast("Your travel preferences are saved.");
        });
    }

    function initLegacyItinerariesPage() {
        const panels = {
            plan: document.querySelector("#panel-plan"),
            saved: document.querySelector("#panel-saved"),
            trips: document.querySelector("#panel-trips")
        };
        if (!panels.plan) return;

        const savedKey = "gomigo-saved-items-v1";
        const tripsKey = "gomigo-trips-v1";
        const read = (key) => {
            try {
                const value = JSON.parse(window.localStorage.getItem(key) || "[]");
                return Array.isArray(value) ? value : [];
            } catch {
                return [];
            }
        };
        const write = (key, value) => {
            try {
                window.localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch {
                return false;
            }
        };
        const toast = document.querySelector("#toast");
        let saved = read(savedKey);
        let trips = read(tripsKey);
        let latestPlan = null;
        let toastTimer;

        const announce = (message) => {
            if (!toast) return;
            toast.textContent = message;
            toast.classList.add("visible");
            window.clearTimeout(toastTimer);
            toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 2600);
        };
        const escapeText = (text = "") => String(text).replace(/[&<>"']/g, (character) => ({
            "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
        })[character]);
        const formatDate = (value) => {
            if (!value) return "Date flexible";
            return new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", year: "numeric" }).format(new Date(`${value}T12:00:00`));
        };

        function renderSaved() {
            const grid = document.querySelector("#saved-grid");
            if (!grid) return;
            grid.replaceChildren();
            saved.forEach((item) => {
                const card = document.createElement("article");
                card.className = "saved-card";
                card.innerHTML = `<img src="${escapeText(item.image || "explore_assets/explore-hero.png")}" alt="${escapeText(item.title)}"><div class="saved-card-content"><span class="saved-country">${escapeText(item.country || "SAVED DESTINATION")}</span><h3>${escapeText(item.title)}</h3><p>${escapeText(item.description || "A place to keep in mind for your next journey.")}</p><div class="saved-actions"><button class="small-primary" type="button" data-plan-destination="${escapeText(item.title)}">Plan this trip <span>→</span></button><button class="remove-saved" type="button" data-remove-saved="${escapeText(item.id)}" aria-label="Remove ${escapeText(item.title)} from saved">♥</button></div></div>`;
                grid.append(card);
            });
            document.querySelector("#saved-empty").hidden = saved.length > 0;
            document.querySelector("#saved-count").textContent = saved.length;
        }

        function renderTrips() {
            const list = document.querySelector("#trip-list");
            if (!list) return;
            list.replaceChildren();
            trips.forEach((trip) => {
                const article = document.createElement("article");
                article.className = "trip-card";
                article.innerHTML = `<div class="trip-card-top"><span class="trip-mark">✈</span><span class="trip-dates">${escapeText(formatDate(trip.startDate))} — ${escapeText(formatDate(trip.endDate))}</span></div><h3>${escapeText(trip.destination)}</h3><p>${escapeText(trip.travelers)} traveler${trip.travelers === "1" ? "" : "s"} · ${escapeText(trip.style)} · ${escapeText(trip.budget)}</p><div class="trip-days">${(trip.days || []).map((day) => `<div><b>${escapeText(day.title)}</b><span>${escapeText(day.detail)}</span></div>`).join("")}</div><button class="remove-trip" type="button" data-remove-trip="${escapeText(trip.id)}">Remove itinerary</button>`;
                list.append(article);
            });
            document.querySelector("#trips-empty").hidden = trips.length > 0;
            document.querySelector("#trips-count").textContent = trips.length;
        }

        function selectTab(name, updateHash = true) {
            if (!panels[name]) name = "saved";
            Object.entries(panels).forEach(([key, panel]) => {
                const selected = key === name;
                panel.hidden = !selected;
                const button = document.querySelector(`#tab-${key}`);
                button.classList.toggle("active", selected);
                button.setAttribute("aria-selected", String(selected));
                button.tabIndex = selected ? 0 : -1;
            });
            if (updateHash && window.location.hash !== `#${name}`) window.history.replaceState(null, "", `#${name}`);
            if (name === "saved") renderSaved();
            if (name === "trips") renderTrips();
        }

        function makeDays(destination, startDate, endDate, style, notes) {
            const start = new Date(`${startDate}T12:00:00`);
            const end = new Date(`${endDate}T12:00:00`);
            const count = Math.max(1, Math.min(14, Math.ceil((end - start) / 86400000) + 1));
            const normalizedStyle = style.toLowerCase();
            const ideas = normalizedStyle.includes("food")
                ? ["Find a local market and try a regional favorite.", "Take a relaxed food walk through a neighborhood.", "Save room for a memorable local dinner."]
                : normalizedStyle.includes("culture")
                    ? ["Get oriented with a walk through the historic center.", "Spend time with a local museum, landmark, or neighborhood.", "Leave room for an unhurried café and evening stroll."]
                    : normalizedStyle.includes("nature") || normalizedStyle.includes("adventure")
                        ? ["Arrive, get settled, and explore a nearby viewpoint.", "Set aside the day for an outdoor highlight.", "Keep a slower morning for a local trail or hidden spot."]
                        : ["Arrive and explore the neighborhood around your stay.", "Choose one signature sight and leave time to wander.", "Enjoy a relaxed final morning before heading home."];
            return Array.from({ length: count }, (_, index) => ({
                title: `Day ${index + 1}`,
                detail: index === 0 ? `Arrive in ${destination} and settle in. ${notes ? `Keep time for: ${notes}` : ideas[0]}` : ideas[index % ideas.length]
            }));
        }

        function renderGenerated(trip) {
            latestPlan = trip;
            const box = document.querySelector("#generated-plan");
            box.hidden = false;
            box.innerHTML = `<div class="generated-head"><div><p class="eyebrow">YOUR FIRST DRAFT</p><h3>${escapeText(trip.destination)}</h3><p>${escapeText(formatDate(trip.startDate))} — ${escapeText(formatDate(trip.endDate))} · ${escapeText(trip.style)}</p></div><button class="small-primary" type="button" id="save-generated">Save to My Trips <span>→</span></button></div><div class="generated-days">${trip.days.map((day) => `<article><span>${escapeText(day.title)}</span><p>${escapeText(day.detail)}</p></article>`).join("")}</div><p class="local-note">A flexible starter outline made in your browser. Adjust it as your plans take shape.</p>`;
            document.querySelector("#save-generated").addEventListener("click", () => {
                trips.unshift({ ...latestPlan, id: crypto.randomUUID?.() || String(Date.now()) });
                if (!write(tripsKey, trips)) {
                    trips.shift();
                    announce("Could not save. Browser storage may be full.");
                    return;
                }
                renderTrips();
                selectTab("trips");
                announce("Itinerary saved to My Trips.");
            });
        }

        document.querySelectorAll(".tab-button").forEach((button) => button.addEventListener("click", () => selectTab(button.dataset.tab)));
        document.querySelectorAll("[data-tab-link]").forEach((link) => link.addEventListener("click", (event) => {
            event.preventDefault();
            selectTab(link.dataset.tabLink);
        }));
        document.querySelectorAll("[data-switch]").forEach((button) => button.addEventListener("click", () => selectTab(button.dataset.switch)));
        document.querySelector(".workspace-tabs")?.addEventListener("keydown", (event) => {
            if (!["ArrowLeft", "ArrowRight"].includes(event.key)) return;
            event.preventDefault();
            const names = Object.keys(panels);
            const current = names.findIndex((name) => !panels[name].hidden);
            const next = (current + (event.key === "ArrowRight" ? 1 : -1) + names.length) % names.length;
            selectTab(names[next]);
            document.querySelector(`#tab-${names[next]}`).focus();
        });
        window.addEventListener("hashchange", () => selectTab(window.location.hash.slice(1), false));
        document.querySelector("#plan-form").addEventListener("submit", (event) => {
            event.preventDefault();
            const form = event.currentTarget;
            if (!form.reportValidity()) return;
            const data = Object.fromEntries(new FormData(form));
            if (data.endDate < data.startDate) {
                form.elements.endDate.setCustomValidity("Choose an end date on or after the start date.");
                form.elements.endDate.reportValidity();
                return;
            }
            form.elements.endDate.setCustomValidity("");
            const trip = { ...data, id: crypto.randomUUID?.() || String(Date.now()), days: makeDays(data.destination, data.startDate, data.endDate, data.style, data.notes) };
            renderGenerated(trip);
            document.querySelector("#generated-plan").scrollIntoView({ behavior: "smooth", block: "nearest" });
        });
        document.addEventListener("click", (event) => {
            const planButton = event.target.closest("[data-plan-destination]");
            if (planButton) {
                document.querySelector("#plan-form").elements.destination.value = planButton.dataset.planDestination;
                selectTab("plan");
                document.querySelector("#plan-form").elements.startDate.focus();
                return;
            }
            const removeSaved = event.target.closest("[data-remove-saved]");
            if (removeSaved) {
                saved = saved.filter((item) => item.id !== removeSaved.dataset.removeSaved);
                write(savedKey, saved);
                renderSaved();
                announce("Removed from Saved.");
                return;
            }
            const removeTrip = event.target.closest("[data-remove-trip]");
            if (removeTrip) {
                trips = trips.filter((item) => item.id !== removeTrip.dataset.removeTrip);
                write(tripsKey, trips);
                renderTrips();
                announce("Itinerary removed.");
            }
        });

        renderSaved();
        renderTrips();
        const requestedDestination = new URLSearchParams(window.location.search).get("destination");
        if (requestedDestination) {
            document.querySelector("#plan-form").elements.destination.value = requestedDestination;
            selectTab("plan", false);
        } else {
            selectTab(window.location.hash.slice(1) || "saved", false);
        }
    }

    function initDashboard() {
        document.querySelector("[data-navigate-planner]")?.addEventListener("click", () => {
            window.location.href = "trip-planner.html";
        });

        document.querySelector("[data-surprise]")?.addEventListener("click", () => {
            const destination = destinations[Math.floor(Math.random() * destinations.length)];
            window.location.href = "trip-planner.html?destination=" + encodeURIComponent(destination.name);
        });

    }

    if (!redirectSignedInPublicPage()) {
        initLandingNavigation();
        initAuthForms();
        initAppNavigation();
        initPlanner();
        initDestinationPages();
        initTripsPage();
        initProfilePage();
        initDashboard();
        if (document.body.classList.contains("itineraries-page")) initLegacyItinerariesPage();
    }
})();
