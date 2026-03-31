'use client';

import { useState } from 'react';
import { Menu, X, LogIn } from 'lucide-react';
import SocialLinks from './SocialLinks';
import LoginModal from './LoginModal';
import UserProfile from './UserProfile';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { user, updateUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginSuccess = (userData) => {
    updateUser(userData);
  };

  const handleLogout = () => {};

  const handleUpdateUser = (updatedUser) => {
    updateUser(updatedUser);
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <img 
                src="/logo.png" 
                alt="Spiritual Logo" 
                className="h-10 w-auto hover:scale-105 transition-transform duration-300 filter drop-shadow-lg"
                style={{ maxWidth: '160px' }}
              />
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-white hover:bg-white/20 px-3 py-2 rounded-md text-sm font-medium transition"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <SocialLinks />
              
              {/* Authentication Section */}
              {user ? (
                <UserProfile 
                  user={user} 
                  onLogout={handleLogout}
                  onUpdateUser={handleUpdateUser}
                />
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full hover:shadow-lg transition-all"
                >
                  <LogIn size={16} />
                  Login
                </button>
              )}
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white p-2"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden bg-white/10 backdrop-blur-lg">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white hover:bg-white/20 block px-3 py-2 rounded-md text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              
              {/* Mobile Authentication */}
              <div className="pt-4 border-t border-white/20">
                {user ? (
                  <div className="flex items-center gap-3 px-3 py-2">
                    <UserProfile 
                      user={user} 
                      onLogout={handleLogout}
                      onUpdateUser={handleUpdateUser}
                    />
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setShowLoginModal(true);
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full hover:shadow-lg transition-all mx-3"
                  >
                    <LogIn size={16} />
                    Login / Register
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}

const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'Services', href: '#services' },
  { name: 'Special Mantras', href: '#special-mantras' },
  { name: 'Quick Pujas', href: '#quick-pujas' },
  { name: 'Mantras', href: '#mantras' },
  { name: 'Astrology', href: '#astrology' },
  { name: 'Blogs', href: '#blogs' },
  { name: 'Socials', href: '#socials' },
];
