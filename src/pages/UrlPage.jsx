import React from 'react';
import HomePage from './HomePage';

const UrlPage = () => {
  return (
    <div style={urlPageStyle}>
      <HomePage />
    </div>
  );
};

// Inline styles for UrlPage
const urlPageStyle = {
  backgroundColor: 'black', // Universal black background
  color: 'white', // Ensure text color is visible
  minHeight: '100vh', // Full viewport height
  display: 'flex',
  justifyContent: 'center', // Center content horizontally
  alignItems: 'center', // Center content vertically
  padding: '20px',
  margin: 0,
};

export default UrlPage;
