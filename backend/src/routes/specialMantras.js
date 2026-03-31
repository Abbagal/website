const express = require('express');
const router = express.Router();

// Special Mantras data
const specialMantras = [
  {
    id: 1,
    name: 'Mahamrityunjaya Mantra',
    sanskrit: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात्',
    transliteration: 'Om Tryambakam Yajamahe Sugandhim Pushtivardhanam Urvarukamiva Bandhanan Mrityor Mukshiya Maamritat',
    meaning: 'We worship the three-eyed Lord Shiva who is fragrant and nourishes all. Like a ripe cucumber falls off from the bondage of the stem, may we be liberated from death and attain immortality.',
    benefits: ['Healing', 'Protection from death', 'Longevity', 'Spiritual liberation'],
    deity: 'Lord Shiva',
    duration: '108 times',
    bestTime: 'Early morning or evening',
    category: 'Healing',
    difficulty: 'Intermediate',
    audioUrl: '/audio/mahamrityunjaya.mp3',
    image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800'
  },
  {
    id: 2,
    name: 'Gayatri Mantra',
    sanskrit: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्',
    transliteration: 'Om Bhur Bhuvaḥ Swaḥ Tat-savitur Vareñyaṃ Bhargo Devasya Dhīmahi Dhiyo Yo Naḥ Prachodayāt',
    meaning: 'We meditate on the glory of the Creator who has created the Universe, who is worthy of worship, who is the embodiment of knowledge and light, who is the remover of all sin and ignorance. May he enlighten our intellect.',
    benefits: ['Wisdom', 'Mental clarity', 'Spiritual awakening', 'Divine protection'],
    deity: 'Goddess Gayatri / Sun God',
    duration: '108 times',
    bestTime: 'Sunrise, noon, sunset',
    category: 'Wisdom',
    difficulty: 'Beginner',
    audioUrl: '/audio/gayatri.mp3',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800'
  },
  {
    id: 3,
    name: 'Ganesha Mantra',
    sanskrit: 'ॐ गं गणपतये नमः',
    transliteration: 'Om Gam Ganapataye Namaha',
    meaning: 'I bow to Lord Ganesha, the remover of obstacles and the lord of beginnings.',
    benefits: ['Remove obstacles', 'Success in endeavors', 'Wisdom', 'Good fortune'],
    deity: 'Lord Ganesha',
    duration: '108 times',
    bestTime: 'Before starting any work',
    category: 'Success',
    difficulty: 'Beginner',
    audioUrl: '/audio/ganesha.mp3',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'
  },
  {
    id: 4,
    name: 'Lakshmi Mantra',
    sanskrit: 'ॐ श्रीं महालक्ष्म्यै नमः',
    transliteration: 'Om Shreem Mahalakshmyai Namaha',
    meaning: 'I bow to Goddess Lakshmi, the bestower of wealth and prosperity.',
    benefits: ['Wealth', 'Prosperity', 'Abundance', 'Material success'],
    deity: 'Goddess Lakshmi',
    duration: '108 times',
    bestTime: 'Friday evening',
    category: 'Prosperity',
    difficulty: 'Beginner',
    audioUrl: '/audio/lakshmi.mp3',
    image: 'https://images.unsplash.com/photo-1604608672516-f1b9b1a5b9b5?w=800'
  },
  {
    id: 5,
    name: 'Saraswati Mantra',
    sanskrit: 'ॐ ऐं सरस्वत्यै नमः',
    transliteration: 'Om Aim Saraswatyai Namaha',
    meaning: 'I bow to Goddess Saraswati, the goddess of knowledge, music, arts, and wisdom.',
    benefits: ['Knowledge', 'Learning', 'Creativity', 'Artistic skills'],
    deity: 'Goddess Saraswati',
    duration: '108 times',
    bestTime: 'Early morning',
    category: 'Knowledge',
    difficulty: 'Beginner',
    audioUrl: '/audio/saraswati.mp3',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800'
  },
  {
    id: 6,
    name: 'Hanuman Mantra',
    sanskrit: 'ॐ हं हनुमते नमः',
    transliteration: 'Om Ham Hanumate Namaha',
    meaning: 'I bow to Lord Hanuman, the embodiment of strength, courage, and devotion.',
    benefits: ['Strength', 'Courage', 'Protection', 'Devotion'],
    deity: 'Lord Hanuman',
    duration: '108 times',
    bestTime: 'Tuesday or Saturday',
    category: 'Strength',
    difficulty: 'Beginner',
    audioUrl: '/audio/hanuman.mp3',
    image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800'
  }
];

// Get all special mantras
router.get('/', (req, res) => {
  const { category, difficulty } = req.query;
  
  let filteredMantras = specialMantras;
  
  if (category) {
    filteredMantras = filteredMantras.filter(mantra => 
      mantra.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  if (difficulty) {
    filteredMantras = filteredMantras.filter(mantra => 
      mantra.difficulty.toLowerCase() === difficulty.toLowerCase()
    );
  }
  
  res.json({
    success: true,
    count: filteredMantras.length,
    data: filteredMantras
  });
});

// Get single mantra
router.get('/:id', (req, res) => {
  const mantra = specialMantras.find(m => m.id === parseInt(req.params.id));
  
  if (!mantra) {
    return res.status(404).json({
      success: false,
      message: 'Mantra not found'
    });
  }
  
  res.json({
    success: true,
    data: mantra
  });
});

// Get mantras by category
router.get('/category/:category', (req, res) => {
  const category = req.params.category;
  const mantras = specialMantras.filter(m => 
    m.category.toLowerCase() === category.toLowerCase()
  );
  
  res.json({
    success: true,
    count: mantras.length,
    data: mantras
  });
});

// Get all categories
router.get('/meta/categories', (req, res) => {
  const categories = [...new Set(specialMantras.map(m => m.category))];
  
  res.json({
    success: true,
    data: categories
  });
});

module.exports = router;