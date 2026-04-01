import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Friends from './pages/Friends';
import Posts from './pages/Posts';
import Chat from './pages/Chat';
import Login from './pages/Login';
import HospitalManagement from './pages/HospitalManagement';

const Exp3App = () => {
  return (
    <Router>
      <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <nav style={{
          backgroundColor: '#333',
          padding: '15px',
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap'
        }}>
          <Link to="/" style={{
            color: 'white',
            textDecoration: 'none',
            padding: '8px 15px',
            backgroundColor: '#007bff',
            borderRadius: '5px',
            fontWeight: 'bold'
          }}>
            Home
          </Link>
          <Link to="/friends" style={{
            color: 'white',
            textDecoration: 'none',
            padding: '8px 15px',
            backgroundColor: '#007bff',
            borderRadius: '5px',
            fontWeight: 'bold'
          }}>
            Friends
          </Link>
          <Link to="/posts" style={{
            color: 'white',
            textDecoration: 'none',
            padding: '8px 15px',
            backgroundColor: '#007bff',
            borderRadius: '5px',
            fontWeight: 'bold'
          }}>
            Posts
          </Link>
          <Link to="/chat" style={{
            color: 'white',
            textDecoration: 'none',
            padding: '8px 15px',
            backgroundColor: '#007bff',
            borderRadius: '5px',
            fontWeight: 'bold'
          }}>
            Chat
          </Link>
          <Link to="/hospital" style={{
            color: 'white',
            textDecoration: 'none',
            padding: '8px 15px',
            backgroundColor: '#28a745',
            borderRadius: '5px',
            fontWeight: 'bold'
          }}>
            Hospital (Nested Routes)
          </Link>
          <Link to="/login" style={{
            color: 'white',
            textDecoration: 'none',
            padding: '8px 15px',
            backgroundColor: '#dc3545',
            borderRadius: '5px',
            marginLeft: 'auto',
            fontWeight: 'bold'
          }}>
            Login
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/login" element={<Login />} />
          <Route path="/hospital" element={<HospitalManagement />} />
          <Route path="/hospital/:hospitalId" element={<HospitalManagement />} />
        </Routes>
      </div>
    </Router>
  );
};

export default Exp3App;
