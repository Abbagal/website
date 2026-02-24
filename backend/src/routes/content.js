const express = require('express');
const router = express.Router();

// Sample spiritual content
const content = {
  quotes: [
    {
      id: 1,
      text: 'The mind is everything. What you think you become.',
      author: 'Buddha'
    },
    {
      id: 2,
      text: 'Yoga is the journey of the self, through the self, to the self.',
      author: 'Bhagavad Gita'
    },
    {
      id: 3,
      text: 'When you realize there is nothing lacking, the whole world belongs to you.',
      author: 'Lao Tzu'
    }
  ],
  practices: [
    {
      id: 1,
      name: 'Morning Meditation',
      duration: '15 minutes',
      description: 'Start your day with peaceful meditation'
    },
    {
      id: 2,
      name: 'Evening Prayer',
      duration: '10 minutes',
      description: 'End your day with gratitude'
    }
  ]
};

// Get daily quote
router.get('/quote', (req, res) => {
  const randomQuote = content.quotes[Math.floor(Math.random() * content.quotes.length)];
  res.json({
    success: true,
    data: randomQuote
  });
});

// Get all practices
router.get('/practices', (req, res) => {
  res.json({
    success: true,
    data: content.practices
  });
});

module.exports = router;
