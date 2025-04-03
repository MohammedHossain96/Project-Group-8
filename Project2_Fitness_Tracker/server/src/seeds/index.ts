import { seedUsers } from './user-seeds.js';
import { seedBadges } from './badge-seeds.js';
import { seedFitness } from './fitness-seeds.js';
import { sequelize } from '../models/index.js';

const seedAll = async (): Promise<void> => {
  try {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    
    await seedUsers();
    console.log('\n----- USERS SEEDED -----\n');
    
    await seedBadges();
    console.log('\n----- BADGE MILESTONES SEEDED -----\n');
    
    await seedFitness();
    console.log('\n----- FITNESS DATA SEEDED -----\n');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedAll();
