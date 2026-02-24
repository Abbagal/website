require('dotenv').config();
const admin = require('firebase-admin');

// Initialize Firebase Admin
// For local development, download service account key from Firebase Console
// and set GOOGLE_APPLICATION_CREDENTIALS environment variable
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}

const db = admin.firestore();

const sampleBlogs = [
  {
    title: 'The Power of Morning Meditation',
    excerpt: 'Discover how starting your day with meditation can transform your life. Learn simple techniques to bring peace and clarity to your mornings.',
    content: `
# The Power of Morning Meditation

Starting your day with meditation can be a transformative practice that sets the tone for everything that follows. In this comprehensive guide, we'll explore the profound benefits of morning meditation and provide you with practical techniques to incorporate this ancient practice into your daily routine.

## Why Morning Meditation?

The early morning hours, known as "Brahma Muhurta" in Vedic tradition, are considered the most auspicious time for spiritual practices. During these quiet hours, the mind is naturally calm, and the world around us is peaceful, making it easier to turn inward.

## Benefits of Morning Meditation

1. **Mental Clarity**: Start your day with a clear, focused mind
2. **Reduced Stress**: Lower cortisol levels throughout the day
3. **Improved Focus**: Enhanced concentration and productivity
4. **Emotional Balance**: Better emotional regulation and resilience
5. **Physical Health**: Lower blood pressure and improved immune function

## Simple Techniques for Beginners

### 1. Breath Awareness
Focus on your natural breath. Count each inhale and exhale up to 10, then start a