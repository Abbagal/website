'use client';

import { Youtube, Instagram, Music2 } from 'lucide-react';

export default function SocialLinks({ className = '' }) {
  const socialLinks = [
    {
      name: 'YouTube',
      url: process.env.NEXT_PUBLIC_YOUTUBE_URL || 'https://youtube.com/@yourchannel',
      icon: Youtube,
      color: 'hover:text-red-500',
      bgColor: 'hover:bg-red-500/20'
    },
    {
      name: 'Instagram',
      url: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/yourusername',
      icon: Instagram,
      color: 'hover:text-pink-500',
      bgColor: 'hover:bg-pink-500/20'
    },
    {
      name: 'TikTok',
      url: process.env.NEXT_PUBLIC_TIKTOK_URL || 'https://tiktok.com/@yourusername',
      icon: Music2,
      color: 'hover:text-cyan-300',
      bgColor: 'hover:bg-cyan-400/20'
    }
  ];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {socialLinks.map((social) => {
        const Icon = social.icon;
        return (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-2 rounded-full transition-all ${social.bgColor} ${social.color}`}
            title={social.name}
          >
            <Icon size={20} />
          </a>
        );
      })}
    </div>
  );
}
