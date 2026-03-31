const express = require('express');
const router = express.Router();

// Simple AI chatbot responses
const responses = {
  greetings: [
    "🕉️ Namaste! Welcome to our spiritual journey. How can I assist you today?",
    "🙏 Greetings! I'm here to help you with spiritual guidance. What would you like to know?",
    "✨ Welcome, dear soul! How may I guide you on your spiritual path today?"
  ],
  
  mantras: [
    "Mantras are sacred sounds that connect us to divine energy. Would you like to know about specific mantras like Gayatri, Om, or Mahamrityunjaya?",
    "Each mantra has unique vibrations and benefits. I can guide you to the right mantra based on your needs - healing, prosperity, wisdom, or protection.",
    "The power of mantras lies in their repetition with devotion. Shall I recommend some mantras for your current situation?"
  ],
  
  astrology: [
    "Vedic astrology helps us understand our life's purpose through birth charts. Would you like to know about your Rasi, Nakshatra, or current planetary influences?",
    "Your birth details reveal cosmic patterns that influence your journey. I can help you understand your astrological profile and suggest remedies.",
    "Astrology is the science of time and karma. What specific aspect would you like to explore - career, relationships, health, or spiritual growth?"
  ],
  
  pujas: [
    "Pujas are beautiful ways to connect with divine energy. I can guide you through daily pujas, festival celebrations, or specific deity worship.",
    "Each puja has its own significance and benefits. Would you like quick 15-minute pujas or detailed ceremonial guidance?",
    "The essence of puja is devotion and gratitude. Let me help you choose the right puja for your intentions."
  ],
  
  services: [
    "We offer various spiritual services including wedding ceremonies, housewarming, baby naming, and personal consultations. What occasion are you planning?",
    "Our services blend traditional rituals with modern convenience. We can conduct ceremonies in-person, virtually, or provide guidance for self-performance.",
    "Each life event deserves proper spiritual celebration. Tell me about your upcoming occasion, and I'll suggest the perfect ceremony."
  ],
  
  meditation: [
    "Meditation is the path to inner peace and self-realization. Would you like guidance on breathing techniques, mantra meditation, or mindfulness practices?",
    "Starting with just 5-10 minutes daily can transform your life. I can suggest meditation techniques based on your experience level.",
    "The goal of meditation is not to stop thoughts but to observe them peacefully. Shall I guide you through a simple technique?"
  ],
  
  festivals: [
    "Hindu festivals celebrate the divine in various forms. Each festival has unique rituals, stories, and spiritual significance. Which festival interests you?",
    "Festivals are opportunities for community celebration and spiritual renewal. I can help you understand the deeper meaning and proper observance.",
    "From Diwali to Holi, each festival teaches us valuable life lessons. What would you like to know about upcoming festivals?"
  ],
  
  default: [
    "That's an interesting spiritual question! While I may not have all the answers, I can guide you to relevant mantras, pujas, or suggest consulting our astrology section.",
    "Spiritual growth is a personal journey. Based on your question, I'd recommend exploring our mantras section or booking a personal consultation.",
    "Every question on the spiritual path is valid. Let me help you find the right resources - would you like to explore mantras, astrology, or our services?"
  ]
};

// Keywords for intent recognition
const keywords = {
  greetings: ['hello', 'hi', 'namaste', 'greetings', 'hey', 'good morning', 'good evening'],
  mantras: ['mantra', 'chant', 'gayatri', 'om', 'mahamrityunjaya', 'hanuman', 'lakshmi', 'saraswati'],
  astrology: ['astrology', 'horoscope', 'rasi', 'nakshatra', 'birth chart', 'zodiac', 'planetary'],
  pujas: ['puja', 'worship', 'ritual', 'ceremony', 'aarti', 'offering', 'prayer'],
  services: ['wedding', 'marriage', 'housewarming', 'naming', 'consultation', 'service', 'book'],
  meditation: ['meditation', 'meditate', 'mindfulness', 'breathing', 'peace', 'calm', 'relax'],
  festivals: ['festival', 'diwali', 'holi', 'navratri', 'dussehra', 'celebration', 'holiday']
};

// Function to detect intent from user message
function detectIntent(message) {
  const lowerMessage = message.toLowerCase();
  
  for (const [intent, words] of Object.entries(keywords)) {
    if (words.some(word => lowerMessage.includes(word))) {
      return intent;
    }
  }
  
  return 'default';
}

// Function to get random response
function getRandomResponse(intent) {
  const responseArray = responses[intent] || responses.default;
  return responseArray[Math.floor(Math.random() * responseArray.length)];
}

// Chat endpoint
router.post('/chat', (req, res) => {
  const { message, userId } = req.body;
  
  if (!message) {
    return res.status(400).json({
      success: false,
      message: 'Message is required'
    });
  }
  
  // Detect intent and generate response
  const intent = detectIntent(message);
  const response = getRandomResponse(intent);
  
  // In production, you might want to:
  // 1. Save conversation to database
  // 2. Use more sophisticated NLP
  // 3. Integrate with actual AI service
  
  const chatResponse = {
    id: Date.now(),
    message: response,
    intent: intent,
    timestamp: new Date().toISOString(),
    suggestions: getSuggestions(intent)
  };
  
  res.json({
    success: true,
    data: chatResponse
  });
});

// Function to get contextual suggestions
function getSuggestions(intent) {
  const suggestions = {
    greetings: [
      "Tell me about mantras",
      "Check my horoscope",
      "Quick puja guide",
      "Book a service"
    ],
    mantras: [
      "Gayatri Mantra benefits",
      "How to chant Om",
      "Healing mantras",
      "Prosperity mantras"
    ],
    astrology: [
      "Calculate my Rasi",
      "Today's Hindu calendar",
      "Generate Sankalpam",
      "Birth chart reading"
    ],
    pujas: [
      "Daily Ganesha puja",
      "Lakshmi puja steps",
      "Festival celebrations",
      "Puja items needed"
    ],
    services: [
      "Wedding ceremony",
      "Housewarming puja",
      "Personal consultation",
      "Corporate events"
    ],
    meditation: [
      "Beginner meditation",
      "Breathing techniques",
      "Mantra meditation",
      "Meditation timer"
    ],
    festivals: [
      "Upcoming festivals",
      "Diwali celebration",
      "Festival significance",
      "Ritual guidelines"
    ],
    default: [
      "Explore mantras",
      "Check astrology",
      "Browse services",
      "Quick pujas"
    ]
  };
  
  return suggestions[intent] || suggestions.default;
}

// Get chat history (placeholder)
router.get('/history/:userId', (req, res) => {
  // In production, fetch from database
  res.json({
    success: true,
    data: [],
    message: 'Chat history feature coming soon'
  });
});

// Get popular questions
router.get('/popular-questions', (req, res) => {
  const popularQuestions = [
    {
      question: "What is the best mantra for beginners?",
      category: "mantras",
      answer: "Om (ॐ) is the most fundamental and beginner-friendly mantra. It represents the cosmic sound and is easy to chant."
    },
    {
      question: "How do I calculate my Rasi and Nakshatra?",
      category: "astrology",
      answer: "You need your birth date, time, and place. Use our Astrology section to get accurate calculations based on Vedic astronomy."
    },
    {
      question: "What is a quick daily puja I can do?",
      category: "pujas",
      answer: "A 15-minute Ganesha puja is perfect for daily practice. Light a diya, offer flowers, and chant 'Om Gam Ganapataye Namaha' 21 times."
    },
    {
      question: "Do you conduct wedding ceremonies?",
      category: "services",
      answer: "Yes! We offer traditional Hindu wedding ceremonies with complete rituals, mantras, and can accommodate in-person or destination weddings."
    },
    {
      question: "How long should I meditate as a beginner?",
      category: "meditation",
      answer: "Start with 5-10 minutes daily. Focus on your breath or use a simple mantra like 'So Hum' (I am that)."
    }
  ];
  
  res.json({
    success: true,
    data: popularQuestions
  });
});

module.exports = router;