// Experiment 19: Testing React Components and API
// Frontend unit tests and backend API tests

// ============================================
// FRONTEND TESTS (Jest + React Testing Library)
// ============================================

// File: Button.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button Component', () => {
  test('renders button with label', () => {
    render(<Button label="Click me" onClick={() => {}} />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('is disabled when disabled prop is true', () => {
    render(<Button label="Click me" onClick={() => {}} disabled={true} />);
    expect(screen.getByText('Click me')).toBeDisabled();
  });

  test('applies correct variant class', () => {
    render(<Button label="Delete" onClick={() => {}} variant="danger" />);
    expect(screen.getByText('Delete')).toHaveClass('btn-danger');
  });
});

// ============================================
// POST LIST TESTS
// ============================================

// File: PostList.test.js
import { render, screen } from '@testing-library/react';
import { PostList } from './PostList';

describe('PostList Component', () => {
  const mockPosts = [
    { id: 1, title: 'Post 1', content: 'Content 1', author: 'Alice' },
    { id: 2, title: 'Post 2', content: 'Content 2', author: 'Bob' }
  ];

  test('renders all posts', () => {
    render(<PostList posts={mockPosts} />);
    expect(screen.getByText('Post 1')).toBeInTheDocument();
    expect(screen.getByText('Post 2')).toBeInTheDocument();
  });

  test('displays empty state when no posts', () => {
    render(<PostList posts={[]} />);
    expect(screen.getByText('No posts available')).toBeInTheDocument();
  });

  test('calls onDelete when delete button clicked', () => {
    const handleDelete = jest.fn();
    render(<PostList posts={mockPosts} onDelete={handleDelete} />);
    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);
    expect(handleDelete).toHaveBeenCalledWith(1);
  });
});

// ============================================
// BACKEND API TESTS (Supertest)
// ============================================

// File: server.test.js
const request = require('supertest');
const app = require('./server');

describe('POST API', () => {
  test('GET /api/posts returns all posts', async () => {
    const response = await request(app).get('/api/posts');
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  test('POST /api/posts creates new post', async () => {
    const newPost = {
      title: 'Test Post',
      content: 'Test Content'
    };

    const response = await request(app)
      .post('/api/posts')
      .set('Authorization', 'Bearer test-token')
      .send(newPost);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.title).toBe('Test Post');
  });

  test('GET /api/posts/:id returns specific post', async () => {
    const response = await request(app).get('/api/posts/1');
    expect(response.status).toBe(200);
    expect(response.body.data.id).toBe(1);
  });

  test('DELETE /api/posts/:id deletes post', async () => {
    const response = await request(app)
      .delete('/api/posts/1')
      .set('Authorization', 'Bearer test-token');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});

// ============================================
// AUTHENTICATION TESTS
// ============================================

// File: auth.test.js
describe('Authentication API', () => {
  test('POST /api/auth/login returns token', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ username: 'alice', password: 'pass123' });

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  test('rejects invalid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ username: 'alice', password: 'wrong' });

    expect(response.status).toBe(401);
  });

  test('protected route requires token', async () => {
    const response = await request(app).get('/api/protected');
    expect(response.status).toBe(401);
  });

  test('protected route works with valid token', async () => {
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ username: 'alice', password: 'pass123' });

    const response = await request(app)
      .get('/api/protected')
      .set('Authorization', `Bearer ${loginRes.body.token}`);

    expect(response.status).toBe(200);
  });
});

// ============================================
// INTEGRATION TESTS
// ============================================

// File: integration.test.js
describe('Integration Tests', () => {
  test('complete user flow: register, login, create post', async () => {
    // Register
    const registerRes = await request(app)
      .post('/api/auth/register')
      .send({ username: 'testuser', email: 'test@example.com', password: 'pass123' });

    expect(registerRes.status).toBe(201);
    const token = registerRes.body.token;

    // Create post
    const postRes = await request(app)
      .post('/api/posts')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test', content: 'Content' });

    expect(postRes.status).toBe(201);

    // Verify post exists
    const getRes = await request(app).get('/api/posts');
    expect(getRes.body.data.some(p => p.title === 'Test')).toBe(true);
  });
});

// ============================================
// SETUP AND TEARDOWN
// ============================================

// File: jest.setup.js
beforeEach(() => {
  // Reset database before each test
  jest.clearAllMocks();
});

afterAll(async () => {
  // Clean up after all tests
  await new Promise(resolve => setTimeout(resolve, 500));
});

// ============================================
// RUNNING TESTS
// ============================================

/*
npm install --save-dev jest @testing-library/react @testing-library/jest-dom supertest

Running tests:
  npm test                    # Run all tests
  npm test -- --watch       # Watch mode
  npm test -- --coverage    # With coverage report

Jest configuration (package.json):
{
  "jest": {
    "testEnvironment": "jsdom",
    "setupFilesAfterEnv": ["<rootDir>/jest.setup.js"],
    "collectCoverageFrom": ["src/**/*.{js,jsx}"],
    "coveragePathIgnorePatterns": ["/node_modules/"]
  }
}
*/
