import React from 'react';

interface ProgressChartProps {
  category: string;
  current: number;
  total: number;
  unit: string;
  nextMilestone?: number;
}

const ProgressChart: React.FC<ProgressChartProps> = ({ 
  category, 
  current, 
  total, 
  unit,
  nextMilestone 
}) => {
  // Calculate percentage for progress bar
  const getPercentage = () => {
    if (!nextMilestone) return 100;
    const progress = (current / nextMilestone) * 100;
    return Math.min(progress, 100); // Cap at 100%
  };

  const percentage = getPercentage();

  return (
    <div className="progress-chart">
      <div className="progress-header">
        <span className="progress-title">{category}</span>
        <span className="progress-stats">
          {current} {unit} of {total} {unit} total
        </span>
      </div>
      
      <div className="progress-bar-container">
        <div 
          className="progress-bar" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      
      {nextMilestone && (
        <div className="next-milestone">
          <span>Next milestone: {nextMilestone} {unit}</span>
          <span>{Math.round(percentage)}% complete</span>
        </div>
      )}
    </div>
  );
};

export default ProgressChart;
