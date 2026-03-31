'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, EyeOff, Mail, Lock, User, Phone, Calendar, MapPin, Clock } from 'lucide-react';
import { api } from '../lib/api';

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    dateOfBirth: '',
    placeOfBirth: '',
    timeOfBirth: ''
  });

  const handleLoginChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleRegisterChange = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/api/auth/login', loginForm);
      
      if (response.data.success) {
        // Store token in localStorage
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        
        // Call success callback
        onLoginSuccess(response.data.data.user);
        
        // Close modal
        onClose();
        
        // Reset form
        setLoginForm({ email: '', password: '' });
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (registerForm.password !== registerForm.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (registerForm.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...registerData } = registerForm;
      const response = await api.post('/api/auth/register', registerData);
      
      if (response.data.success) {
        // Store token in localStorage
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.data.user));
        
        // Call success callback
        onLoginSuccess(response.data.data.user);
        
        // Close modal
        onClose();
        
        // Reset form
        setRegisterForm({
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          phone: '',
          dateOfBirth: '',
          placeOfBirth: '',
          timeOfBirth: ''
        });
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setLoginForm({ email: '', password: '' });
    setRegisterForm({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      dateOfBirth: '',
      placeOfBirth: '',
      timeOfBirth: ''
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {isLogin ? '🕉️ Login' : '🕉️ Register'}
                </h2>
                <p className="text-white/70 text-sm">
                  {isLogin ? 'Welcome back to your spiritual journey' : 'Begin your spiritual journey with us'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-3 mb-4">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            {/* Login Form */}
            {isLogin ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-white/80 mb-2 text-sm">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
                    <input
                      type="email"
                      name="email"
                      value={loginForm.email}
                      onChange={handleLoginChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/80 mb-2 text-sm">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={loginForm.password}
                      onChange={handleLoginChange}
                      required
                      className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-xl hover:shadow-2xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </form>
            ) : (
              /* Register Form */
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-white/80 mb-2 text-sm">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
                    <input
                      type="text"
                      name="name"
                      value={registerForm.name}
                      onChange={handleRegisterChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400"
                      placeholder="Your full name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/80 mb-2 text-sm">Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
                    <input
                      type="email"
                      name="email"
                      value={registerForm.email}
                      onChange={handleRegisterChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/80 mb-2 text-sm">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
                    <input
                      type="tel"
                      name="phone"
                      value={registerForm.phone}
                      onChange={handleRegisterChange}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400"
                      placeholder="+91 9876543210"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-white/80 mb-2 text-sm">Date of Birth</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={16} />
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={registerForm.dateOfBirth}
                        onChange={handleRegisterChange}
                        className="w-full pl-9 pr-2 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-400 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/80 mb-2 text-sm">Time of Birth</label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={16} />
                      <input
                        type="time"
                        name="timeOfBirth"
                        value={registerForm.timeOfBirth}
                        onChange={handleRegisterChange}
                        className="w-full pl-9 pr-2 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-400 text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-white/80 mb-2 text-sm">Place of Birth</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
                    <input
                      type="text"
                      name="placeOfBirth"
                      value={registerForm.placeOfBirth}
                      onChange={handleRegisterChange}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400"
                      placeholder="City, State, Country"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/80 mb-2 text-sm">Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={registerForm.password}
                      onChange={handleRegisterChange}
                      required
                      className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400"
                      placeholder="Minimum 6 characters"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/80"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-white/80 mb-2 text-sm">Confirm Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" size={18} />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={registerForm.confirmPassword}
                      onChange={handleRegisterChange}
                      required
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400"
                      placeholder="Confirm your password"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 rounded-xl hover:shadow-2xl transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Creating Account...' : 'Create Account'}
                </button>
              </form>
            )}

            {/* Switch Mode */}
            <div className="mt-6 text-center">
              <p className="text-white/70 text-sm">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  onClick={switchMode}
                  className="text-purple-400 hover:text-purple-300 ml-2 font-semibold"
                >
                  {isLogin ? 'Register here' : 'Login here'}
                </button>
              </p>
            </div>

            {/* Astrology Note */}
            {!isLogin && (
              <div className="mt-4 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-xl">
                <p className="text-yellow-300 text-xs text-center">
                  ⭐ Birth details help us provide accurate astrological readings and personalized spiritual guidance
                </p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
