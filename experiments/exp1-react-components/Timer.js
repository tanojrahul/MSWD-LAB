import React, { useState, useEffect } from 'react';

const Timer = ({ name = 'Timer' }) => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setSeconds(0);
    setIsRunning(false);
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div style={{
      border: '2px solid #007bff',
      padding: '20px',
      borderRadius: '8px',
      textAlign: 'center',
      width: '250px',
      backgroundColor: '#f0f8ff'
    }}>
      <h3>{name}</h3>
      <div style={{
        fontSize: '36px',
        fontWeight: 'bold',
        margin: '20px 0',
        fontFamily: 'monospace',
        backgroundColor: '#fff',
        padding: '10px',
        borderRadius: '5px'
      }}>
        {formatTime(seconds)}
      </div>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <button
          onClick={startTimer}
          disabled={isRunning}
          style={{
            padding: '8px 15px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: isRunning ? 'not-allowed' : 'pointer',
            opacity: isRunning ? 0.5 : 1
          }}
        >
          Start
        </button>
        <button
          onClick={pauseTimer}
          disabled={!isRunning}
          style={{
            padding: '8px 15px',
            backgroundColor: '#ffc107',
            color: 'black',
            border: 'none',
            borderRadius: '5px',
            cursor: !isRunning ? 'not-allowed' : 'pointer',
            opacity: !isRunning ? 0.5 : 1
          }}
        >
          Pause
        </button>
        <button
          onClick={resetTimer}
          style={{
            padding: '8px 15px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;
