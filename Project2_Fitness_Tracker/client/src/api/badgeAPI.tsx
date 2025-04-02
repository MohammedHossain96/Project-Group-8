import Auth from '../utils/auth';

export interface BadgeCheck {
  userId: number;
  milestoneName: string;
  badgeCategory: 'cardio' | 'weights' | 'calories';
  inputValue: number;
}

export const getUserBadges = async (userId: number) => {
  try {
    const response = await fetch(`/api/badges/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      }
    });
    if (!response.ok) throw new Error('Failed to fetch badges');
    return await response.json();
  } catch (err) {
    console.error('Error fetching badges:', err);
    return [];
  }
};

export const checkAndAwardBadge = async (badgeData: BadgeCheck) => {
  try {
    const response = await fetch('/api/badges/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify(badgeData)
    });
    if (!response.ok) throw new Error('Failed to check badge');
    return await response.json();
  } catch (err) {
    console.error('Error checking badge:', err);
    return null;
  }
};
