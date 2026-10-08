import express from 'express';
import { loginAdmin, registerCustomer, loginCustomer, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerCustomer);
router.post('/login', loginCustomer);
router.post('/admin-login', loginAdmin);
router.get('/me', protect, getMe);

export default router;
