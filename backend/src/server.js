require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());
app.use(compression());
app.use(express.json());

// CORS
const envAllowedOrigins = process.env.ALLOWED_ORIGINS?.split(',').map((origin) => origin.trim()).filter(Boolean) || [];
const defaultAllowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000', 'http://127.0.0.1:3001'];
const allowedOrigins = [...new Set([...defaultAllowedOrigins, ...envAllowedOrigins])];

app.use(cors({
  origin: (origin, callback) => {
    // Allow non-browser clients like curl/postman and same-origin calls
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true
}));

// Rate limiting - Temporarily disabled for testing
// const limiter = rateLimit({
//   windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
//   max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100
// });
// app.use('/api/', limiter);

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: '🕉️ Spiritual API is running',
    status: 'active',
    timestamp: new Date().toISOString()
  });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', uptime: process.uptime() });
});

// Authentication routes
app.use('/api/auth', require('./routes/auth'));

// Spiritual content routes
app.use('/api/mantras', require('./routes/mantras'));
app.use('/api/content', require('./routes/content'));
app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/astrology', require('./routes/astrology'));
app.use('/api/services', require('./routes/services'));
app.use('/api/special-mantras', require('./routes/specialMantras'));
app.use('/api/quick-pujas', require('./routes/quickPujas'));
app.use('/api/chatbot', require('./routes/chatbot'));

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
