import React from 'react';

const Home = () => (
  <div style={{ padding: '30px', maxWidth: '900px', margin: '0 auto' }}>
    <h1>Home Page</h1>
    <div style={{ backgroundColor: '#e7f3ff', padding: '20px', borderRadius: '5px' }}>
      <p>Welcome to the React Router Experiment Application!</p>
      <p>This application demonstrates:</p>
      <ul>
        <li>Basic routing with React Router</li>
        <li>Nested routing structures</li>
        <li>Dynamic routes with parameters</li>
        <li>Simple navigation between pages</li>
      </ul>
      <p style={{ marginTop: '20px' }}>Use the navigation bar above to explore different sections of the application.</p>
    </div>
  </div>
);

export default Home;
