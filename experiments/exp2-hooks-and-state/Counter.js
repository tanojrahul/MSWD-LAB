import React, { useState } from 'react';

const Counter = ({ initialValue = 0, step = 1 }) => {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(count + step);
  const decrement = () => setCount(count - step);
  const reset = () => setCount(initialValue);

  return (
    <div style={{
      border: '2px solid #28a745',
      padding: '25px',
      borderRadius: '8px',
      textAlign: 'center',
      backgroundColor: '#f0fdf4',
      minWidth: '250px'
    }}>
      <h3>Counter Component</h3>
      <div style={{
        fontSize: '48px',
        fontWeight: 'bold',
        color: '#28a745',
        margin: '20px 0',
        fontFamily: 'monospace'
      }}>
        {count}
      </div>
      <p style={{ color: '#666' }}>Step Size: {step}</p>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button
          onClick={decrement}
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          - Decrement
        </button>
        <button
          onClick={reset}
          style={{
            padding: '10px 20px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          Reset
        </button>
        <button
          onClick={increment}
          style={{
            padding: '10px 20px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          + Increment
        </button>
      </div>
    </div>
  );
};

export default Counter;
