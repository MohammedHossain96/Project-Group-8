import { useState, useEffect } from 'react';

const MainPage = () => {
  const [weather, setWeather] = useState(null);
  const [playlists, setPlaylists] = useState([]);
  const [fitnessData, setFitnessData] = useState({
    steps: 0,
    cardio: 0,
    weightLifting: 0,
  });

  // Fetch weather data
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('/api/weather'); // Replace with your weather API endpoint
        const data = await response.json();
        setWeather(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, []);

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
        {weather ? (
          <div>
            <p><strong>Location:</strong> {weather.location}</p>
            <p><strong>Temperature:</strong> {weather.temperature}°C</p>
            <p><strong>Condition:</strong> {weather.condition}</p>
          </div>
        ) : (
          <p>Loading weather data...</p>
        )}
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