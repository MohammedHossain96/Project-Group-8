import { useState, useEffect } from 'react';
import { getMe } from '../api/authAPI';
import Auth from '../utils/auth';

interface UserProfile {
  username: string;
  id: string;
  workouts?: Array<{
    date: string;
    type: string;
    duration: number;
  }>;
}

const Profile = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const token = Auth.getToken();
        
        if (!token) {
          setError('You need to be logged in to view this page');
          setLoading(false);
          return;
        }
        
        const userData = await getMe(token);
        setUserProfile(userData);
      } catch (err) {
        console.error('Failed to get user profile', err);
        setError('Failed to load profile data');
      } finally {
        setLoading(false);
      }
    };

    getUserProfile();
  }, []);

  // Redirect if not logged in
  if (!Auth.loggedIn()) {
    return (
      <div className="container">
        <div className="card">
          <div className="card-content">
            <span className="card-title">Please Login</span>
            <p>You need to be logged in to view your profile.</p>
            <a href="/login" className="btn">Go to Login</a>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container">
        <div className="card">
          <div className="card-content">
            <p>Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="card">
          <div className="card-content">
            <span className="card-title">Error</span>
            <p className="red-text">{error}</p>
            <button className="btn" onClick={() => Auth.logout()}>Logout</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <div className="card-content">
          <span className="card-title">Your Profile</span>
          <p><strong>Username:</strong> {userProfile?.username}</p>
          
          <div className="section">
            <h5>Fitness Stats</h5>
            <div className="row">
              <div className="col s12 m4">
                <div className="card blue-grey darken-1">
                  <div className="card-content white-text">
                    <span className="card-title">Weekly Steps</span>
                    <p className="flow-text">12,345</p>
                  </div>
                </div>
              </div>
              <div className="col s12 m4">
                <div className="card blue-grey darken-1">
                  <div className="card-content white-text">
                    <span className="card-title">Calories Burned</span>
                    <p className="flow-text">1,234</p>
                  </div>
                </div>
              </div>
              <div className="col s12 m4">
                <div className="card blue-grey darken-1">
                  <div className="card-content white-text">
                    <span className="card-title">Workouts</span>
                    <p className="flow-text">{userProfile?.workouts?.length || 0}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <button className="btn red" onClick={() => Auth.logout()}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
