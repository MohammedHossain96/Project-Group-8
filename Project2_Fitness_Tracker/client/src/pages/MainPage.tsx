import { useState, useEffect } from 'react';
import Weather from '../components/Weather'; // Import the Weather component

const MainPage = () => {
  const [playlists, setPlaylists] = useState<{ name: string; url: string }[]>([]);
  const [fitnessData, setFitnessData] = useState({
    steps: 0,
    cardio: 0,
    weightLifting: 0,
  });

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

  return (
    <div className="container">
      <h1>Fitness Tracker Dashboard</h1>

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