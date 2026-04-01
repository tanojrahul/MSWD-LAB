// Experiment 13: JWT Authentication with Token Expiry
// Enhanced JWT with refresh tokens and expiration handling

const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 3004;

const ACCESS_TOKEN_SECRET = 'access-secret-key';
const REFRESH_TOKEN_SECRET = 'refresh-secret-key';

app.use(express.json());

// Store refresh tokens
let refreshTokens = [];

const users = [
  { id: 1, username: 'alice', password: 'password123' },
];

// ============================================
// MIDDLEWARE: Verify Access Token
// ============================================

const verifyAccessToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    });
  }
  
  try {
    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Access token expired',
        error: 'TOKEN_EXPIRED',
        expiredAt: error.expiredAt
      });
    }
    return res.status(403).json({
      success: false,
      message: 'Invalid access token'
    });
  }
};

// ============================================
// LOGIN - Generate Access and Refresh Tokens
// ============================================

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  const user = users.find(u => u.username === username && u.password === password);
  
  if (!user) {
    return res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }
  
  // Generate Access Token (short-lived)
  const accessToken = jwt.sign(
    { id: user.id, username: user.username },
    ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }  // 15 minutes
  );
  
  // Generate Refresh Token (long-lived)
  const refreshToken = jwt.sign(
    { id: user.id, username: user.username },
    REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }  // 7 days
  );
  
  // Store refresh token
  refreshTokens.push(refreshToken);
  
  res.json({
    success: true,
    message: 'Login successful',
    accessToken: accessToken,
    refreshToken: refreshToken,
    expiresIn: 900,  // 15 minutes in seconds
    tokenType: 'Bearer'
  });
});

// ============================================
// REFRESH TOKEN - Get New Access Token
// ============================================

app.post('/api/refresh-token', (req, res) => {
  const { refreshToken } = req.body;
  
  if (!refreshToken) {
    return res.status(400).json({
      success: false,
      message: 'Refresh token required'
    });
  }
  
  // Check if refresh token exists
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json({
      success: false,
      message: 'Invalid refresh token'
    });
  }
  
  try {
    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
    
    // Generate new access token
    const newAccessToken = jwt.sign(
      { id: decoded.id, username: decoded.username },
      ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );
    
    res.json({
      success: true,
      message: 'New access token generated',
      accessToken: newAccessToken,
      expiresIn: 900,
      tokenType: 'Bearer'
    });
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Refresh token expired - please login again'
      });
    }
    return res.status(403).json({
      success: false,
      message: 'Invalid refresh token'
    });
  }
});

// ============================================
// LOGOUT - Revoke Refresh Token
// ============================================

app.post('/api/logout', (req, res) => {
  const { refreshToken } = req.body;
  
  refreshTokens = refreshTokens.filter(token => token !== refreshToken);
  
  res.json({
    success: true,
    message: 'Logout successful'
  });
});

// ============================================
// PROTECTED ROUTES
// ============================================

app.get('/api/dashboard', verifyAccessToken, (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to dashboard',
    user: req.user
  });
});

app.get('/api/profile', verifyAccessToken, (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

// ============================================
// TOKEN INFO - Decode without verification
// ============================================

app.post('/api/token-info', (req, res) => {
  const { token } = req.body;
  
  if (!token) {
    return res.status(400).json({
      success: false,
      message: 'Token required'
    });
  }
  
  try {
    // Decode without verification to show token info
    const decoded = jwt.decode(token, { complete: true });
    
    if (!decoded) {
      return res.status(400).json({
        success: false,
        message: 'Invalid token format'
      });
    }
    
    const now = Math.floor(Date.now() / 1000);
    const isExpired = decoded.payload.exp < now;
    const timeLeft = decoded.payload.exp - now;
    
    res.json({
      success: true,
      payload: decoded.payload,
      header: decoded.header,
      isExpired: isExpired,
      expiresAt: new Date(decoded.payload.exp * 1000),
      secondsLeft: Math.max(0, timeLeft)
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to decode token'
    });
  }
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
  console.log(`✓ JWT Auth Server with Expiry running on http://localhost:${PORT}`);
  console.log('\nAPI Endpoints:');
  console.log('  POST   /api/login - Login (returns both tokens)');
  console.log('  POST   /api/refresh-token - Get new access token');
  console.log('  POST   /api/logout - Logout (revoke refresh token)');
  console.log('  GET    /api/dashboard - Protected route');
  console.log('  POST   /api/token-info - Decode token info');
});

module.exports = app;
