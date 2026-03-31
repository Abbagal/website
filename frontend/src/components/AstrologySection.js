'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Calendar, MapPin, Clock, User, Scroll } from 'lucide-react';
import { api } from '../lib/api';

export default function AstrologySection() {
  const [activeTab, setActiveTab] = useState('rasi');
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    timeOfBirth: '',
    placeOfBirth: '',
    gotra: ''
  });
  const [result, setResult] = useState(null);
  const [hinduCalendar, setHinduCalendar] = useState(null);
  const [sankalpam, setSankalpam] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculateRasiNakshatra = async () => {
    setLoading(true);
    try {
      const response = await api.post('/api/astrology/calculate', formData);
      
      if (response.data.success) {
        setResult(response.data.data);
      } else {
        alert('Error: ' + response.data.message);
      }
    } catch (error) {
      console.error('Calculation error:', error);
      alert('Error calculating astrology data: ' + (error.response?.data?.message || error.message));
    }
    setLoading(false);
  };

  const getHinduCalendar = async (date = new Date().toISOString().split('T')[0]) => {
    setLoading(true);
    try {
      const response = await api.post('/api/astrology/hindu-calendar', {
        date,
        placeOfBirth: formData.placeOfBirth || 'Delhi, India'
      });

      if (response.data.success) {
        setHinduCalendar(response.data.data);
      } else {
        alert('Error: ' + response.data.message);
      }
    } catch (error) {
      console.error('Hindu calendar error:', error);
      // Show user-friendly error message
      const errorMessage = error.response?.data?.message || 'Unable to calculate Hindu calendar. Please try again.';
      alert('Error: ' + errorMessage);
    }
    setLoading(false);
  };

  const generateSankalpam = async () => {
    if (!result) {
      alert('Please calculate Rasi & Nakshatra first');
      return;
    }

    setLoading(true);
    try {
      const profile = {
        name: formData.name,
        nakshatra: result.nakshatra.name,
        rasi: result.rasi.name,
        placeOfBirth: formData.placeOfBirth,
        gotra: formData.gotra
      };

      const response = await api.post('/api/astrology/sankalpam', {
        profile,
        placeOfBirth: formData.placeOfBirth
      });

      if (response.data.success) {
        setSankalpam(response.data.data);
      }
    } catch (error) {
      console.error('Sankalpam error:', error);
      alert('Error generating Sankalpam: ' + (error.response?.data?.message || error.message));
    }
    setLoading(false);
  };

  return (
    <section id="astrology" className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 py-20">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-6">
            🌟 Vedic Astrology
          </h2>
          <p className="text-xl text-white/80 mb-8">
            Discover your Rasi, Nakshatra & generate personalized Sankalpam
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white/10 backdrop-blur-xl rounded-full p-2 flex gap-2">
            {[
              { id: 'rasi', label: 'Rasi & Nakshatra', icon: Star },
              { id: 'calendar', label: 'Hindu Calendar', icon: Calendar },
              { id: 'sankalpam', label: 'Sankalpam', icon: Scroll }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${
                  activeTab === id
                    ? 'bg-white text-purple-900'
                    : 'text-white hover:bg-white/20'
                }`}
              >
                <Icon size={20} />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Rasi & Nakshatra Tab */}
        {activeTab === 'rasi' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="grid md:grid-cols-2 gap-8"
          >
            {/* Form */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <User size={24} />
                Birth Details
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white/80 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-yellow-400"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-white/80 mb-2">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:border-yellow-400"
                  />
                </div>

                <div>
                  <label className="block text-white/80 mb-2">Time of Birth</label>
                  <input
                    type="time"
                    name="timeOfBirth"
                    value={formData.timeOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:border-yellow-400"
                  />
                </div>

                <div>
                  <label className="block text-white/80 mb-2">Place of Birth</label>
                  <input
                    type="text"
                    name="placeOfBirth"
                    value={formData.placeOfBirth}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-yellow-400"
                    placeholder="City, State, Country"
                  />
                </div>

                <div>
                  <label className="block text-white/80 mb-2">Gotra (Optional)</label>
                  <input
                    type="text"
                    name="gotra"
                    value={formData.gotra}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-yellow-400"
                    placeholder="Your gotra"
                  />
                </div>

                <button
                  onClick={calculateRasiNakshatra}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-4 rounded-xl hover:shadow-2xl transition-all disabled:opacity-50"
                >
                  {loading ? 'Calculating...' : 'Calculate Rasi & Nakshatra'}
                </button>
              </div>
            </div>

            {/* Results */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Star size={24} />
                Your Astrology
              </h3>

              {result ? (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-yellow-400/20 to-orange-500/20 rounded-xl p-6">
                    <h4 className="text-xl font-bold text-yellow-300 mb-4">🌙 Rasi (Moon Sign)</h4>
                    <div className="grid grid-cols-2 gap-4 text-white">
                      <div>
                        <span className="text-white/60">Name:</span>
                        <p className="font-semibold">{result.rasi.name}</p>
                      </div>
                      <div>
                        <span className="text-white/60">English:</span>
                        <p className="font-semibold">{result.rasi.english}</p>
                      </div>
                      <div>
                        <span className="text-white/60">Lord:</span>
                        <p className="font-semibold">{result.rasi.lord}</p>
                      </div>
                      <div>
                        <span className="text-white/60">Element:</span>
                        <p className="font-semibold">{result.rasi.element}</p>
                      </div>
                      <div>
                        <span className="text-white/60">Quality:</span>
                        <p className="font-semibold">{result.rasi.quality}</p>
                      </div>
                      <div>
                        <span className="text-white/60">Degree:</span>
                        <p className="font-semibold">{result.rasi.degree}°</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-pink-400/20 to-purple-500/20 rounded-xl p-6">
                    <h4 className="text-xl font-bold text-pink-300 mb-4">⭐ Nakshatra (Birth Star)</h4>
                    <div className="grid grid-cols-2 gap-4 text-white">
                      <div>
                        <span className="text-white/60">Name:</span>
                        <p className="font-semibold">{result.nakshatra.name}</p>
                      </div>
                      <div>
                        <span className="text-white/60">Lord:</span>
                        <p className="font-semibold">{result.nakshatra.lord}</p>
                      </div>
                      <div>
                        <span className="text-white/60">Deity:</span>
                        <p className="font-semibold">{result.nakshatra.deity}</p>
                      </div>
                      <div>
                        <span className="text-white/60">Pada:</span>
                        <p className="font-semibold">{result.nakshatra.pada}</p>
                      </div>
                      <div>
                        <span className="text-white/60">Degree:</span>
                        <p className="font-semibold">{result.nakshatra.degree}°</p>
                      </div>
                      <div>
                        <span className="text-white/60">Complete:</span>
                        <p className="font-semibold">{result.nakshatra.percentComplete}%</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-400/20 to-indigo-500/20 rounded-xl p-6">
                    <h4 className="text-xl font-bold text-blue-300 mb-4">📍 Birth Details</h4>
                    <div className="text-white space-y-2">
                      <p><span className="text-white/60">Name:</span> {result.name}</p>
                      <p><span className="text-white/60">Date:</span> {result.dateOfBirth}</p>
                      <p><span className="text-white/60">Time:</span> {result.timeOfBirth}</p>
                      <p><span className="text-white/60">Place:</span> {result.placeOfBirth}</p>
                      {result.coordinates && (
                        <p><span className="text-white/60">Coordinates:</span> {result.coordinates.latitude.toFixed(4)}°N, {result.coordinates.longitude.toFixed(4)}°E</p>
                      )}
                      <p><span className="text-white/60">Moon Position:</span> {result.moonPosition}°</p>
                      <p><span className="text-white/60">Method:</span> {result.calculationMethod}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center text-white/60 py-12">
                  <Star size={48} className="mx-auto mb-4 opacity-50" />
                  <p>Fill the form and calculate to see your astrology details</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Hindu Calendar Tab */}
        {activeTab === 'calendar' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Calendar size={24} />
                Hindu Calendar Today
              </h3>

              <button
                onClick={() => getHinduCalendar()}
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold py-4 rounded-xl hover:shadow-2xl transition-all disabled:opacity-50 mb-6"
              >
                {loading ? 'Loading...' : 'Get Today\'s Hindu Calendar'}
              </button>

              {hinduCalendar && (
                <div className="bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-xl p-6">
                  <div className="grid md:grid-cols-2 gap-4 text-white">
                    <div>
                      <span className="text-white/60">Hindu Year:</span>
                      <p className="font-semibold text-lg">{hinduCalendar.hinduYear}</p>
                    </div>
                    <div>
                      <span className="text-white/60">Month:</span>
                      <p className="font-semibold text-lg">{hinduCalendar.hinduMonth}</p>
                    </div>
                    <div>
                      <span className="text-white/60">Paksha:</span>
                      <p className="font-semibold text-lg">{hinduCalendar.paksha}</p>
                    </div>
                    <div>
                      <span className="text-white/60">Tithi:</span>
                      <p className="font-semibold text-lg">{hinduCalendar.tithi}</p>
                    </div>
                    <div>
                      <span className="text-white/60">Nakshatra:</span>
                      <p className="font-semibold text-lg">{hinduCalendar.nakshatra}</p>
                    </div>
                    <div>
                      <span className="text-white/60">Nakshatra Lord:</span>
                      <p className="font-semibold text-lg">{hinduCalendar.nakshatraLord}</p>
                    </div>
                    <div>
                      <span className="text-white/60">Deity:</span>
                      <p className="font-semibold text-lg">{hinduCalendar.nakshatraDeity}</p>
                    </div>
                    <div>
                      <span className="text-white/60">Weekday:</span>
                      <p className="font-semibold text-lg">{hinduCalendar.weekday}</p>
                    </div>
                  </div>
                  {hinduCalendar.place && (
                    <div className="mt-4 pt-4 border-t border-white/20">
                      <span className="text-white/60">Calculated for:</span>
                      <p className="font-semibold text-sm">{hinduCalendar.place}</p>
                    </div>
                  )}
                  {hinduCalendar.calculationMethod && (
                    <div className="mt-2">
                      <span className="text-white/60">Method:</span>
                      <p className="font-semibold text-xs">{hinduCalendar.calculationMethod}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Sankalpam Tab */}
        {activeTab === 'sankalpam' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Scroll size={24} />
                Personalized Sankalpam
              </h3>

              <button
                onClick={generateSankalpam}
                disabled={loading || !result}
                className="w-full bg-gradient-to-r from-orange-400 to-red-500 text-white font-bold py-4 rounded-xl hover:shadow-2xl transition-all disabled:opacity-50 mb-6"
              >
                {loading ? 'Generating...' : 'Generate Sankalpam Mantra'}
              </button>

              {!result && (
                <div className="text-center text-yellow-300 mb-6 p-4 bg-yellow-400/10 rounded-xl">
                  Please calculate your Rasi & Nakshatra first to generate Sankalpam
                </div>
              )}

              {sankalpam && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-orange-400/20 to-red-500/20 rounded-xl p-6">
                    <h4 className="text-xl font-bold text-orange-300 mb-4">🕉️ Sanskrit Sankalpam</h4>
                    <div className="bg-black/20 rounded-xl p-4 font-mono text-yellow-200 text-sm leading-relaxed whitespace-pre-line">
                      {sankalpam.sankalpam.sanskrit}
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-400/20 to-green-500/20 rounded-xl p-6">
                    <h4 className="text-xl font-bold text-blue-300 mb-4">📖 Meaning</h4>
                    <p className="text-white leading-relaxed">
                      {sankalpam.sankalpam.meaning}
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-xl p-6">
                    <h4 className="text-xl font-bold text-purple-300 mb-4">📅 Today's Details</h4>
                    <div className="grid md:grid-cols-3 gap-4 text-white text-sm">
                      <div>
                        <span className="text-white/60">Year:</span>
                        <p>{sankalpam.hinduCalendar.hinduYear}</p>
                      </div>
                      <div>
                        <span className="text-white/60">Month:</span>
                        <p>{sankalpam.hinduCalendar.hinduMonth}</p>
                      </div>
                      <div>
                        <span className="text-white/60">Tithi:</span>
                        <p>{sankalpam.hinduCalendar.tithi}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
