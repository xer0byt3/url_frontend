import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    
    console.log("token_authcont", token);
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);


  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading}}>
      {children}
    </AuthContext.Provider>
  );
};

