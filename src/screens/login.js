import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const storedUser = JSON.parse(sessionStorage.getItem('user'));

    if (!username) {
      setErrors({ username: 'Username is required' });
    } else if (!password) {
      setErrors({ password: 'Password is required' });
    } else if (
      storedUser &&
      storedUser.username === username &&
      storedUser.password === password
    ) {
      console.log('User logged in:', storedUser);
      setErrors({});
      navigate('/'); // Redirect to home page after successful login
    } else {
      setErrors({ login: 'Invalid username or password' });
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Login to your YouTube account</h2>
        <input
          type="text"
          placeholder="Username"
          className="input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {errors.username && <div className="error">{errors.username}</div>}
        <input
          type="password"
          placeholder="Password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.password && <div className="error">{errors.password}</div>}
        {errors.login && <div className="error">{errors.login}</div>}
        <button type="submit" className="button">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
