'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Heart, Share2, ArrowLeft, TrendingUp, Eye } from 'lucide-react';
import axios from 'axios';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';

const Lotus = dynamic(() => import('@/components/3d/Lotus'), {
  ssr: false,
  loading: () => <LoadingScreen />
});

const Diya = dynamic(() => import('@/components/3d/Diya'), {
  ssr: false,
  loading: () => <LoadingScreen />
});

export default function BlogDetailPage() {
  const params = useParams();
  const [blog, setBlog] = useState(null);
  const [relatedBlogs, setRelatedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchBlog();
    }
  }, [params.id]);

  const fetchBlog = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      
      // Fetch main blog
      const response = await axios.get(`${API_URL}/api/blogs/${params.id}`);
      setBlog(response.data.data);
      
      // Fetch related blogs
      const relatedResponse = await axios.get(`${API_URL}/api/blogs?category=${response.data.data.category}&limit=3`);
      const related = relatedResponse.data.data.filter(b => b.id !== parseInt(params.id));
      setRelatedBlogs(related);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blog:', error);
      setLoading(false);
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    // TODO: Send like to backend/Firebase
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center text-white text-xl">
          <div className="inline-block animate-spin text-6xl mb-4">🕉️</div>
          <p>Loading blog...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Blog Not Found</h1>
          <Link href="/blogs">
            <button className="bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition">
              Back to Blogs
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900">
      <Navbar />

      {/* Floating 3D Elements */}
      <div className="fixed top-20 left-10 w-32 h-32 opacity-20 pointer-events-none z-0">
        <Suspense fallback={<div />}>
          <Lotus />
        </Suspense>
      </div>
      <div className="fixed bottom-20 right-10 w-32 h-32 opacity-20 pointer-events-none z-0">
        <Suspense fallback={<div />}>
          <Diya />
        </Suspense>
      </div>

      {/* Back Button */}
      <div className="relative z-10 pt-24 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/blogs">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-white/80 hover:text-white transition mb-8"
            >
              <ArrowLeft size={20} />
              <span>Back to Blogs</span>
            </motion.button>
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 px-4 mb-12"
      >
        <div className="max-w-5xl mx-auto">
          <div className="relative h-96 rounded-3xl overflow-hidden">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            
            {/* Category Badge */}
            <div className="absolute top-6 right-6 bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-medium">
              {blog.category}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Blog Content */}
      <article className="relative z-10 px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold text-white mb-6"
          >
            {blog.title}
          </motion.h1>

          {/* Meta Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap items-center gap-6 text-white/70 mb-8 pb-8 border-b border-white/20"
          >
            <div className="flex items-center gap-2">
              <User size={20} />
              <span className="font-medium">{blog.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={20} />
              <span>{blog.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={20} />
              <span>{blog.readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye size={20} />
              <span>{blog.views} views</span>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex gap-4 mb-12"
          >
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                liked
                  ? 'bg-red-500 text-white'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
              <span>{blog.likes + (liked ? 1 : 0)}</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 text-white hover:bg-white/20 font-semibold transition-all"
            >
              <Share2 size={20} />
              <span>Share</span>
            </button>
          </motion.div>

          {/* Blog Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 mb-16"
          >
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-xl text-white/90 leading-relaxed mb-6">
                {blog.excerpt}
              </p>
              
              <div className="text-white/80 leading-relaxed space-y-6">
                {/* Full content would come from database */}
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                
                <h2 className="text-3xl font-bold text-white mt-8 mb-4">Understanding the Practice</h2>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                
                <h2 className="text-3xl font-bold text-white mt-8 mb-4">Benefits and Insights</h2>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
                
                <blockquote className="border-l-4 border-orange-500 pl-6 italic text-white/90 my-8">
                  "The mind is everything. What you think you become." - Buddha
                </blockquote>
                
                <h2 className="text-3xl font-bold text-white mt-8 mb-4">Practical Steps</h2>
                <ul className="list-disc list-inside space-y-2">
                  <li>Start with 5 minutes daily meditation</li>
                  <li>Find a quiet, comfortable space</li>
                  <li>Focus on your breath</li>
                  <li>Be patient with yourself</li>
                  <li>Gradually increase duration</li>
                </ul>
                
                <p className="mt-6">
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Related Blogs */}
          {relatedBlogs.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <h2 className="text-4xl font-bold text-white mb-8">Related Blogs</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedBlogs.map((relatedBlog) => (
                  <Link key={relatedBlog.id} href={`/blogs/${relatedBlog.id}`}>
                    <div className="group bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden hover:bg-white/15 transition-all duration-300 hover:scale-105 cursor-pointer">
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={relatedBlog.image}
                          alt={relatedBlog.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-400 transition-colors line-clamp-2">
                          {relatedBlog.title}
                        </h3>
                        <p className="text-white/60 text-sm">{relatedBlog.readTime}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </article>

      <Footer />
    </main>
  );
}
