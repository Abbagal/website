'use client';

import { Youtube, Instagram, Facebook, Twitter } from 'lucide-react';

export default function SocialLinks({ className = '' }) {
  const socialLinks = [
    {
      name: 'YouTube',
      url: 'https://youtube.com/@yourchannel',
      icon: Youtube,
      color: 'hover:text-red-500',
      bgColor: 'hover:bg-red-500/20'
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/yourusername',
      icon: Instagram,
      color: 'hover:text-pink-500',
      bgColor: 'hover:bg-pink-500/20'
    },
    {
      name: 'Facebook',
      url: 'https://facebook.com/yourpage',
      icon: Facebook,
      color: 'hover:text-blue-500',
      bgColor: 'hover:bg-blue-500/20'
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/yourusername',
      icon: Twitter,
      color: 'hover:text-sky-400',
      bgColor: 'hover:bg-sky-400/20'
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
