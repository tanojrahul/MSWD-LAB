import React, { useState } from 'react';
import PassengerList from './PassengerList';
import StudentAttendance from './StudentAttendance';
import Timer from './Timer';
import CourseList from './CourseList';

const Exp1App = () => {
  const [activeComponent, setActiveComponent] = useState('passengers');

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    },
    navbar: {
      backgroundColor: '#333',
      padding: '15px',
      color: 'white',
      display: 'flex',
      gap: '10px',
      flexWrap: 'wrap'
    },
    navButton: {
      padding: '8px 15px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: 'bold'
    },
    activeNavButton: {
      padding: '8px 15px',
      backgroundColor: '#28a745',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontWeight: 'bold'
    },
    content: {
      padding: '20px'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <h2 style={{ margin: '0', marginRight: '20px' }}>Experiment 1 - React Components</h2>
        <button
          onClick={() => setActiveComponent('passengers')}
          style={activeComponent === 'passengers' ? styles.activeNavButton : styles.navButton}
        >
          Passenger List
        </button>
        <button
          onClick={() => setActiveComponent('attendance')}
          style={activeComponent === 'attendance' ? styles.activeNavButton : styles.navButton}
        >
          Student Attendance
        </button>
        <button
          onClick={() => setActiveComponent('timers')}
          style={activeComponent === 'timers' ? styles.activeNavButton : styles.navButton}
        >
          Timers
        </button>
        <button
          onClick={() => setActiveComponent('courses')}
          style={activeComponent === 'courses' ? styles.activeNavButton : styles.navButton}
        >
          Course List
        </button>
      </div>

      <div style={styles.content}>
        {activeComponent === 'passengers' && <PassengerList />}
        {activeComponent === 'attendance' && <StudentAttendance />}
        {activeComponent === 'timers' && (
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <h2>Multiple Timer Components</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '25px',
              padding: '20px'
            }}>
              <Timer name="Timer - 1" />
              <Timer name="Timer - 2" />
              <Timer name="Timer - 3" />
              <Timer name="Timer - 4" />
            </div>
          </div>
        )}
        {activeComponent === 'courses' && <CourseList />}
      </div>
    </div>
  );
};

export default Exp1App;
