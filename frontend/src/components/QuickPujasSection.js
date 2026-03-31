'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, CheckCircle, Star, Flame, Heart, BookOpen, Play } from 'lucide-react';
import { api } from '../lib/api';

export default function QuickPujasSection() {
  const [pujas, setPujas] = useState([]);
  const [selectedPuja, setSelectedPuja] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showSteps, setShowSteps] = useState(false);

  useEffect(() => {
    fetchPujas();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory !== 'all') {
      fetchPujasByCategory(selectedCategory);
    } else {
      fetchPujas();
    }
  }, [selectedCategory]);

  const fetchPujas = async () => {
    try {
      const response = await api.get('/api/quick-pujas');
      setPujas(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching pujas:', error);
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/api/quick-pujas/meta/categories');
      setCategories(response.data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchPujasByCategory = async (category) => {
    try {
      const response = await api.get(`/api/quick-pujas/category/${category}`);
      setPujas(response.data.data);
    } catch (error) {
      console.error('Error fetching pujas by category:', error);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-white';
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Daily': '🌅',
      'Prosperity': '💰',
      'Knowledge': '📚',
      'Strength': '💪',
      'Spiritual': '🧘',
      'Protection': '🛡️',
      'Peace': '☮️',
      'Success': '🎯'
    };
    return icons[category] || '🕉️';
  };

  const getDeityEmoji = (deity) => {
    if (deity.includes('Ganesha')) return '🐘';
    if (deity.includes('Lakshmi')) return '🪷';
    if (deity.includes('Saraswati')) return '🦢';
    if (deity.includes('Hanuman')) return '🐒';
    if (deity.includes('Shiva')) return '🔱';
    if (deity.includes('Durga')) return '🦁';
    return '🕉️';
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-pink-900 via-red-900 to-orange-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-6xl mb-4 animate-pulse">🪔</div>
          <p className="text-xl">Loading sacred pujas...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="quick-pujas" className="min-h-screen bg-gradient-to-b from-pink-900 via-red-900 to-orange-900 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-6">
            🪔 Quick Pujas
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Simple and effective puja rituals for daily practice and special occasions
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-3 rounded-full transition-all ${
              selectedCategory === 'all'
                ? 'bg-orange-500 text-white'
                : 'bg-white/20 text-white/80 hover:bg-white/30'
            }`}
          >
            All Pujas
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full transition-all flex items-center gap-2 ${
                selectedCategory === category
                  ? 'bg-orange-500 text-white'
                  : 'bg-white/20 text-white/80 hover:bg-white/30'
              }`}
            >
              <span>{getCategoryIcon(category)}</span>
              {category}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {pujas.map((puja, index) => (
            <motion.div
              key={puja.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 hover:bg-white/15 transition-all duration-300 hover:scale-105 group"
            >
              <div className="relative mb-6">
                <img
                  src={puja.image}
                  alt={puja.name}
                  className="w-full h-48 object-cover rounded-2xl"
                />
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur px-3 py-1 rounded-full">
                  <span className={`text-sm font-semibold ${getDifficultyColor(puja.difficulty)}`}>
                    {puja.difficulty}
                  </span>
                </div>
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur px-3 py-1 rounded-full">
                  <span className="text-white text-sm">{getCategoryIcon(puja.category)} {puja.category}</span>
                </div>
                <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur px-3 py-1 rounded-full">
                  <span className="text-white text-sm">{getDeityEmoji(puja.deity)} {puja.deity}</span>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-orange-300 transition-colors">
                  {puja.name}
                </h3>
                <p className="text-white/70 text-sm mb-3">
                  {puja.description}
                </p>
              </div>

              <div className="flex items-center gap-4 text-white/60 text-sm mb-4">
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{puja.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={14} />
                  <span>{puja.bestTime}</span>
                </div>
              </div>

              <div className="mb-4">
                <h4 className="text-white font-semibold mb-2">Benefits:</h4>
                <div className="flex flex-wrap gap-2">
                  {puja.benefits.slice(0, 3).map((benefit, i) => (
                    <span key={i} className="px-2 py-1 bg-orange-500/20 text-orange-300 rounded-full text-xs">
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-white font-semibold mb-2">Required Items:</h4>
                <div className="grid grid-cols-2 gap-1">
                  {puja.items.slice(0, 4).map((item, i) => (
                    <div key={i} className="flex items-center gap-1 text-white/70 text-xs">
                      <CheckCircle size={10} className="text-green-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                {puja.items.length > 4 && (
                  <p className="text-white/50 text-xs mt-1">+{puja.items.length - 4} more items</p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setSelectedPuja(puja);
                    setShowSteps(true);
                  }}
                  className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 rounded-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
                >
                  <Play size={16} />
                  Start Puja
                </button>
                <button
                  onClick={() => {
                    setSelectedPuja(puja);
                    setShowSteps(false);
                  }}
                  className="bg-white/20 text-white px-4 py-3 rounded-xl hover:bg-white/30 transition"
                >
                  <BookOpen size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Puja Details Modal */}
        {selectedPuja && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold text-white mb-2">
                  {getDeityEmoji(selectedPuja.deity)} {selectedPuja.name}
                </h3>
                <p className="text-white/70 mb-2">
                  {selectedPuja.description}
                </p>
                <div className="flex justify-center gap-4 text-sm">
                  <span className="text-orange-300">⏱️ {selectedPuja.duration}</span>
                  <span className="text-yellow-300">⭐ {selectedPuja.bestTime}</span>
                  <span className={getDifficultyColor(selectedPuja.difficulty)}>
                    🎯 {selectedPuja.difficulty}
                  </span>
                </div>
              </div>

              {showSteps ? (
                // Step-by-step guide
                <div className="space-y-6">
                  <div className="text-center">
                    <h4 className="text-2xl font-bold text-white mb-4">🪔 Puja Steps</h4>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                        <CheckCircle className="text-green-400" size={20} />
                        Required Items:
                      </h4>
                      <div className="bg-white/5 rounded-2xl p-4">
                        <div className="grid gap-2">
                          {selectedPuja.items.map((item, i) => (
                            <div key={i} className="flex items-center gap-2 text-white/80">
                              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white font-bold mb-3 flex items-center gap-2">
                        <Heart className="text-pink-400" size={20} />
                        Benefits:
                      </h4>
                      <div className="bg-white/5 rounded-2xl p-4">
                        <div className="grid gap-2">
                          {selectedPuja.benefits.map((benefit, i) => (
                            <div key={i} className="flex items-center gap-2 text-white/80">
                              <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                      <Flame className="text-orange-400" size={20} />
                      Step-by-Step Guide:
                    </h4>
                    <div className="space-y-4">
                      {selectedPuja.steps.map((step, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="bg-white/5 rounded-2xl p-4 flex items-start gap-4"
                        >
                          <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
                            {i + 1}
                          </div>
                          <p className="text-white/80 flex-1">{step}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-bold mb-3">Sacred Mantras:</h4>
                    <div className="bg-white/5 rounded-2xl p-4">
                      {selectedPuja.mantras.map((mantra, i) => (
                        <div key={i} className="text-yellow-300 text-lg font-sanskrit mb-2">
                          {mantra}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                // Overview
                <div className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-4xl mb-2">⏱️</div>
                      <h4 className="text-white font-bold">Duration</h4>
                      <p className="text-white/70">{selectedPuja.duration}</p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl mb-2">⭐</div>
                      <h4 className="text-white font-bold">Best Time</h4>
                      <p className="text-white/70">{selectedPuja.bestTime}</p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl mb-2">🎯</div>
                      <h4 className="text-white font-bold">Difficulty</h4>
                      <p className={getDifficultyColor(selectedPuja.difficulty)}>{selectedPuja.difficulty}</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-bold mb-3">About This Puja:</h4>
                    <p className="text-white/80 leading-relaxed">
                      {selectedPuja.description}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-white font-bold mb-3">Spiritual Benefits:</h4>
                      <div className="space-y-2">
                        {selectedPuja.benefits.map((benefit, i) => (
                          <div key={i} className="flex items-center gap-2 text-white/80">
                            <Heart size={14} className="text-pink-400" />
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-white font-bold mb-3">Required Items:</h4>
                      <div className="space-y-2">
                        {selectedPuja.items.map((item, i) => (
                          <div key={i} className="flex items-center gap-2 text-white/80">
                            <CheckCircle size={14} className="text-green-400" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-6 mt-6 border-t border-white/20">
                <button
                  onClick={() => setSelectedPuja(null)}
                  className="bg-white/20 text-white px-6 py-3 rounded-xl hover:bg-white/30 transition"
                >
                  Close
                </button>
                {!showSteps && (
                  <button
                    onClick={() => setShowSteps(true)}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 rounded-xl hover:shadow-2xl transition flex items-center justify-center gap-2"
                  >
                    <Play size={16} />
                    Start Step-by-Step Guide
                  </button>
                )}
                {showSteps && (
                  <button
                    onClick={() => setShowSteps(false)}
                    className="bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition"
                  >
                    Back to Overview
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
