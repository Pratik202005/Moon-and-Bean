import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import { errorHandler } from './middleware/errorHandler.js';

import menuRoutes from './routes/menuRoutes.js';
import reservationRoutes from './routes/reservationRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Secure Production & Development CORS Configuration
const clientUrls = (process.env.CLIENT_URL || '')
  .split(',')
  .map((url) => url.trim().replace(/\/$/, ''))
  .filter(Boolean);

const defaultDevOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

const allowedOrigins = [...new Set([...defaultDevOrigins, ...clientUrls])];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow non-browser requests (mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);

    const normalizedOrigin = origin.replace(/\/$/, '');

    // Allow wildcard or explicitly listed origins
    if (process.env.CLIENT_URL === '*' || allowedOrigins.includes(normalizedOrigin)) {
      return callback(null, true);
    }

    // Allow cloud preview deployments on Vercel, Netlify, Render
    if (
      normalizedOrigin.endsWith('.vercel.app') ||
      normalizedOrigin.endsWith('.netlify.app') ||
      normalizedOrigin.endsWith('.onrender.com')
    ) {
      return callback(null, true);
    }

    return callback(new Error(`Origin ${origin} blocked by Moon & Bean CORS security policy`));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root Health Check Endpoint (For Render Pings & Deployment Monitors)
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'Moon & Bean API is live',
    service: 'Moon & Bean Artisanal Roastery Backend Engine',
    timestamp: new Date().toISOString(),
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'Moon & Bean Artisanal API',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/menu', menuRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);

// Error Handler Middleware
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`\n==================================================`);
  console.log(`  Moon & Bean REST API Server running on port ${PORT}`);
  console.log(`  Health Check: http://localhost:${PORT}/`);
  console.log(`==================================================\n`);
});
