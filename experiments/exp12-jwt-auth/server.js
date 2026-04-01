// Experiment 12: JWT Authentication
// Login API with token generation and verification

const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 3003;

const SECRET_KEY = 'your-secret-key-change-this-in-production';

// Middleware
app.use(express.json());

// In-memory user storage
const users = [
  { id: 1, username: 'alice', password: 'password123', email: 'alice@example.com' },
  { id: 2, username: 'bob', password: 'password456', email: 'bob@example.com' }
];

// ============================================
// MIDDLEWARE: Verify JWT Token
// ============================================

const verifyToken = (req, res, next) => {
  console.log('Verifying token...');
  
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token provided'
    });
  }
  
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Invalid token',
      error: error.message
    });
  }
};

// ============================================
// LOGIN ROUTE - Generate Token
// ============================================

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  // Validate input
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username and password required'
    });
  }
  
  // Find user
  const user = users.find(u => u.username === username);
  
  if (!user || user.password !== password) {
    return res.status(401).json({
      success: false,
      message: 'Invalid username or password'
    });
  }
  
  // Generate JWT Token
  const token = jwt.sign(
    { id: user.id, username: user.username, email: user.email },
    SECRET_KEY,
    { expiresIn: '1h' }
  );
  
  res.json({
    success: true,
    message: 'Login successful',
    token: token,
    user: { id: user.id, username: user.username, email: user.email }
  });
});

// ============================================
// PROTECTED ROUTES
// ============================================

// Get current user profile (protected)
app.get('/api/profile', verifyToken, (req, res) => {
  res.json({
    success: true,
    message: 'Profile retrieved',
    user: req.user
  });
});

// Get all users (protected)
app.get('/api/users', verifyToken, (req, res) => {
  res.json({
    success: true,
    data: users.map(u => ({ id: u.id, username: u.username, email: u.email }))
  });
});

// Update profile (protected)
app.put('/api/profile', verifyToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (req.body.email) user.email = req.body.email;
  
  res.json({
    success: true,
    message: 'Profile updated',
    user: { id: user.id, username: user.username, email: user.email }
  });
});

// Protected resource
app.get('/api/dashboard', verifyToken, (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to dashboard',
    user: req.user,
    data: { /* dashboard data */ }
  });
});

// ============================================
// PUBLIC ROUTES
// ============================================

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// ============================================
// ERROR HANDLING
// ============================================

app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({
    success: false,
    message: 'Server error',
    error: err.message
  });
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
  console.log(`✓ JWT Auth Server running on http://localhost:${PORT}`);
  console.log('\nAPI Endpoints:');
  console.log('  POST   /api/login - Login (returns JWT token)');
  console.log('  GET    /api/profile - Get profile (protected)');
  console.log('  GET    /api/users - Get all users (protected)');
  console.log('  PUT    /api/profile - Update profile (protected)');
  console.log('  GET    /api/dashboard - Dashboard (protected)');
  console.log('\nTest user: alice / password123');
});

module.exports = app;
