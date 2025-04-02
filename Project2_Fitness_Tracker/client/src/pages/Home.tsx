import { useState } from 'react';
import Auth from '../utils/auth';

const Home = () => {
  const [steps, setSteps] = useState(0);
  const [workoutLog, setWorkoutLog] = useState('');
  const [calories, setCalories] = useState({
    goal: 2000,
    consumed: 1200,
    remaining: 800
  });
  const [showFoodForm, setShowFoodForm] = useState(false);
  const [foodItem, setFoodItem] = useState({
    name: '',
    calories: 0
  });

  const handleAddStep = () => {
    setSteps(currentSteps => currentSteps + 1);
  };

  const handleSaveLog = () => {
    if (!workoutLog.trim()) {
      alert('Please enter a workout log before saving.');
      return;
    }
    // In a real app, this would save to the database
    alert(`Workout log saved: ${workoutLog}`);
    // Clear the textarea after saving
    setWorkoutLog('');
  };

  const handleAddFood = () => {
    setShowFoodForm(true);
  };

  const handleFoodSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!foodItem.name || foodItem.calories <= 0) {
      alert('Please enter a valid food name and calorie amount.');
      return;
    }
    
    // Update calories consumed and remaining
    const newConsumed = calories.consumed + foodItem.calories;
    const newRemaining = calories.goal - newConsumed;
    
    setCalories({
      ...calories,
      consumed: newConsumed,
      remaining: newRemaining
    });
    
    // Reset form
    setFoodItem({ name: '', calories: 0 });
    setShowFoodForm(false);
    
    alert(`Added ${foodItem.name} (${foodItem.calories} calories)`);
  };

  const handleCancelFood = () => {
    setShowFoodForm(false);
    setFoodItem({ name: '', calories: 0 });
  };

  return (
    <div className="container">
      <h1 className="left-align" style={{ marginTop: '30px', marginBottom: '30px', width: '100%', textAlign: 'left' }}>Fitness Tracker</h1>

      <div className="row">
        <div className="col s12 m6">
          <div className="card">
            <div className="card-content">
              <span className="card-title">Steps Today</span>
              <p className="flow-text">{steps}</p>
              <button className="btn" onClick={handleAddStep}>Add Step</button>
            </div>
          </div>
        </div>

        <div className="col s12 m6">
          <div className="card">
            <div className="card-content">
              <span className="card-title">Workout Log</span>
              <textarea 
                className="materialize-textarea" 
                placeholder="Log your workouts here..."
                value={workoutLog}
                onChange={(e) => setWorkoutLog(e.target.value)}
              ></textarea>
              <button className="btn green" onClick={handleSaveLog}>Save Log</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col s12">
          <div className="card">
            <div className="card-content">
              <span className="card-title">Calorie Tracker</span>
              
              {!showFoodForm ? (
                <div className="row">
                  <div className="col s12 m6">
                    <p>Daily Goal: {calories.goal.toLocaleString()} calories</p>
                    <p>Consumed: {calories.consumed.toLocaleString()} calories</p>
                    <p>Remaining: {calories.remaining.toLocaleString()} calories</p>
                  </div>
                  <div className="col s12 m6" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                    <button className="btn blue" onClick={handleAddFood}>Add Food</button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFoodSubmit}>
                  <div className="row">
                    <div className="col s12 m6">
                      <div className="input-field">
                        <label htmlFor="foodName">Food Name</label>
                        <input 
                          type="text" 
                          id="foodName"
                          value={foodItem.name}
                          onChange={(e) => setFoodItem({...foodItem, name: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    <div className="col s12 m6">
                      <div className="input-field">
                        <label htmlFor="foodCalories">Calories</label>
                        <input 
                          type="number" 
                          id="foodCalories"
                          value={foodItem.calories || ''}
                          onChange={(e) => setFoodItem({...foodItem, calories: parseInt(e.target.value) || 0})}
                          required
                          min="1"
                        />
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                    <button type="button" className="btn red" onClick={handleCancelFood}>Cancel</button>
                    <button type="submit" className="btn green">Add</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {!Auth.loggedIn() && (
        <div className="card">
          <div className="card-content">
            <span className="card-title">Get More Features</span>
            <p>Sign up or log in to track your progress over time and access more features!</p>
            <div>
              <a href="/login" className="btn">Login</a>
              <a href="/signup" className="btn" style={{ marginLeft: '10px' }}>Sign Up</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
