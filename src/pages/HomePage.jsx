import React from 'react';
import { useSelector } from 'react-redux';
import UrlForm from '../components/UrlForm';
import UrlList from '../components/UrlList';

function HomePage() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div style={mainContainerStyle}>
      <div style={homePageStyle}>
        {user ? (
          <>
            <UrlForm />
            <div style={urlListMarginStyle}>
              <UrlList />
            </div>
          </>
        ) : (
          <p style={messageStyle}>Please log in to manage your URLs.</p>
        )}
      </div>
    </div>
  );
}

// Inline styles

// Main container to apply black background
const mainContainerStyle = {
  backgroundColor: 'black',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
};

// HomePage content
const homePageStyle = {
  color: 'white',
  width: '100%',
  textAlign: 'center',
  maxWidth: '800px',
};

const messageStyle = {
  color: '#ff9900',
  fontSize: '1.5rem',
  fontWeight: 'bold',
};

const urlListMarginStyle = {
  marginTop: '20px',
};

export default HomePage;
