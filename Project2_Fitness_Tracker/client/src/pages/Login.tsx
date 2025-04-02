import { useState, FormEvent, ChangeEvent } from 'react';
import { loginUser } from '../api/authAPI';
import Auth from '../utils/auth';

const Login = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const data = await loginUser(userData);
      Auth.login(data.token);
    } catch (err) {
      console.error('Failed to login', err);
      setErrorMessage('Failed to login. Please check your credentials.');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-content">
          <span className="card-title">Login</span>
          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={userData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn">Login</button>
            {errorMessage && <p className="red-text">{errorMessage}</p>}
          </form>
          <p className="mt-3">
            Don't have an account? <a href="/signup">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
