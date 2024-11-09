import React, { useState } from 'react';

function URLForm() {
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url || !title) {
      setError('Both fields are required!');
      return;
    }
    setError('');
    // Handle URL submission logic here
    console.log('URL Submitted:', { url, title });
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={headerStyle}>Add Your URL</h2>
        <div style={inputGroupStyle}>
          <label htmlFor="title" style={labelStyle}>Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            style={inputStyle}
          />
        </div>
        <div style={inputGroupStyle}>
          <label htmlFor="url" style={labelStyle}>URL</label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL"
            style={inputStyle}
          />
        </div>
        {error && <p style={errorStyle}>{error}</p>}
        <button type="submit" style={submitButtonStyle}>Submit</button>
      </form>
    </div>
  );
}

// Styles
const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh', // Full screen height
  backgroundColor: 'black',
  color: 'white',
};

const formStyle = {
  backgroundColor: '#222',
  padding: '30px 40px',
  borderRadius: '8px',
  width: '100%',
  maxWidth: '500px', // Max width for larger screens
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const headerStyle = {
  textAlign: 'center',
  marginBottom: '20px',
  fontSize: '1.8rem',
};

const inputGroupStyle = {
  marginBottom: '15px',
};

const labelStyle = {
  display: 'block',
  fontSize: '1rem',
  marginBottom: '5px',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  fontSize: '1rem',
  border: '1px solid #555',
  borderRadius: '4px',
  backgroundColor: '#333',
  color: 'white',
};

const errorStyle = {
  color: 'red',
  textAlign: 'center',
  marginBottom: '15px',
};

const submitButtonStyle = {
  width: '100%',
  padding: '12px',
  fontSize: '1.1rem',
  color: 'white',
  backgroundColor: '#ff9900',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

export default URLForm;
