import { Link } from 'react-router-dom';
import Auth from '../utils/auth'; 

function Navbar() {
  return (
    <nav style={{
      background: 'rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      padding: '0',
      marginBottom: '20px',
      width: '100%',
      position: 'relative',
      zIndex: 1000
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '64px'
        }}>
          <Link to="/" style={{
            fontSize: '1.5rem',
            color: 'white',
            textDecoration: 'none',
            fontWeight: '500',
            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)'
          }}>Fitness Tracker</Link>
          
          {/* Container for the navigation links */}
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <Link to="/" className="nav-link">Home</Link> 
            
            {/* Conditionally render links based on auth status */}
            {Auth.loggedIn() ? (
              <>
                <Link to="/profile" className="nav-link">Profile</Link> 
                <a onClick={() => Auth.logout()} className="nav-link" style={{ cursor: 'pointer' }}>Logout</a> 
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">Login</Link> 
                <Link to="/signup" className="nav-link">Sign Up</Link> 
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
