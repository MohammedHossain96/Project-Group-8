import { useState, FormEvent } from 'react';
import { checkAndAwardBadge } from '../api/badgeAPI';
import { saveFitnessData } from '../api/fitnessAPI';
import BadgeModal from './BadgeModal';
import Auth from '../utils/auth'; 

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
    cardio: '',
    weights: '',
    calories: ''
  });

  const [showBadgeModal, setShowBadgeModal] = useState(false);
  const [earnedBadges, setEarnedBadges] = useState<Array<{badgeLevel: number, category: string}>>([]);

  const handleFocus = (field: keyof FitnessFormData) => {
    if (formData[field] ) {
      setFormData({ ...formData, [field]: '' });
    }
  };


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const user = Auth.getProfile();
    
    if (!user) return;

    try {
      // Convert any empty strings to 0 before submitting
      const submissionData = {
        cardio: formData.cardio === '' ? 0 : Number(formData.cardio),
        weights: formData.weights === '' ? 0 : Number(formData.weights),
        calories: formData.calories === '' ? 0 : Number(formData.calories)
      };
      
      // Log the data being submitted
      console.log('Submitting fitness data:', submissionData);
      
      // Save fitness data
      const userId = typeof user.id === 'string' ? parseInt(user.id) : user.id;
      await saveFitnessData(userId, submissionData);
      
      // Check for badges in each category
      const categories: Array<'cardio' | 'weights' | 'calories'> = ['cardio', 'weights', 'calories'];
      const newBadges: Array<{badgeLevel: number, category: string}> = [];
      
      for (const category of categories) {
        const value = submissionData[category];
        console.log(`Checking badge for ${category}:`, value);
        
        const result = await checkAndAwardBadge({
          userId: userId,
          milestoneName: `${category}_milestone`,
          badgeCategory: category,
          inputValue: value
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

      // Always notify parent to refresh data AFTER we've processed badges
      setTimeout(() => {
        onFormSubmit();
      }, 100);

      // Reset form
      setFormData({ cardio: '', weights: '', calories: '' });
    } catch (error) {
      console.error('Error submitting fitness data:', error);
    }
  };

  return (
    <div className="card">
      <div className="card-content">
        <h2>Track Your Fitness</h2>
        <p className="form-instructions">Record your latest workout achievements below. Your progress will update automatically.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="input-field">
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
              
              min="0"
              step="0.1"
            />
            <small className="helper-text">Distance you've run, walked, cycled, etc.</small>
          </div>

          <div className="input-field">
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
              
              min="0"
              step="0.5"
            />
            <small className="helper-text">Total weight lifted during your workout</small>
          </div>

          <div className="input-field">
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
            
              min="0"
            />
            <small className="helper-text">Estimated calories burned during exercise</small>
          </div>

          <button type="submit" className="btn green">Save Workout</button>
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
