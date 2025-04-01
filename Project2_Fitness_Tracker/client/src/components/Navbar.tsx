import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import auth from '../utils/auth';

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);

  useEffect(() => {
    // Check if the user is logged in and update the state
    setLoginCheck(auth.loggedIn());
  }, []);

  const handleLogout = () => {
    auth.logout(); // Remove the token and redirect
    window.location.assign('/login'); // Redirect to the login page
  };

  return (
    <div className="nav">
      <div className="nav-title">
        <Link to="/">Fitness Tracker</Link>
      </div>
      <ul>
        {!loginCheck ? (
          <li className="nav-item">
            <button type="button">
              <Link to="/login">Login</Link>
            </button>
          </li>
        ) : (
          <li className="nav-item">
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
