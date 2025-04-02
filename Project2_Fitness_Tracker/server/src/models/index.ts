import sequelize from '../config/connection.js'
import { UserFactory } from './user.js';
import { MilestoneFactory } from './badges.js';

const User = UserFactory(sequelize);
const Milestone = MilestoneFactory(sequelize);

// Set up associations
User.hasMany(Milestone);
Milestone.belongsTo(User);

export { sequelize, User, Milestone };
