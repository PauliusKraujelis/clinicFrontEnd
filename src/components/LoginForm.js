import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/registration', credentials);
      if (response.status === 200) {
        // Authentication successful
        history.push('/index'); // Redirect to authenticated route
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post('/logout');
      // Clear user session or token here
      history.push('/'); // Redirect to login or home page
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={credentials.username} onChange={handleChange} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={credentials.password} onChange={handleChange} />
        </div>
        <button type="submit">Login</button>
      </form>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default LoginForm;
