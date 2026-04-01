// Experiment 10: Express.js Basics - Server with GET and CRUD routes
// Simple Express server with product management

const express = require('express');
const app = express();
const PORT = 3001;

// Middleware
app.use(express.json());

// In-memory product storage
let products = [
  { id: 1, name: 'Laptop', price: 999, category: 'Electronics' },
  { id: 2, name: 'Mouse', price: 25, category: 'Accessories' },
  { id: 3, name: 'Keyboard', price: 75, category: 'Accessories' }
];

let nextId = 4;

// ============================================
// GET ROUTES
// ============================================

// Get all products
app.get('/api/products', (req, res) => {
  console.log('GET /api/products');
  res.json({
    success: true,
    message: 'All products retrieved',
    data: products,
    count: products.length
  });
});

// Get single product by ID
app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }
  
  res.json({
    success: true,
    data: product
  });
});

// Get products by category
app.get('/api/products/category/:cat', (req, res) => {
  const category = req.params.cat;
  const filtered = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
  
  res.json({
    success: true,
    category: category,
    data: filtered,
    count: filtered.length
  });
});

// ============================================
// POST ROUTE (CREATE)
// ============================================

app.post('/api/products', (req, res) => {
  const { name, price, category } = req.body;
  
  // Validation
  if (!name || !price || !category) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields: name, price, category'
    });
  }
  
  const newProduct = {
    id: nextId++,
    name,
    price: parseFloat(price),
    category
  };
  
  products.push(newProduct);
  
  res.status(201).json({
    success: true,
    message: 'Product created successfully',
    data: newProduct
  });
});

// ============================================
// PUT ROUTE (UPDATE)
// ============================================

app.put('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);
  
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }
  
  // Update fields
  if (req.body.name) product.name = req.body.name;
  if (req.body.price) product.price = parseFloat(req.body.price);
  if (req.body.category) product.category = req.body.category;
  
  res.json({
    success: true,
    message: 'Product updated successfully',
    data: product
  });
});

// ============================================
// DELETE ROUTE
// ============================================

app.delete('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === id);
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }
  
  const deletedProduct = products.splice(index, 1);
  
  res.json({
    success: true,
    message: 'Product deleted successfully',
    data: deletedProduct[0]
  });
});

// ============================================
// ERROR HANDLING
// ============================================

app.use((err, req, res, next) => {
  console.error('Error:', err);
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
  console.log(`✓ Server running on http://localhost:${PORT}`);
  console.log('\nAvailable routes:');
  console.log('  GET    /api/products');
  console.log('  GET    /api/products/:id');
  console.log('  GET    /api/products/category/:cat');
  console.log('  POST   /api/products');
  console.log('  PUT    /api/products/:id');
  console.log('  DELETE /api/products/:id');
});

module.exports = app;
