import Auth from '../utils/auth';

export interface FitnessData {
  cardio: number;
  weights: number;
  calories: number;
}

export const saveFitnessData = async (userId: number, data: FitnessData) => {
  try {
    // Ensure we have a token
    const token = Auth.getToken();
    if (!token) {
      throw new Error('Authentication token is missing. Please log in again.');
    }

    console.log('Sending fitness data:', data);
    console.log('Token:', token ? 'Present' : 'Missing');

    const response = await fetch('/api/fitness', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data) // userId is now extracted from token
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Server response:', errorText);
      
      try {
        // Try to parse the error as JSON
        const errorJson = JSON.parse(errorText);
        throw new Error(errorJson.message || 'Failed to save fitness data');
      } catch (parseError) {
        // If parsing fails, use the raw text
        throw new Error(`Failed to save fitness data: ${errorText}`);
      }
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error saving fitness data:', error);
    throw error;
  }
};

export const getUserFitnessData = async (userId: number) => {
  try {
    const token = Auth.getToken();
    if (!token) {
      throw new Error('Authentication token is missing');
    }

    const response = await fetch(`/api/fitness/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error fetching fitness data:', errorText);
      throw new Error('Failed to fetch fitness data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching fitness data:', error);
    return {
      latest: { cardio: 0, weights: 0, calories: 0 },
      totals: { totalCardio: 0, totalWeights: 0, totalCalories: 0 }
    };
  }
};
