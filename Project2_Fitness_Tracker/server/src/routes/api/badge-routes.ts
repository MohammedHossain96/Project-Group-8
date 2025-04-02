import { Router } from 'express';
import { Milestone, awardBadge } from '../../models/badges.js';

const router = Router();

router.get('/:userId', async (req, res) => {
  try {
    const milestones = await Milestone.findAll({
      where: { userId: req.params.userId }
    });
    res.json(milestones);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch badges' });
  }
});

router.post('/check', async (req, res) => {
  const { userId, milestoneName, badgeCategory, inputValue } = req.body;
  try {
    const result = await awardBadge(userId, milestoneName, badgeCategory, inputValue);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Failed to check badge' });
  }
});

export { router as badgeRouter };
