import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const apiUrl = process.env.REACT_APP_API_URL;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            axios.post(apiUrl+'auth/forgot-password', { email });
            navigate('/login');
            setSubmitted(true);
        } catch (err) {
            setError('Failed to send reset link. Please try again.');
            console.error(err);
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        }}>
            <form onSubmit={handleSubmit} style={{
                width: '300px',
                padding: '20px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
            }}>
                <h3 style={{ textAlign: 'center' }}>Forgot Password</h3>
                {submitted ? (
                    <p style={{ textAlign: 'center' }}>Check your email for a reset link.</p>
                ) : (
                    <>
                        <div style={{ marginBottom: '15px' }}>
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                            Send Reset Link
                        </button>
                    </>
                )}
            </form>
        </div>
    );
};
