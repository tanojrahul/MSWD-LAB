import React, { useState } from 'react';

const PassengerList = () => {
  const [passengers, setPassengers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'Confirmed' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'Confirmed' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'Pending' }
  ]);

  const [newPassenger, setNewPassenger] = useState({ name: '', email: '', status: 'Pending' });

  const addPassenger = () => {
    if (newPassenger.name && newPassenger.email) {
      setPassengers([...passengers, { id: passengers.length + 1, ...newPassenger }]);
      setNewPassenger({ name: '', email: '', status: 'Pending' });
    }
  };

  const removePassenger = (id) => {
    setPassengers(passengers.filter(p => p.id !== id));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Passenger List</h2>
      
      <div style={{ 
        border: '1px solid #ddd', 
        padding: '15px', 
        marginBottom: '20px',
        backgroundColor: '#f9f9f9',
        borderRadius: '5px'
      }}>
        <h3>Add New Passenger</h3>
        <input
          type="text"
          placeholder="Name"
          value={newPassenger.name}
          onChange={(e) => setNewPassenger({ ...newPassenger, name: e.target.value })}
          style={{ padding: '8px', marginRight: '10px', width: '150px' }}
        />
        <input
          type="email"
          placeholder="Email"
          value={newPassenger.email}
          onChange={(e) => setNewPassenger({ ...newPassenger, email: e.target.value })}
          style={{ padding: '8px', marginRight: '10px', width: '150px' }}
        />
        <select
          value={newPassenger.status}
          onChange={(e) => setNewPassenger({ ...newPassenger, status: e.target.value })}
          style={{ padding: '8px', marginRight: '10px' }}
        >
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <button onClick={addPassenger} style={{ padding: '8px 15px', cursor: 'pointer' }}>
          Add Passenger
        </button>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#007bff', color: 'white' }}>
            <th style={{ padding: '10px', textAlign: 'left' }}>ID</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Name</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Email</th>
            <th style={{ padding: '10px', textAlign: 'left' }}>Status</th>
            <th style={{ padding: '10px', textAlign: 'center' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {passengers.map((passenger) => (
            <tr key={passenger.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px' }}>{passenger.id}</td>
              <td style={{ padding: '10px' }}>{passenger.name}</td>
              <td style={{ padding: '10px' }}>{passenger.email}</td>
              <td style={{ padding: '10px' }}>{passenger.status}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>
                <button
                  onClick={() => removePassenger(passenger.id)}
                  style={{ padding: '5px 10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Total Passengers: {passengers.length}</p>
    </div>
  );
};

export default PassengerList;
