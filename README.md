# 🌍 GoMigo — Your Travel Companion

## ✈️ About GoMigo

**GoMigo** is a travel companion website designed to make travel planning simple, personalized, and enjoyable.

The platform provides users with a complete travel experience — starting from discovering GoMigo, signing into their account, exploring destinations, planning their trips, managing saved trips, and maintaining their personal profile.

GoMigo brings different parts of the travel planning process together in one convenient platform, helping users spend less time organizing and more time enjoying their journey.

---

# 🎯 Our Goal

The goal of GoMigo is to simplify the travel planning experience by providing users with a single platform where they can:

* 🌎 Discover new destinations
* 🔐 Create and access their account
* 🧭 Explore places and travel ideas
* 🗺️ Plan trips according to their preferences
* 💰 Set a suitable travel budget
* 📅 Organize travel dates and duration
* 🧳 Manage their planned trips
* 👤 Manage their personal profile and preferences

---

# 🔄 Website Flow

The current browser prototype follows this flow:

```text
Landing page ── Explore → public Explore Destinations page (no sign-in required)
      ├─ Destinations → public destination discovery
      ├─ Travel Guide → public travel guide preview
      ├─ My Trips → Sign In → My Trips page
      ├─ Login → Sign In page
      ├─ Get Started → Create Account page
      └─ Plan Your Trip → Trip Planner

Signed-in sidebar: Home · Plan Trip · My Trips · Explore · Saved · Travel Guide · Profile
Signed-in Explore opens a separate app page with 12 additional destinations; signed-in Travel Guide has its own app page.
```

---

# 📄 Website Pages

The page descriptions below outline the broader product vision. The current prototype gives the main signed-in tabs their own pages and shares one sidebar across them.

## 01 — 🏠 Home Page

The **Home Page** is the entry point of the GoMigo website.

It introduces visitors to the platform, communicates the purpose of GoMigo, and encourages users to begin their travel journey.

### Key sections include:

* Navigation Bar
* Hero Section
* Introduction to GoMigo
* How It Works
* Travel Inspiration
* Featured Destinations
* Call-to-Action Sections
* Footer

The main purpose of this page is to answer:

> **"What is GoMigo and how can it help me?"**

From the Home Page, users can proceed to the **Login Page** to access the complete travel experience.

---

## 02 — 🔐 Login Page

The **Login Page** allows users to securely access their GoMigo account.

It acts as the gateway between the public-facing website and the personalized travel experience.

The page can provide:

* Email / Username
* Password
* Login button
* Sign-up option
* Forgot password option

After logging in, users can access the different features of GoMigo, including destination exploration, trip planning, saved trips, and their profile.

---

## 03 — 🧭 Explore Destinations

The **Explore Destinations Page** helps users discover places they may want to visit.

This section is designed to provide inspiration before users begin planning their trip.

Users can explore:

* Popular destinations
* Travel inspiration
* Places to visit
* Destination highlights
* Different travel experiences
* Destination information

The main purpose of this page is to answer:

> **"Where do I want to go?"**

Once users find a destination they are interested in, they can move to the **Trip Planner** and start organizing their journey.

---

## 04 — 🗺️ Trip Planner

The **Trip Planner** is one of the core features of GoMigo.

It allows users to provide their travel requirements and preferences so that they can organize their trip in a structured way.

Users can specify information such as:

* 📍 Destination
* 📅 Travel dates
* ⏱️ Trip duration
* 💰 Budget
* 🧳 Travel preferences
* 👥 Trip requirements

The planning process helps users answer:

> **"How do I want to experience my trip?"**

The information entered into the Trip Planner can be used to organize and save the user's journey under **My Trips**.

---

## 05 — 🧳 My Trips

The **My Trips Page** provides users with a centralized place to view and manage their planned journeys.

Instead of having to recreate their travel plans every time, users can access their previously created trips from one location.

This section can include:

* Upcoming trips
* Previous trips
* Saved trips
* Trip destinations
* Travel dates
* Trip duration
* Budget information
* Trip details
* Options to edit or manage trips

The main purpose of this page is to answer:

> **"What trips have I planned?"**

---

## 06 — 👤 Profile Page

The **Profile Page** gives users a personalized space to manage their account and travel preferences.

Users can manage information such as:

* Personal details
* Profile information
* Travel preferences
* Preferred destinations
* Account settings
* Other personalization options

The profile information can help GoMigo provide a more personalized experience for the user.

The main purpose of this page is to answer:

> **"Who am I as a traveler, and what are my preferences?"**

---

# 📁 Project Structure

The current prototype keeps its pages, shared styling, and shared interactions at the project root.

```text
GoMigo/
│
├── README.md
├── landing_page.html
├── login.html
├── signup.html
├── main-menu.html
├── trip-planner.html
├── destinations.html
├── explore.html
├── explore-app.html
├── my-trips.html
├── saved.html
├── travel-guide.html
├── travel-guide-preview.html
├── profile.html
├── site.css
├── site.js
├── landing_assets/
├── main-menu-assets/
└── trip-planner-assets/
```

### 📌 Asset Management

Page-specific images remain in their existing asset folders. All pages now load the shared `site.css` and `site.js` files.

For example:

```text
landing_assets/
main-menu-assets/
trip-planner-assets/
```

Page-specific images, icons, illustrations, and other visual resources should be stored inside the corresponding folder.

This keeps the project organized and prevents assets from different pages from being mixed together.

---

# 🛠️ Technologies Used

The current frontend implementation uses:

* **HTML5** — Structure and content
* **CSS3** — Shared responsive styling in `site.css`
* **JavaScript** — Client-side navigation, trip saving, favorites, and profile preferences in `site.js`
* **Git** — Version control
* **GitHub** — Team collaboration and code management
* **Figma** — UI/UX design and prototyping

---

# 🎨 Design Approach

GoMigo follows a clean, modern, and travel-focused design approach.

The website focuses on:

* 🌿 A welcoming travel-oriented visual style
* 🧭 Simple and intuitive navigation
* 🎨 Consistent color palette
* ✨ Clear typography
* 🖼️ Engaging travel imagery
* 📱 User-friendly layouts
* 🔄 Consistency across all pages

The visual design is kept consistent throughout the user journey so that users feel they are interacting with one connected platform rather than separate webpages.

---

# 🚀 How to Run the Website

GoMigo uses HTML, CSS, and browser-side JavaScript. No package installation is needed.

### Clone the Repository

```bash
git clone <repository-url>
```

Navigate into the project:

```bash
cd GoMigo
```

### Run Using a Browser

Open one of the page files from the project root.

For example:

```text
landing_page.html
```

### Run Using VS Code

For development, we recommend using **Visual Studio Code** with the **Live Server** extension.

1. Clone the repository.
2. Open the GoMigo folder in VS Code.
3. Open `landing_page.html` in Live Server. The other pages are linked from the sign-in and app navigation.

---

# 🔀 GitHub Collaboration

GoMigo is being developed collaboratively by a team of three members.

To avoid conflicts, team members should work using separate branches and merge their completed work into the `main` branch.

### Get the latest code

```bash
git pull origin main
```

### Create a branch

```bash
git checkout -b your-branch-name
```

### Add changes

```bash
git add .
```

### Commit changes

```bash
git commit -m "Add changes"
```

### Push the branch

```bash
git push origin your-branch-name
```

After pushing the branch, create a **Pull Request** on GitHub and merge it into `main` after reviewing the changes.

---

# 👥 Team

GoMigo is developed collaboratively by a team of four members.

| Team Member     | Contribution                 |

| Rishi Mudgal    |Team Lead|
| Khushboo Kapoor |  Frontend Development |
| Prakhar Jain    | Backend Development |
| Rishabh         | UI/UX |

---

# 🔮 Future Scope

GoMigo can be expanded with additional features in future versions, including:

* 🤖 AI-powered travel recommendations
* 🗺️ Interactive maps
* 🧳 Automatic itinerary generation
* 🏨 Hotel recommendations
* ✈️ Flight information
* 🌤️ Weather information
* 💰 Real-time travel cost estimation
* 📍 Location-based recommendations
* 🔐 Complete user authentication
* 💾 Cloud-based trip storage
* 📱 Responsive mobile application
* 🗄️ Backend and database integration

---

# 📌 Project Status

🚧 **Connected front-end prototype in development**

The pages share one stylesheet and one JavaScript file. Demo sign-in, trip saving, saved destinations, and profile preferences use this browser's local storage; there is no real authentication service or backend yet.

Future development can add itinerary generation, backend services, and persistent accounts when those features are in scope.

---

# 🌟 Vision

> **"Plan less. Explore more."**

GoMigo aims to become a complete travel companion that takes users through the entire travel planning journey — from discovering a destination to planning, saving, and managing their trips.

**Explore. Plan. Travel. GoMigo.** 🌍✈️

