'use client';

import { Heart, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-purple-900 to-black text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-4xl">🕉️</span>
              <span className="text-2xl font-bold">Spiritual</span>
            </div>
            <p className="text-white/60 mb-4">
              Experience divine peace through immersive 3D meditation and sacred mantras
            </p>
            <div className="flex gap-4">
              <a
                href="https://youtube.com/@yourchannel"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition"
                title="YouTube"
              >
                <span className="text-xl">📺</span>
              </a>
              <a
                href="https://instagram.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-600 rounded-full flex items-center justify-center hover:opacity-80 transition"
                title="Instagram"
              >
                <span className="text-xl">📷</span>
              </a>
              <a
                href="https://facebook.com/yourpage"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition"
                title="Facebook"
              >
                <span className="text-xl">📘</span>
              </a>
              <a
                href="https://twitter.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center hover:bg-sky-600 transition"
                title="Twitter"
              >
                <span className="text-xl">🐦</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Mantras', 'Meditation', 'Temple', 'About Us', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/60 hover:text-white transition">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-xl font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              {['Spiritual Guide', 'Daily Quotes', 'Yoga Tips', 'Blog', 'FAQ', 'Support'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/60 hover:text-white transition">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-white/60">
                <Mail size={20} />
                <span>info@spiritual.com</span>
              </li>
              <li className="flex items-center gap-3 text-white/60">
                <Phone size={20} />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3 text-white/60">
                <MapPin size={20} />
                <span>Mumbai, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              © 2024 Spiritual Journey. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-white/60 text-sm">
              Made with <Heart size={16} className="text-red-500" fill="currentColor" /> in India
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-white/60 hover:text-white transition">
                Privacy Policy
              </a>
              <a href="#" className="text-white/60 hover:text-white transition">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
