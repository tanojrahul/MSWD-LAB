// Experiment 14: Role-Based Access Control (RBAC)
// Full Stack App with user roles and authorization

const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 3005;

const SECRET_KEY = 'rbac-secret-key';

app.use(express.json());

// Users with roles
const users = [
  { id: 1, username: 'admin', password: 'admin123', email: 'admin@example.com', role: 'admin' },
  { id: 2, username: 'user', password: 'user123', email: 'user@example.com', role: 'user' },
  { id: 3, username: 'moderator', password: 'mod123', email: 'mod@example.com', role: 'moderator' }
];

// ============================================
// MIDDLEWARE: Verify Token
// ============================================

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token' });
  }
  
  try {
    req.user = jwt.verify(token, SECRET_KEY);
    next();
  } catch (error) {
    return res.status(403).json({ success: false, message: 'Invalid token' });
  }
};

// ============================================
// MIDDLEWARE: Check User Role
// ============================================

const authorizeRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'User not authenticated' });
    }
    
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Access denied',
        requiredRole: allowedRoles,
        userRole: req.user.role
      });
    }
    
    next();
  };
};

// ============================================
// LOGIN ROUTE
// ============================================

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  const user = users.find(u => u.username === username && u.password === password);
  
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
  
  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    SECRET_KEY,
    { expiresIn: '2h' }
  );
  
  res.json({
    success: true,
    message: 'Login successful',
    token: token,
    user: { id: user.id, username: user.username, role: user.role }
  });
});

// ============================================
// PUBLIC ROUTES (No auth required)
// ============================================

app.get('/api/public/posts', (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 1, title: 'Public Post 1', author: 'User1' },
      { id: 2, title: 'Public Post 2', author: 'User2' }
    ]
  });
});

// ============================================
// USER ROUTES (Requires login)
// ============================================

app.get('/api/user/profile', verifyToken, (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
});

app.get('/api/user/posts', verifyToken, (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 1, title: 'My Post', author: req.user.username }
    ]
  });
});

// ============================================
// MODERATOR ROUTES (Requires moderator or admin)
// ============================================

app.get('/api/moderator/reports', verifyToken, authorizeRole('moderator', 'admin'), (req, res) => {
  res.json({
    success: true,
    message: 'Moderator reports',
    data: [
      { id: 1, report: 'Post flagged as spam', status: 'pending' }
    ]
  });
});

app.post('/api/moderator/approve', verifyToken, authorizeRole('moderator', 'admin'), (req, res) => {
  res.json({
    success: true,
    message: 'Content approved by ' + req.user.username
  });
});

app.post('/api/moderator/reject', verifyToken, authorizeRole('moderator', 'admin'), (req, res) => {
  res.json({
    success: true,
    message: 'Content rejected by ' + req.user.username
  });
});

// ============================================
// ADMIN ROUTES (Admin only)
// ============================================

app.get('/api/admin/users', verifyToken, authorizeRole('admin'), (req, res) => {
  res.json({
    success: true,
    message: 'All users',
    data: users.map(u => ({ id: u.id, username: u.username, role: u.role, email: u.email }))
  });
});

app.post('/api/admin/users', verifyToken, authorizeRole('admin'), (req, res) => {
  const { username, email, role } = req.body;
  const newUser = { id: users.length + 1, username, email, role, password: 'temp123' };
  users.push(newUser);
  res.status(201).json({ success: true, data: newUser });
});

app.delete('/api/admin/users/:id', verifyToken, authorizeRole('admin'), (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);
  
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  
  const deleted = users.splice(index, 1);
  res.json({ success: true, message: 'User deleted', data: deleted[0] });
});

app.put('/api/admin/users/:id/role', verifyToken, authorizeRole('admin'), (req, res) => {
  const { role } = req.body;
  const user = users.find(u => u.id === parseInt(req.params.id));
  
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  
  user.role = role;
  res.json({ success: true, message: 'Role updated', data: user });
});

app.get('/api/admin/dashboard', verifyToken, authorizeRole('admin'), (req, res) => {
  res.json({
    success: true,
    message: 'Admin dashboard',
    stats: {
      totalUsers: users.length,
      admins: users.filter(u => u.role === 'admin').length,
      moderators: users.filter(u => u.role === 'moderator').length,
      users: users.filter(u => u.role === 'user').length
    }
  });
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
  console.log(`✓ RBAC Server running on http://localhost:${PORT}`);
  console.log('\nRoles:');
  console.log('  - admin: Full access');
  console.log('  - moderator: Content moderation');
  console.log('  - user: Basic access');
  console.log('\nTest users:');
  console.log('  admin / admin123');
  console.log('  moderator / mod123');
  console.log('  user / user123');
});

module.exports = app;
