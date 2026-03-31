'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, Clock, Star, Heart, BookOpen } from 'lucide-react';
import { api } from '../lib/api';

export default function SpecialMantrasSection() {
  const [mantras, setMantras] = useState([]);
  const [selectedMantra, setSelectedMantra] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [playingMantra, setPlayingMantra] = useState(null);

  useEffect(() => {
    fetchMantras();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory !== 'all') {
      fetchMantrasByCategory(selectedCategory);
    } else {
      fetchMantras();
    }
  }, [selectedCategory]);

  const fetchMantras = async () => {
    try {
      const response = await api.get('/api/special-mantras');
      setMantras(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching mantras:', error);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/api/special-mantras/meta/categories');
      setCategories(response.data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchMantrasByCategory = async (category) => {
    try {
      const response = await api.get(`/api/special-mantras/category/${category}`);
      setMantras(response.data.data);
    } catch (error) {
      console.error('Error fetching mantras by category:', error);
    }
  };

  const handlePlayMantra = (mantra) => {
    if (playingMantra === mantra.id) {
      setPlayingMantra(null);
    } else {
      setPlayingMantra(mantra.id);
      // In a real app, you would play the audio file here
      setTimeout(() => setPlayingMantra(null), 3000); // Simulate audio ending
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner': return 'text-green-400';
      case 'intermediate': return 'text-yellow-400';
      case 'advanced': return 'text-red-400';
      default: return 'text-white';
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Healing': '🌿',
      'Wisdom': '📚',
      'Success': '🎯',
      'Prosperity': '💰',
      'Knowledge': '🧠',
      'Strength': '💪',
      'Protection': '🛡️',
      'Peace': '☮️'
    };
    return icons[category] || '🕉️';
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-6xl mb-4 animate-pulse">🕉️</div>
          <p className="text-xl">Loading sacred mantras...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="special-mantras" className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-6">
            🕉️ Sacred Mantras
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Powerful Sanskrit mantras for healing, prosperity, wisdom, and spiritual growth
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-3 rounded-full transition-all ${
              selectedCategory === 'all'
                ? 'bg-yellow-500 text-white'
                : 'bg-white/20 text-white/80 hover:bg-white/30'
            }`}
          >
            All Mantras
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full transition-all flex items-center gap-2 ${
                selectedCategory === category
                  ? 'bg-yellow-500 text-white'
                  : 'bg-white/20 text-white/80 hover:bg-white/30'
              }`}
            >
              <span>{getCategoryIcon(category)}</span>
              {category}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {mantras.map((mantra, index) => (
            <motion.div
              key={mantra.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 group"
            >
              <div className="relative mb-6">
                <img
                  src={mantra.image}
                  alt={mantra.name}
                  className="w-full h-48 object-cover rounded-2xl"
                />
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur px-3 py-1 rounded-full">
                  <span className={`text-sm font-semibold ${getDifficultyColor(mantra.difficulty)}`}>
                    {mantra.difficulty}
                  </span>
                </div>
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur px-3 py-1 rounded-full">
                  <span className="text-white text-sm">{getCategoryIcon(mantra.category)} {mantra.category}</span>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors">
                  {mantra.name}
                </h3>
                <p className="text-white/70 text-sm mb-3">
                  Deity: {mantra.deity}
                </p>
              </div>

              <div className="bg-white/5 rounded-2xl p-4 mb-4">
                <h4 className="text-white font-semibold mb-2">Sanskrit:</h4>
                <p className="text-yellow-300 text-lg font-sanskrit mb-3">
                  {mantra.sanskrit}
                </p>
                <h4 className="text-white font-semibold mb-2">Pronunciation:</h4>
                <p className="text-white/80 text-sm italic">
                  {mantra.transliteration}
                </p>
              </div>

              <div className="mb-4">
                <h4 className="text-white font-semibold mb-2">Meaning:</h4>
                <p className="text-white/70 text-sm">
                  {mantra.meaning}
                </p>
              </div>

              <div className="mb-4">
                <h4 className="text-white font-semibold mb-2">Benefits:</h4>
                <div className="flex flex-wrap gap-2">
                  {mantra.benefits.map((benefit, i) => (
                    <span key={i} className="px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-xs">
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4 text-white/60 text-sm mb-6">
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{mantra.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={14} />
                  <span>{mantra.bestTime}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => handlePlayMantra(mantra)}
                  className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-3 rounded-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
                >
                  {playingMantra === mantra.id ? (
                    <>
                      <Pause size={16} />
                      Playing...
                    </>
                  ) : (
                    <>
                      <Play size={16} />
                      Listen
                    </>
                  )}
                </button>
                <button
                  onClick={() => setSelectedMantra(mantra)}
                  className="bg-white/20 text-white px-4 py-3 rounded-xl hover:bg-white/30 transition"
                >
                  <BookOpen size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detailed Mantra Modal */}
        {selectedMantra && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold text-white mb-2">
                  {selectedMantra.name}
                </h3>
                <p className="text-white/70">
                  {selectedMantra.deity} • {selectedMantra.category}
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-white/5 rounded-2xl p-6">
                  <h4 className="text-white font-bold text-xl mb-3">Sanskrit Mantra:</h4>
                  <p className="text-yellow-300 text-2xl font-sanskrit mb-4 text-center">
                    {selectedMantra.sanskrit}
                  </p>
                  <h4 className="text-white font-bold mb-2">Pronunciation Guide:</h4>
                  <p className="text-white/80 italic text-center">
                    {selectedMantra.transliteration}
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-bold mb-3">Meaning & Significance:</h4>
                  <p className="text-white/80 leading-relaxed">
                    {selectedMantra.meaning}
                  </p>
                </div>

                <div>
                  <h4 className="text-white font-bold mb-3">Spiritual Benefits:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedMantra.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2 text-white/80">
                        <Heart size={14} className="text-pink-400" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-white font-bold mb-2">Duration:</h4>
                    <p className="text-white/80">{selectedMantra.duration}</p>
                  </div>
                  <div>
                    <h4 className="text-white font-bold mb-2">Best Time:</h4>
                    <p className="text-white/80">{selectedMantra.bestTime}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-6 mt-6 border-t border-white/20">
                <button
                  onClick={() => setSelectedMantra(null)}
                  className="flex-1 bg-white/20 text-white py-3 rounded-xl hover:bg-white/30 transition"
                >
                  Close
                </button>
                <button
                  onClick={() => handlePlayMantra(selectedMantra)}
                  className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-3 rounded-xl hover:shadow-2xl transition flex items-center justify-center gap-2"
                >
                  <Volume2 size={16} />
                  Play Audio
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
