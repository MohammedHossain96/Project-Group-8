import { Fitness } from '../models/index.js';

export const seedFitness = async () => {
  // Create some initial fitness data for users 1-3
  const fitnessData = [
    // User 1
    {
      userId: 1,
      cardio: 3.5,
      weights: 85,
      calories: 320,
      date: new Date(2023, 5, 1) // June 1, 2023
    },
    {
      userId: 1,
      cardio: 4.2,
      weights: 95,
      calories: 380,
      date: new Date(2023, 5, 3) // June 3, 2023
    },
    // User 2
    {
      userId: 2,
      cardio: 2.8,
      weights: 65,
      calories: 280,
      date: new Date(2023, 5, 2) // June 2, 2023
    },
    // User 3
    {
      userId: 3,
      cardio: 5.1,
      weights: 120,
      calories: 450,
      date: new Date(2023, 5, 1) // June 1, 2023
    }
  ];

  await Fitness.bulkCreate(fitnessData);
  console.log('Fitness data seeded successfully');
};
