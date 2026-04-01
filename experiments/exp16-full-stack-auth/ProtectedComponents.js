import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProtectedComponents.css';

const API_URL = 'http://localhost:3007/api';

// ============================================
// LOGIN COMPONENT
// ============================================

export function Login({ setToken, navigate }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        username,
        password
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        setToken(response.data.token);
        navigate('/posts');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      <p>Test: alice / pass123</p>
    </div>
  );
}

// ============================================
// REGISTER COMPONENT
// ============================================

export function Register({ setToken, navigate }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        username,
        email,
        password
      });

      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        setToken(response.data.token);
        navigate('/posts');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

// ============================================
// POST LIST COMPONENT
// ============================================

export function PostList({ token }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/posts`);
      setPosts(response.data.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (id) => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };
      await axios.delete(`${API_URL}/posts/${id}`, config);
      setPosts(posts.filter(p => p.id !== id));
    } catch (error) {
      alert('Error deleting post');
    }
  };

  return (
    <div className="posts-container">
      <h2>All Posts</h2>
      {loading ? (
        <p>Loading...</p>
      ) : posts.length === 0 ? (
        <p>No posts yet</p>
      ) : (
        <div className="posts-list">
          {posts.map(post => (
            <div key={post.id} className="post-card">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <small>By User {post.userId}</small>
              <button
                onClick={() => deletePost(post.id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================
// CREATE POST COMPONENT
// ============================================

export function CreatePost({ token, onPostCreated }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const response = await axios.post(
        `${API_URL}/posts`,
        { title, content },
        config
      );

      if (response.data.success) {
        setTitle('');
        setContent('');
        onPostCreated();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-post-container">
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Post Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Post Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Publishing...' : 'Publish Post'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

// ============================================
// PROTECTED ROUTE COMPONENT
// ============================================

import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children, token }) {
  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
}
