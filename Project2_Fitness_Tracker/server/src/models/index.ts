import sequelize from '../config/connection.js'
import { UserFactory } from './user.js';
import { MilestoneFactory } from './badges.js';
import { FitnessFactory } from './fitness.js';

const User = UserFactory(sequelize);
const Milestone = MilestoneFactory(sequelize);
const Fitness = FitnessFactory(sequelize);

// Set up associations
User.hasMany(Milestone);
Milestone.belongsTo(User);

User.hasMany(Fitness);
Fitness.belongsTo(User);

export { sequelize, User, Milestone, Fitness };
