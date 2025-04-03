import { useState, FormEvent } from 'react';
import { checkAndAwardBadge } from '../api/badgeAPI';
import { saveFitnessData } from '../api/fitnessAPI';
import BadgeModal from './BadgeModal';
import Auth from '../utils/auth'; // Fixed import path

interface FitnessFormData {
  cardio: number | '';
  weights: number | '';
  calories: number | '';
}

interface FitnessFormProps {
  onFormSubmit: () => void;  // Callback to notify parent component to refresh data
}

const FitnessForm = ({ onFormSubmit }: FitnessFormProps) => {
  const [formData, setFormData] = useState<FitnessFormData>({
    cardio: 0,
    weights: 0,
    calories: 0
  });

  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [earnedBadges, setEarnedBadges] = useState<Array<{badgeLevel: number, category: string}>>([]);

  const handleFocus = (field: keyof FitnessFormData) => {
    if (formData[field] === 0) {
      setFormData({ ...formData, [field]: '' });
    }
  };

  const handleBlur = (field: keyof FitnessFormData) => {
    if (formData[field] === '') {
      setFormData({ ...formData, [field]: 0 });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const user = Auth.getProfile();
    
    if (!user) return;

    try {
      // Convert any empty strings to 0 before submitting
      const submissionData = {
        cardio: formData.cardio === '' ? 0 : formData.cardio,
        weights: formData.weights === '' ? 0 : formData.weights,
        calories: formData.calories === '' ? 0 : formData.calories
      };
      
      // Log the data being submitted
      console.log('Submitting fitness data:', submissionData);
      
      // Save fitness data
      const userId = typeof user.id === 'string' ? parseInt(user.id) : user.id;
      await saveFitnessData(userId, submissionData);
      
      // Notify parent component to refresh data
      onFormSubmit();

      // Check for badges in each category
      const categories: Array<'cardio' | 'weights' | 'calories'> = ['cardio', 'weights', 'calories'];
      const newBadges: Array<{badgeLevel: number, category: string}> = [];
      
      for (const category of categories) {
        console.log(`Checking badge for ${category}:`, submissionData[category]);
        
        const result = await checkAndAwardBadge({
          userId: typeof user.id === 'string' ? parseInt(user.id) : user.id,
          milestoneName: `${category}_milestone`,
          badgeCategory: category,
          inputValue: submissionData[category] as number
        });

        console.log(`Badge check result for ${category}:`, result);

        if (result && result.newBadge) {
          newBadges.push({ 
            badgeLevel: result.badgeLevel, 
            category 
          });
        }
      }

      // If any badges were earned, show the modal
      if (newBadges.length > 0) {
        setEarnedBadges(newBadges);
        setShowBadgeModal(true);
      }

      // Reset form
      setFormData({ cardio: 0, weights: 0, calories: 0 });
    } catch (error) {
      console.error('Error submitting fitness data:', error);
    }
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
              onChange={(e) => {
                const value = e.target.value === '' ? '' : parseFloat(e.target.value);
                setFormData({ ...formData, cardio: value });
              }}
              onFocus={() => handleFocus('cardio')}
              onBlur={() => handleBlur('cardio')}
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
              onChange={(e) => {
                const value = e.target.value === '' ? '' : parseFloat(e.target.value);
                setFormData({ ...formData, weights: value });
              }}
              onFocus={() => handleFocus('weights')}
              onBlur={() => handleBlur('weights')}
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
              onChange={(e) => {
                const value = e.target.value === '' ? '' : parseInt(e.target.value);
                setFormData({ ...formData, calories: value });
              }}
              onFocus={() => handleFocus('calories')}
              onBlur={() => handleBlur('calories')}
              min="0"
            />
          </div>

          <button type="submit" className="btn green">Submit</button>
        </form>
      </div>

      <BadgeModal
        isOpen={showBadgeModal}
        onClose={() => setShowBadgeModal(false)}
        badges={earnedBadges}
      />
    </div>
  );
};

export default FitnessForm;
