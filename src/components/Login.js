import React, { useState,useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';



export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(AuthContext);


  const submit = async (e) => {
    e.preventDefault();
    try {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);
      const apiUrl = process.env.REACT_APP_API_URL;


      const response = await axios.post(apiUrl+'auth/jwt/login',
        formData,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      localStorage.setItem('access_token', response.data.access_token);
      setIsAuthenticated(true);
      navigate('/');

    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}>
      <form onSubmit={submit} style={{
        width: '300px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{ textAlign: 'center' }}>Sign In</h3>
        <div style={{ marginBottom: '15px' }}>
          <label>Username</label>
          <input
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            placeholder="Enter Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label>Password</label>
          <input
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button
            type="submit"
            style={{
              padding: '10px 15px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Submit
          </button>
          <button
            type="button"
            style={{
              padding: '10px 15px',
              backgroundColor: '#6c757d',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
        </div>
        <div style={{ marginTop: '10px', textAlign: 'center' }}>
          <span
            style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => navigate('/forgot-password')}
          >
            Forgot Password?
          </span>
        </div>

      </form>
    </div>
  );
};