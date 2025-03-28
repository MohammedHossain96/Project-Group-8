import { useState, FormEvent, ChangeEvent } from 'react';
import { createUser } from '../api/authAPI'; // API call to backend
import Auth from '../utils/auth';

const CreateUser = () => {
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
      Auth.login(data.token); // Automatically log in after registration
    } catch (err) {
      console.error('Failed to create user', err);
      setErrorMessage('Failed to create account. Please try again.');
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Create Account</h1>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={handleChange}
          required
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
};

export default CreateUser;