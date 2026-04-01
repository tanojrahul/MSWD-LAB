import React, { useState } from 'react';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    if (credentials.email && credentials.password) {
      setIsLoggedIn(true);
      alert('Login successful! Welcome ' + credentials.email);
    } else {
      alert('Please enter email and password');
    }
  };

  return (
    <div style={{
      padding: '30px',
      maxWidth: '500px',
      margin: '100px auto',
      border: '2px solid #007bff',
      borderRadius: '8px',
      backgroundColor: '#f0f8ff'
    }}>
      <h1 style={{ textAlign: 'center' }}>Login</h1>

      {isLoggedIn ? (
        <div style={{
          backgroundColor: '#d4edda',
          padding: '20px',
          borderRadius: '5px',
          color: '#155724',
          textAlign: 'center'
        }}>
          <p>✓ Successfully logged in as {credentials.email}</p>
          <button
            onClick={() => {
              setIsLoggedIn(false);
              setCredentials({ email: '', password: '' });
            }}
            style={{
              padding: '10px 20px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email:</label>
            <input
              type="email"
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                boxSizing: 'border-box'
              }}
              placeholder="your@email.com"
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Password:</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '5px',
                boxSizing: 'border-box'
              }}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            Login
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;
