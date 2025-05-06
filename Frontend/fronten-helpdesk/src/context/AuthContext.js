import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    loading: true
  });

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const response = await axios.get('/api/auth/verify', {
          withCredentials: true
        });
        setAuthState({
          isAuthenticated: true,
          user: response.data.user,
          loading: false
        });
      } catch (error) {
        setAuthState({
          isAuthenticated: false,
          user: null,
          loading: false
        });
      }
    };

    verifyAuth();
  }, []);

  const login = async (credentials) => {
    const response = await axios.post('/api/auth/login', credentials, {
      withCredentials: true
    });
    setAuthState({
      isAuthenticated: true,
      user: response.data.user,
      loading: false
    });
  };

  const logout = async () => {
    await axios.post('/api/auth/logout', {}, {
      withCredentials: true
    });
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false
    });
  };

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
      {!authState.loading && children}
    </AuthContext.Provider>
  );
};