import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import auth from '../utils/auth';
import Weather from './Weather'; // Import the Weather component

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const location = useLocation(); // Get the current route

  useEffect(() => {
    // Check if the user is logged in and update the state
    setLoginCheck(auth.loggedIn());
    
    // Get username from profile if logged in
    if (auth.loggedIn()) {
      const profile = auth.getProfile();
      if (profile && profile.username) {
        setUsername(profile.username);
      }
    }
    
    // Update time every minute
    const timerId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute
    
    return () => clearInterval(timerId);
  }, []);

  const handleLogout = () => {
    auth.logout(); // Remove the token and redirect
    window.location.assign('/login'); // Redirect to the login page
  };

  // Format time as HH:MM AM/PM
  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  return (
    <div className="nav">
      <div className="nav-title">
        <span>Fitness Tracker</span>
      </div>
      
      {/* Show weather only when logged in */}
      {loginCheck && (
        <div className="nav-weather">
          <Weather />
        </div>
      )}
      
      <div className="nav-right">
        {/* Show username and time when logged in */}
        {loginCheck && username && (
          <div className="user-time-info">
            <div className="username">Welcome, {username}</div>
            <div className="current-time">{formattedTime}</div>
          </div>
        )}
        
        <ul>
          {/* Conditionally render the Login link */}
          {!loginCheck && location.pathname !== '/login' && location.pathname !== '/main' ? (
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
          ) : loginCheck ? (
            <li className="nav-item">
              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            </li>
          ) : null}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
