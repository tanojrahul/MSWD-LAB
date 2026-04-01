import React from 'react';

const Greeting = ({ name = 'Guest', message = 'Welcome to React!' }) => {
  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#e7f3ff',
      borderRadius: '5px',
      marginBottom: '15px'
    }}>
      <h3>Greeting Component</h3>
      <p>Hello, <strong>{name}</strong>!</p>
      <p><em>{message}</em></p>
    </div>
  );
};

export default Greeting;
