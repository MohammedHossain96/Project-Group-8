import { Router } from 'express';
import authRoutes from './auth-routes.js';
import { userRouter } from './api/user-routes.js';

const router = Router();

// Add routes
router.use('/auth', authRoutes);
router.use('/api/users', userRouter);

export default router;
