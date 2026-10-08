import express from 'express';
import {
  createReservation,
  getReservationByRef,
  getAllReservations,
} from '../controllers/reservationController.js';
import { protect, requireAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', createReservation);
router.get('/', protect, requireAdmin, getAllReservations);
router.get('/track/:bookingRef', getReservationByRef);

export default router;
