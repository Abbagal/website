'use client';

import { motion } from 'framer-motion';
import { Sparkles, Play } from 'lucide-react';

export default function Hero({ onSceneChange, activeScene }) {
  return (
    <section className="relative h-full flex items-center justify-center z-10">
      {/* Animated Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/30 to-purple-900/80" />
      
      <div className="relative z-20 text-center px-4 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="mb-8"
        >
          <span className="text-8xl">🕉️</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight"
        >
          Divine
          <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
            Spiritual Journey
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-xl md:text-3xl text-white/90 mb-12 font-light"
        >
          Experience peace through immersive 3D meditation
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-wrap gap-4 justify-center mb-12"
        >
          <button className="group bg-gradient-to-r from-orange-500 to-pink-500 text-white px-10 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2">
            <Play size={20} />
            Start Journey
            <Sparkles className="group-hover:rotate-12 transition-transform" size={20} />
          </button>
          <button className="bg-white/10 backdrop-blur-xl border-2 border-white/30 text-white px-10 py-4 rounded-full font-semibold text-lg hover:bg-white/20 transition-all duration-300">
            Explore Temple
          </button>
        </motion.div>

        {/* Scene Switcher */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex gap-4 justify-center"
        >
          <button
            onClick={() => onSceneChange('om')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              activeScene === 'om'
                ? 'bg-white text-purple-900'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            🕉️ Om Scene
          </button>
          <button
            onClick={() => onSceneChange('temple')}
            className={`px-6 py-2 rounded-full font-medium transition-all ${
              activeScene === 'temple'
                ? 'bg-white text-purple-900'
                : 'bg-white/20 text-white hover:bg-white/30'
            }`}
          >
            🛕 Temple Scene
          </button>
        </motion.div>
      </div>

      {/* Floating Elements - Reduced for performance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl opacity-20"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: -50,
            }}
            animate={{ 
              y: (typeof window !== 'undefined' ? window.innerHeight : 1000) + 50,
              rotate: 360
            }}
            transition={{
              duration: Math.random() * 15 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          >
            {['🪷', '🙏', '✨'][i % 3]}
          </motion.div>
        ))}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/60 text-center"
        >
          <div className="text-sm mb-2">Scroll to explore</div>
          <div className="text-2xl">↓</div>
        </motion.div>
      </motion.div>
    </section>
  );
}
