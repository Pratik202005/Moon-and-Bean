import express from 'express';
import {
  createOrder,
  getOrders,
  updateOrderStatus,
  getUserActiveOrders,
} from '../controllers/orderController.js';
import { protect, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public checkout order creation, but administrative order list query
router.route('/')
  .get(protect, requireAdmin, getOrders)
  .post(createOrder);

// Only administrators can update kitchen/order status
router.route('/:id/status')
  .patch(protect, requireAdmin, updateOrderStatus);

// Only authenticated account owner or admin can retrieve specific user orders
router.route('/user/:email')
  .get(protect, getUserActiveOrders);

export default router;
