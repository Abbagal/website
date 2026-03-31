'use client';

import { motion } from 'framer-motion';
import { Instagram, Music2, Youtube } from 'lucide-react';

const creatorLinks = [
  {
    name: 'Instagram',
    href: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/yourusername',
    icon: Instagram,
    accent: 'from-pink-500 to-orange-400'
  },
  {
    name: 'TikTok',
    href: process.env.NEXT_PUBLIC_TIKTOK_URL || 'https://tiktok.com/@yourusername',
    icon: Music2,
    accent: 'from-cyan-400 to-fuchsia-500'
  },
  {
    name: 'YouTube',
    href: process.env.NEXT_PUBLIC_YOUTUBE_URL || 'https://youtube.com/@yourchannel',
    icon: Youtube,
    accent: 'from-red-500 to-rose-400'
  }
];

export default function CreatorLinksSection() {
  return (
    <section id="socials" className="relative bg-gradient-to-b from-red-950 via-neutral-950 to-purple-950 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-white/60 uppercase tracking-[0.35em] text-sm mb-4">Creator Links</p>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">Instagram, TikTok, and YouTube are now part of the main flow</h2>
          <p className="max-w-3xl mx-auto text-lg text-white/70">
            Visitors can jump directly into short-form clips, temple visuals, and long-form teachings from one section.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {creatorLinks.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/10 p-8 backdrop-blur-2xl"
              >
                <div className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br ${item.accent}`} />
                <div className="relative z-10">
                  <div className="mb-6 inline-flex rounded-2xl bg-white/10 p-4 text-white">
                    <Icon size={32} />
                  </div>
                  <h3 className="text-3xl font-bold text-white">{item.name}</h3>
                  <p className="mt-3 text-white/70">Open {item.name} and continue the spiritual journey beyond the website.</p>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
