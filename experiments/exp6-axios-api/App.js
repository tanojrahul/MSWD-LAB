import React, { useState } from 'react';
import ProfileData from './ProfileData';
import AddStudentForm from './AddStudentForm';
import ProductAPIConsumer from './ProductAPIConsumer';
import CustomerAPIConsumer from './CustomerAPIConsumer';

const Exp6App = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const styles = {
    container: { minHeight: '100vh', backgroundColor: '#f5f5f5' },
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
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <h2>Experiment 6 - Axios API Integration</h2>
        <div style={styles.navButtons}>
          <button
            onClick={() => setActiveTab('profile')}
            style={activeTab === 'profile' ? styles.activeButton : styles.button}
          >
            Fetch Profile (GET)
          </button>
          <button
            onClick={() => setActiveTab('student')}
            style={activeTab === 'student' ? styles.activeButton : styles.button}
          >
            Add Student (POST)
          </button>
          <button
            onClick={() => setActiveTab('products')}
            style={activeTab === 'products' ? styles.activeButton : styles.button}
          >
            Products API (JSON Server)
          </button>
          <button
            onClick={() => setActiveTab('customers')}
            style={activeTab === 'customers' ? styles.activeButton : styles.button}
          >
            Customers API
          </button>
        </div>
      </div>

      <div style={{ padding: '20px' }}>
        {activeTab === 'profile' && <ProfileData />}
        {activeTab === 'student' && <AddStudentForm />}
        {activeTab === 'products' && <ProductAPIConsumer />}
        {activeTab === 'customers' && <CustomerAPIConsumer />}
      </div>
    </div>
  );
};

export default Exp6App;
