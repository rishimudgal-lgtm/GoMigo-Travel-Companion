# GoMigo — project handoff from ChatGPT Classic

## What this project is

GoMigo is a personalized travel-planning website. The user describes the trip in a form—destination, dates or duration, budget, interests, travel style, and group needs—and the product organizes a tailored plan. It is **not a chatbot**. The project is a web-development course group project intended to demonstrate a responsive site with user-provided data and interactive behavior as the course progresses.

The Classic conversations also describe destination discovery, itinerary planning, expense tracking, budget prediction, saved trips, and profile/preferences. Treat these as the product vision; the current course milestone is narrower.

## Current scope and requirements

- The September 10 Classic request set the initial implementation scope to **HTML and CSS only for 2–3 pages**. On October 27, 2026, the user expanded the scope to include vanilla JavaScript and asked to unify page navigation and styles.
- The current prototype has separate Landing, Login, Sign Up, Home, Trip Planner, public Destinations, public Explore, signed-in Explore, My Trips, Saved, Travel Guide, and Profile pages. The landing page's Explore tab opens the public Explore page without requiring sign-in. Destinations and Travel Guide also have public pages. After sign-in, the app pages share the same sidebar and each sidebar tab opens its own page; signed-in Explore is a separate app page with 12 additional destinations. Signed-in visitors who open the public Destinations or Travel Guide URL are sent to the matching app page.
- Keep scripts in the shared `site.js` and styling in the shared `site.css`. Do not add frameworks or backend code unless the user changes the scope.
- The earlier Figma vision listed Landing, Login, Home, Explore, Trip Planner, Itinerary, and Profile. That is a longer-term design vision, not the current approved coding scope.
- The site should be responsive for the course project. A later GoMigo design discussion says to focus on desktop Figma views first.

## Design direction captured from the user

- A premium, modern, travel-focused **teal** identity with a light theme as the first coded version.
- Mindtrip was a reference for polish and composition; the user explicitly wanted GoMigo to have its own design and said not to copy the reference site.
- The design should feel realistic and visually rich, while remaining practical to reproduce in the course stack. The user rejected a chatbot-heavy presentation.
- User-provided Figma specs included K2D for hero text, Manrope for major headings, and Inter for small footer links. The user specified hero text color `#EAF8F0`, “Go Beyond Travel” at 128 px, “How it Works” in Manrope at 84 px, a 20 px navigation, a 36 px K2D trip-planning heading, an 84 px Manrope GoMigo Features heading, and a 60 px Manrope “Organize it all in one place” heading. Check the current Figma/source before changing these values.
- Color exploration evolved over time. The current local CSS uses `#EAF8F0` and teal shades including `#07566B`/`#06485A`; keep the existing implementation as the source of truth unless the user asks for a palette change.

## Current local folder

The project currently contains these implementation files:

- `landing_page.html`
- `main-menu.html`
- `trip-planner.html`
- `destinations.html`, `explore.html`, `explore-app.html`, `my-trips.html`, `saved.html`, `travel-guide.html`, `travel-guide-preview.html`, and `profile.html`
- `login.html` and `signup.html`
- `site.css` — shared stylesheet for all pages
- `site.js` — shared client-side interactions
- `landing_assets/`, `main-menu-assets/`, and `trip-planner-assets/`
- `README.md`

Demo sign-in, saved trips, saved destinations, and profile preferences use browser storage. There is no real authentication service or backend.

**Existing local work was preserved.** Before import, Git reported `landing_page.html` as modified on branch `main`. This import did not edit the website code, revert the modification, or create a commit.

## Classic export included here

- The account export contained 846 conversations. This handoff archives 12 conversations that directly mention GoMigo or contain identified GoMigo work; project membership itself was not represented in the export metadata.
- `CLASSIC_CONVERSATIONS.md` preserves their text, generated code, decisions, and attachment references.
- `ASSET_INDEX.csv` records all 71 distinct attachment references found in those conversations. The ZIP contained 29 standalone payloads: 22 were extracted here and 7 were matched to identical files already in the project. The remaining 42 references are recorded as metadata only because their file payloads were absent from the ZIP.
- The full account archive was not unpacked into the project. Unrelated account conversations and files were left out.

## Current implementation notes

- Landing-page Explore opens public `explore.html`, which can be browsed without sign-in. Login, Sign Up, Plan Your Trip, and Get Inspired each have distinct destinations.
- The signed-in pages share one sidebar; its Explore item opens `explore-app.html` with 12 additional destinations. The public Travel Guide has its own preview page, and signed-in Explore/Travel Guide routes stay inside the app shell.
- The planner saves form submissions to browser storage and shows them on My Trips. Destination hearts populate Saved; profile preferences are also stored locally.
- `CLASSIC_CONVERSATIONS.md` remains a historical archive. The user’s current requests and this updated handoff define active scope.

## Files added by this import

- `AGENTS.md` — durable project guidance for future coding sessions.
- `docs/classic-import/CLASSIC_CONVERSATIONS.md` — selected Classic transcript archive.
- `docs/classic-import/ASSET_INDEX.csv` — attachment inventory and extraction status.
- `docs/classic-import/assets/` — GoMigo attachments whose payloads were present and not already identical to a project file.

The Classic transcript is historical source material. Where an old assistant suggestion conflicts with a user requirement recorded later in the transcript or with a new request, follow the user requirement.
