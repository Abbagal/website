const express = require('express');
const router = express.Router();

// Quick Pujas data
const quickPujas = [
  {
    id: 1,
    name: 'Daily Ganesha Puja',
    description: 'Quick 15-minute Ganesha puja for removing obstacles and starting your day with blessings',
    duration: '15 minutes',
    items: ['Ganesha idol/picture', 'Incense sticks', 'Diya/candle', 'Flowers', 'Modak or sweets'],
    steps: [
      'Light the diya and incense',
      'Offer flowers to Lord Ganesha',
      'Chant "Om Gam Ganapataye Namaha" 21 times',
      'Offer modak or sweets',
      'Perform aarti',
      'Seek blessings for the day'
    ],
    mantras: ['Om Gam Ganapataye Namaha'],
    benefits: ['Remove obstacles', 'Success in work', 'Good fortune'],
    bestTime: 'Morning before starting work',
    difficulty: 'Easy',
    category: 'Daily',
    deity: 'Lord Ganesha',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'
  },
  {
    id: 2,
    name: 'Lakshmi Puja for Prosperity',
    description: 'Attract wealth and prosperity with this simple Lakshmi puja',
    duration: '20 minutes',
    items: ['Lakshmi idol/picture', 'Red flowers', 'Gold coin', 'Rice', 'Turmeric', 'Kumkum'],
    steps: [
      'Clean the puja area',
      'Place Lakshmi idol facing east',
      'Offer red flowers and rice',
      'Apply turmeric and kumkum',
      'Chant Lakshmi mantras 108 times',
      'Offer gold coin or jewelry',
      'Perform aarti with ghee diya'
    ],
    mantras: ['Om Shreem Mahalakshmyai Namaha', 'Om Lakshmi Vigan Shri Kamala Dharigan Swaha'],
    benefits: ['Wealth attraction', 'Financial stability', 'Business success'],
    bestTime: 'Friday evening',
    difficulty: 'Medium',
    category: 'Prosperity',
    deity: 'Goddess Lakshmi',
    image: 'https://images.unsplash.com/photo-1604608672516-f1b9b1a5b9b5?w=800'
  },
  {
    id: 3,
    name: 'Saraswati Puja for Knowledge',
    description: 'Enhance learning and creativity with Goddess Saraswati\'s blessings',
    duration: '18 minutes',
    items: ['Saraswati idol/picture', 'White flowers', 'Books', 'Pen', 'Yellow cloth', 'Honey'],
    steps: [
      'Place books and pen near the idol',
      'Cover with yellow cloth',
      'Offer white flowers',
      'Light incense and diya',
      'Chant Saraswati mantras',
      'Offer honey as prasad',
      'Seek blessings for knowledge'
    ],
    mantras: ['Om Aim Saraswatyai Namaha', 'Saraswati Namastubhyam Varade Kamarupini'],
    benefits: ['Enhanced learning', 'Creativity boost', 'Academic success'],
    bestTime: 'Early morning',
    difficulty: 'Easy',
    category: 'Knowledge',
    deity: 'Goddess Saraswati',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800'
  },
  {
    id: 4,
    name: 'Hanuman Puja for Strength',
    description: 'Gain physical and mental strength with Lord Hanuman\'s blessings',
    duration: '25 minutes',
    items: ['Hanuman idol/picture', 'Red flowers', 'Sindoor', 'Coconut', 'Banana', 'Ghee'],
    steps: [
      'Face south while doing puja',
      'Apply sindoor to Hanuman',
      'Offer red flowers',
      'Break coconut as offering',
      'Chant Hanuman Chalisa',
      'Offer banana and sweets',
      'Perform aarti with ghee diya'
    ],
    mantras: ['Om Ham Hanumate Namaha', 'Hanuman Chalisa'],
    benefits: ['Physical strength', 'Mental courage', 'Protection from evil'],
    bestTime: 'Tuesday or Saturday',
    difficulty: 'Medium',
    category: 'Strength',
    deity: 'Lord Hanuman',
    image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=800'
  },
  {
    id: 5,
    name: 'Shiva Puja for Peace',
    description: 'Find inner peace and spiritual growth with Lord Shiva\'s blessings',
    duration: '30 minutes',
    items: ['Shiva lingam/picture', 'Bilva leaves', 'Milk', 'Honey', 'Gangajal', 'Dhatura'],
    steps: [
      'Clean the Shiva lingam',
      'Pour milk while chanting Om Namah Shivaya',
      'Offer bilva leaves',
      'Pour honey and gangajal',
      'Chant Mahamrityunjaya mantra',
      'Offer dhatura flowers',
      'Meditate in silence'
    ],
    mantras: ['Om Namah Shivaya', 'Mahamrityunjaya Mantra'],
    benefits: ['Inner peace', 'Spiritual growth', 'Healing'],
    bestTime: 'Monday or during Pradosh',
    difficulty: 'Medium',
    category: 'Spiritual',
    deity: 'Lord Shiva',
    image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800'
  },
  {
    id: 6,
    name: 'Durga Puja for Protection',
    description: 'Seek protection and empowerment from Goddess Durga',
    duration: '22 minutes',
    items: ['Durga idol/picture', 'Red flowers', 'Kumkum', 'Coconut', 'Sweets', 'Red cloth'],
    steps: [
      'Cover altar with red cloth',
      'Place Durga idol',
      'Apply kumkum to forehead',
      'Offer red flowers',
      'Chant Durga mantras',
      'Offer coconut and sweets',
      'Perform aarti'
    ],
    mantras: ['Om Dum Durgayei Namaha', 'Durga Chalisa'],
    benefits: ['Protection from negativity', 'Empowerment', 'Courage'],
    bestTime: 'Friday or during Navratri',
    difficulty: 'Medium',
    category: 'Protection',
    deity: 'Goddess Durga',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'
  }
];

// Get all quick pujas
router.get('/', (req, res) => {
  const { category, difficulty, deity } = req.query;
  
  let filteredPujas = quickPujas;
  
  if (category) {
    filteredPujas = filteredPujas.filter(puja => 
      puja.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  if (difficulty) {
    filteredPujas = filteredPujas.filter(puja => 
      puja.difficulty.toLowerCase() === difficulty.toLowerCase()
    );
  }
  
  if (deity) {
    filteredPujas = filteredPujas.filter(puja => 
      puja.deity.toLowerCase().includes(deity.toLowerCase())
    );
  }
  
  res.json({
    success: true,
    count: filteredPujas.length,
    data: filteredPujas
  });
});

// Get single puja
router.get('/:id', (req, res) => {
  const puja = quickPujas.find(p => p.id === parseInt(req.params.id));
  
  if (!puja) {
    return res.status(404).json({
      success: false,
      message: 'Puja not found'
    });
  }
  
  res.json({
    success: true,
    data: puja
  });
});

// Get pujas by category
router.get('/category/:category', (req, res) => {
  const category = req.params.category;
  const pujas = quickPujas.filter(p => 
    p.category.toLowerCase() === category.toLowerCase()
  );
  
  res.json({
    success: true,
    count: pujas.length,
    data: pujas
  });
});

// Get all categories
router.get('/meta/categories', (req, res) => {
  const categories = [...new Set(quickPujas.map(p => p.category))];
  
  res.json({
    success: true,
    data: categories
  });
});

// Get all deities
router.get('/meta/deities', (req, res) => {
  const deities = [...new Set(quickPujas.map(p => p.deity))];
  
  res.json({
    success: true,
    data: deities
  });
});

module.exports = router;