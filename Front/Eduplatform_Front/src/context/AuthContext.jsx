import { useState, useEffect } from 'react';
import api from '../api/axios';

import AuthContext from './authContext';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Vérifier si token existe au chargement
  useEffect(() => {
    const token = localStorage.getItem('token');

    let isMounted = true;

    const checkToken = async () => {
      if (!token) {
        if (isMounted) setLoading(false);
        return;
      }

      try {
        const res = await api.get('/auth/me');
        if (isMounted) setUser(res.data);
      } catch {
        localStorage.removeItem('token');
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    checkToken();

    return () => { isMounted = false };
  }, []);

  const register = async (username, email, password) => {
    const response = await api.post('/auth/register', {
      username,
      email,
      password
    });

    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
    return response.data;
  };

  const login = async (email, password) => {
    const response = await api.post('/auth/login', {
      email,
      password
    });

    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
