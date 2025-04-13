import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

export const Logout = () => {
    const navigate = useNavigate();
    // const { logout,  } = useContext(AuthContext);
    const { setIsAuthenticated } = useContext(AuthContext);
    const apiUrl = process.env.REACT_APP_API_URL;

    console.log("log api", apiUrl);
    useEffect(() => {
        const logoutUser = async () => {
            try {
                await axios.post(apiUrl + 'auth/jwt/logout/', null, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    }
                });

                localStorage.removeItem('access_token');
                // logout();
                setIsAuthenticated(false);
                console.log('Logged out successfully');
                navigate('/login');
            } catch (error) {
                console.error('Logout failed:', error);
            }
        };

        logoutUser();
    }, [navigate, setIsAuthenticated, apiUrl]);

    return <div>Logging out...</div>;
};
