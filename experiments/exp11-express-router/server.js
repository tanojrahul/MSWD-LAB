// Experiment 11: Express with Routes
// Modular routing structure for different resources

const express = require('express');
const app = express();
const PORT = 3002;

// Middleware
app.use(express.json());

// ============================================
// ROUTES MODULES
// ============================================

// Users Routes
const usersRouter = express.Router();
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];
let nextUserId = 3;

usersRouter.get('/', (req, res) => {
  res.json({ success: true, data: users });
});

usersRouter.post('/', (req, res) => {
  const { name, email } = req.body;
  const newUser = { id: nextUserId++, name, email };
  users.push(newUser);
  res.status(201).json({ success: true, data: newUser });
});

usersRouter.get('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  res.json({ success: true, data: user });
});

usersRouter.put('/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  if (req.body.name) user.name = req.body.name;
  if (req.body.email) user.email = req.body.email;
  res.json({ success: true, data: user });
});

usersRouter.delete('/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, message: 'User not found' });
  const deleted = users.splice(index, 1);
  res.json({ success: true, data: deleted[0] });
});

// Posts Routes
const postsRouter = express.Router();
let posts = [
  { id: 1, userId: 1, title: 'First Post', content: 'Hello World' },
  { id: 2, userId: 1, title: 'Second Post', content: 'React Tips' }
];
let nextPostId = 3;

postsRouter.get('/', (req, res) => {
  res.json({ success: true, data: posts });
});

postsRouter.post('/', (req, res) => {
  const { userId, title, content } = req.body;
  const newPost = { id: nextPostId++, userId, title, content };
  posts.push(newPost);
  res.status(201).json({ success: true, data: newPost });
});

postsRouter.get('/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
  res.json({ success: true, data: post });
});

postsRouter.put('/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ success: false, message: 'Post not found' });
  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  res.json({ success: true, data: post });
});

postsRouter.delete('/:id', (req, res) => {
  const index = posts.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, message: 'Post not found' });
  const deleted = posts.splice(index, 1);
  res.json({ success: true, data: deleted[0] });
});

// Comments Routes
const commentsRouter = express.Router();
let comments = [
  { id: 1, postId: 1, author: 'John', text: 'Great post!' },
  { id: 2, postId: 1, author: 'Jane', text: 'Thanks for sharing' }
];
let nextCommentId = 3;

commentsRouter.get('/', (req, res) => {
  res.json({ success: true, data: comments });
});

commentsRouter.post('/', (req, res) => {
  const { postId, author, text } = req.body;
  const newComment = { id: nextCommentId++, postId, author, text };
  comments.push(newComment);
  res.status(201).json({ success: true, data: newComment });
});

commentsRouter.get('/:id', (req, res) => {
  const comment = comments.find(c => c.id === parseInt(req.params.id));
  if (!comment) return res.status(404).json({ success: false, message: 'Comment not found' });
  res.json({ success: true, data: comment });
});

commentsRouter.delete('/:id', (req, res) => {
  const index = comments.findIndex(c => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, message: 'Comment not found' });
  const deleted = comments.splice(index, 1);
  res.json({ success: true, data: deleted[0] });
});

// ============================================
// MOUNT ROUTES
// ============================================

app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);
app.use('/api/comments', commentsRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
  console.log(`✓ Express Router Server running on http://localhost:${PORT}`);
  console.log('\nAPI Routes:');
  console.log('  /api/users - User management');
  console.log('  /api/posts - Blog posts');
  console.log('  /api/comments - Comments');
  console.log('\nHTTP Methods: GET, POST, PUT, DELETE');
});

module.exports = app;
