// Experiment 15: Node.js File Operations
// APIs for file upload, read, update, and delete

const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const app = express();
const PORT = 3006;

app.use(express.json());

// Directory for file storage
const FILES_DIR = path.join(__dirname, 'uploads');

// Create uploads directory if it doesn't exist
(async () => {
  try {
    await fs.mkdir(FILES_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating directory:', error);
  }
})();

// ============================================
// FILE WRITING API
// ============================================

app.post('/api/files/write', async (req, res) => {
  try {
    const { filename, content } = req.body;
    
    if (!filename || !content) {
      return res.status(400).json({
        success: false,
        message: 'Filename and content required'
      });
    }
    
    const filepath = path.join(FILES_DIR, filename);
    await fs.writeFile(filepath, content, 'utf-8');
    
    res.status(201).json({
      success: true,
      message: 'File created successfully',
      file: { name: filename, path: filepath }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ============================================
// FILE READING API
// ============================================

app.get('/api/files/:filename', async (req, res) => {
  try {
    const filepath = path.join(FILES_DIR, req.params.filename);
    const content = await fs.readFile(filepath, 'utf-8');
    
    res.json({
      success: true,
      filename: req.params.filename,
      content: content
    });
  } catch (error) {
    if (error.code === 'ENOENT') {
      return res.status(404).json({ success: false, message: 'File not found' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
});

// ============================================
// LIST FILES API
// ============================================

app.get('/api/files', async (req, res) => {
  try {
    const files = await fs.readdir(FILES_DIR);
    const fileDetails = await Promise.all(
      files.map(async (file) => {
        const filepath = path.join(FILES_DIR, file);
        const stats = await fs.stat(filepath);
        return {
          name: file,
          size: stats.size,
          created: stats.birthtime,
          modified: stats.mtime
        };
      })
    );
    
    res.json({
      success: true,
      count: files.length,
      files: fileDetails
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ============================================
// FILE UPDATE API
// ============================================

app.put('/api/files/:filename', async (req, res) => {
  try {
    const { content } = req.body;
    
    if (!content) {
      return res.status(400).json({ success: false, message: 'Content required' });
    }
    
    const filepath = path.join(FILES_DIR, req.params.filename);
    
    // Check if file exists
    await fs.access(filepath);
    
    // Update file
    await fs.writeFile(filepath, content, 'utf-8');
    
    res.json({
      success: true,
      message: 'File updated successfully',
      filename: req.params.filename
    });
  } catch (error) {
    if (error.code === 'ENOENT') {
      return res.status(404).json({ success: false, message: 'File not found' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
});

// ============================================
// FILE DELETE API
// ============================================

app.delete('/api/files/:filename', async (req, res) => {
  try {
    const filepath = path.join(FILES_DIR, req.params.filename);
    
    // Check if file exists
    await fs.access(filepath);
    
    // Delete file
    await fs.unlink(filepath);
    
    res.json({
      success: true,
      message: 'File deleted successfully',
      filename: req.params.filename
    });
  } catch (error) {
    if (error.code === 'ENOENT') {
      return res.status(404).json({ success: false, message: 'File not found' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
});

// ============================================
// APPEND TO FILE
// ============================================

app.post('/api/files/:filename/append', async (req, res) => {
  try {
    const { content } = req.body;
    const filepath = path.join(FILES_DIR, req.params.filename);
    
    await fs.appendFile(filepath, '\n' + content, 'utf-8');
    
    res.json({
      success: true,
      message: 'Content appended successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ============================================
// GET FILE STATS
// ============================================

app.get('/api/files/:filename/stats', async (req, res) => {
  try {
    const filepath = path.join(FILES_DIR, req.params.filename);
    const stats = await fs.stat(filepath);
    
    res.json({
      success: true,
      filename: req.params.filename,
      size: stats.size,
      created: stats.birthtime,
      modified: stats.mtime,
      isFile: stats.isFile(),
      isDirectory: stats.isDirectory()
    });
  } catch (error) {
    if (error.code === 'ENOENT') {
      return res.status(404).json({ success: false, message: 'File not found' });
    }
    res.status(500).json({ success: false, message: error.message });
  }
});

// ============================================
// START SERVER
// ============================================

app.listen(PORT, () => {
  console.log(`✓ File Operations Server running on http://localhost:${PORT}`);
  console.log('\nAPI Endpoints:');
  console.log('  GET    /api/files - List all files');
  console.log('  GET    /api/files/:filename - Read file');
  console.log('  GET    /api/files/:filename/stats - File statistics');
  console.log('  POST   /api/files/write - Create new file');
  console.log('  PUT    /api/files/:filename - Update file');
  console.log('  DELETE /api/files/:filename - Delete file');
  console.log('  POST   /api/files/:filename/append - Append to file');
  console.log('\nFile storage: ./uploads');
});

module.exports = app;
