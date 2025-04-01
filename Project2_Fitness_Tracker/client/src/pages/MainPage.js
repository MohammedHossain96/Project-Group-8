import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
            }
            catch (error) {
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
            }
            catch (error) {
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
            }
            catch (error) {
                console.error('Error fetching fitness data:', error);
            }
        };
        fetchFitnessData();
    }, []);
    return (_jsxs("div", { className: "container", children: [_jsx("h1", { children: "Fitness Tracker Dashboard" }), _jsxs("div", { className: "card", children: [_jsx("h2", { children: "Fitness Data" }), _jsxs("p", { children: [_jsx("strong", { children: "Steps:" }), " ", fitnessData.steps] }), _jsxs("p", { children: [_jsx("strong", { children: "Cardio (minutes):" }), " ", fitnessData.cardio] }), _jsxs("p", { children: [_jsx("strong", { children: "Weight Lifting (sets):" }), " ", fitnessData.weightLifting] })] }), _jsxs("div", { className: "card", children: [_jsx("h2", { children: "Weather Info" }), weather ? (_jsxs("div", { children: [_jsxs("p", { children: [_jsx("strong", { children: "Location:" }), " ", weather.location] }), _jsxs("p", { children: [_jsx("strong", { children: "Temperature:" }), " ", weather.temperature, "\u00B0C"] }), _jsxs("p", { children: [_jsx("strong", { children: "Condition:" }), " ", weather.condition] })] })) : (_jsx("p", { children: "Loading weather data..." }))] }), _jsxs("div", { className: "card", children: [_jsx("h2", { children: "Music Playlists" }), playlists.length > 0 ? (_jsx("ul", { children: playlists.map((playlist, index) => (_jsx("li", { children: _jsx("a", { href: playlist.url, target: "_blank", rel: "noopener noreferrer", children: playlist.name }) }, index))) })) : (_jsx("p", { children: "Loading playlists..." }))] })] }));
};
export default MainPage;
