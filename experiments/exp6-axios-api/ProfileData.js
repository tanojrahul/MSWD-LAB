import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileData = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      // Using JSONPlaceholder API - first user
      const response = await axios.get('https://jsonplaceholder.typicode.com/users/1');
      setProfile(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch profile data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ padding: '20px' }}>Loading profile...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;

  return (
    <div style={{ maxWidth: '500px', margin: '30px auto' }}>
      <h2>Profile Data</h2>
      {profile && (
        <div style={{
          border: '1px solid #ddd',
          padding: '20px',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9'
        }}>
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Phone:</strong> {profile.phone}</p>
          <p><strong>Website:</strong> {profile.website}</p>
          <p><strong>Company:</strong> {profile.company.name}</p>
          <p><strong>Address:</strong> {profile.address.street}, {profile.address.suite}, {profile.address.city}</p>
          <button
            onClick={fetchProfile}
            style={{
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Refresh Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileData;
