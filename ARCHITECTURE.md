# MOON & BEAN — Production Systems Architecture & Technical Reference

**System Name:** Moon & Bean Digital Roastery & Reservation Platform  
**Architecture:** Distributed Full-Stack MERN Architecture  
**Runtime:** Node.js (v18+) & React 19 / Vite Single-Page Application  
**Database:** MongoDB Atlas with Mongoose ODM  
**Styling & UI:** Custom Luxury Obsidian Design System with Tailwind CSS  
**Kinetic Engine:** GSAP 3 Master Timelines, Lenis Momentum Scroll, Framer Motion  

---

## 1. System Overview & Architecture

Moon & Bean is a luxury artisanal digital roastery and sensory lounge platform engineered for high-volume reservations, digital tasting pass generation, and real-time barista order fulfillment.

```
+-------------------------------------------------------------------------------+
|                       CLIENT TIER (React 19 / Vite SPA)                       |
|   - Obsidian Dark Luxury Theme Engine     - 3-Step Spatial Reservation Flow   |
|   - Master Timelines & Lenis Scroll       - Dynamic Cart & Brew Customizer    |
|   - Apple Wallet-Style Sanctuary Pass     - Executive Admin Telemetry Center  |
+---------------------------------------+---------------------------------------+
                                        |
                             HTTPS / REST (JWT Bearer)
                                        |
+---------------------------------------v---------------------------------------+
|                       APPLICATION API TIER (Express.js)                       |
|   - Auth Controller (Bcrypt / JWT)        - Reservation Controller & Passes   |
|   - Menu Controller (CRUD & Cache)        - Order Verifier & Tax Engine       |
|   - Role-Based Access Guards (RBAC)       - Global Centralized Error Boundary |
+---------------------------------------+---------------------------------------+
                                        |
                                   Mongoose ODM
                                        |
+---------------------------------------v---------------------------------------+
|                       PERSISTENCE TIER (MongoDB Atlas)                        |
|   - users (Authentication & RBAC)         - reservations (Cupping Bookings)   |
|   - menuitems (Terroir Catalog)           - orders (Telemetry & Tracking)     |
+-------------------------------------------------------------------------------+
```

---

## 2. Subsystems & Security Architecture

### 2.1 Role-Based Access Control (RBAC)
The platform enforces strict separation of concerns through stateless JWT verification:
1. **Public Guest Portal:** Unauthenticated exploration of master roast origins, cupping notes, and table booking inquiries.
2. **Member Sanctuary Portal (`/dashboard`):** Authenticated guests access historical orders, active table passes, and priority concierge notifications.
3. **Admin Telemetry Control Center (`/admin`):** Guarded by `protect` and `requireAdmin` middleware. Provides real-time revenue telemetry, live reservation status updates (`Confirmed`, `Seated`, `Completed`), barista order dispatch Kanban, and full menu catalog CRUD operations.

### 2.2 Security Standards & Secret Management
- **Password Hashing:** Passwords hashed via `bcryptjs` with 10 salt rounds prior to persistence.
- **Stateless Tokens:** JWT signed using HMAC SHA-256 with 7-day expiration.
- **CORS Configuration:** Explicit origin whitelist protecting against unauthorized cross-origin resource requests.
- **Sanitized Inputs:** Strict Mongoose schemas with validation and server-side pricing recalculation to prevent client-side cart tampering.

---

## 3. Data Models & Schemas

| Collection | Key Fields | Description |
| :--- | :--- | :--- |
| `users` | `name`, `email`, `password`, `role` (`user` \| `admin`) | Member credentials and access levels |
| `menuitems` | `name`, `category`, `price`, `description`, `origin`, `flavorNotes`, `calories`, `image` | Master terroir catalog |
| `reservations` | `bookingRef`, `name`, `email`, `phone`, `guests`, `date`, `timeSlot`, `zone`, `status` | Salon reservations & pass verification |
| `orders` | `items`, `subtotal`, `tax`, `totalAmount`, `tableNumber`, `zone`, `customerInfo`, `orderStatus` | Real-time barista orders & sales logs |

---

## 4. Production Deployment Topology

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

## 5. Operations & Maintenance Runbook

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
