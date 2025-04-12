import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post(apiUrl+'auth/register', { email, password });
      navigate('/login');
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Register</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default Register;
