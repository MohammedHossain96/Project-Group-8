import { DataTypes, Model } from 'sequelize';
import { User } from './user.js'; // Import user for IDs
// Define the Milestone model with attributes
export class Milestone extends Model {
}
// Factory function to initialize the Milestone model
export function MilestoneFactory(sequelize) {
    Milestone.init({
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
    }, {
        tableName: 'milestones', // Database table name
        sequelize, // Pass the Sequelize instance
    });
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
function determineBadgeLevel(category, value) {
    const milestones = category === 'cardio' ? cardioMilestones : category === 'weights' ? weightMilestones : calorieMilestones;
    if (value >= milestones[3])
        return 3; // Gold medal
    if (value >= milestones[2])
        return 2; // Silver medal
    if (value >= milestones[1])
        return 1; // Bronze medal
    return 0; // No badge
}
// Function to show a pop-up with the awarded badge
function showBadgePopup(badgeLevel) {
    const medals = ['', '🥉', '🥈', '🥇']; // No badge, Bronze, Silver, Gold medals
    if (badgeLevel > 0) {
        alert(`Congratulations! You've earned a ${medals[badgeLevel]} milestone badge!`);
    }
}
// Function to check and award a badge when a milestone is achieved
export async function awardBadge(userId, milestoneName, badgeCategory, inputValue) {
    const badgeLevel = determineBadgeLevel(badgeCategory, inputValue); // Determine badge level based on input
    // Find the milestone by user ID, name, and category
    const milestone = await Milestone.findOne({ where: { userId, milestone: milestoneName, badgeCategory } });
    // If the milestone exists and badge level can be upgraded, update it
    if (milestone && milestone.badgeLevel < badgeLevel) {
        milestone.achieved = badgeLevel > 0; // Mark as achieved only if badge level is greater than 0
        milestone.badgeLevel = badgeLevel; // Update badge level
        await milestone.save(); // Save changes to the database
        showBadgePopup(badgeLevel); // Show pop-up notification with the earned medal
        console.log(`User ${userId} has achieved '${milestoneName}' in category '${badgeCategory}' and earned badge level ${badgeLevel}.`);
    }
}
// Function to check a user's current badges
export async function checkUserBadges(userId) {
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
