'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { api } from '../lib/api';
import { auth } from '../lib/firebase';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  const applySession = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem('token', userToken);
    localStorage.setItem('user', JSON.stringify(userData));
    axios.defaults.headers.common.Authorization = `Bearer ${userToken}`;
    api.defaults.headers.common.Authorization = `Bearer ${userToken}`;
  };

  const clearSession = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common.Authorization;
    delete api.defaults.headers.common.Authorization;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        clearSession();
        setLoading(false);
        return;
      }

      try {
        const userToken = await firebaseUser.getIdToken();
        const response = await api.post('/api/auth/login', { authToken: userToken });
        applySession(response.data.data.user, userToken);
      } catch (error) {
        console.error('Error restoring auth session:', error);
        clearSession();
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const userToken = await credential.user.getIdToken();
      const response = await api.post('/api/auth/login', { authToken: userToken });
      applySession(response.data.data.user, userToken);
      return { success: true, user: response.data.data.user };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Login failed',
      };
    }
  };

  const register = async (userData) => {
    try {
      const credential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
      await updateProfile(credential.user, { displayName: userData.name });
      const userToken = await credential.user.getIdToken(true);
      const response = await api.post('/api/auth/register', {
        authToken: userToken,
        ...userData,
      });
      applySession(response.data.data.user, userToken);
      return { success: true, user: response.data.data.user };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || error.message || 'Registration failed',
      };
    }
  };

  const logout = async () => {
    await signOut(auth);
    clearSession();
  };

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const isAuthenticated = () => {
    return !!user && !!token;
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
