import { useState, FormEvent, ChangeEvent } from "react";
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';
import { login } from "../api/authAPI";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const data = await login(loginData);
      Auth.login(data.token);
      window.location.href = '/'; // Redirect to home after login
    } catch (err) {
      console.error('Failed to login', err);
      setErrorMessage('*Username or Password incorrect');
    }
  };

  return (
    <div className='container'>
      <form className='form' onSubmit={handleSubmit}>
        <h1>Login</h1>
        <label>Username</label>
        <input 
          type='text'
          name='username'
          value={loginData.username || ''}
          onChange={handleChange}
          required
        />
        <label>Password</label>
        <input 
          type='password'
          name='password'
          value={loginData.password || ''}
          onChange={handleChange}
          required
        />
        <button type='submit'>Submit Form</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p>Don't have an account? <Link to="/createuser">Sign up here</Link></p>
      </form>
    </div>
  );
};

export default Login;
