// Experiment 16: Full Stack Authentication
// Frontend: React components with protected routes
// Backend: Express server with JWT auth

// ============================================
// BACKEND: server.js
// ============================================

const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3007;

const SECRET_KEY = 'full-stack-secret';

app.use(cors());
app.use(express.json());

const users = [
  { id: 1, username: 'alice', password: 'pass123', email: 'alice@example.com' },
  { id: 2, username: 'bob', password: 'pass456', email: 'bob@example.com' }
];

let posts = [
  { id: 1, userId: 1, title: 'First Post', content: 'Hello!', createdAt: new Date() }
];

// Verify Token
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

// Auth Routes
app.post('/api/auth/register', (req, res) => {
  const { username, password, email } = req.body;
  
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ success: false, message: 'User exists' });
  }
  
  const newUser = { id: users.length + 1, username, password, email };
  users.push(newUser);
  
  const token = jwt.sign(
    { id: newUser.id, username: newUser.username },
    SECRET_KEY,
    { expiresIn: '7d' }
  );
  
  res.status(201).json({
    success: true,
    message: 'Registration successful',
    token,
    user: { id: newUser.id, username: newUser.username, email: newUser.email }
  });
});

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
  
  const token = jwt.sign(
    { id: user.id, username: user.username },
    SECRET_KEY,
    { expiresIn: '7d' }
  );
  
  res.json({
    success: true,
    token,
    user: { id: user.id, username: user.username, email: user.email }
  });
});

// Protected Routes
app.get('/api/posts', (req, res) => {
  res.json({ success: true, data: posts });
});

app.post('/api/posts', verifyToken, (req, res) => {
  const { title, content } = req.body;
  const newPost = {
    id: posts.length + 1,
    userId: req.user.id,
    title,
    content,
    createdAt: new Date()
  };
  posts.push(newPost);
  res.status(201).json({ success: true, data: newPost });
});

app.delete('/api/posts/:id', verifyToken, (req, res) => {
  const index = posts.findIndex(p => p.id === parseInt(req.params.id));
  
  if (index === -1 || posts[index].userId !== req.user.id) {
    return res.status(404).json({ success: false, message: 'Post not found' });
  }
  
  const deleted = posts.splice(index, 1);
  res.json({ success: true, message: 'Post deleted', data: deleted[0] });
});

app.listen(PORT, () => {
  console.log(`✓ Full Stack Server running on http://localhost:${PORT}`);
});

module.exports = app;

// ============================================
// FRONTEND: React Components (Save separately)
// ============================================

/*
FRONTEND FILES TO CREATE:

1. ProtectedRoute.js - Protected route component
2. Login.js - Login page
3. Register.js - Registration page
4. PostList.js - View all posts
5. CreatePost.js - Create new post
6. App.js - Main app with routing
7. All files import from 'react-router-dom' and use localStorage for token

Example structure:

// ProtectedRoute.js
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

// App.js
<Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/posts" element={<ProtectedRoute><PostList /></ProtectedRoute>} />
  <Route path="/create" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
</Routes>

// Login.js
async function handleLogin() {
  const response = await axios.post('http://localhost:3007/api/auth/login', ...);
  localStorage.setItem('token', response.data.token);
  navigate('/posts');
}

// API calls with token
const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
};
axios.get('/api/posts', config);
*/
