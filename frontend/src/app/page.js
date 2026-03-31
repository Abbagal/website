'use client';

import { Suspense, useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Features from '@/components/Features';
import MantrasSection from '@/components/MantrasSection';
import DailyBlogs from '@/components/DailyBlogs';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';
import Hero from '@/components/Hero';
import AstrologySection from '@/components/AstrologySection';
import ServicesSection from '@/components/ServicesSection';
import SpecialMantrasSection from '@/components/SpecialMantrasSection';
import QuickPujasSection from '@/components/QuickPujasSection';
import CreatorLinksSection from '@/components/CreatorLinksSection';
import AIChatWidget from '@/components/AIChatWidget';

import ErrorBoundary from '@/components/ErrorBoundary';

const Scene3D = dynamic(() => import('@/components/3d/Scene3D'), {
  ssr: false,
  loading: () => <LoadingScreen />
});

export default function Home() {
  const [activeScene, setActiveScene] = useState('om');

  return (
    <main className="relative overflow-hidden">
      <Navbar />
      
      {/* Hero with 3D Background */}
      <section className="relative h-screen">
        <div className="absolute inset-0 z-0">
          {activeScene === 'om' ? (
            <ErrorBoundary>
              <Suspense fallback={<LoadingScreen />}>
                <Scene3D />
              </Suspense>
            </ErrorBoundary>
          ) : (
            <div className="relative w-full h-full">
              <img 
                src="/temple.jpeg" 
                alt="Padmavati Devi Temple"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-purple-900/30 via-transparent to-purple-900/60"></div>
            </div>
          )}
        </div>
        <Hero onSceneChange={setActiveScene} activeScene={activeScene} />
      </section>

      {/* Interactive Features */}
      <Features />

      <ServicesSection />

      <SpecialMantrasSection />

      <QuickPujasSection />

      {/* Mantras with Audio */}
      <MantrasSection />

      {/* Vedic Astrology Section */}
      <AstrologySection />

      <CreatorLinksSection />

      {/* Daily Blogs Section */}
      <DailyBlogs />

      {/* Padmavati Temple with Real Image */}
      <section className="h-screen relative bg-gradient-to-b from-purple-900 to-indigo-900">
        {/* Temple Background Image */}
        <div className="absolute inset-0">
          <img 
            src="/temple.jpeg" 
            alt="Padmavati Devi Temple"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/50 via-transparent to-purple-900/80"></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white">
            <h2 className="text-5xl font-bold mb-4">🛕 Padmavati Devi Temple</h2>
            <p className="text-xl mb-4">Experience divine darshan</p>
            <p className="text-lg mb-8 text-yellow-300">Sacred temple of Goddess Padmavati</p>
            <button className="bg-white/20 backdrop-blur px-8 py-3 rounded-full hover:bg-white/30 transition">
              Enter Sacred Temple
            </button>
          </div>
        </div>
      </section>

      {/* Meditation Timer */}
      <section className="min-h-screen bg-gradient-to-b from-indigo-900 to-purple-900 flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-5xl font-bold text-white mb-8">🧘 Meditation Timer</h2>
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12">
            <div className="text-8xl font-bold text-white mb-8">00:00</div>
            <div className="flex gap-4 justify-center">
              <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-full font-semibold transition">
                Start
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full font-semibold transition">
                Stop
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <AIChatWidget />
    </main>
  );
}
