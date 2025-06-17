// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { login as authLogin, signup as authSignup } from '../services/auth';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        // The decoded token has an `exp` field which is the expiration time in seconds.
        if (decodedToken.exp * 1000 < Date.now()) {
          // If the token is expired, log the user out.
          logout();
        } else {
          // If the token is still valid, set the user data from local storage.
          const storedUser = localStorage.getItem('user');
          if (storedUser) {
            setUser(JSON.parse(storedUser));
          }
        }
      } catch (error) {
        // If the token is malformed, log the user out.
        console.error('Invalid token:', error);
        logout();
      }
    }
    setLoading(false);
  }, [token]);

  const login = async (credentials) => {
    try {
      // console.log('credentials>> ',credentials)
      const { user, token } = await authLogin(credentials);
      // console.log('user>> ',user,'token>> ',token)
      setUser(user);
      setToken(token);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const signup = async (userData) => {
    try {
      const { user, token } = await authSignup(userData);
      setUser(user);
      setToken(token);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);