import { useState, FormEvent, ChangeEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation
import Auth from '../utils/auth';
import { login } from '../api/authAPI';

const Login = () => {
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const data = await login(loginData); // Call the login API
      Auth.login(data.token); // Save the JWT in localStorage
      navigate('/main'); // Redirect to MainPage
    } catch (err) {
      console.error('Failed to login', err);
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={loginData.username}
          onChange={handleChange}
          required
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={loginData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* Add the message and hyperlink */}
        <p>
          Don't have an account?{' '}
          <Link to="/createuser" className="register-link">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
