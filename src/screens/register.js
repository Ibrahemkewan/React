import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [photo, setPhoto] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validatePassword = () => {
    let valid = true;
    let errors = {};

    if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
      valid = false;
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validatePassword()) {
      const user = {
        username,
        password,
        displayName,
        photo,
      };
      sessionStorage.setItem('user', JSON.stringify(user));
      console.log('User registered:', user);
      window.alert('You have registered successfully!');
      navigate('/login'); // Redirect to login page after successful registration
    }
  };

  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Create your YouTube account</h2>
        <input
          type="text"
          placeholder="Username"
          className="input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.password && <div className="error">{errors.password}</div>}
        <input
          type="password"
          placeholder="Confirm Password"
          className="input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        {errors.confirmPassword && (
          <div className="error">{errors.confirmPassword}</div>
        )}
        <input
          type="text"
          placeholder="Display Name"
          className="input"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />
        <input
          type="file"
          className="input"
          onChange={handlePhotoChange}
        />
        <button type="submit" className="button">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
