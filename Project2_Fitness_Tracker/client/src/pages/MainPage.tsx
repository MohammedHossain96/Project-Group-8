import { useState, useEffect } from 'react';
<<<<<<< HEAD
import FitnessForm from '../components/FitnessForm';
import Badge from '../components/Badge';
import { getUserBadges } from '../api/badgeAPI';
import Auth from '../utils/auth';
=======
import Weather from '../components/Weather'; // Import the Weather component
>>>>>>> b17ba4c5b6cc3b83d51216162a72f2ca6ea62c3b

const MainPage = () => {
  const [playlists, setPlaylists] = useState<{ name: string; url: string }[]>([]);
  const [fitnessData, setFitnessData] = useState({
    steps: 0,
    cardio: 0,
    weightLifting: 0,
  });
  const [userBadges, setUserBadges] = useState([]);

  // Fetch music playlists
  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch('/api/playlists'); // Replace with your playlists API endpoint
        const data = await response.json();
        setPlaylists(data);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    fetchPlaylists();
  }, []);

  // Fetch fitness data
  useEffect(() => {
    const fetchFitnessData = async () => {
      try {
        const response = await fetch('/api/fitness'); // Replace with your fitness API endpoint
        const data = await response.json();
        setFitnessData(data);
      } catch (error) {
        console.error('Error fetching fitness data:', error);
      }
    };

    fetchFitnessData();
  }, []);

  useEffect(() => {
    const fetchBadges = async () => {
      const user = Auth.getProfile();
      if (user) {
        const badges = await getUserBadges(parseInt(user.id));
        setUserBadges(badges);
      }
    };

    fetchBadges();
  }, []);

  return (
    <div className="container">
      <h1>Fitness Tracker Dashboard</h1>

      <div className="row">
        <div className="col s12 m6">
          <FitnessForm />
        </div>
        <div className="col s12 m6">
          <div className="card">
            <div className="card-content">
              <h2>Your Badges</h2>
              <div className="badge-container">
                {userBadges.map((badge, index) => (
                  <Badge
                    key={index}
                    category={badge.badgeCategory}
                    level={badge.badgeLevel}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fitness Data Section */}
      <div className="card">
        <h2>Fitness Data</h2>
        <p><strong>Steps:</strong> {fitnessData.steps}</p>
        <p><strong>Cardio (minutes):</strong> {fitnessData.cardio}</p>
        <p><strong>Weight Lifting (sets):</strong> {fitnessData.weightLifting}</p>
      </div>

      {/* Weather Info Section */}
      <div className="card">
        <h2>Weather Info</h2>
        <Weather /> {/* Use the Weather component */}
      </div>

      {/* Music Playlists Section */}
      <div className="card">
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
  );
};

export default MainPage;