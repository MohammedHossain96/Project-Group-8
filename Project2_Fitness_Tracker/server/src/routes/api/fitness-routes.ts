import { Router } from 'express';

const router = Router();

router.get('/', (_req, res) => {
  // Mock data - replace with actual database query later
  res.json({
    steps: 8000,
    cardio: 30,
    weightLifting: 12
  });
});

export { router as fitnessRouter };
