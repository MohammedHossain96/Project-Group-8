import { Router } from 'express';
import { userRouter } from './user-routes.js';
import { badgeRouter } from './badge-routes.js';
import { fitnessRouter } from './fitness-routes.js';
import sequelize from '../../config/connection.js';

const router = Router();

router.use('/users', userRouter);
router.use('/badges', badgeRouter);
router.use('/fitness', fitnessRouter);

// Mock weather endpoint
router.get('/weather', (_req, res) => {
  res.json({
    location: 'New York',
    temperature: 22,
    condition: 'Sunny'
  });
});

// Mock playlists endpoint
router.get('/playlists', (_req, res) => {
  res.json([
    { name: 'Workout Mix', url: '#' },
    { name: 'Cardio Boost', url: '#' }
  ]);
});

export default router;
