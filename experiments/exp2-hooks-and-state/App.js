import React, { useState } from 'react';
import Greeting from './Greeting';
import UserCard from './UserCard';
import Counter from './Counter';
import Toggle from './Toggle';

const Exp2App = () => {
  const [activeSection, setActiveSection] = useState('greeting');

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    },
    navbar: {
      backgroundColor: '#333',
      padding: '15px',
      color: 'white'
    },
    navButtons: {
      display: 'flex',
      gap: '10px',
      flexWrap: 'wrap',
      marginTop: '10px'
    },
    button: {
      padding: '8px 15px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer'
    },
    activeButton: {
      padding: '8px 15px',
      backgroundColor: '#28a745',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer'
    },
    content: {
      padding: '30px',
      maxWidth: '1000px',
      margin: '0 auto'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <h2>Experiment 2 - Functional Components & Hooks</h2>
        <div style={styles.navButtons}>
          <button
            onClick={() => setActiveSection('greeting')}
            style={activeSection === 'greeting' ? styles.activeButton : styles.button}
          >
            Greeting with Props
          </button>
          <button
            onClick={() => setActiveSection('usercard')}
            style={activeSection === 'usercard' ? styles.activeButton : styles.button}
          >
            User Card with Defaults
          </button>
          <button
            onClick={() => setActiveSection('counter')}
            style={activeSection === 'counter' ? styles.activeButton : styles.button}
          >
            Counter Component
          </button>
          <button
            onClick={() => setActiveSection('toggle')}
            style={activeSection === 'toggle' ? styles.activeButton : styles.button}
          >
            Toggle Component
          </button>
        </div>
      </div>

      <div style={styles.content}>
        {activeSection === 'greeting' && (
          <div>
            <h2>Functional Components with Props</h2>
            <p>Components that use props for dynamic content with default values:</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <Greeting name="Alice" message="Great to meet you!" />
              <Greeting name="Bob" message="Welcome to React world!" />
              <Greeting />
            </div>
          </div>
        )}

        {activeSection === 'usercard' && (
          <div>
            <h2>User Card with Default Props</h2>
            <p>Display user information with default values:</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              <UserCard user={{ name: 'Alice Johnson', email: 'alice@example.com', age: 28 }} />
              <UserCard user={{ name: 'Bob Smith', email: 'bob@example.com', age: 32 }} />
              <UserCard />
            </div>
          </div>
        )}

        {activeSection === 'counter' && (
          <div>
            <h2>Counter Component with Props</h2>
            <p>Increment/Decrement functionality using props for configuration:</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <Counter initialValue={0} step={1} />
              <Counter initialValue={10} step={5} />
              <Counter initialValue={100} step={10} />
            </div>
          </div>
        )}

        {activeSection === 'toggle' && (
          <div>
            <h2>Toggle Component - ON/OFF State</h2>
            <p>Switch between ON and OFF states:</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              <Toggle label="Power" />
              <Toggle label="Notifications" />
              <Toggle label="Dark Mode" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Exp2App;
