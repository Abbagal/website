'use client';

import { Heart, Mail, Phone, MapPin } from 'lucide-react';
import SocialLinks from './SocialLinks';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-purple-900 to-black text-white py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-4xl">Om</span>
              <span className="text-2xl font-bold">Spiritual</span>
            </div>
            <p className="text-white/60 mb-4">
              Experience divine peace through immersive 3D meditation, ritual services, and sacred mantras.
            </p>
            <SocialLinks className="text-white" />
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                ['Home', '#'],
                ['Services', '#services'],
                ['Special Mantras', '#special-mantras'],
                ['Quick Pujas', '#quick-pujas'],
                ['Blogs', '#blogs'],
                ['Socials', '#socials']
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="text-white/60 hover:text-white transition">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Resources</h3>
            <ul className="space-y-2">
              {['Wedding Rituals', 'Healing Mantras', 'Festival Pujas', 'Daily Blogs', 'AI Assistant', 'Support'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/60 hover:text-white transition">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

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

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              Copyright 2024 Spiritual Journey. All rights reserved.
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
