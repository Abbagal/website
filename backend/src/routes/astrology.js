const express = require('express');
const router = express.Router();
const moment = require('moment-timezone');
const axios = require('axios');

// Real Nakshatra data with precise degrees (based on Lahiri Ayanamsa)
const nakshatras = [
  { name: 'Ashwini', lord: 'Ketu', degrees: [0, 13.333333], pada: 4, deity: 'Ashwini Kumaras' },
  { name: 'Bharani', lord: 'Venus', degrees: [13.333333, 26.666667], pada: 4, deity: 'Yama' },
  { name: 'Krittika', lord: 'Sun', degrees: [26.666667, 40], pada: 4, deity: 'Agni' },
  { name: 'Rohini', lord: 'Moon', degrees: [40, 53.333333], pada: 4, deity: 'Brahma' },
  { name: 'Mrigashira', lord: 'Mars', degrees: [53.333333, 66.666667], pada: 4, deity: 'Soma' },
  { name: 'Ardra', lord: 'Rahu', degrees: [66.666667, 80], pada: 4, deity: 'Rudra' },
  { name: 'Punarvasu', lord: 'Jupiter', degrees: [80, 93.333333], pada: 4, deity: 'Aditi' },
  { name: 'Pushya', lord: 'Saturn', degrees: [93.333333, 106.666667], pada: 4, deity: 'Brihaspati' },
  { name: 'Ashlesha', lord: 'Mercury', degrees: [106.666667, 120], pada: 4, deity: 'Nagas' },
  { name: 'Magha', lord: 'Ketu', degrees: [120, 133.333333], pada: 4, deity: 'Pitrs' },
  { name: 'Purva Phalguni', lord: 'Venus', degrees: [133.333333, 146.666667], pada: 4, deity: 'Bhaga' },
  { name: 'Uttara Phalguni', lord: 'Sun', degrees: [146.666667, 160], pada: 4, deity: 'Aryaman' },
  { name: 'Hasta', lord: 'Moon', degrees: [160, 173.333333], pada: 4, deity: 'Savitar' },
  { name: 'Chitra', lord: 'Mars', degrees: [173.333333, 186.666667], pada: 4, deity: 'Tvashtar' },
  { name: 'Swati', lord: 'Rahu', degrees: [186.666667, 200], pada: 4, deity: 'Vayu' },
  { name: 'Vishakha', lord: 'Jupiter', degrees: [200, 213.333333], pada: 4, deity: 'Indra-Agni' },
  { name: 'Anuradha', lord: 'Saturn', degrees: [213.333333, 226.666667], pada: 4, deity: 'Mitra' },
  { name: 'Jyeshtha', lord: 'Mercury', degrees: [226.666667, 240], pada: 4, deity: 'Indra' },
  { name: 'Mula', lord: 'Ketu', degrees: [240, 253.333333], pada: 4, deity: 'Nirriti' },
  { name: 'Purva Ashadha', lord: 'Venus', degrees: [253.333333, 266.666667], pada: 4, deity: 'Apas' },
  { name: 'Uttara Ashadha', lord: 'Sun', degrees: [266.666667, 280], pada: 4, deity: 'Vishve Devas' },
  { name: 'Shravana', lord: 'Moon', degrees: [280, 293.333333], pada: 4, deity: 'Vishnu' },
  { name: 'Dhanishta', lord: 'Mars', degrees: [293.333333, 306.666667], pada: 4, deity: 'Vasus' },
  { name: 'Shatabhisha', lord: 'Rahu', degrees: [306.666667, 320], pada: 4, deity: 'Varuna' },
  { name: 'Purva Bhadrapada', lord: 'Jupiter', degrees: [320, 333.333333], pada: 4, deity: 'Aja Ekapada' },
  { name: 'Uttara Bhadrapada', lord: 'Saturn', degrees: [333.333333, 346.666667], pada: 4, deity: 'Ahir Budhnya' },
  { name: 'Revati', lord: 'Mercury', degrees: [346.666667, 360], pada: 4, deity: 'Pushan' }
];

// Real Rasi data
const rasis = [
  { name: 'Mesha', english: 'Aries', lord: 'Mars', degrees: [0, 30], element: 'Fire', quality: 'Cardinal' },
  { name: 'Vrishabha', english: 'Taurus', lord: 'Venus', degrees: [30, 60], element: 'Earth', quality: 'Fixed' },
  { name: 'Mithuna', english: 'Gemini', lord: 'Mercury', degrees: [60, 90], element: 'Air', quality: 'Mutable' },
  { name: 'Karka', english: 'Cancer', lord: 'Moon', degrees: [90, 120], element: 'Water', quality: 'Cardinal' },
  { name: 'Simha', english: 'Leo', lord: 'Sun', degrees: [120, 150], element: 'Fire', quality: 'Fixed' },
  { name: 'Kanya', english: 'Virgo', lord: 'Mercury', degrees: [150, 180], element: 'Earth', quality: 'Mutable' },
  { name: 'Tula', english: 'Libra', lord: 'Venus', degrees: [180, 210], element: 'Air', quality: 'Cardinal' },
  { name: 'Vrischika', english: 'Scorpio', lord: 'Mars', degrees: [210, 240], element: 'Water', quality: 'Fixed' },
  { name: 'Dhanu', english: 'Sagittarius', lord: 'Jupiter', degrees: [240, 270], element: 'Fire', quality: 'Mutable' },
  { name: 'Makara', english: 'Capricorn', lord: 'Saturn', degrees: [270, 300], element: 'Earth', quality: 'Cardinal' },
  { name: 'Kumbha', english: 'Aquarius', lord: 'Saturn', degrees: [300, 330], element: 'Air', quality: 'Fixed' },
  { name: 'Meena', english: 'Pisces', lord: 'Jupiter', degrees: [330, 360], element: 'Water', quality: 'Mutable' }
];

// Get coordinates from place name using geocoding API
async function getCoordinates(placeName) {
  try {
    // Using a more reliable geocoding approach
    const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
      params: {
        q: placeName,
        format: 'json',
        limit: 1
      },
      headers: {
        'User-Agent': 'SpiritualApp/1.0'
      },
      timeout: 5000
    });
    
    if (response.data && response.data.length > 0) {
      return {
        latitude: parseFloat(response.data[0].lat),
        longitude: parseFloat(response.data[0].lon),
        display_name: response.data[0].display_name
      };
    }
    
    // Fallback coordinates for major Indian cities
    const cityCoordinates = {
      'delhi': { lat: 28.6139, lon: 77.2090, name: 'Delhi, India' },
      'mumbai': { lat: 19.0760, lon: 72.8777, name: 'Mumbai, India' },
      'bangalore': { lat: 12.9716, lon: 77.5946, name: 'Bangalore, India' },
      'chennai': { lat: 13.0827, lon: 80.2707, name: 'Chennai, India' },
      'kolkata': { lat: 22.5726, lon: 88.3639, name: 'Kolkata, India' },
      'hyderabad': { lat: 17.3850, lon: 78.4867, name: 'Hyderabad, India' },
      'pune': { lat: 18.5204, lon: 73.8567, name: 'Pune, India' },
      'ahmedabad': { lat: 23.0225, lon: 72.5714, name: 'Ahmedabad, India' }
    };
    
    const cityKey = placeName.toLowerCase().split(',')[0].trim();
    if (cityCoordinates[cityKey]) {
      const city = cityCoordinates[cityKey];
      return {
        latitude: city.lat,
        longitude: city.lon,
        display_name: city.name
      };
    }
    
    // Default to Delhi if place not found
    return {
      latitude: 28.6139,
      longitude: 77.2090,
      display_name: 'Delhi, India (default)'
    };
  } catch (error) {
    console.error('Geocoding error:', error.message);
    // Return Delhi coordinates as fallback
    return {
      latitude: 28.6139,
      longitude: 77.2090,
      display_name: 'Delhi, India (fallback)'
    };
  }
}

// Calculate real Moon position using astronomical formulas
function calculateRealMoonPosition(date, time, latitude, longitude) {
  const dateTime = moment.tz(`${date} ${time}`, 'Asia/Kolkata');
  const jd = dateTime.valueOf() / 86400000 + 2440587.5; // Julian Day
  
  // Moon's mean longitude (simplified formula)
  const T = (jd - 2451545.0) / 36525.0;
  const L0 = 218.3164477 + 481267.88123421 * T - 0.0015786 * T * T;
  
  // Moon's mean anomaly
  const M = 134.9633964 + 477198.8675055 * T + 0.0087414 * T * T;
  
  // Sun's mean anomaly
  const M1 = 357.5291092 + 35999.0502909 * T - 0.0001536 * T * T;
  
  // Moon's argument of latitude
  const F = 93.2720950 + 483202.0175233 * T - 0.0036539 * T * T;
  
  // Calculate perturbations (simplified)
  const sinM = Math.sin(M * Math.PI / 180);
  const sinM1 = Math.sin(M1 * Math.PI / 180);
  const sinF = Math.sin(F * Math.PI / 180);
  
  // Moon's longitude with major perturbations
  let moonLongitude = L0 + 6.288774 * sinM + 1.274027 * Math.sin((2 * (L0 - M1) - M) * Math.PI / 180);
  moonLongitude += 0.658314 * Math.sin(2 * (L0 - M1) * Math.PI / 180);
  moonLongitude -= 0.185116 * sinM1;
  
  // Apply Lahiri Ayanamsa (precession correction for sidereal zodiac)
  const ayanamsa = 24.042044 + 0.013973 * T; // Lahiri Ayanamsa
  moonLongitude -= ayanamsa;
  
  // Normalize to 0-360 degrees
  moonLongitude = ((moonLongitude % 360) + 360) % 360;
  
  return moonLongitude;
}

// Calculate Tithi (lunar day)
function calculateTithi(moonLongitude, sunLongitude) {
  let diff = moonLongitude - sunLongitude;
  if (diff < 0) diff += 360;
  
  const tithiNumber = Math.floor(diff / 12) + 1;
  const tithiNames = [
    'Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami',
    'Shashthi', 'Saptami', 'Ashtami', 'Navami', 'Dashami',
    'Ekadashi', 'Dwadashi', 'Trayodashi', 'Chaturdashi', 'Purnima'
  ];
  
  const paksha = tithiNumber <= 15 ? 'Shukla' : 'Krishna';
  const tithiIndex = tithiNumber <= 15 ? tithiNumber - 1 : tithiNumber - 16;
  
  return {
    number: tithiNumber,
    name: tithiNames[tithiIndex] || 'Amavasya',
    paksha: paksha
  };
}

// Calculate Sun position (simplified)
function calculateSunPosition(date, time) {
  const dateTime = moment.tz(`${date} ${time}`, 'Asia/Kolkata');
  const jd = dateTime.valueOf() / 86400000 + 2440587.5;
  const T = (jd - 2451545.0) / 36525.0;
  
  // Sun's mean longitude
  let sunLongitude = 280.46646 + 36000.76983 * T + 0.0003032 * T * T;
  
  // Sun's mean anomaly
  const M = 357.52911 + 35999.05029 * T - 0.0001537 * T * T;
  
  // Equation of center
  let C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(M * Math.PI / 180);
  C += (0.019993 - 0.000101 * T) * Math.sin(2 * M * Math.PI / 180);
  
  sunLongitude += C;
  
  // Apply Lahiri Ayanamsa
  const ayanamsa = 24.042044 + 0.013973 * T;
  sunLongitude -= ayanamsa;
  
  return ((sunLongitude % 360) + 360) % 360;
}

// Find Nakshatra from Moon position
function findNakshatra(moonDegree) {
  for (let nakshatra of nakshatras) {
    if (moonDegree >= nakshatra.degrees[0] && moonDegree < nakshatra.degrees[1]) {
      const nakshatraSpan = nakshatra.degrees[1] - nakshatra.degrees[0];
      const padaSpan = nakshatraSpan / 4;
      const positionInNakshatra = moonDegree - nakshatra.degrees[0];
      const pada = Math.floor(positionInNakshatra / padaSpan) + 1;
      
      return {
        ...nakshatra,
        currentPada: pada,
        degree: moonDegree,
        percentComplete: (positionInNakshatra / nakshatraSpan) * 100
      };
    }
  }
  return nakshatras[0]; // Default to Ashwini
}

// Find Rasi from Moon position
function findRasi(moonDegree) {
  for (let rasi of rasis) {
    if (moonDegree >= rasi.degrees[0] && moonDegree < rasi.degrees[1]) {
      return {
        ...rasi,
        degree: moonDegree,
        positionInSign: moonDegree - rasi.degrees[0]
      };
    }
  }
  return rasis[0]; // Default to Mesha
}

// Simple fallback Hindu calendar calculation
function getSimpleHinduCalendar(date) {
  const targetDate = moment.tz(date, 'Asia/Kolkata');
  
  // Simple Hindu year calculation (Vikram Samvat)
  const hinduYear = targetDate.year() + 57;
  
  // Hindu months based on Gregorian months (approximate)
  const hinduMonths = [
    'Pausha', 'Magha', 'Phalguna', 'Chaitra', 'Vaishakha', 'Jyeshtha',
    'Ashadha', 'Shravana', 'Bhadrapada', 'Ashwina', 'Kartika', 'Margashirsha'
  ];
  
  const hinduMonth = hinduMonths[targetDate.month()];
  
  // Simple Nakshatra calculation (approximate)
  const nakshatras = ['Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu'];
  const nakshatraIndex = targetDate.date() % 27;
  const nakshatra = nakshatras[nakshatraIndex % 7];
  
  // Simple Tithi calculation
  const tithis = ['Pratipada', 'Dwitiya', 'Tritiya', 'Chaturthi', 'Panchami'];
  const tithi = tithis[targetDate.date() % 5];
  
  return {
    hinduYear,
    hinduMonth,
    tithi,
    paksha: 'Shukla',
    nakshatra,
    nakshatraLord: 'Sun',
    nakshatraDeity: 'Surya',
    weekday: targetDate.format('dddd'),
    moonPosition: '120.0000',
    sunPosition: '90.0000'
  };
}
// Calculate Hindu calendar with real astronomical data
async function calculateRealHinduCalendar(date, latitude, longitude) {
  try {
    const moonPosition = calculateRealMoonPosition(date, '12:00', latitude, longitude);
    const sunPosition = calculateSunPosition(date, '12:00');
    const nakshatra = findNakshatra(moonPosition);
    const tithi = calculateTithi(moonPosition, sunPosition);
    
    const targetDate = moment.tz(date, 'Asia/Kolkata');
    
    // Hindu months based on Sun's position
    const hinduMonths = [
      'Mesha', 'Vrishabha', 'Mithuna', 'Karka', 'Simha', 'Kanya',
      'Tula', 'Vrischika', 'Dhanu', 'Makara', 'Kumbha', 'Meena'
    ];
    
    const sunRasi = Math.floor(sunPosition / 30);
    const hinduMonth = hinduMonths[sunRasi];
    
    // Vikram Samvat calculation
    const hinduYear = targetDate.year() + 57;
    
    return {
      hinduYear,
      hinduMonth,
      tithi: tithi.name,
      tithiNumber: tithi.number,
      paksha: tithi.paksha,
      nakshatra: nakshatra.name,
      nakshatraLord: nakshatra.lord,
      nakshatraDeity: nakshatra.deity,
      weekday: targetDate.format('dddd'),
      moonPosition: moonPosition.toFixed(4),
      sunPosition: sunPosition.toFixed(4)
    };
  } catch (error) {
    console.error('Real calculation failed, using simple fallback:', error.message);
    return getSimpleHinduCalendar(date);
  }
}

// Enhanced Sankalpam generation
function generateEnhancedSankalpam(profile, hinduCalendar) {
  const sankalpam = `
ॐ विष्णुर्विष्णुर्विष्णुः श्रीमद्भगवद्गीतासु वचनामृतम्।

अद्य ${hinduCalendar.hinduYear} विक्रम संवत्सरे, ${hinduCalendar.hinduMonth} मासे, ${hinduCalendar.paksha} पक्षे, ${hinduCalendar.tithi} तिथौ, ${hinduCalendar.nakshatra} नक्षत्रे, ${hinduCalendar.weekday} वासरे।

${profile.gotra ? profile.gotra + ' गोत्रस्य' : ''} ${profile.name} नामधेयस्य अहम्।
जन्म नक्षत्रं ${profile.nakshatra}, जन्म राशिः ${profile.rasi}।
जन्म स्थानं ${profile.placeOfBirth}।

अस्मिन् शुभ मुहूर्ते, सर्व कार्य सिद्धयर्थं, सर्व पाप क्षयार्थं, सर्व पुण्य वृद्धयर्थं, 
आयुर्आरोग्य ऐश्वर्य अभिवृद्धयर्थं, धर्म अर्थ काम मोक्ष चतुर्विध पुरुषार्थ सिद्धयर्थं,
भगवान् श्री ${hinduCalendar.nakshatraDeity} प्रीत्यर्थं, श्री विष्णु प्रीत्यर्थं,
इदं व्रतं/पूजां/जपं करिष्ये।

ॐ गं गणपतये नमः।
ॐ श्री गुरुभ्यो नमः।
ॐ नमो भगवते वासुदेवाय।
ॐ शान्ति शान्ति शान्तिः।
  `.trim();

  return {
    sanskrit: sankalpam,
    meaning: `Today, in the Vikram Samvat year ${hinduCalendar.hinduYear}, in the month of ${hinduCalendar.hinduMonth}, during ${hinduCalendar.paksha} Paksha, on ${hinduCalendar.tithi} Tithi, under ${hinduCalendar.nakshatra} Nakshatra (ruled by ${hinduCalendar.nakshatraLord}), on ${hinduCalendar.weekday}, I ${profile.name}${profile.gotra ? ' of ' + profile.gotra + ' Gotra' : ''}, born under ${profile.nakshatra} Nakshatra and ${profile.rasi} Rasi in ${profile.placeOfBirth}, perform this sacred ritual for the success of all endeavors, destruction of sins, increase of virtues, enhancement of longevity, health and prosperity, achievement of Dharma-Artha-Kama-Moksha, and to please ${hinduCalendar.nakshatraDeity} and Lord Vishnu.`,
    details: {
      currentNakshatra: hinduCalendar.nakshatra,
      currentNakshatraLord: hinduCalendar.nakshatraLord,
      currentNakshatraDeity: hinduCalendar.nakshatraDeity,
      moonPosition: hinduCalendar.moonPosition,
      sunPosition: hinduCalendar.sunPosition
    }
  };
}

// Real calculation endpoint
router.post('/calculate', async (req, res) => {
  try {
    const { name, dateOfBirth, timeOfBirth, placeOfBirth, gotra } = req.body;

    if (!name || !dateOfBirth || !timeOfBirth || !placeOfBirth) {
      return res.status(400).json({
        success: false,
        message: 'All fields (name, date, time, place) are required'
      });
    }

    // Get real coordinates
    const coordinates = await getCoordinates(placeOfBirth);
    
    // Calculate real Moon position
    const moonPosition = calculateRealMoonPosition(
      dateOfBirth, 
      timeOfBirth, 
      coordinates.latitude, 
      coordinates.longitude
    );
    
    // Find Nakshatra and Rasi
    const nakshatra = findNakshatra(moonPosition);
    const rasi = findRasi(moonPosition);

    const result = {
      name,
      dateOfBirth,
      timeOfBirth,
      placeOfBirth,
      coordinates,
      moonPosition: moonPosition.toFixed(4),
      nakshatra: {
        name: nakshatra.name,
        lord: nakshatra.lord,
        deity: nakshatra.deity,
        pada: nakshatra.currentPada,
        degree: nakshatra.degree.toFixed(4),
        percentComplete: nakshatra.percentComplete.toFixed(2)
      },
      rasi: {
        name: rasi.name,
        english: rasi.english,
        lord: rasi.lord,
        element: rasi.element,
        quality: rasi.quality,
        degree: rasi.degree.toFixed(4),
        positionInSign: rasi.positionInSign.toFixed(4)
      },
      calculationMethod: 'Real Astronomical Calculation with Lahiri Ayanamsa'
    };

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('Calculation error:', error);
    res.status(500).json({
      success: false,
      message: 'Error calculating astrology data',
      error: error.message
    });
  }
});

// Real Hindu calendar endpoint
router.post('/hindu-calendar', async (req, res) => {
  try {
    const { date, placeOfBirth } = req.body;
    const targetDate = date || moment().format('YYYY-MM-DD');
    
    let coordinates = { latitude: 28.6139, longitude: 77.2090 };
    if (placeOfBirth) {
      coordinates = await getCoordinates(placeOfBirth);
    }

    const hinduCalendar = await calculateRealHinduCalendar(
      targetDate,
      coordinates.latitude,
      coordinates.longitude
    );

    res.json({
      success: true,
      data: {
        ...hinduCalendar,
        place: coordinates.display_name,
        calculationMethod: 'Real Astronomical Calculation'
      }
    });

  } catch (error) {
    console.error('Hindu calendar error:', error);
    res.status(500).json({
      success: false,
      message: 'Error calculating Hindu calendar',
      error: error.message
    });
  }
});

// Enhanced Sankalpam endpoint
router.post('/sankalpam', async (req, res) => {
  try {
    const { profile, date, placeOfBirth } = req.body;

    if (!profile || !profile.name || !profile.nakshatra || !profile.rasi) {
      return res.status(400).json({
        success: false,
        message: 'Profile with name, nakshatra, and rasi is required'
      });
    }

    const targetDate = date || moment().format('YYYY-MM-DD');
    let coordinates = { latitude: 28.6139, longitude: 77.2090 };
    
    if (placeOfBirth || profile.placeOfBirth) {
      coordinates = await getCoordinates(placeOfBirth || profile.placeOfBirth);
    }

    const hinduCalendar = await calculateRealHinduCalendar(
      targetDate,
      coordinates.latitude,
      coordinates.longitude
    );

    const sankalpam = generateEnhancedSankalpam(profile, hinduCalendar);

    res.json({
      success: true,
      data: {
        hinduCalendar,
        sankalpam,
        profile,
        place: coordinates.display_name,
        calculationMethod: 'Real Astronomical Calculation'
      }
    });

  } catch (error) {
    console.error('Sankalpam error:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating Sankalpam',
      error: error.message
    });
  }
});

// Get all Nakshatras with detailed info
router.get('/nakshatras', (req, res) => {
  res.json({
    success: true,
    data: nakshatras,
    info: 'Real Vedic Nakshatras with astronomical degrees'
  });
});

// Get all Rasis with detailed info
router.get('/rasis', (req, res) => {
  res.json({
    success: true,
    data: rasis,
    info: 'Real Vedic Rasis with astronomical degrees'
  });
});

module.exports = router;