import React, { useState } from 'react';

const Friends = () => {
  const [friends] = useState([
    { id: 1, name: 'Alice Johnson', status: 'Online' },
    { id: 2, name: 'Bob Smith', status: 'Away' },
    { id: 3, name: 'Charlie Brown', status: 'Online' },
    { id: 4, name: 'Diana Evans', status: 'Offline' },
  ]);

  return (
    <div style={{ padding: '30px', maxWidth: '900px', margin: '0 auto' }}>
      <h1>Friends List</h1>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '15px'
      }}>
        {friends.map(friend => (
          <div key={friend.id} style={{
            border: '1px solid #ddd',
            padding: '15px',
            borderRadius: '5px',
            backgroundColor: '#f9f9f9'
          }}>
            <h3>{friend.name}</h3>
            <p>
              Status: <span style={{
                padding: '5px 10px',
                borderRadius: '20px',
                backgroundColor: friend.status === 'Online' ? '#28a745' : friend.status === 'Away' ? '#ffc107' : '#6c757d',
                color: friend.status === 'Away' ? 'black' : 'white'
              }}>
                {friend.status}
              </span>
            </p>
            <button style={{
              padding: '8px 15px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}>
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Friends;
