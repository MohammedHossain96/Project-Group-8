import { useEffect, useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("New York"); // Default city
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeather = async (cityName: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      setWeather(response.data);
    } catch (err) {
      setError("Error fetching weather data. Please check the city name.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city); // Fetch weather for the default city on component mount
  }, []);

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    fetchWeather(city); // Fetch weather for the entered city
  };

  return (
    <div className="weather-container">
      <h3>Weather Info</h3>
      <div>
        <input
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading && <p>Loading weather...</p>}
      {error && <p>{error}</p>}
      {weather && (
        <div>
          <h4>Weather in {weather.name}</h4>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;