import { useState, FormEvent } from 'react';
import { checkAndAwardBadge } from '../api/badgeAPI';
import BadgeModal from './BadgeModal';
import Auth from '../utils/auth';

interface FitnessFormData {
  cardio: number;
  weights: number;
  calories: number;
}

const FitnessForm = () => {
  const [formData, setFormData] = useState<FitnessFormData>({
    cardio: 0,
    weights: 0,
    calories: 0
  });

  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [badgeInfo, setBadgeInfo] = useState({ level: 0, category: '' });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const user = Auth.getProfile();
    
    if (!user) return;

    // Check for badges in each category
    const categories: Array<'cardio' | 'weights' | 'calories'> = ['cardio', 'weights', 'calories'];
    
    for (const category of categories) {
      const value = formData[category];
      const result = await checkAndAwardBadge({
        userId: parseInt(user.id),
        milestoneName: `${category}_milestone`,
        badgeCategory: category,
        inputValue: value
      });

      if (result && result.newBadge) {
        setBadgeInfo({ level: result.badgeLevel, category });
        setShowBadgeModal(true);
        break; // Show only one badge at a time
      }
    }

    // Reset form
    setFormData({ cardio: 0, weights: 0, calories: 0 });
  };

  return (
    <div className="card">
      <div className="card-content">
        <h2>Track Your Fitness</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="cardio">Cardio (kilometers)</label>
            <input
              type="number"
              id="cardio"
              value={formData.cardio}
              onChange={(e) => setFormData({ ...formData, cardio: parseFloat(e.target.value) })}
              min="0"
              step="0.1"
            />
          </div>

          <div>
            <label htmlFor="weights">Weights (total lbs)</label>
            <input
              type="number"
              id="weights"
              value={formData.weights}
              onChange={(e) => setFormData({ ...formData, weights: parseFloat(e.target.value) })}
              min="0"
              step="0.5"
            />
          </div>

          <div>
            <label htmlFor="calories">Calories Burned</label>
            <input
              type="number"
              id="calories"
              value={formData.calories}
              onChange={(e) => setFormData({ ...formData, calories: parseInt(e.target.value) })}
              min="0"
            />
          </div>

          <button type="submit" className="btn green">Submit</button>
        </form>
      </div>

      <BadgeModal
        isOpen={showBadgeModal}
        onClose={() => setShowBadgeModal(false)}
        badgeLevel={badgeInfo.level}
        category={badgeInfo.category}
      />
    </div>
  );
};

export default FitnessForm;
