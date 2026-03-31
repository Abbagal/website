const express = require('express');
const router = express.Router();
const { auth, db, admin } = require('../lib/firebaseAdmin');

const usersCollection = db.collection('users');

const sanitizeUser = (uid, data = {}) => ({
  uid,
  email: data.email || '',
  name: data.name || '',
  phone: data.phone || '',
  dateOfBirth: data.dateOfBirth || '',
  placeOfBirth: data.placeOfBirth || '',
  timeOfBirth: data.timeOfBirth || '',
  isActive: data.isActive !== false,
  createdAt: data.createdAt || new Date().toISOString(),
  updatedAt: data.updatedAt || null,
});

const buildProfileFromToken = (decodedToken, payload = {}) => ({
  email: decodedToken.email || payload.email || '',
  name: payload.name || decodedToken.name || decodedToken.email?.split('@')[0] || 'User',
  phone: payload.phone || '',
  dateOfBirth: payload.dateOfBirth || '',
  placeOfBirth: payload.placeOfBirth || '',
  timeOfBirth: payload.timeOfBirth || '',
  isActive: true,
});

const verifyRequestToken = async (token) => {
  if (!token) {
    const error = new Error('Authentication token required');
    error.statusCode = 401;
    throw error;
  }

  try {
    return await auth.verifyIdToken(token);
  } catch (error) {
    error.statusCode = 401;
    throw error;
  }
};

const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    const decodedToken = await verifyRequestToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(error.statusCode || 401).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};

const upsertUserProfile = async (decodedToken, payload = {}, isRegistration = false) => {
  const userRef = usersCollection.doc(decodedToken.uid);
  const snapshot = await userRef.get();
  const now = new Date().toISOString();

  const baseProfile = buildProfileFromToken(decodedToken, payload);
  const existingData = snapshot.exists ? snapshot.data() : {};

  const mergedProfile = {
    ...existingData,
    ...baseProfile,
    createdAt: existingData.createdAt || now,
    updatedAt: now,
  };

  await userRef.set(mergedProfile, { merge: true });

  return {
    successMessage: isRegistration ? 'User registered successfully' : 'Login successful',
    user: sanitizeUser(decodedToken.uid, mergedProfile),
  };
};

router.post('/register', async (req, res) => {
  try {
    const { authToken, ...profileData } = req.body;
    const decodedToken = await verifyRequestToken(authToken);
    const result = await upsertUserProfile(decodedToken, profileData, true);

    res.status(201).json({
      success: true,
      message: result.successMessage,
      data: {
        user: result.user,
        token: authToken,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode === 401 ? 'Invalid or expired token' : 'Internal server error during registration',
    });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { authToken } = req.body;
    const decodedToken = await verifyRequestToken(authToken);
    const result = await upsertUserProfile(decodedToken);

    res.json({
      success: true,
      message: result.successMessage,
      data: {
        user: result.user,
        token: authToken,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(error.statusCode || 500).json({
      success: false,
      message: error.statusCode === 401 ? 'Invalid or expired token' : 'Internal server error during login',
    });
  }
});

router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const snapshot = await usersCollection.doc(req.user.uid).get();

    if (!snapshot.exists) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.json({
      success: true,
      data: sanitizeUser(req.user.uid, snapshot.data()),
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { name, phone, dateOfBirth, placeOfBirth, timeOfBirth } = req.body;
    const userRef = usersCollection.doc(req.user.uid);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const currentData = snapshot.data();
    const updates = {
      name: name || currentData.name || '',
      phone: phone || currentData.phone || '',
      dateOfBirth: dateOfBirth || currentData.dateOfBirth || '',
      placeOfBirth: placeOfBirth || currentData.placeOfBirth || '',
      timeOfBirth: timeOfBirth || currentData.timeOfBirth || '',
      updatedAt: new Date().toISOString(),
    };

    await userRef.set(updates, { merge: true });

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: sanitizeUser(req.user.uid, { ...currentData, ...updates }),
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

router.put('/change-password', authenticateToken, async (req, res) => {
  try {
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long',
      });
    }

    await auth.updateUser(req.user.uid, { password: newPassword });

    res.json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error) {
    console.error('Password change error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

router.post('/logout', authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: 'Logout successful.',
  });
});

router.get('/users', async (req, res) => {
  try {
    const snapshot = await usersCollection.get();
    const users = snapshot.docs.map((doc) => sanitizeUser(doc.id, doc.data()));

    res.json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error('Users fetch error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

module.exports = router;
module.exports.authenticateToken = authenticateToken;
