# MOON & BEAN — Production Systems Architecture & Technical Reference

**System Name:** Moon & Bean Roastery & Reservation Platform  
**Architecture:** Distributed Full-Stack MERN Architecture  
**Runtime:** Node.js (v18+) & React 19 / Vite Single-Page Application  
**Database:** MongoDB Atlas with Mongoose ODM  
**Styling & UI:** Tailwind CSS with custom dark color tokens  
**Animation & Scroll:** GSAP 3, Lenis Smooth Scroll, Framer Motion  

---

## 1. System Overview & Architecture

Moon & Bean is a full-stack MERN application for an artisanal coffee roastery, providing online drink ordering, table reservation management, digital reservation passes, and an admin management dashboard.

```
+-------------------------------------------------------------------------------+
|                       CLIENT TIER (React 19 / Vite SPA)                       |
|   - Dark Mode Theme & Responsive Layout   - 3-Step Spatial Reservation Flow   |
|   - GSAP Timelines & Lenis Scroll         - Shopping Cart & Drink Customizer  |
|   - Digital Reservation Pass & QR         - Admin Management Dashboard        |
+---------------------------------------+---------------------------------------+
                                        |
                             HTTPS / REST (JWT Bearer)
                                        |
+---------------------------------------v---------------------------------------+
|                       APPLICATION API TIER (Express.js)                       |
|   - Auth Controller (Bcrypt / JWT)        - Reservation Controller & Passes   |
|   - Menu Controller (CRUD & Cache)        - Order Processing & Validation     |
|   - Role-Based Access Guards (RBAC)       - Centralized Error Boundary        |
+---------------------------------------+---------------------------------------+
                                        |
                                   Mongoose ODM
                                        |
+---------------------------------------v---------------------------------------+
|                       PERSISTENCE TIER (MongoDB Atlas)                        |
|   - users (Authentication & RBAC)         - reservations (Table Bookings)     |
|   - menuitems (Menu Catalog)              - orders (Order Management)         |
+-------------------------------------------------------------------------------+
```

---

## 2. Subsystems & Security Architecture

### 2.1 Role-Based Access Control (RBAC)
The platform enforces separation of concerns through stateless JWT verification:
1. **Public Guest Portal:** Unauthenticated exploration of menu offerings, brand story, and table reservation booking.
2. **User Portal (`/dashboard`):** Authenticated users view order history and active reservation passes.
3. **Admin Dashboard (`/admin`):** Guarded by `protect` and `requireAdmin` middleware. Provides sales analytics, reservation management, live order fulfillment status, and menu catalog CRUD operations.

### 2.2 Security Standards & Secret Management
- **Password Hashing:** Passwords hashed via `bcryptjs` with 10 salt rounds prior to persistence.
- **Stateless Tokens:** JWT signed using HMAC SHA-256 with 7-day expiration.
- **CORS Configuration:** Explicit origin whitelist protecting against unauthorized cross-origin resource requests.
- **Sanitized Inputs:** Strict Mongoose schemas with validation and server-side pricing recalculation to prevent client-side cart tampering.
- **Environment Isolation:** Secrets kept in environment variables on the hosting platform; only `.env.example` templates committed to source control.

---

## 3. Repository File Organization

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

---

## 4. Data Models & Schemas

| Collection | Key Fields | Description |
| :--- | :--- | :--- |
| `users` | `name`, `email`, `password`, `role` (`user` \| `admin`) | User and administrator credentials |
| `menuitems` | `name`, `category`, `price`, `description`, `origin`, `flavorNotes`, `calories`, `image` | Coffee and food menu catalog |
| `reservations` | `bookingRef`, `name`, `email`, `phone`, `guests`, `date`, `timeSlot`, `zone`, `status` | Table reservations and pass verification |
| `orders` | `items`, `subtotal`, `tax`, `totalAmount`, `tableNumber`, `zone`, `customerInfo`, `orderStatus` | Drink orders and fulfillment status |

---

## 5. Production Deployment Topology

### Frontend (Edge CDN)
- **Providers:** Vercel, Netlify, or AWS CloudFront + S3
- **Build Output:** `frontend/dist/`
- **Routing:** SPA fallback redirects via `vercel.json` rewrites

### Backend (Container / PaaS)
- **Providers:** Render, Railway, AWS ECS, or Fly.io
- **Process Manager:** Node.js native with cluster/worker mode or container orchestrator
- **Health Check Endpoints:** `GET /` and `GET /api/health`

### Database (Managed Cloud)
- **Provider:** MongoDB Atlas Replica Set (M0 / M10+)
- **Connection URI:** Secured via TLS with environment variable injection (`MONGODB_URI`)

---

## 6. Operations & Maintenance Runbook

### Database Seeding
To initialize the production database with signature single-origin roasts and the primary administrator account:
```bash
npm run seed --prefix backend
```

### Health Verification
Verify API uptime:
```bash
curl -X GET https://your-api-domain.com/api/health
```

### Reference Documentation
- **Production Deployment Guide:** See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for step-by-step MongoDB Atlas, Render, and Vercel setup.
- **Quickstart & Setup:** See [README.md](./README.md) for local installation, scripts, and API contracts.

---

© 2026 Moon & Bean Artisanal Roastery. All rights reserved.
