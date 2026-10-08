# 🚀 Moon & Bean — Step-by-Step Production Deployment Guide

This guide walks you through deploying the complete **Moon & Bean** application to production using the recommended industry-standard cloud stack:
- **Database:** MongoDB Atlas (Managed Cloud Database)
- **Backend API:** Render (Node.js & Express REST API)
- **Frontend:** Vercel (React 19 & Vite SPA with Global Edge CDN)

---

## 📋 Overview of Deployment Flow

```
+-------------------+       REST API (/api)       +-------------------+
|  Vercel Frontend  |  ========================>  |   Render Backend  |
|  (React 19 / Vite)|  <========================  |  (Express.js API) |
+-------------------+          CORS Safe          +---------+---------+
                                                            |
                                                            | Mongoose TLS
                                                            v
                                                  +-------------------+
                                                  |   MongoDB Atlas   |
                                                  | (Cloud Database)  |
                                                  +-------------------+
```

---

## 🗄️ Step 1: Set Up MongoDB Atlas (Cloud Database)

1. **Create an Account:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up or log in.

2. **Create a Free Cluster:**
   - Click **Create Database** -> Select the **M0 Free** shared tier.
   - Choose a cloud provider (AWS recommended) and a region closest to you (e.g., `us-east-1` or `ap-south-1`).
   - Click **Create Cluster**.

3. **Create Database User:**
   - Under **Security** > **Database Access**, click **Add New Database User**.
   - Authentication Method: **Password**.
   - Username: `moonadmin` (or your choice).
   - Password: Click **Autogenerate Secure Password** and copy it somewhere safe.
   - Database User Privileges: Select **Read and write to any database**.
   - Click **Add User**.

4. **Configure Network Access (Whitelist IP):**
   - Under **Security** > **Network Access**, click **Add IP Address**.
   - Click **Allow Access from Anywhere** (`0.0.0.0/0`) so Render's cloud servers can connect.
   - Click **Confirm**.

5. **Copy the Connection String:**
   - Go back to **Deployments** > **Database** > click **Connect**.
   - Choose **Drivers** (Node.js).
   - Copy your connection string. It will look like this:
     ```
     mongodb+srv://moonadmin:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
     ```
   - Replace `<password>` with your database user password and append the database name `moon_and_bean_db` before the query parameters:
     ```
     mongodb+srv://moonadmin:YOUR_PASSWORD@cluster0.abcde.mongodb.net/moon_and_bean_db?retryWrites=true&w=majority
     ```

---

## 📦 Step 2: Push Project to GitHub

1. Open your terminal in the `Moon_and_Bean` root folder:
   ```bash
   git init
   git add .
   git commit -m "feat: complete production-ready Moon & Bean platform"
   ```

2. Create a new repository on [GitHub](https://github.com/new) named `moon-and-bean` (public or private).

3. Link and push your repository:
   ```bash
   git branch -M main
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/moon-and-bean.git
   git push -u origin main
   ```

*(Note: Secrets inside `.env` files are automatically protected by `.gitignore` and will never be pushed).*

---

## ⚙️ Step 3: Deploy Backend API on Render

1. **Create a Render Account:**
   - Sign up or log in at [Render.com](https://render.com).

2. **Create New Web Service:**
   - Click **New +** > **Web Service**.
   - Connect your GitHub account and select your `moon-and-bean` repository.

3. **Configure Settings:**
   - **Name:** `moon-and-bean-api`
   - **Region:** Select a region close to your database.
   - **Branch:** `main`
   - **Root Directory:** `backend`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Instance Type:** `Free`

4. **Configure Environment Variables:**
   Click **Advanced** > **Add Environment Variable** and add the following:

   | Key | Value | Description |
   | :--- | :--- | :--- |
   | `NODE_ENV` | `production` | Enables production security & logging |
   | `PORT` | `5000` | Server listening port |
   | `MONGODB_URI` | `mongodb+srv://.../moon_and_bean_db` | Your Atlas connection string from Step 1 |
   | `JWT_SECRET` | *(Generate a 32+ character random string)* | Token encryption secret |
   | `CLIENT_URL` | `*` *(temporarily, will update in Step 6)* | Allowed CORS frontend origins |
   | `ADMIN_EMAIL` | `admin@moonandbean.com` | Primary administrator login |
   | `ADMIN_DEFAULT_PASSWORD` | `YourSecurePassword2026!` | Initial administrator password |

5. **Deploy Service:**
   - Click **Create Web Service**.
   - Render will build and start your server.
   - Once deployment completes, copy your live API URL from the top of the dashboard:
     `https://moon-and-bean-api.onrender.com`

6. **Verify API Health:**
   - Open in your browser: `https://moon-and-bean-api.onrender.com/api/health`
   - You should see:
     ```json
     {
       "status": "online",
       "service": "Moon & Bean Artisanal API",
       "timestamp": "..."
     }
     ```

---

## 🌱 Step 4: Seed Database with Signature Menu & Admin

Once your cloud database is connected, seed the 12 master roasts and create the admin account:

**Option A (Locally from terminal against cloud DB):**
1. In your local `backend/.env`, set `MONGODB_URI` to your cloud Atlas URI.
2. Run:
   ```bash
   cd backend
   node seeder.js
   ```
3. You will see:
   ```
   ✓ Connected to MongoDB
   ✓ Created default administrator: admin@moonandbean.com
   ✓ Seeded 12 Moon & Bean signature menu items!
   Database setup completed successfully!
   ```

**Option B (From Render Shell):**
- In Render dashboard > Click your service > Go to **Shell** tab > Run:
  ```bash
  node seeder.js
  ```

---

## 🎨 Step 5: Deploy Frontend on Vercel

1. **Create a Vercel Account:**
   - Go to [Vercel.com](https://vercel.com) and log in with GitHub.

2. **Import Project:**
   - Click **Add New...** > **Project**.
   - Select your `moon-and-bean` GitHub repository.

3. **Configure Project Settings:**
   - **Framework Preset:** `Vite`
   - **Root Directory:** Click **Edit** and select `frontend`.
   - **Build Command:** `npm run build` (Default)
   - **Output Directory:** `dist` (Default)

4. **Add Environment Variables:**
   Expand **Environment Variables** and add:
   - **Name:** `VITE_API_BASE_URL`
   - **Value:** `https://moon-and-bean-api.onrender.com/api` *(replace with your actual Render URL from Step 3, with `/api` at the end)*

5. **Deploy:**
   - Click **Deploy**.
   - In ~30-60 seconds, your luxury site will be live on Vercel!
   - You will receive a URL such as: `https://moon-and-bean.vercel.app`.

---

## 🔒 Step 6: Connect Backend & Frontend (Secure CORS)

Now that your frontend domain is active:
1. Go back to your [Render Dashboard](https://dashboard.render.com).
2. Select your `moon-and-bean-api` service > **Environment**.
3. Update `CLIENT_URL` from `*` to your exact Vercel frontend URL:
   ```
   https://moon-and-bean.vercel.app
   ```
   *(If you also have a custom domain like `https://moonandbean.com`, separate with a comma: `https://moon-and-bean.vercel.app,https://moonandbean.com`)*
4. Click **Save Changes**. Render will automatically redeploy with zero downtime.

---

## ✅ Step 7: Live Verification & Testing Checklist

Open your live Vercel URL in your browser and verify:

1. **Theatrical Curtain Preloader:**
   - Countdown (0-100) animates smoothly.
   - Ambient video hero loads and plays without layout shifts.

2. **Menu & Roast Customizer:**
   - Navigate to `/menu`.
   - Verify all 12 signature items render with correct origin elevation & flavor notes.
   - Customize an item (Grind, Milk, Sweetness) and click **Add to Cart**.
   - Cart drawer opens with accurate subtotal, 8% tax, and total.

3. **Customer Registration & Ordering:**
   - Click **Sign In** in the top navigation or proceed through checkout.
   - Register a customer account.
   - Place an order and receive an instant order receipt.

4. **Interactive 3-Step Table Reservation:**
   - Navigate to `/reservation`.
   - Select Party Size, Time Flight, and Seating Zone (*The Master Roastery & Bar*, *The Nocturne Velvet Lounge*, or *The Lantern Roastery Terrace*).
   - Confirm booking to generate the Apple Wallet-style Digital Sanctuary Pass.

5. **Executive Admin Dashboard:**
   - Go to `/admin/login`.
   - Log in with `admin@moonandbean.com` and password configured in Step 3.
   - Verify live telemetry:
     - Real-time revenue counter.
     - Live Barista order Kanban board.
     - Reservation status pipeline (`Confirmed` -> `Seated` -> `Completed`).
     - Menu Item CRUD modal.

---

## 💡 Troubleshooting & Pro Tips

- **Render Cold Starts on Free Tier:**
  Free Render instances sleep after 15 minutes of inactivity and take ~30-45 seconds to spin up on the first request. The frontend has built-in offline fallbacks so the menu and reservations never break. To keep it awake 24/7 for free, you can set up a free monitor at [UptimeRobot.com](https://uptimerobot.com) pinging your `https://your-api.onrender.com/api/health` endpoint every 10 minutes.
- **Custom Domains:**
  Both Vercel and Render support free automatic SSL certificates for custom domains (e.g. `moonandbean.com` and `api.moonandbean.com`). Simply add your domain in their respective **Domains** tabs and configure your DNS CNAME/A records.
