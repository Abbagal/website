const express = require('express');
const router = express.Router();

// Sample mantras data
const mantras = [
  {
    id: 1,
    name: 'Om Mantra',
    sanskrit: 'ॐ',
    meaning: 'The primordial sound of the universe',
    benefits: ['Peace', 'Focus', 'Spiritual awakening'],
    duration: '5 minutes'
  },
  {
    id: 2,
    name: 'Gayatri Mantra',
    sanskrit: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्',
    meaning: 'Invoking the divine light of wisdom',
    benefits: ['Wisdom', 'Clarity', 'Divine protection'],
    duration: '10 minutes'
  },
  {
    id: 3,
    name: 'Maha Mrityunjaya Mantra',
    sanskrit: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय माऽमृतात्',
    meaning: 'Victory over death and liberation',
    benefits: ['Healing', 'Protection', 'Longevity'],
    duration: '15 minutes'
  }
];

// Get all mantras
router.get('/', (req, res) => {
  res.json({
    success: true,
    count: mantras.length,
    data: mantras
  });
});

// Get single mantra
router.get('/:id', (req, res) => {
  const mantra = mantras.find(m => m.id === parseInt(req.params.id));
  
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

module.exports = router;
