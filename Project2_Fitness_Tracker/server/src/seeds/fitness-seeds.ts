import { Fitness, Milestone } from '../models/index.js';

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
  
  const badgeData = [
    // User 1 badges - mix of levels
    // Bronze badges (Level 1)
    {
      userId: 1,
      milestone: 'cardio_milestone',
      achieved: true,
      badgeCategory: 'cardio',
      badgeLevel: 1  // Bronze - 5km
    },
    {
      userId: 1,
      milestone: 'weights_milestone',
      achieved: true,
      badgeCategory: 'weights',
      badgeLevel: 2  // Silver - 250lbs
    },
    {
      userId: 1,
      milestone: 'calories_milestone',
      achieved: true,
      badgeCategory: 'calories',
      badgeLevel: 1  // Bronze - 500 calories
    },
    
    // User 2 badges - higher in cardio
    {
      userId: 2,
      milestone: 'cardio_milestone',
      achieved: true,
      badgeCategory: 'cardio',
      badgeLevel: 2  // Silver - 15km
    },
    {
      userId: 2,
      milestone: 'weights_milestone',
      achieved: true, 
      badgeCategory: 'weights',
      badgeLevel: 1  // Bronze - 100lbs
    },
    {
      userId: 2,
      milestone: 'calories_milestone',
      achieved: true,
      badgeCategory: 'calories',
      badgeLevel: 2  // Silver - 1500 calories
    },
    
    // User 3 badges - gold in one category
    {
      userId: 3,
      milestone: 'cardio_milestone',
      achieved: true,
      badgeCategory: 'cardio',
      badgeLevel: 3  // Gold - 30km
    },
    {
      userId: 3,
      milestone: 'weights_milestone',
      achieved: true,
      badgeCategory: 'weights',
      badgeLevel: 1  // Bronze - 100lbs
    },
    {
      userId: 3,
      milestone: 'calories_milestone',
      achieved: true,
      badgeCategory: 'calories',
      badgeLevel: 3  // Gold - 3000 calories
    }
  ];

  await Milestone.bulkCreate(badgeData as any, {
    fields: ['userId', 'milestone', 'achieved', 'badgeCategory', 'badgeLevel']
  });
};
