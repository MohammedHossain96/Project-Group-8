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

  return (
    <div className={`badge ${animate ? 'badge-animate' : ''}`}>
      <span className="badge-medal">{getMedal(level)}</span>
      <span className="badge-category">{category}</span>
    </div>
  );
};

export default Badge;
