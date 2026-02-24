'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Calendar, Clock, User, ArrowRight } from 'lucide-react';
import axios from 'axios';
import Link from 'next/link';

function BlogCard({ blog, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <Link href={`/blogs/${blog.id}`}>
      <motion.article
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="group relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden hover:bg-white/15 transition-all duration-300 hover:scale-105 cursor-pointer"
      >
      {/* Image */}
      {blog.image && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Meta Info */}
        <div className="flex items-center gap-4 text-white/60 text-sm mb-3">
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            <span>{blog.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{blog.readTime}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
          {blog.title}
        </h3>

        {/* Excerpt */}
        <p className="text-white/70 mb-4 line-clamp-3">
          {blog.excerpt}
        </p>

        {/* Author */}
        {blog.author && (
          <div className="flex items-center gap-2 text-white/60 text-sm mb-4">
            <User size={16} />
            <span>{blog.author}</span>
          </div>
        )}

        {/* Read More */}
        <div className="flex items-center gap-2 text-orange-400 font-semibold group-hover:gap-3 transition-all">
          Read More
          <ArrowRight size={18} />
        </div>
      </div>

      {/* Category Badge */}
      {blog.category && (
        <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          {blog.category}
        </div>
      )}
      </motion.article>
    </Link>
  );
}

export default function DailyBlogs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await axios.get(`${API_URL}/api/blogs`);
      setBlogs(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      // Fallback to sample data if API fails
      setBlogs(sampleBlogs);
      setLoading(false);
    }
  };

  return (
    <section ref={ref} className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            📖 Daily Spiritual Blogs
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Discover daily wisdom, insights, and spiritual guidance from our community
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center text-white text-xl">
            <div className="inline-block animate-spin text-6xl mb-4">🕉️</div>
            <p>Loading blogs...</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {blogs.map((blog, index) => (
                <BlogCard key={blog.id} blog={blog} index={index} />
              ))}
            </div>

            {/* View All Button */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center"
            >
              <Link href="/blogs">
                <button className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                  View All Blogs →
                </button>
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}

// Sample blogs (fallback data)
const sampleBlogs = [
  {
    id: 1,
    title: 'The Power of Morning Meditation',
    excerpt: 'Discover how starting your day with meditation can transform your life. Learn simple techniques to bring peace and clarity to your mornings.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
    date: 'Feb 24, 2024',
    readTime: '5 min read',
    author: 'Spiritual Guide',
    category: 'Meditation'
  },
  {
    id: 2,
    title: 'Understanding the Om Mantra',
    excerpt: 'Dive deep into the meaning and significance of Om, the primordial sound of the universe. Explore its spiritual and scientific aspects.',
    image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800',
    date: 'Feb 23, 2024',
    readTime: '7 min read',
    author: 'Yoga Master',
    category: 'Mantras'
  },
  {
    id: 3,
    title: 'Chakra Healing for Beginners',
    excerpt: 'Learn about the seven chakras and how to balance your energy centers for optimal health and spiritual growth.',
    image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800',
    date: 'Feb 22, 2024',
    readTime: '10 min read',
    author: 'Energy Healer',
    category: 'Healing'
  },
  {
    id: 4,
    title: 'Yoga Asanas for Inner Peace',
    excerpt: 'Explore powerful yoga poses that help calm the mind and bring inner peace. Perfect for beginners and advanced practitioners.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
    date: 'Feb 21, 2024',
    readTime: '8 min read',
    author: 'Yoga Instructor',
    category: 'Yoga'
  },
  {
    id: 5,
    title: 'The Art of Mindful Living',
    excerpt: 'Discover practical tips to incorporate mindfulness into your daily routine and experience life more fully.',
    image: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800',
    date: 'Feb 20, 2024',
    readTime: '6 min read',
    author: 'Mindfulness Coach',
    category: 'Lifestyle'
  },
  {
    id: 6,
    title: 'Sacred Temples of India',
    excerpt: 'Journey through the most sacred temples of India and learn about their spiritual significance and architectural beauty.',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800',
    date: 'Feb 19, 2024',
    readTime: '12 min read',
    author: 'Travel Guide',
    category: 'Culture'
  }
];
