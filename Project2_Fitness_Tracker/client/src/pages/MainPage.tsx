import { useState, useEffect } from 'react';
import FitnessForm from '../components/FitnessForm';
import Badge from '../components/Badge';
import { getUserBadges } from '../api/badgeAPI';
import Auth from '../utils/auth';

const MainPage = () => {
  const [playlists, setPlaylists] = useState<{ name: string; url: string }[]>([]);
  const [fitnessData, setFitnessData] = useState({
    steps: 0,
    cardio: 0,
    weightLifting: 0,
  });
  const [userBadges, setUserBadges] = useState<any[]>([]); // Specify type
  const [username, setUsername] = useState<string | null>(null);

  // Fetch user info, playlists, fitness data, and badges
  useEffect(() => {
    // Fetch Username
    const profile = Auth.getProfile();
    if (profile && profile.username) { // Access profile.username directly
      setUsername(profile.username);
    } else {
       console.log("Could not find username in profile data.");
    }

    // Fetch Playlists
    const fetchPlaylists = async () => {
      try {
        const response = await fetch('/api/playlists'); // Replace with your playlists API endpoint
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setPlaylists(data);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    // Fetch Fitness Data
    const fetchFitnessData = async () => {
      try {
        const response = await fetch('/api/fitness'); // Replace with your fitness API endpoint
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setFitnessData(data);
      } catch (error) {
        console.error('Error fetching fitness data:', error);
      }
    };

    // Fetch Badges
    const fetchBadges = async () => {
      if (profile && profile.id) { // Access profile.id directly
        try {
            // Ensure ID is parsed correctly as a number
            const userId = typeof profile.id === 'string' ? parseInt(profile.id, 10) : profile.id;
            if (!isNaN(userId)) {
                const badges = await getUserBadges(userId);
                setUserBadges(badges);
            } else {
                console.error('Invalid User ID format:', profile.id);
                setUserBadges([]);
            }
        } catch (error) {
            console.error('Error fetching user badges:', error);
            setUserBadges([]); // Set to empty array on error
        }
      } else {
          console.log('User ID not found for fetching badges.');
          setUserBadges([]);
      }
    };

    fetchPlaylists();
    fetchFitnessData();
    fetchBadges();

  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="main-container">
      {/* Main content */}
      <div className="main-content">
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
                  {Array.isArray(userBadges) && userBadges.length > 0 ? (
                    userBadges.map((badge, index) => (
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

        {/* Fitness Data Section */}
        <div className="card">
          <div className="card-content">
              <h2>Fitness Data</h2>
              <p><strong>Steps:</strong> {fitnessData.steps}</p>
              <p><strong>Cardio (minutes):</strong> {fitnessData.cardio}</p>
              <p><strong>Weight Lifting (sets):</strong> {fitnessData.weightLifting}</p>
          </div>
        </div>

        {/* Music Playlists Section */}
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