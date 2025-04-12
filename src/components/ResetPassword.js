import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setError('');
    const apiUrl = process.env.REACT_APP_API_URL;

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await axios.post(apiUrl+'auth/reset-password', {
        token,
        password: newPassword,
      });

      setSuccess(true);
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError("Reset failed. The token might be invalid or expired.");
      console.error(err);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <form onSubmit={handleReset} style={{
        width: '300px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
      }}>
        <h3 style={{ textAlign: 'center' }}>Reset Password</h3>
        {success ? (
          <p style={{ textAlign: 'center', color: 'green' }}>
            Password updated! Redirecting to login...
          </p>
        ) : (
          <>
            <div style={{ marginBottom: '15px' }}>
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </div>
            {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
            <button type="submit" style={{
              padding: '10px 15px',
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              width: '100%'
            }}>
              Reset Password
            </button>
          </>
        )}
      </form>
    </div>
  );
};
