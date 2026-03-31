'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut, Settings, Star, Calendar, MapPin, Phone, Mail, Edit2, Save, X } from 'lucide-react';
import axios from 'axios';

export default function UserProfile({ user, onLogout, onUpdateUser }) {
  const [showProfile, setShowProfile] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    dateOfBirth: user?.dateOfBirth || '',
    placeOfBirth: user?.placeOfBirth || '',
    timeOfBirth: user?.timeOfBirth || ''
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        phone: user.phone || '',
        dateOfBirth: user.dateOfBirth || '',
        placeOfBirth: user.placeOfBirth || '',
        timeOfBirth: user.timeOfBirth || ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
    setError('');
    setSuccess('');
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        'http://localhost:5000/api/auth/profile',
        profileData,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        // Update user data in localStorage
        const updatedUser = response.data.data;
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        // Call update callback
        onUpdateUser(updatedUser);
        
        setSuccess('Profile updated successfully!');
        setIsEditing(false);
        
        setTimeout(() => setSuccess(''), 3000);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    onLogout();
    setShowProfile(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    return new Date(dateString).toLocaleDateString('en-IN');
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'Not provided';
    return timeString;
  };

  return (
    <>
      {/* User Avatar Button */}
      <button
        onClick={() => setShowProfile(true)}
        className="flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-4 py-2 hover:bg-white/20 transition-all"
      >
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-full">
          <User size={16} className="text-white" />
        </div>
        <span className="text-white font-medium hidden md:block">
          {user?.name?.split(' ')[0] || 'User'}
        </span>
      </button>

      {/* Profile Modal */}
      <AnimatePresence>
        {showProfile && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full">
                    <User size={24} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Profile</h2>
                    <p className="text-white/70 text-sm">Manage your spiritual journey</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowProfile(false)}
                  className="text-white/80 hover:text-white transition"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Success/Error Messages */}
              {success && (
                <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-3 mb-4">
                  <p className="text-green-300 text-sm">{success}</p>
                </div>
              )}

              {error && (
                <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-3 mb-4">
                  <p className="text-red-300 text-sm">{error}</p>
                </div>
              )}

              {/* Profile Content */}
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="bg-white/5 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-bold text-lg">Personal Information</h3>
                    {!isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="text-purple-400 hover:text-purple-300 transition"
                      >
                        <Edit2 size={18} />
                      </button>
                    )}
                  </div>

                  {isEditing ? (
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                      <div>
                        <label className="block text-white/80 mb-2 text-sm">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={profileData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400"
                          placeholder="Your full name"
                        />
                      </div>

                      <div>
                        <label className="block text-white/80 mb-2 text-sm">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400"
                          placeholder="+91 9876543210"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-white/80 mb-2 text-sm">Date of Birth</label>
                          <input
                            type="date"
                            name="dateOfBirth"
                            value={profileData.dateOfBirth}
                            onChange={handleInputChange}
                            className="w-full px-3 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-400 text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-white/80 mb-2 text-sm">Time of Birth</label>
                          <input
                            type="time"
                            name="timeOfBirth"
                            value={profileData.timeOfBirth}
                            onChange={handleInputChange}
                            className="w-full px-3 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-400 text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-white/80 mb-2 text-sm">Place of Birth</label>
                        <input
                          type="text"
                          name="placeOfBirth"
                          value={profileData.placeOfBirth}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-purple-400"
                          placeholder="City, State, Country"
                        />
                      </div>

                      <div className="flex gap-3 pt-4">
                        <button
                          type="button"
                          onClick={() => {
                            setIsEditing(false);
                            setProfileData({
                              name: user?.name || '',
                              phone: user?.phone || '',
                              dateOfBirth: user?.dateOfBirth || '',
                              placeOfBirth: user?.placeOfBirth || '',
                              timeOfBirth: user?.timeOfBirth || ''
                            });
                            setError('');
                            setSuccess('');
                          }}
                          className="flex-1 bg-white/20 text-white py-3 rounded-xl hover:bg-white/30 transition"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-xl hover:shadow-2xl transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                          <Save size={16} />
                          {loading ? 'Saving...' : 'Save'}
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <User size={18} className="text-white/60" />
                        <div>
                          <p className="text-white/60 text-sm">Name</p>
                          <p className="text-white">{user?.name || 'Not provided'}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Mail size={18} className="text-white/60" />
                        <div>
                          <p className="text-white/60 text-sm">Email</p>
                          <p className="text-white">{user?.email}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Phone size={18} className="text-white/60" />
                        <div>
                          <p className="text-white/60 text-sm">Phone</p>
                          <p className="text-white">{user?.phone || 'Not provided'}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Calendar size={18} className="text-white/60" />
                        <div>
                          <p className="text-white/60 text-sm">Date of Birth</p>
                          <p className="text-white">{formatDate(user?.dateOfBirth)}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <MapPin size={18} className="text-white/60" />
                        <div>
                          <p className="text-white/60 text-sm">Place of Birth</p>
                          <p className="text-white">{user?.placeOfBirth || 'Not provided'}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Star size={18} className="text-white/60" />
                        <div>
                          <p className="text-white/60 text-sm">Time of Birth</p>
                          <p className="text-white">{formatTime(user?.timeOfBirth)}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Account Actions */}
                <div className="bg-white/5 rounded-2xl p-6">
                  <h3 className="text-white font-bold text-lg mb-4">Account</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">Member since</span>
                      <span className="text-white">
                        {user?.createdAt ? formatDate(user.createdAt) : 'Recently'}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-white/80">Account Status</span>
                      <span className="text-green-400">Active</span>
                    </div>
                  </div>
                </div>

                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 font-bold py-3 rounded-xl transition flex items-center justify-center gap-2"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}