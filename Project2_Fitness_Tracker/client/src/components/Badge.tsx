import { useState, useEffect } from 'react';

interface BadgeProps {
  category: 'cardio' | 'weights' | 'calories';
  level: number;
  isNew?: boolean;
}

const Badge = ({ category, level, isNew = false }: BadgeProps) => {
  const [animate, setAnimate] = useState(isNew);

  useEffect(() => {
    if (isNew) {
      const timer = setTimeout(() => setAnimate(false), 3000);
      return () => clearTimeout(timer);
    }
    return undefined; // Explicitly return undefined for the path when isNew is false
  }, [isNew]);

  const getMedal = (level: number) => {
    switch (level) {
      case 1: return '🥉';
      case 2: return '🥈';
      case 3: return '🥇';
      default: return '⭕';
    }
  };

  const getTooltip = () => {
    const milestones = {
      cardio: ['5km achieved', '15km achieved', '30km achieved'],
      weights: ['100lbs lifted', '250lbs lifted', '500lbs lifted'],
      calories: ['500 calories burned', '1500 calories burned', '3000 calories burned']
    };
    
    return level > 0 && level <= 3 
      ? milestones[category][level-1] 
      : 'Keep working to earn this badge!';
  };

  return (
    <div 
      className={`badge ${animate ? 'badge-animate' : ''}`}
      data-category={category}
      data-tooltip={getTooltip()}
    >
      <span className="badge-medal">{getMedal(level)}</span>
      <span className="badge-category">{category}</span>
    </div>
  );
};

export default Badge;
