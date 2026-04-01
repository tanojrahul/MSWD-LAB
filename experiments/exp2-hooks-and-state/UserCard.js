import React from 'react';

const UserCard = ({ user = { name: 'John Doe', email: 'john@example.com', age: 25 } }) => {
  return (
    <div style={{
      border: '2px solid #007bff',
      borderRadius: '8px',
      padding: '20px',
      maxWidth: '300px',
      textAlign: 'center',
      backgroundColor: '#f0f8ff'
    }}>
      <h2>{user.name}</h2>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Age:</strong> {user.age}</p>
      <button style={{
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}>
        View Profile
      </button>
    </div>
  );
};

export default UserCard;
