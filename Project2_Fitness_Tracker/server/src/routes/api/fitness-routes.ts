import { Router, Request, Response } from 'express';
import { Fitness } from '../../models/index.js';
import sequelize from '../../config/connection.js';

const router = Router();

// Get all fitness data for a user
router.get('/:userId', async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    
    // Get the latest fitness entry for the user
    const latestFitness = await Fitness.findOne({
      where: { userId },
      order: [['date', 'DESC']]
    });
    
    // Get totals for the user
    const totals = await Fitness.findAll({
      where: { userId },
      attributes: [
        [sequelize.fn('SUM', sequelize.col('cardio')), 'totalCardio'],
        [sequelize.fn('SUM', sequelize.col('weights')), 'totalWeights'],
        [sequelize.fn('SUM', sequelize.col('calories')), 'totalCalories']
      ],
      raw: true
    });
    
    const result = {
      latest: latestFitness || { cardio: 0, weights: 0, calories: 0 },
      totals: totals[0] || { totalCardio: 0, totalWeights: 0, totalCalories: 0 }
    };
    
    res.json(result);
  } catch (error) {
    console.error('Error fetching fitness data:', error);
    res.status(500).json({ message: 'Failed to fetch fitness data' });
  }
});

// Add new fitness data for a user
router.post('/', async (req: Request, res: Response) => {
  try {
    // Log the request for debugging
    console.log('Request body:', req.body);
    console.log('Token user:', req.user);

    // Get user ID from the token
    const userId = req.user?.id;

    if (!userId) {
      console.error('User ID missing from token');
      return res.status(400).json({ message: 'User ID is required' });
    }

    const { cardio, weights, calories } = req.body;
    
    console.log('Creating fitness entry with:', { userId, cardio, weights, calories });
    
    const newFitnessEntry = await Fitness.create({
      userId,
      cardio,
      weights,
      calories,
      date: new Date()
    });
    
    return res.status(201).json({ 
      message: 'Fitness data added successfully', 
      data: newFitnessEntry 
    });
    
  } catch (error) {
    console.error('Error adding fitness data:', error);
    return res.status(500).json({ message: 'Failed to add fitness data' });
  }
});

export { router as fitnessRouter };
