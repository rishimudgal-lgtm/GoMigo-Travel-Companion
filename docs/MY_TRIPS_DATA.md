# My Trips data

The existing vanilla JavaScript in `site.js` saves the trip planner form to the
`gomigo.trips` browser-local storage key as a JSON array. After a successful save,
the planner opens `my-trips.html`, which reads the same key and renders the trips,
newest first. Existing saved trips are preserved.

Each trip stores an ID, destination, dates, duration, travelers, daily budget in
INR, travel style, selected interests, special requests, and creation date.
New records also include `schemaVersion: 1` and an ISO timestamp. The example
format is in `data/trips.example.json`; it is documentation and is not inserted
into a visitor's real trips.

JSON stays behind the scenes; My Trips has no JSON download control. Removing a
trip updates browser storage and the visible list.
Returning to the page or updating trips in another tab refreshes the view.
Storage write failures keep the user on the planner and show an error instead of
claiming the trip was saved.

This remains a local course-project demo: trips persist on the same browser and
site origin. There is no backend or account-sync service. Keep using one local
server address and port when moving between the planner and My Trips.

Verification: `node tools/check_my_trips.cjs` exercises the real save/render
handlers, JSON persistence across page contexts, deletion,
cross-tab updates, malformed storage, and failed saves.
