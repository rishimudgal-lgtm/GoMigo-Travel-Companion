# GoMigo — Full-Stack Travel Companion & Trip Planner

**GoMigo** is a full-stack web application built with **Node.js, Express, Handlebars (HBS), and MongoDB Atlas**. Designed to simplify travel discovery, itinerary planning, and INR budget management, GoMigo dynamically renders 100+ curated destinations and provides complete CRUD (Create, Read, Update, Delete) functionality for personalized trip planning.

## Live Application Screenshots

> **Note:** Save your screenshots inside a `docs/screenshots/` folder in your repository using the filenames below so they render automatically on GitHub.

### 1. Landing Page & Destination Discovery (`/destinations` & `/explore`)


*Server-side rendered destination catalog powered by MongoDB Atlas with live search and category filtering.*

### 2. Trip Planner (`/trip-planner`)


*Interactive trip planning form with destination selection, travel style customization, and INR budget input.*

### 3. My Trips & Saved Itineraries (`/my-trips` & `/saved`)


*Dynamic dashboard displaying user-planned trips with quick actions to inspect itineraries, bookmark favorites, or delete trips.*

### 4. Personalized Itinerary & INR Budget Breakdown (`/itinerary/:id`)


*Detailed trip view featuring automated daily spend (`₹/day`) and per-person split (`₹/person`) calculations, alongside an inline update form.*

### 5. MongoDB Atlas Cloud Database (`gomigo`)


*Live MongoDB Atlas cluster storing `destinations` (103+ documents), `trips`, and `users` collections.*

## Key Features

* **Dynamic Destination Catalog:** Seeded with 103+ global and Indian destinations stored in MongoDB Atlas (`destinations` collection) and rendered dynamically via Handlebars `{{#each}}` templates.

* **Complete Trip CRUD Operations:**

  * **Create:** Plan new trips via `/trip-planner` (`POST /trips`) with destination, dates, duration, traveller count, INR budget, and travel style.

  * **Read:** View all planned trips (`/my-trips`), bookmarked trips (`/saved`), and detailed single-trip views (`/itinerary/:id`).

  * **Update:** Modify trip budgets, travel styles, and personal notes (`POST /trips/:id/update`), or toggle saved bookmarks (`POST /trips/:id/save`).

  * **Delete:** Remove unwanted trips permanently from MongoDB (`POST /trips/:id/delete`).

* **Smart INR Budget Breakdown:** Automatically computes **Estimated Daily Spend (`₹/day`)** and **Per-Person Share (`₹/person`)** on every trip itinerary page.

* **User Authentication Persistence:** Wires login (`/login`) and registration (`/signup`) forms directly to the MongoDB `users` collection.

## Tech Stack

* **Backend Runtime & Framework:** Node.js, Express.js

* **Templating Engine:** Handlebars (`hbs`) — Server-Side Rendering (SSR)

* **Database & ODM:** MongoDB Atlas, Mongoose

* **Frontend:** HTML5, CSS3 (Custom Teal Theme), Vanilla JavaScript

* **Environment & Dev Tools:** `dotenv`, `nodemon`

## Project Architecture (MVC)

```
GoMigo-Travel-Companion/
├── config/
│   └── db.js                 # MongoDB Atlas connection setup
├── controllers/
│   └── mainController.js     # Business logic for pages, auth, & Trip CRUD
├── models/
│   ├── Destination.js        # Mongoose schema for seeded destinations
│   ├── Trip.js               # Mongoose schema for user trip plans
│   └── User.js               # Mongoose schema for user accounts
├── public/
│   ├── js/site.js            # Client-side UI interactivity & filters
│   ├── explore_assets/       # Destination photography
│   ├── main-menu-assets/     # App branding & sidebar icons
│   └── site.css              # Core stylesheet
├── routes/
│   └── appRoutes.js          # Express GET and POST route definitions
├── views/                    # Dynamic Handlebars (.hbs) templates
│   ├── landing_page.hbs
│   ├── login.hbs & signup.hbs
│   ├── main-menu.hbs
│   ├── destinations.hbs & explore-app.hbs
│   ├── trip-planner.hbs
│   ├── my-trips.hbs & saved.hbs
│   └── itinerary.hbs
├── seed.js                   # Database seeding script for destinations
├── server.js                 # Express application entry point
└── package.json

```

## Routes & API Endpoints

| Method | Endpoint | Description | 
| ----- | ----- | ----- | 
| `GET` | `/` | Renders the GoMigo landing page | 
| `GET` | `/login`, `/signup` | Renders authentication pages | 
| `POST` | `/login`, `/signup` | Authenticates/persists user data in MongoDB `users` | 
| `GET` | `/main-menu` | Renders the authenticated user dashboard | 
| `GET` | `/destinations`, `/explore` | Fetches and renders all seeded destinations from MongoDB | 
| `GET` | `/trip-planner` | Renders the interactive trip creation form | 
| `POST` | `/trips` | **Create:** Saves a new trip document to MongoDB | 
| `GET` | `/my-trips` | **Read:** Displays all planned trips from MongoDB | 
| `GET` | `/saved` | **Read:** Displays bookmarked (`isSaved: true`) trips | 
| `GET` | `/itinerary/:id` | **Read:** Displays single trip details & INR cost breakdown | 
| `POST` | `/trips/:id/update` | **Update:** Updates trip budget, style, and notes | 
| `POST` | `/trips/:id/save` | **Update:** Toggles trip bookmark status | 
| `POST` | `/trips/:id/delete` | **Delete:** Deletes a trip from MongoDB | 

## Local Setup & Installation

1. **Clone the repository:**

   ```
   git clone https://github.com/rishimudgal-lgtm/GoMigo-Travel-Companion.git
   cd GoMigo-Travel-Companion
   
   ```

2. **Install dependencies:**

   ```
   npm install
   
   ```

3. **Configure environment variables:**
   Create a `.env` file in the root directory and add your MongoDB Atlas connection string:

   ```
   PORT=3000
   MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/gomigo?retryWrites=true&w=majority
   
   ```

4. **Seed the destinations database (Optional):**

   ```
   node seed.js
   
   ```

5. **Start the development server:**

   ```
   npm run dev
   
   ```

   Open `http://localhost:3000` in your browser.