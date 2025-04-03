import { useState } from 'react';

// Array of fitness tips to display
const fitnessTips = [
  "Try to get at least 150 minutes of moderate aerobic activity or 75 minutes of vigorous activity each week.",
  "Stay hydrated! Drink water before, during, and after your workout.",
  "Include strength training exercises at least twice per week.",
  "Don't forget to warm up before and cool down after your workout.",
  "Listen to your body and take rest days when needed.",
  "Setting small, achievable goals helps maintain motivation.",
  "Track your progress to see how far you've come.",
  "Mix up your routine to prevent boredom and plateau.",
];

const TipsCard = () => {
  const [currentTip, setCurrentTip] = useState(0);
  
  // Function to show the next tip
  const nextTip = () => {
    setCurrentTip((prev) => (prev + 1) % fitnessTips.length);
  };
  
  return (
    <div className="card tips-card">
      <div className="card-content">
        <h2>Fitness Tip</h2>
        <div className="tip-content">
          <p>{fitnessTips[currentTip]}</p>
        </div>
        <button className="btn-small" onClick={nextTip}>Next Tip</button>
      </div>
    </div>
  );
};

export default TipsCard;
