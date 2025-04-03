import { Milestone } from '../models/badges.js';

export const seedBadges = async () => {
  // Define the categories
  const categories: Array<'cardio' | 'weights' | 'calories'> = ['cardio', 'weights', 'calories'];
  
  // Get all users (we'll create initial badge milestones for each user with IDs 1-3)
  for (let userId = 1; userId <= 3; userId++) {
    // For each category, create an initial milestone record
    for (const category of categories) {
      await Milestone.create({
        userId,
        milestone: `${category}_milestone`,
        achieved: false,
        badgeCategory: category,
        badgeLevel: 0 // Starting with no badge earned
      });
    }
  }

  console.log('Badge milestones created for all users');
};
