import React from 'react';
import { Link, useParams } from 'react-router-dom';

const Hospital = () => {
  const hospitals = [
    { id: 1, name: 'City General Hospital', location: 'Downtown' },
    { id: 2, name: 'St. Mary Medical Center', location: 'Uptown' },
    { id: 3, name: 'Health Plus Hospital', location: 'Midtown' }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h2>Hospitals</h2>
      <div style={{ display: 'grid', gap: '10px' }}>
        {hospitals.map(h => (
          <Link key={h.id} to={`/hospital/${h.id}`} style={{ textDecoration: 'none' }}>
            <div style={{
              padding: '15px',
              border: '1px solid #ddd',
              borderRadius: '5px',
              backgroundColor: '#f9f9f9',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e7f3ff'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}>
              <h3>{h.name}</h3>
              <p>{h.location}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const HospitalDetail = () => {
  const { hospitalId } = useParams();
  
  const hospitalDetails = {
    1: { name: 'City General Hospital', departments: ['Emergency', 'Cardiology', 'Neurology'], beds: 500 },
    2: { name: 'St. Mary Medical Center', departments: ['Pediatrics', 'Orthopedics', 'Oncology'], beds: 350 },
    3: { name: 'Health Plus Hospital', departments: ['Surgery', 'Dentistry', 'Dermatology'], beds: 250 }
  };

  const hospital = hospitalDetails[hospitalId];

  return (
    <div style={{ padding: '20px' }}>
      {hospital ? (
        <>
          <h2>{hospital.name}</h2>
          <p><strong>Total Beds:</strong> {hospital.beds}</p>
          <h3>Departments:</h3>
          <ul>
            {hospital.departments.map(d => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </>
      ) : (
        <p>Hospital not found</p>
      )}
    </div>
  );
};

const HospitalManagement = () => {
  const { hospitalId } = useParams();

  if (!hospitalId) {
    return <Hospital />;
  }

  return <HospitalDetail />;
};

export default HospitalManagement;
