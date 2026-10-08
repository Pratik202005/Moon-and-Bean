# MOON & BEAN — Artisanal Dark-Mode Roastery & Café

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-gold.svg)](https://mongodb.com)
[![React 19](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev)
[![Node Express](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-green.svg)](https://expressjs.com)
[![GSAP Animations](https://img.shields.io/badge/Animation-GSAP%20ScrollTrigger-darkgreen.svg)](https://greensock.com)
[![Deployment](https://img.shields.io/badge/Deploy-Vercel%20%7C%20Render-black.svg)](./DEPLOYMENT_GUIDE.md)

> 🔗 **Live Demo:** [https://moon-and-bean.vercel.app](https://moon-and-bean.vercel.app) *(Replace with your live URL)*  
> 🔗 **Backend API:** [https://moon-and-bean-api.onrender.com/api/health](https://moon-and-bean-api.onrender.com/api/health)

**Moon & Bean** is an artisanal, dark-luxury digital roastery and tasting lounge platform. It blends high-fashion editorial storytelling with a robust full-stack MERN architecture, offering interactive coffee customization, real-time cupping reservation management, an Apple Wallet-inspired customer Digital Pass system, and an Admin Telemetry Control Center.

---

## 🌟 Key Highlights & Architecture

- **Visual Aesthetics:** Dark obsidian luxury design system built with custom theme color tokens (`#0B0A0A`, `#141211`, `#1B1816`, `#C5A880`), ambient radial glows, glassmorphism containers, and smooth Lenis momentum scrolling.
- **Theatrical Curtain Preloader:** Synchronized GSAP Master Timeline preloader with numeric countdown (0-100), brand keyword rotation, split-curtains, and smooth hero coffee video reveal.
- **Interactive Floor Plan Engine:** Interactive seating zone selection engine allowing guests to reserve specific salon zones (*The Master Roastery & Bar*, *The Nocturne Velvet Lounge*, *The Lantern Roastery Terrace*).
- **Dual Subsystems (RBAC):**
  - **Customer Subsystem:** User registration/login, order history tracking, and Apple Wallet-style Digital Reservation Pass card generation with dynamic QR verification.
  - **Admin Subsystem:** Password-protected dashboard featuring real-time revenue telemetry, reservation status management, live barista order Kanban board, and full Menu CRUD capabilities.

---

## 🛠️ Technology Stack Breakdown

| Layer | Technologies & Libraries Used |
| :--- | :--- |
| **Frontend UI/UX** | React 19, Vite, Tailwind CSS, Lucide Icons, Framer Motion |
| **Animations & Scroll** | GSAP 3 (ScrollTrigger), Lenis Smooth Scroll |
| **Backend API** | Node.js, Express.js, CORS, Morgan Logger, Dotenv |
| **Database & ODM** | MongoDB Atlas, Mongoose Schemas & Middleware |
| **Authentication & Security** | JSON Web Tokens (JWT), BcryptJS Password Hashing, Role-Based Route Guards |

---

## 📁 Repository Directory Structure

```
Moon_and_Bean/
├── .gitignore                    # Git tracking ignore rules
├── ARCHITECTURE.md               # Production architecture, schemas & operational runbook
├── DEPLOYMENT_GUIDE.md           # Step-by-step cloud deployment guide (Atlas, Render, Vercel)
├── package.json                  # Root orchestrator scripts (concurrent dev, lint & build)
├── README.md                     # Comprehensive project documentation & quickstart
│
├── backend/                      # Node.js & Express REST API Server
│   ├── .env.example              # Environment variables template (MONGODB_URI, JWT_SECRET, etc.)
│   ├── .gitignore                # Backend-specific ignore rules (.env)
│   ├── package.json              # Backend dependencies (express, mongoose, bcryptjs, jwt)
│   ├── seeder.js                 # Database seeder (single-origin coffee menu & admin account)
│   ├── server.js                 # Express server setup, CORS whitelist, Morgan logging & routes
│   │
│   ├── config/
│   │   └── db.js                 # Mongoose connection with error handling & retry
│   ├── controllers/
│   │   ├── adminController.js    # Executive analytics, revenue metrics & order fulfillment
│   │   ├── authController.js     # User registration, authentication & JWT issuance
│   │   ├── menuController.js     # Terroir menu catalog CRUD operations
│   │   ├── orderController.js    # Barista order processing, table dispatch & history
│   │   ├── reservationController.js # Spatial table reservations & digital pass generation
│   │   └── userController.js     # Member profile & reservation history retrieval
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification & role-based access guards (protect, requireAdmin)
│   │   └── errorHandler.js       # Global API error boundary & standardized JSON responses
│   ├── models/
│   │   ├── MenuItem.js           # Terroir catalog schema (flavor notes, elevation, roast level)
│   │   ├── Order.js              # Dining & takeaway order schema (items, pricing, status)
│   │   ├── Reservation.js        # Table reservation schema with unique bookingRef (MB-XXXXXX)
│   │   └── User.js               # Member & admin user schema with bcrypt password hashing
│   └── routes/
│       ├── adminRoutes.js        # Protected administrative telemetry routes
│       ├── authRoutes.js         # Member authentication routes (/api/auth)
│       ├── menuRoutes.js         # Menu item management routes (/api/menu)
│       ├── orderRoutes.js        # Real-time order management routes (/api/orders)
│       ├── reservationRoutes.js  # Cupping & table booking routes (/api/reservations)
│       └── userRoutes.js         # Member profile routes (/api/users)
│
└── frontend/                     # React 19 / Vite Single-Page Application
    ├── .env.development          # Local environment config (VITE_API_BASE_URL=/api)
    ├── .env.example              # Frontend environment template
    ├── .env.production           # Production environment config (VITE_API_BASE_URL)
    ├── index.html                # HTML5 entry with luxury typography & meta tags
    ├── package.json              # React 19, Lucide, Tailwind, GSAP & Framer Motion dependencies
    ├── postcss.config.js         # PostCSS configuration
    ├── tailwind.config.js        # Obsidian luxury theme tokens, custom colors & keyframe animations
    ├── vercel.json               # Vercel deployment configuration & SPA routing rewrites
    ├── vite.config.js            # Vite build configuration with development API proxy
    │
    ├── public/
    │   └── favicon.svg           # Moon & Bean brand favicon
    │
    └── src/
        ├── App.jsx               # Application route hierarchy & navigation routes
        ├── index.css             # Obsidian luxury CSS styling, scrollbar, radial glow utilities
        ├── main.jsx              # React 19 client mounting point
        │
        ├── assets/               # Visual media assets
        │   ├── hero-coffee.mp4   # Atmospheric cinemagraph video for hero section
        │   └── hero.png          # High-resolution fallback & editorial photography
        │
        ├── components/           # Reusable UI component architecture
        │   ├── admin/
        │   │   └── MenuModal.jsx # Admin catalog item creation & editor modal
        │   ├── auth/
        │   │   ├── AdminRoute.jsx # Route guard restricting access to administrator role
        │   │   ├── AuthModal.jsx  # Member login & registration modal dialog
        │   │   └── UserRoute.jsx  # Protected route guard for member dashboard
        │   ├── layout/
        │   │   ├── Footer.jsx     # Luxury editorial footer with hours & newsletter
        │   │   ├── Header.jsx     # Glassmorphic navigation header with live cart badge
        │   │   ├── RootLayout.jsx # Master layout wrapper with toast notifications
        │   │   └── SmoothScroll.jsx # Lenis momentum smooth scrolling provider
        │   ├── sections/
        │   │   ├── HomeCTA.jsx    # Reservation invitation banner
        │   │   ├── HomeGallery.jsx # Editorial grid showcasing roasting techniques
        │   │   ├── HomeHero.jsx   # Kinetic hero section with video background
        │   │   ├── HomeMenu.jsx   # Curated featured roasts showcase
        │   │   └── HomeStory.jsx  # Roastery heritage narrative
        │   └── ui/
        │       ├── CartDrawer.jsx         # Slide-out shopping cart with item quantity controls
        │       ├── CheckoutModal.jsx      # Order confirmation & table dispatch modal
        │       ├── CustomCursor.jsx       # Custom luxury metallic cursor tracking
        │       ├── DigitalPassModal.jsx   # Apple Wallet-style reservation pass modal
        │       ├── FloorPlanPicker.jsx    # Spatial salon seating zone selector
        │       ├── ItemModal.jsx          # Coffee customization modal (grind, sweetness, milk)
        │       ├── Preloader.jsx          # GSAP synchronized split-curtain opening sequence
        │       ├── QuickTableBook.jsx     # Fast cupping booking widget
        │       ├── ReservationModal.jsx   # Interactive reservation workflow dialog
        │       ├── SpecularGlow.jsx       # Subtle ambient luminous backdrop effects
        │       └── ToastNotification.jsx  # Animated action notification toasts
        │
        ├── config/
        │   └── api.js            # Dynamic API base URL resolver (development vs production)
        ├── constants/
        │   └── menuData.js       # Curated single-origin fallback menu catalog
        ├── context/
        │   ├── AdminAuthContext.jsx # Admin session state & telemetry credentials
        │   ├── CartContext.jsx      # Shopping cart & roast customizer global state
        │   └── UserAuthContext.jsx  # Member authentication & JWT token management
        ├── hooks/
        │   └── useScrollReset.jsx # Scroll position reset hook on route change
        ├── lib/
        │   └── gsapConfig.js     # GSAP & ScrollTrigger plugins registration
        └── pages/
            ├── Home.jsx          # Landing page with cinematic storytelling sections
            ├── Login.jsx         # Member authentication page
            ├── Menu.jsx          # Terroir reserve menu with live category filters & search
            ├── NotFound.jsx      # Custom 404 luxury error page
            ├── Reservation.jsx   # Full interactive spatial reservation portal
            ├── Story.jsx         # Roastery philosophy, terroir sourcing & ethos
            ├── UserDashboard.jsx # Member portal (order history, passes, quick-reorder)
            └── admin/
                ├── AdminDashboard.jsx # Telemetry overview, revenue metrics, orders & menu CRUD
                └── AdminLogin.jsx     # Admin credentials login screen
```

---

## 🚀 Quickstart & Setup Guide

### 1. Prerequisites
Ensure you have **Node.js** (v18+) and **npm** installed on your machine.

### 2. Installation
Clone the repository and install dependencies in both `frontend` and `backend`:

```bash
# Install root orchestrator dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Environment Configuration
Create a `.env` file inside the `backend/` directory:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/moon_and_bean_db?retryWrites=true&w=majority
CLIENT_URL=http://localhost:5173
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

### 4. Running the Application Locally
Run backend and frontend concurrently from the root directory:

```bash
# From the Moon_and_Bean directory:
npm run dev
```
- **Frontend URL:** `http://localhost:5173`
- **Backend API URL:** `http://localhost:5000`

---

## 🔑 Initial Administrator Access

To access the Admin Subsystem (`/admin/login`):
- **Email:** `admin@moonandbean.com`
- **Password:** `admin1234` *(configurable via `ADMIN_DEFAULT_PASSWORD` in `.env`)*

---

## 📡 REST API Endpoint Documentation

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register new customer account |
| `POST` | `/api/auth/login` | Public | Customer authentication & JWT retrieval |
| `POST` | `/api/auth/admin-login` | Public | Admin login & JWT retrieval |
| `GET` | `/api/menu` | Public | Fetch master reserve menu items |
| `POST` | `/api/menu` | Admin | Add new menu item to collection |
| `PUT` | `/api/menu/:id` | Admin | Update existing menu item |
| `DELETE` | `/api/menu/:id` | Admin | Remove menu item |
| `POST` | `/api/reservations` | Public | Create new cupping reservation |
| `GET` | `/api/reservations/track/:bookingRef` | Public | Track live booking pass status |
| `GET` | `/api/user/reservations` | Protected User | Fetch customer's personal bookings |
| `GET` | `/api/user/orders` | Protected User | Fetch customer's order history |
| `GET` | `/api/admin/stats` | Protected Admin | Fetch aggregated revenue & reservation analytics |
| `GET` | `/api/admin/reservations` | Protected Admin | Fetch and filter reservation pipeline |
| `PATCH` | `/api/admin/reservations/:id` | Protected Admin | Update table reservation status |
| `GET` | `/api/admin/orders` | Protected Admin | Fetch real-time barista orders |
| `PATCH` | `/api/admin/orders/:id` | Protected Admin | Update order fulfillment status |

---

## 🌐 Production Deployment

> For a complete, illustrated walk-through with screenshots and step-by-step instructions, see the dedicated [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md).

### Frontend (Vercel / Netlify)
1. Link repository to Vercel or Netlify.
2. Root Directory: `frontend`
3. Build Command: `npm run build`
4. Output Directory: `dist`
5. Configure `VITE_API_BASE_URL` with your production API URL (e.g. `https://api.yourdomain.com/api`).

### Backend (Render / Railway)
1. Deploy `backend` directory as Node.js web service.
2. Build Command: `npm install`
3. Start Command: `node server.js`
4. Add Environment Variables:
   - `PORT=5000`
   - `MONGODB_URI`
   - `CLIENT_URL` (your frontend deployment domain)
   - `JWT_SECRET`
   - `NODE_ENV=production`

---

## 📄 License
© 2026 Moon & Bean Artisanal Roastery. All rights reserved.
