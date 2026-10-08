# MOON & BEAN — Artisanal Dark-Mode Roastery & Café

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-gold.svg)](https://mongodb.com)
[![React 19](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev)
[![Node Express](https://img.shields.io/badge/Backend-Node.js%20%7C%20Express-green.svg)](https://expressjs.com)
[![GSAP Animations](https://img.shields.io/badge/Animation-GSAP%20ScrollTrigger-darkgreen.svg)](https://greensock.com)
[![Deployment](https://img.shields.io/badge/Deploy-Vercel%20%7C%20Render-black.svg)](./DEPLOYMENT_GUIDE.md)

> 🔗 **Live Demo:** [https://moon-and-bean.vercel.app](https://moon-and-bean.vercel.app) *(Replace with your live URL)*  
> 🔗 **Backend API:** [https://moon-and-bean-api.onrender.com/api/health](https://moon-and-bean-api.onrender.com/api/health)

**Moon & Bean** is a full-stack MERN platform for an artisanal roastery and café. It features drink customization, table reservation booking, digital pass cards with QR verification, and a protected admin management dashboard.

---

## 🌟 Key Highlights & Architecture

- **Interface & Interactions:** Dark-mode design system built with custom color tokens (`#0B0A0A`, `#141211`, `#1B1816`, `#C5A880`), glassmorphic panels, and smooth Lenis momentum scrolling.
- **Loading Sequence:** Synchronized GSAP Master Timeline preloader with numeric countdown, keyword transitions, and hero video entrance.
- **Table Reservation Flow:** Interactive seating zone selection (*Roastery Bar*, *Velvet Lounge*, *Roastery Terrace*) with live time-slot validation.
- **Role-Based Access (RBAC):**
  - **User Portal:** User registration/login, past order tracking, and digital reservation pass generation with QR verification.
  - **Admin Portal:** Protected dashboard featuring sales metrics, reservation management, live order fulfillment status, and menu catalog CRUD.

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
├── backend/                      # Node.js & Express REST API server
│   ├── config/                   # Database connection
│   ├── controllers/              # Route business logic handlers
│   ├── middleware/               # Auth guards & error handling
│   ├── models/                   # Mongoose data schemas
│   ├── routes/                   # API endpoint routers
│   ├── seeder.js                 # Database seed script
│   └── server.js                 # Express server entry point
│
├── frontend/                     # React 19 / Vite SPA client
│   ├── public/                   # Static assets & brand favicon
│   ├── src/                      # Client application source code
│   │   ├── assets/               # Media assets (video & photography)
│   │   ├── components/           # Reusable UI components
│   │   ├── config/               # API base URL configuration
│   │   ├── constants/            # Menu fallback data
│   │   ├── context/              # React Context state providers
│   │   ├── hooks/                # Custom React hooks
│   │   ├── lib/                  # Library configurations
│   │   └── pages/                # Route views (Customer & Admin)
│   ├── index.html                # HTML entry point
│   ├── vercel.json               # SPA routing rewrite rules
│   └── vite.config.js            # Vite build configuration & dev proxy
│
├── ARCHITECTURE.md               # Architecture, schemas & operational runbook
├── DEPLOYMENT_GUIDE.md           # Deployment runbook (MongoDB Atlas, Render, Vercel)
└── README.md                     # Project overview and setup guide
```

<details>
<summary><strong>Click to view full repository file tree</strong></summary>

```
Moon_and_Bean/
├── .gitignore                    # Git tracking ignore rules
├── ARCHITECTURE.md               # System architecture & technical reference
├── DEPLOYMENT_GUIDE.md           # Step-by-step production deployment guide
├── package.json                  # Root runner scripts (concurrent dev & build)
├── README.md                     # Project documentation & quickstart
│
├── backend/                      # Express REST API
│   ├── .env.example              # Environment variables template
│   ├── .gitignore                # Backend ignore rules
│   ├── package.json              # Backend dependencies
│   ├── seeder.js                 # Menu and admin seed script
│   ├── server.js                 # Server entry point, CORS whitelist & routes
│   ├── config/
│   │   └── db.js                 # MongoDB connection handler
│   ├── controllers/
│   │   ├── adminController.js    # Admin analytics, order status & menu CRUD
│   │   ├── authController.js     # User registration, login & JWT issuance
│   │   ├── menuController.js     # Menu catalog CRUD operations
│   │   ├── orderController.js    # Order processing, table dispatch & history
│   │   ├── reservationController.js # Table reservations & digital pass lookup
│   │   └── userController.js     # User profile & reservation history
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verification & role guards (protect, requireAdmin)
│   │   └── errorHandler.js       # Centralized error handler
│   ├── models/
│   │   ├── MenuItem.js           # Menu item schema
│   │   ├── Order.js              # Order schema
│   │   ├── Reservation.js        # Reservation schema with bookingRef
│   │   └── User.js               # User and admin account schema
│   └── routes/
│       ├── adminRoutes.js        # Protected admin routes
│       ├── authRoutes.js         # Authentication endpoints (/api/auth)
│       ├── menuRoutes.js         # Menu endpoints (/api/menu)
│       ├── orderRoutes.js        # Order endpoints (/api/orders)
│       ├── reservationRoutes.js  # Reservation endpoints (/api/reservations)
│       └── userRoutes.js         # User profile endpoints (/api/users)
│
└── frontend/                     # React 19 / Vite SPA
    ├── .env.example              # Frontend environment template
    ├── .env.production           # Production environment config (public API URL only)
    ├── index.html                # HTML document entry
    ├── package.json              # Frontend dependencies
    ├── postcss.config.js         # PostCSS config
    ├── tailwind.config.js        # Tailwind theme tokens & color configuration
    ├── vercel.json               # SPA routing rewrite rules
    ├── vite.config.js            # Vite build configuration & dev proxy
    ├── public/
    │   └── favicon.svg           # Brand favicon
    └── src/
        ├── App.jsx               # Route definitions
        ├── index.css             # Global styles & design system utilities
        ├── main.jsx              # React mounting entry point
        ├── assets/
        │   ├── hero-coffee.mp4   # Hero video asset
        │   └── hero.png          # Hero image fallback
        ├── components/
        │   ├── admin/
        │   │   └── MenuModal.jsx # Menu item create/edit modal
        │   ├── auth/
        │   │   ├── AdminRoute.jsx # Admin role route guard
        │   │   ├── AuthModal.jsx  # User login and registration modal
        │   │   └── UserRoute.jsx  # User role route guard
        │   ├── layout/
        │   │   ├── Footer.jsx     # Global footer
        │   │   ├── Header.jsx     # Navigation bar with cart indicator
        │   │   ├── RootLayout.jsx # Layout wrapper with toast notifications
        │   │   └── SmoothScrollWrapper.jsx # Smooth scroll provider
        │   ├── sections/
        │   │   ├── HomeCTA.jsx    # Reservation call to action
        │   │   ├── HomeGallery.jsx # Photo gallery grid
        │   │   ├── HomeHero.jsx   # Hero section with background video
        │   │   ├── HomeMenu.jsx   # Featured menu section
        │   │   └── HomeStory.jsx  # Story section
        │   └── ui/
        │       ├── CartDrawer.jsx         # Cart drawer component
        │       ├── CheckoutModal.jsx      # Checkout and table selection modal
        │       ├── CustomCursor.jsx       # Custom cursor effect
        │       ├── DigitalPassModal.jsx   # Digital reservation pass modal
        │       ├── FloorPlanPicker.jsx    # Seating zone selector
        │       ├── ItemModal.jsx          # Drink customization modal
        │       ├── Preloader.jsx          # Initial loading screen animation
        │       ├── QuickTableBooker.jsx   # Quick booking widget
        │       ├── ReservationModal.jsx   # Reservation modal
        │       ├── SpecularGlow.jsx       # Background glow visual effect
        │       └── ToastNotification.jsx  # Notification toast
        ├── config/
        │   └── api.js            # API base URL resolver
        ├── constants/
        │   └── menuData.js       # Static menu fallback data
        ├── context/
        │   ├── AdminAuthContext.jsx # Admin session state
        │   ├── CartContext.jsx      # Cart and drink options state
        │   └── UserAuthContext.jsx  # User authentication state
        ├── hooks/
        │   └── useScrollReset.jsx # Scroll reset on route transition
        ├── lib/
        │   └── gsapConfig.js     # GSAP plugin initialization
        └── pages/
            ├── Home.jsx          # Landing page
            ├── Login.jsx         # User login page
            ├── Menu.jsx          # Menu catalog page with category filters
            ├── NotFound.jsx      # 404 page
            ├── Reservation.jsx   # Table reservation page
            ├── Story.jsx         # Brand story page
            ├── UserDashboard.jsx # User account dashboard
            └── admin/
                ├── AdminDashboard.jsx # Admin dashboard (analytics, orders, menu CRUD)
                └── AdminLogin.jsx     # Admin login page
```
</details>

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
