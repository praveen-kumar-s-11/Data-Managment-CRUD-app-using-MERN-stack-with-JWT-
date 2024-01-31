import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log('Submitting login:', { username, password });

      const response = await axios.post('http://localhost:8800/auth/login', { username, password} , { withCredentials: true });

      console.log('Login successful:', response.data);

   
      const token = response.data.token;

      console.log('Navigating to /home');
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error);

      if (error.response) {
        
        console.error('Server responded with error status:', error.response.status);
        setError(`Server responded with error: ${error.response.data.message}`);
      } else if (error.request) {
      
        console.error('No response received from the server');
        setError('No response received from the server');
      } else {
      
        console.error('Error setting up the request:', error.message);
        setError('Error setting up the request');
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'>Username:</label>
          <input
            type='text'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Login</button>
      </form>
      <p>
        Don't have an account? <Link to='/'>Register here</Link>.
      </p>
    </div>
  );
}

export default Login;
