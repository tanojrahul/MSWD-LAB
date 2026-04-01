import React, { useState } from 'react';

const Toggle = ({ label = 'Toggle Switch' }) => {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => setIsOn(!isOn);

  return (
    <div style={{
      border: '2px solid #ffc107',
      padding: '25px',
      borderRadius: '8px',
      textAlign: 'center',
      backgroundColor: '#fffbf0',
      minWidth: '250px'
    }}>
      <h3>{label}</h3>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '20px'
      }}>
        <label style={{
          width: '80px',
          height: '44px',
          backgroundColor: isOn ? '#28a745' : '#dc3545',
          borderRadius: '22px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          padding: '0 5px',
          transition: 'background-color 0.3s'
        }} onClick={toggleSwitch}>
          <div style={{
            width: '40px',
            height: '40px',
            backgroundColor: 'white',
            borderRadius: '50%',
            position: 'absolute',
            left: isOn ? '35px' : '0px',
            transition: 'left 0.3s'
          }} />
        </label>
      </div>
      <p style={{
        fontSize: '20px',
        fontWeight: 'bold',
        color: isOn ? '#28a745' : '#dc3545'
      }}>
        {isOn ? 'ON' : 'OFF'}
      </p>
      <button
        onClick={toggleSwitch}
        style={{
          padding: '10px 20px',
          backgroundColor: '#ffc107',
          color: 'black',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}
      >
        Toggle State
      </button>
    </div>
  );
};

export default Toggle;
