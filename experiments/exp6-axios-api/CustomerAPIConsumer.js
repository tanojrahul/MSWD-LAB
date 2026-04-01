import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerAPIConsumer = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://jsonplaceholder.typicode.com/users?_limit=5');
      setCustomers(response.data);
    } catch (error) {
      console.error('Failed to fetch customers', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPurchases = async (customerId) => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${customerId}`);
      setSelectedCustomer({
        ...customers.find(c => c.id === customerId),
        purchases: response.data
      });
    } catch (error) {
      console.error('Failed to fetch purchases', error);
    }
  };

  if (loading) return <div style={{ padding: '20px' }}>Loading customers...</div>;

  return (
    <div style={{ maxWidth: '900px', margin: '30px auto' }}>
      <h2>Customer & Purchases</h2>

      {!selectedCustomer ? (
        <div>
          <h3>Customers List</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#007bff', color: 'white' }}>
                <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Email</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Company</th>
                <th style={{ padding: '10px', textAlign: 'center' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.map(customer => (
                <tr key={customer.id} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '10px' }}>{customer.name}</td>
                  <td style={{ padding: '10px' }}>{customer.email}</td>
                  <td style={{ padding: '10px' }}>{customer.company.name}</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>
                    <button
                      onClick={() => fetchPurchases(customer.id)}
                      style={{
                        padding: '5px 10px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer'
                      }}
                    >
                      View Purchases
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <button
            onClick={() => setSelectedCustomer(null)}
            style={{
              padding: '10px 20px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginBottom: '20px'
            }}
          >
            ← Back to Customers
          </button>

          <h3>Customer: {selectedCustomer.name}</h3>
          <p><strong>Email:</strong> {selectedCustomer.email}</p>
          <p><strong>Phone:</strong> {selectedCustomer.phone}</p>

          <h4>Purchases (Albums):</h4>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '15px'
          }}>
            {selectedCustomer.purchases && selectedCustomer.purchases.map(purchase => (
              <div key={purchase.id} style={{
                border: '1px solid #ddd',
                padding: '15px',
                borderRadius: '5px',
                backgroundColor: '#f9f9f9'
              }}>
                <h5>{purchase.title}</h5>
                <p>Album ID: {purchase.id}</p>
                <p>Photos: {purchase.id * 25}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerAPIConsumer;
