import Auth from '../utils/auth';

export interface BadgeCheck {
  userId: number;
  milestoneName: string;
  badgeCategory: 'cardio' | 'weights' | 'calories';
  inputValue: number;
}

export const getUserBadges = async (userId: number) => {
  try {
    console.log('Fetching badges for user:', userId);
    const response = await fetch(`/api/badges/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch badges');
    const data = await response.json();
    console.log('Received badges:', data);
    return data;
  } catch (err) {
    console.error('Error fetching badges:', err);
    return [];
  }
};

export const checkAndAwardBadge = async (badgeData: BadgeCheck) => {
  try {
    console.log('Checking badge with data:', badgeData);
    const response = await fetch('/api/badges/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify(badgeData)
    });
    if (!response.ok) throw new Error('Failed to check badge');
    const result = await response.json();
    console.log('Badge check response:', result);
    return result;
  } catch (err) {
    console.error('Error checking badge:', err);
    return null;
  }
};
