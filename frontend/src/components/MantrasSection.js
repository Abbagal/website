'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';

const mantras = [
  {
    id: 1,
    name: 'Om Mantra',
    sanskrit: 'ॐ',
    transliteration: 'Om',
    meaning: 'The primordial sound of the universe',
    benefits: ['Inner Peace', 'Mental Clarity', 'Spiritual Awakening'],
    duration: '5:00',
    color: 'from-orange-400 to-red-500'
  },
  {
    id: 2,
    name: 'Gayatri Mantra',
    sanskrit: 'ॐ भूर्भुवः स्वः',
    transliteration: 'Om Bhur Bhuvaḥ Svaḥ',
    meaning: 'Invoking the divine light of wisdom',
    benefits: ['Wisdom', 'Protection', 'Enlightenment'],
    duration: '10:00',
    color: 'from-yellow-400 to-orange-500'
  },
  {
    id: 3,
    name: 'Maha Mrityunjaya',
    sanskrit: 'ॐ त्र्यम्बकं यजामहे',
    transliteration: 'Om Tryambakam Yajamahe',
    meaning: 'Victory over death and liberation',
    benefits: ['Healing', 'Longevity', 'Protection'],
    duration: '15:00',
    color: 'from-purple-400 to-pink-500'
  }
];

function MantraCard({ mantra, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="group relative"
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${mantra.color} opacity-20 group-hover:opacity-30 transition-opacity rounded-3xl blur-xl`} />
      
      <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-300">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-3xl font-bold text-white mb-2">
              {mantra.name}
            </h3>
            <p className="text-white/60">{mantra.duration}</p>
          </div>
          <div className="text-6xl">
            {mantra.sanskrit.split(' ')[0]}
          </div>
        </div>

        {/* Sanskrit Text */}
        <div className="bg-white/5 rounded-2xl p-6 mb-6">
          <p className="text-2xl text-white font-sanskrit text-center mb-3">
            {mantra.sanskrit}
          </p>
          <p className="text-white/60 text-center italic">
            {mantra.transliteration}
          </p>
        </div>

        {/* Meaning */}
        <p className="text-white/80 text-lg mb-6 leading-relaxed">
          {mantra.meaning}
        </p>

        {/* Benefits */}
        <div className="mb-6">
          <p className="text-white/60 text-sm mb-3">Benefits:</p>
          <div className="flex flex-wrap gap-2">
            {mantra.benefits.map((benefit, i) => (
              <span
                key={i}
                className={`px-4 py-2 rounded-full bg-gradient-to-r ${mantra.color} text-white text-sm font-medium`}
              >
                {benefit}
              </span>
            ))}
          </div>
        </div>

        {/* Play Button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className={`w-full bg-gradient-to-r ${mantra.color} text-white py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-3 hover:shadow-2xl hover:scale-105 transition-all duration-300`}
        >
          {isPlaying ? (
            <>
              <Pause size={24} />
              Pause Mantra
            </>
          ) : (
            <>
              <Play size={24} />
              Play Mantra
            </>
          )}
          <Volume2 size={24} />
        </button>

        {/* Waveform Animation (when playing) */}
        {isPlaying && (
          <motion.div className="mt-4 flex items-center justify-center gap-1">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 bg-white/60 rounded-full"
                animate={{
                  height: [10, 30, 10],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.05,
                }}
              />
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default function MantrasSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section id="mantras" ref={ref} className="min-h-screen bg-gradient-to-b from-purple-900 via-pink-900 to-purple-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            🎵 Sacred Mantras
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Experience the divine power of ancient mantras with beautiful 3D visualizations
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-1 gap-8 max-w-4xl mx-auto">
          {mantras.map((mantra, index) => (
            <MantraCard key={mantra.id} mantra={mantra} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <button className="bg-white text-purple-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-2xl">
            Explore All Mantras →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
