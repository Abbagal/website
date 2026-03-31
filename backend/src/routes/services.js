const express = require('express');
const router = express.Router();

// Services data
const services = [
  {
    id: 1,
    name: 'Wedding Ceremonies',
    description: 'Traditional Hindu wedding ceremonies with complete rituals and mantras',
    price: 'Starting from ₹25,000',
    duration: '3-4 hours',
    includes: ['Pre-wedding consultation', 'Complete ceremony', 'Sacred mantras', 'Photography coordination'],
    mode: ['In-person', 'Destination', 'Virtual guidance'],
    energy: 'Sacred union',
    icon: 'temple'
  },
  {
    id: 2,
    name: 'Housewarming (Griha Pravesh)',
    description: 'Bless your new home with traditional Griha Pravesh ceremony',
    price: 'Starting from ₹15,000',
    duration: '2-3 hours',
    includes: ['Vastu consultation', 'Purification rituals', 'Ganesh puja', 'Home blessing'],
    mode: ['In-person', 'Virtual guidance'],
    energy: 'Prosperity & protection',
    icon: 'home'
  },
  {
    id: 3,
    name: 'Baby Naming (Namkaran)',
    description: 'Sacred naming ceremony for your newborn with astrological guidance',
    price: 'Starting from ₹12,000',
    duration: '1-2 hours',
    includes: ['Name consultation', 'Astrological analysis', 'Sacred ceremony', 'Blessing rituals'],
    mode: ['In-person', 'Virtual'],
    energy: 'Divine blessings',
    icon: 'baby'
  },
  {
    id: 4,
    name: 'Corporate Events',
    description: 'Office inauguration, business blessing, and corporate spiritual events',
    price: 'Starting from ₹20,000',
    duration: '1-3 hours',
    includes: ['Business blessing', 'Ganesh puja', 'Success mantras', 'Team harmony rituals'],
    mode: ['In-person', 'Group sessions'],
    energy: 'Success & prosperity',
    icon: 'briefcase'
  },
  {
    id: 5,
    name: 'Personal Consultation',
    description: 'One-on-one spiritual guidance and astrological consultation',
    price: 'Starting from ₹5,000',
    duration: '1 hour',
    includes: ['Birth chart analysis', 'Life guidance', 'Mantra recommendations', 'Spiritual practices'],
    mode: ['In-person', 'Video call', 'Phone'],
    energy: 'Personal growth',
    icon: 'user'
  },
  {
    id: 6,
    name: 'Festival Celebrations',
    description: 'Traditional celebration of Hindu festivals with proper rituals',
    price: 'Starting from ₹10,000',
    duration: '2-4 hours',
    includes: ['Festival setup', 'Traditional rituals', 'Community participation', 'Prasad distribution'],
    mode: ['In-person', 'Community events'],
    energy: 'Joy & devotion',
    icon: 'calendar'
  }
];

// Get all services
router.get('/', (req, res) => {
  res.json({
    success: true,
    count: services.length,
    data: services
  });
});

// Get single service
router.get('/:id', (req, res) => {
  const service = services.find(s => s.id === parseInt(req.params.id));
  
  if (!service) {
    return res.status(404).json({
      success: false,
      message: 'Service not found'
    });
  }
  
  res.json({
    success: true,
    data: service
  });
});

// Book a service
router.post('/book', (req, res) => {
  const { serviceId, name, email, phone, date, message, location } = req.body;
  
  if (!serviceId || !name || !email || !phone || !date) {
    return res.status(400).json({
      success: false,
      message: 'All required fields must be provided'
    });
  }
  
  const service = services.find(s => s.id === parseInt(serviceId));
  
  if (!service) {
    return res.status(404).json({
      success: false,
      message: 'Service not found'
    });
  }
  
  // In production, save to database and send confirmation email
  const booking = {
    id: Date.now(),
    serviceId: parseInt(serviceId),
    serviceName: service.name,
    name,
    email,
    phone,
    date,
    message: message || '',
    location: location || '',
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  
  res.json({
    success: true,
    message: 'Booking request submitted successfully',
    data: booking
  });
});

module.exports = router;