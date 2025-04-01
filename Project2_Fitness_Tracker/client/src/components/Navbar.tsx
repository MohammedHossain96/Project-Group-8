import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import auth from '../utils/auth';

const Navbar = () => {
  const [loginCheck, setLoginCheck] = useState(false);
  const location = useLocation(); // Get the current route

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
        <span>Fitness Tracker</span>
      </div>
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
  );
};

export default Navbar;
