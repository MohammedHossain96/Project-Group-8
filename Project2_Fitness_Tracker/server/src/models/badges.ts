import { DataTypes, Sequelize, Model } from 'sequelize';
import { User } from './user.js'; // Import user for IDs

// Define the structure of a milestone
interface MilestoneAttributes {
  id?: number;
  userId: number; // Foreign key links the User model
  milestone: string; // The name of the milestone
  achieved: boolean; // Whether the milestone has been achieved
  badgeCategory: 'cardio' | 'weights' | 'calories'; // Category of the badge (cardio, weights, or calories)
  badgeLevel: number; // Numerical level of the badge for determining badge icon
}

// Define the Milestone model with attributes
export class Milestone extends Model<MilestoneAttributes> implements MilestoneAttributes {
  public id!: number;
  public userId!: number;
  public milestone!: string;
  public achieved!: boolean;
  public badgeCategory!: 'cardio' | 'weights' | 'calories';
  public badgeLevel!: number;
}

// Factory function to initialize the Milestone model
export function MilestoneFactory(sequelize: Sequelize): typeof Milestone {
  Milestone.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true, // Unique identifier for each milestone
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User, // Link to the User model
          key: 'id',
        },
      },
      milestone: {
        type: DataTypes.STRING,
        allowNull: false, // Milestone name is required
      },
      achieved: {
        type: DataTypes.BOOLEAN,
        defaultValue: false, // Default to not achieved
      },
      badgeCategory: {
        type: DataTypes.ENUM('cardio', 'weights', 'calories'),
        allowNull: false, // Must specify a category
      },
      badgeLevel: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0, // Default badge level starts at 0 (no badge)
      },
    },
    {
      tableName: 'milestones', // Database table name
      sequelize, // Pass the Sequelize instance
    }
  );

  return Milestone;
}

// Define separate milestone levels for cardio, weights, and calories, starting from 0 (no badge)
// cardioMilestones: 0, 5km, 15km, 30km
// weightMilestones: 0, 100lbs, 250lbs, 500lbs
// calorieMilestones: 0, 500cal, 1500cal, 3000cal
const cardioMilestones = [0, 5, 15, 30];
const weightMilestones = [0, 100, 250, 500];
const calorieMilestones = [0, 500, 1500, 3000];

// Function to determine milestone achievement based on category
function determineBadgeLevel(category: 'cardio' | 'weights' | 'calories', value: number): number {
  const milestones = category === 'cardio' ? cardioMilestones : category === 'weights' ? weightMilestones : calorieMilestones;
  if (value >= milestones[3]) return 3; // Gold medal
  if (value >= milestones[2]) return 2; // Silver medal
  if (value >= milestones[1]) return 1; // Bronze medal
  return 0; // No badge
}

// Function to show a pop-up with the awarded badge
function showBadgePopup(badgeLevel: number) {
  const medals = ['', '🥉', '🥈', '🥇']; // No badge, Bronze, Silver, Gold medals
  if (badgeLevel > 0) {
    alert(`Congratulations! You've earned a ${medals[badgeLevel]} milestone badge!`);
  }
}

// Function to check and award a badge when a milestone is achieved
export async function awardBadge(userId: number, milestoneName: string, badgeCategory: 'cardio' | 'weights' | 'calories', inputValue: number) {
  // Ensure inputValue is a number
  inputValue = Number(inputValue);
  
  console.log(`Checking badge for user ${userId}, category: ${badgeCategory}, value: ${inputValue}`);
  
  const badgeLevel = determineBadgeLevel(badgeCategory, inputValue); // Determine badge level based on input
  console.log(`Determined badge level: ${badgeLevel}`);
  
  // Find the milestone by user ID, name, and category
  const milestone = await Milestone.findOne({ where: { userId, milestone: milestoneName, badgeCategory } });
  console.log(`Existing milestone found: ${milestone ? 'yes' : 'no'}`);
  
  // If milestone doesn't exist, create it
  if (!milestone) {
    console.log(`Creating new milestone: ${milestoneName}, badge level: ${badgeLevel}`);
    const newMilestone = await Milestone.create({
      userId,
      milestone: milestoneName,
      achieved: badgeLevel > 0,
      badgeCategory,
      badgeLevel
    });
    
    return {
      newBadge: badgeLevel > 0,
      badgeLevel,
      milestone: newMilestone
    };
  }
  
  // If the milestone exists and badge level can be upgraded, update it
  if (milestone && milestone.badgeLevel < badgeLevel) {
    console.log(`Upgrading badge from level ${milestone.badgeLevel} to ${badgeLevel}`);
    const oldLevel = milestone.badgeLevel;
    milestone.achieved = badgeLevel > 0; // Mark as achieved only if badge level is greater than 0
    milestone.badgeLevel = badgeLevel; // Update badge level
    await milestone.save(); // Save changes to the database
    
    return {
      newBadge: true,
      badgeLevel,
      oldLevel,
      milestone
    };
  }
  
  console.log(`No badge upgrade needed. Current level: ${milestone?.badgeLevel || 0}`);
  // If no upgrade occurred
  return {
    newBadge: false,
    badgeLevel: milestone ? milestone.badgeLevel : 0
  };
}

// Function to check a user's current badges
export async function checkUserBadges(userId: number) {
  const milestones = await Milestone.findAll({ where: { userId } });
  if (milestones.length === 0) {
    console.log(`User ${userId} has no badges yet.`);
    return;
  }

  console.log(`User ${userId} badges:`);
  milestones.forEach((milestone) => {
    const medals = ['', '🥉', '🥈', '🥇']; // No badge, Bronze, Silver, Gold medals
    console.log(`Category: ${milestone.badgeCategory}, Milestone: ${milestone.milestone}, Badge: ${medals[milestone.badgeLevel] || 'No badge'}`);
  });
}
