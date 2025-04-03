import { useState, useEffect } from 'react';
import FitnessForm from '../components/FitnessForm';
import Badge from '../components/Badge';
import { getUserBadges } from '../api/badgeAPI';
import { getUserFitnessData } from '../api/fitnessAPI';
import Auth from '../utils/auth';

const MainPage = () => {
  const [playlists, setPlaylists] = useState<{ name: string; url: string }[]>([]);
  const [fitnessData, setFitnessData] = useState({
    latest: { cardio: 0, weights: 0, calories: 0 },
    totals: { totalCardio: 0, totalWeights: 0, totalCalories: 0 }
  });
  const [userBadges, setUserBadges] = useState<any[]>([]);
  const [username, setUsername] = useState<string | null>(null);

  const refreshData = async () => {
    const profile = Auth.getProfile();
    if (profile && profile.id) {
      try {
        const userId = typeof profile.id === 'string' ? parseInt(profile.id, 10) : profile.id;
        if (!isNaN(userId)) {
          const data = await getUserFitnessData(userId);
          setFitnessData(data);
          
          const badges = await getUserBadges(userId);
          setUserBadges(badges);
        }
      } catch (error) {
        console.error('Error refreshing data:', error);
      }
    }
  };

  useEffect(() => {
    const profile = Auth.getProfile();
    if (profile && profile.username) {
      setUsername(profile.username);
    } else {
       console.log("Could not find username in profile data.");
    }

    const fetchPlaylists = async () => {
      try {
        const response = await fetch('/api/playlists');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setPlaylists(data);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    fetchPlaylists();
    refreshData();
  }, []);

  return (
    <div className="main-container">
      <div className="main-content">
        <h1>Fitness Tracker Dashboard</h1>

        <div className="row">
          <div className="col s12 m6">
            <FitnessForm onFormSubmit={refreshData} />
          </div>
          <div className="col s12 m6">
            <div className="card">
              <div className="card-content">
                <h2>Your Badges</h2>
                <div className="badge-container">
                  {Array.isArray(userBadges) && userBadges.length > 0 ? (
                    // Filter out badges with level 0 before mapping
                    userBadges
                      .filter(badge => badge.badgeLevel > 0)
                      .map((badge, index) => (
                        <Badge
                          key={index}
                          category={badge.badgeCategory}
                          level={badge.badgeLevel}
                        />
                      ))
                  ) : (
                    <p>No badges earned yet.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
              <h2>Fitness Data</h2>
              <div className="row">
                <div className="col s12 m6">
                  <h3>Latest Workout</h3>
                  <p><strong>Cardio:</strong> {fitnessData.latest.cardio} km</p>
                  <p><strong>Weights:</strong> {fitnessData.latest.weights} lbs</p>
                  <p><strong>Calories:</strong> {fitnessData.latest.calories}</p>
                </div>
                <div className="col s12 m6">
                  <h3>Overall Stats</h3>
                  <p><strong>Total Cardio:</strong> {fitnessData.totals.totalCardio || 0} km</p>
                  <p><strong>Total Weight Lifted:</strong> {fitnessData.totals.totalWeights || 0} lbs</p>
                  <p><strong>Total Calories Burned:</strong> {fitnessData.totals.totalCalories || 0}</p>
                </div>
              </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content">
              <h2>Music Playlists</h2>
              {playlists.length > 0 ? (
                <ul>
                  {playlists.map((playlist, index) => (
                    <li key={index}>
                      <a href={playlist.url} target="_blank" rel="noopener noreferrer">
                        {playlist.name}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Loading playlists...</p>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;