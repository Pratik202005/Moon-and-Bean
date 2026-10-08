# MOON & BEAN — Client Web Application

Welcome to the frontend application for **Moon & Bean**. This is a responsive single-page web application built with React 19, Vite, Tailwind CSS, Framer Motion, and GSAP.

---

## 🌟 Architecture & Features

- **Dark Theme Design System**: Built with Tailwind CSS and custom dark color tokens (`#0B0A0A`, `#141211`, `#1B1816`, `#C5A880`).
- **Loading Preloader**: Synchronized GSAP Master Timeline sequencing brand keywords, numeric countdown, and video entrance.
- **Interactive Floor Plan Booking Engine**: Multi-step table reservation workflow with live zone selection (*The Master Roastery & Bar*, *The Nocturne Velvet Lounge*, *The Lantern Roastery Terrace*).
- **Digital Reservation Pass**: Dynamic reservation pass generation featuring verified reference numbers and QR code rendering.
- **Menu Catalog & Drink Customizer**: Live filtering across roast categories and custom brew options (grind, milk, sweetness, temperature).
- **Admin Management Dashboard**: Dedicated admin dashboard for managing reservations, live order fulfillment status, and full menu catalog CRUD operations.

---

## 🛠️ Technology Stack

- **Framework**: React 19 (SPA with React Router DOM)
- **Bundler & Build**: Vite
- **Styling**: Tailwind CSS, PostCSS, Lucide Icons
- **Animation Suite**: GSAP 3 (ScrollTrigger), Lenis Smooth Scroll, Framer Motion
- **HTTP Client**: Native Fetch with dynamic environment base URL resolution

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create `.env.development` or `.env.production`:

```env
# Development (proxied via Vite)
VITE_API_BASE_URL=/api

# Production (Set to your live backend API URL)
# VITE_API_BASE_URL=https://api.yourdomain.com/api
```

### 4. Run Development Server
```bash
npm run dev
```
The application will launch on `http://localhost:5173`.

### 5. Production Build
```bash
npm run build
```
The compiled, minified production assets will be output to the `dist/` directory.

---

## 🌐 Deployment Guidelines

- **Vercel / Netlify**: Connect repository, set build directory to `dist`, build command `npm run build`. Single-page application route rewrites are configured in `vercel.json`.
- **Environment**: Set `VITE_API_BASE_URL` in your hosting provider's environment settings pointing to your live backend API.

---

© 2026 Moon & Bean Artisanal Roastery. All rights reserved.
