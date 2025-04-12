import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Logout = () => {
    const navigate = useNavigate();
    // const { logout,  } = useContext(AuthContext);
    const { setIsAuthenticated } = useContext(AuthContext);
    const apiUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const logoutUser = async () => {
            try {
                await fetch(apiUrl+'auth/jwt/logout/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    credentials: 'include',
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
