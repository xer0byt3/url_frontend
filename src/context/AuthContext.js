// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token);
  }, []);

  // const logout = () => {
  //   localStorage.removeItem('access_token');
  //   setIsAuthenticated(false);
  // };


  return (
    // <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout}}>
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated}}>
      {children}
    </AuthContext.Provider>
  );
};

// user1234@example.com
// string
