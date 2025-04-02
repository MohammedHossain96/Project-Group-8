import { useState, FormEvent, ChangeEvent } from 'react';
import { createUser } from '../api/authAPI'; // API call to backend
import Auth from '../utils/auth';

const SignUp = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState(''); // For errors
  const [successMessage, setSuccessMessage] = useState(''); // For success

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
    setSuccessMessage('');

    try {
      const data = await createUser(userData);
      setSuccessMessage('Account created successfully!');
      Auth.login(data.token); // Automatically log in after registration
    } catch (err) {
      console.error('Failed to create user', err);
      setErrorMessage('Failed to create account. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-content">
          <span className="card-title">Create Account</span>
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
            <button type="submit" className="btn">Register</button>
            {errorMessage && <p className="red-text">{errorMessage}</p>}
            {successMessage && <p className="green-text">{successMessage}</p>}
          </form>
          <p className="mt-3">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
