'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Phone, Mail, User, Heart, Star, CheckCircle } from 'lucide-react';
import { api } from '../lib/api';

export default function ServicesSection() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [showBooking, setShowBooking] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    location: '',
    message: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.get('/api/services');
      setServices(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching services:', error);
      setLoading(false);
    }
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/services/book', {
        serviceId: selectedService.id,
        ...bookingForm
      });
      
      if (response.data.success) {
        alert('Booking request submitted successfully! We will contact you soon.');
        setShowBooking(false);
        setBookingForm({
          name: '',
          email: '',
          phone: '',
          date: '',
          location: '',
          message: ''
        });
      }
    } catch (error) {
      alert('Error submitting booking. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    setBookingForm({
      ...bookingForm,
      [e.target.name]: e.target.value
    });
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-6xl mb-4 animate-spin">🕉️</div>
          <p className="text-xl">Loading services...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="min-h-screen bg-gradient-to-b from-purple-900 via-indigo-900 to-blue-900 py-20">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-6">
            🛕 Sacred Services
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Traditional ceremonies and spiritual services for life's most important moments
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-300 hover:scale-105 group"
            >
              <div className="text-center mb-6">
                <div className="text-5xl mb-4">
                  {service.icon === 'temple' && '🛕'}
                  {service.icon === 'home' && '🏠'}
                  {service.icon === 'baby' && '👶'}
                  {service.icon === 'briefcase' && '💼'}
                  {service.icon === 'user' && '👤'}
                  {service.icon === 'calendar' && '📅'}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors">
                  {service.name}
                </h3>
                <p className="text-white/70 mb-4">
                  {service.description}
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-white/80">
                  <Clock size={16} />
                  <span className="text-sm">{service.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Star size={16} />
                  <span className="text-sm">{service.energy}</span>
                </div>
                <div className="text-yellow-300 font-semibold">
                  {service.price}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-white font-semibold mb-2">Includes:</h4>
                <ul className="space-y-1">
                  {service.includes.slice(0, 3).map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-white/70 text-sm">
                      <CheckCircle size={12} className="text-green-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-2 mb-6">
                {service.mode.map((mode, i) => (
                  <span key={i} className="px-2 py-1 bg-white/20 rounded-full text-xs text-white/80">
                    {mode}
                  </span>
                ))}
              </div>

              <button
                onClick={() => {
                  setSelectedService(service);
                  setShowBooking(true);
                }}
                className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-3 rounded-xl hover:shadow-2xl transition-all"
              >
                Book Service
              </button>
            </motion.div>
          ))}
        </div>

        {/* Booking Modal */}
        {showBooking && selectedService && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">
                  Book {selectedService.name}
                </h3>
                <p className="text-white/70">
                  Fill in your details and we'll contact you soon
                </p>
              </div>

              <form onSubmit={handleBooking} className="space-y-4">
                <div>
                  <label className="block text-white/80 mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={bookingForm.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-yellow-400"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-white/80 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={bookingForm.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-yellow-400"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-white/80 mb-2">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={bookingForm.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-yellow-400"
                    placeholder="+91 9876543210"
                  />
                </div>

                <div>
                  <label className="block text-white/80 mb-2">Preferred Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={bookingForm.date}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:border-yellow-400"
                  />
                </div>

                <div>
                  <label className="block text-white/80 mb-2">Location</label>
                  <input
                    type="text"
                    name="location"
                    value={bookingForm.location}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-yellow-400"
                    placeholder="City, State"
                  />
                </div>

                <div>
                  <label className="block text-white/80 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={bookingForm.message}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-yellow-400"
                    placeholder="Any special requirements or questions..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowBooking(false)}
                    className="flex-1 bg-white/20 text-white py-3 rounded-xl hover:bg-white/30 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-3 rounded-xl hover:shadow-2xl transition"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
