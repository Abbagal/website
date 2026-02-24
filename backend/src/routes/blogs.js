const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');

// Initialize Firebase Admin (if not already initialized)
if (!admin.apps.length) {
  try {
    // For local development, you can use a service account key
    // For production, use environment variables
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      // Or use service account: admin.credential.cert(serviceAccount)
    });
  } catch (error) {
    console.log('Firebase admin initialization error:', error);
  }
}

const db = admin.firestore();

// Sample blogs data (fallback if Firestore is not configured)
const sampleBlogs = [
  {
    id: 1,
    title: 'The Power of Morning Meditation',
    excerpt: 'Discover how starting your day with meditation can transform your life. Learn simple techniques to bring peace and clarity to your mornings.',
    content: 'Full blog content here...',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800',
    date: 'Feb 24, 2024',
    readTime: '5 min read',
    author: 'Spiritual Guide',
    category: 'Meditation',
    views: 1250,
    likes: 89
  },
  {
    id: 2,
    title: 'Understanding the Om Mantra',
    excerpt: 'Dive deep into the meaning and significance of Om, the primordial sound of the universe. Explore its spiritual and scientific aspects.',
    content: 'Full blog content here...',
    image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800',
    date: 'Feb 23, 2024',
    readTime: '7 min read',
    author: 'Yoga Master',
    category: 'Mantras',
    views: 2100,
    likes: 156
  },
  {
    id: 3,
    title: 'Chakra Healing for Beginners',
    excerpt: 'Learn about the seven chakras and how to balance your energy centers for optimal health and spiritual growth.',
    content: 'Full blog content here...',
    image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800',
    date: 'Feb 22, 2024',
    readTime: '10 min read',
    author: 'Energy Healer',
    category: 'Healing',
    views: 1800,
    likes: 134
  },
  {
    id: 4,
    title: 'Yoga Asanas for Inner Peace',
    excerpt: 'Explore powerful yoga poses that help calm the mind and bring inner peace. Perfect for beginners and advanced practitioners.',
    content: 'Full blog content here...',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800',
    date: 'Feb 21, 2024',
    readTime: '8 min read',
    author: 'Yoga Instructor',
    category: 'Yoga',
    views: 1650,
    likes: 112
  },
  {
    id: 5,
    title: 'The Art of Mindful Living',
    excerpt: 'Discover practical tips to incorporate mindfulness into your daily routine and experience life more fully.',
    content: 'Full blog content here...',
    image: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=800',
    date: 'Feb 20, 2024',
    readTime: '6 min read',
    author: 'Mindfulness Coach',
    category: 'Lifestyle',
    views: 1420,
    likes: 98
  },
  {
    id: 6,
    title: 'Sacred Temples of India',
    excerpt: 'Journey through the most sacred temples of India and learn about their spiritual significance and architectural beauty.',
    content: 'Full blog content here...',
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800',
    date: 'Feb 19, 2024',
    readTime: '12 min read',
    author: 'Travel Guide',
    category: 'Culture',
    views: 3200,
    likes: 245
  }
];

// Get all blogs
router.get('/', async (req, res) => {
  try {
    const { category, limit } = req.query;
    
    // Try to fetch from Firestore
    try {
      let blogsRef = db.collection('blogs');
      
      // Filter by category if provided
      if (category) {
        blogsRef = blogsRef.where('category', '==', category);
      }
      
      // Order by date
      blogsRef = blogsRef.orderBy('createdAt', 'desc');
      
      // Limit results if provided
      if (limit) {
        blogsRef = blogsRef.limit(parseInt(limit));
      }
      
      const snapshot = await blogsRef.get();
      
      if (snapshot.empty) {
        // If no blogs in Firestore, return sample data
        let filteredBlogs = sampleBlogs;
        
        if (category) {
          filteredBlogs = sampleBlogs.filter(blog => 
            blog.category.toLowerCase() === category.toLowerCase()
          );
        }
        
        if (limit) {
          filteredBlogs = filteredBlogs.slice(0, parseInt(limit));
        }
        
        return res.json({
          success: true,
          count: filteredBlogs.length,
          data: filteredBlogs,
          source: 'sample'
        });
      }
      
      const blogs = [];
      snapshot.forEach(doc => {
        blogs.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      res.json({
        success: true,
        count: blogs.length,
        data: blogs,
        source: 'firestore'
      });
      
    } catch (firestoreError) {
      console.log('Firestore error, using sample data:', firestoreError.message);
      
      // Fallback to sample data
      let filteredBlogs = sampleBlogs;
      
      if (category) {
        filteredBlogs = sampleBlogs.filter(blog => 
          blog.category.toLowerCase() === category.toLowerCase()
        );
      }
      
      if (limit) {
        filteredBlogs = filteredBlogs.slice(0, parseInt(limit));
      }
      
      res.json({
        success: true,
        count: filteredBlogs.length,
        data: filteredBlogs,
        source: 'sample'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blogs',
      error: error.message
    });
  }
});

// Get single blog by ID
router.get('/:id', async (req, res) => {
  try {
    const blogId = req.params.id;
    
    // Try to fetch from Firestore
    try {
      const docRef = db.collection('blogs').doc(blogId);
      const doc = await docRef.get();
      
      if (doc.exists) {
        // Increment view count
        await docRef.update({
          views: admin.firestore.FieldValue.increment(1)
        });
        
        return res.json({
          success: true,
          data: {
            id: doc.id,
            ...doc.data()
          },
          source: 'firestore'
        });
      }
      
      // If not found in Firestore, check sample data
      const blog = sampleBlogs.find(b => b.id === parseInt(blogId));
      
      if (!blog) {
        return res.status(404).json({
          success: false,
          message: 'Blog not found'
        });
      }
      
      res.json({
        success: true,
        data: blog,
        source: 'sample'
      });
      
    } catch (firestoreError) {
      console.log('Firestore error, using sample data:', firestoreError.message);
      
      // Fallback to sample data
      const blog = sampleBlogs.find(b => b.id === parseInt(blogId));
      
      if (!blog) {
        return res.status(404).json({
          success: false,
          message: 'Blog not found'
        });
      }
      
      res.json({
        success: true,
        data: blog,
        source: 'sample'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blog',
      error: error.message
    });
  }
});

// Get blog categories
router.get('/meta/categories', async (req, res) => {
  try {
    try {
      const snapshot = await db.collection('blogs').get();
      
      if (snapshot.empty) {
        const categories = [...new Set(sampleBlogs.map(blog => blog.category))];
        return res.json({
          success: true,
          data: categories,
          source: 'sample'
        });
      }
      
      const categories = new Set();
      snapshot.forEach(doc => {
        const data = doc.data();
        if (data.category) {
          categories.add(data.category);
        }
      });
      
      res.json({
        success: true,
        data: Array.from(categories),
        source: 'firestore'
      });
      
    } catch (firestoreError) {
      const categories = [...new Set(sampleBlogs.map(blog => blog.category))];
      res.json({
        success: true,
        data: categories,
        source: 'sample'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message
    });
  }
});

// Get popular blogs (by views)
router.get('/meta/popular', async (req, res) => {
  try {
    try {
      const snapshot = await db.collection('blogs')
        .orderBy('views', 'desc')
        .limit(5)
        .get();
      
      if (snapshot.empty) {
        const popularBlogs = [...sampleBlogs]
          .sort((a, b) => b.views - a.views)
          .slice(0, 5);
        
        return res.json({
          success: true,
          data: popularBlogs,
          source: 'sample'
        });
      }
      
      const blogs = [];
      snapshot.forEach(doc => {
        blogs.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      res.json({
        success: true,
        data: blogs,
        source: 'firestore'
      });
      
    } catch (firestoreError) {
      const popularBlogs = [...sampleBlogs]
        .sort((a, b) => b.views - a.views)
        .slice(0, 5);
      
      res.json({
        success: true,
        data: popularBlogs,
        source: 'sample'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching popular blogs',
      error: error.message
    });
  }
});

module.exports = router;
