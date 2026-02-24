'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles, Music, Timer, BookOpen, Heart, Zap } from 'lucide-react';

const features = [
  {
    icon: <Sparkles size={40} />,
    title: '3D Sacred Symbols',
    description: 'Interactive Om, Lotus, and divine symbols in stunning 3D',
    color: 'from-yellow-400 to-orange-500'
  },
  {
    icon: <Music size={40} />,
    title: 'Divine Mantras',
    description: 'Listen to powerful mantras with beautiful visualizations',
    color: 'from-pink-400 to-purple-500'
  },
  {
    icon: <Timer size={40} />,
    title: 'Meditation Timer',
    description: 'Guided meditation sessions with ambient sounds',
    color: 'from-blue-400 to-cyan-500'
  },
  {
    icon: <BookOpen size={40} />,
    title: 'Spiritual Wisdom',
    description: 'Daily quotes and teachings from ancient scriptures',
    color: 'from-green-400 to-teal-500'
  },
  {
    icon: <Heart size={40} />,
    title: 'Peace & Healing',
    description: 'Calming experiences for inner peace and healing',
    color: 'from-red-400 to-pink-500'
  },
  {
    icon: <Zap size={40} />,
    title: 'Energy Boost',
    description: 'Revitalize your spirit with positive vibrations',
    color: 'from-purple-400 to-indigo-500'
  }
];

function FeatureCard({ feature, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl"
        style={{ background: `linear-gradient(to right, var(--tw-gradient-stops))` }}
      />
      
      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
        <div className={`inline-block p-4 rounded-xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform`}>
          <div className="text-white">
            {feature.icon}
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-3">
          {feature.title}
        </h3>
        
        <p className="text-white/70 text-lg leading-relaxed">
          {feature.description}
        </p>

        <div className="mt-6 flex items-center text-white/50 group-hover:text-white/80 transition-colors">
          <span className="text-sm font-medium">Explore</span>
          <motion.span
            className="ml-2"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Features() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-purple-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Spiritual Features
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Immerse yourself in a divine experience with our interactive 3D spiritual platform
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: '10K+', label: 'Active Users' },
            { number: '50+', label: 'Mantras' },
            { number: '100+', label: 'Meditations' },
            { number: '24/7', label: 'Available' }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                {stat.number}
              </div>
              <div className="text-white/60 text-lg">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
