import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteUrl, updateUrl } from '../redux/slices/urlSlice'; // to handle deletion and updating of URLs

function UrlItem({ url }) {
  const [isEditing, setIsEditing] = useState(false); // State to track editing mode
  const [newTitle, setNewTitle] = useState(url.title);
  const [newUrl, setNewUrl] = useState(url.originalUrl);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteUrl(url.id));
    setShowModal(false); // Hide the modal after deletion
  };

  const handleUpdate = () => {
    dispatch(updateUrl({ ...url, title: newTitle, originalUrl: newUrl }));
    setIsEditing(false); // Exit edit mode
  };

  return (
    <li className="list-group-item" style={listItemStyle}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="form-control mb-2"
            style={inputStyle}
          />
          <input
            type="url"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            className="form-control mb-2"
            style={inputStyle}
          />
          <button className="btn btn-success btn-sm mr-2" onClick={handleUpdate} style={buttonStyle}>
            Save
          </button>
          <button className="btn btn-secondary btn-sm" onClick={() => setIsEditing(false)} style={buttonStyle}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <h5 style={titleStyle}>{url.title}</h5>
          <p style={paragraphStyle}>
            Original URL: <a href={url.originalUrl} target="_blank" rel="noopener noreferrer" style={linkStyle}>{url.originalUrl}</a>
          </p>
          <p style={paragraphStyle}>
            Short URL: <a href={url.shortUrl} target="_blank" rel="noopener noreferrer" style={linkStyle}>{url.shortUrl}</a>
          </p>
          <small style={smallTextStyle}>Added on: {new Date(url.addedAt).toLocaleString()}</small>
          <button className="btn btn-success btn-sm ml-3" onClick={() => setIsEditing(true)} style={buttonStyle}>
            Edit
          </button>
          <button className="btn btn-danger btn-sm ml-2" onClick={() => setShowModal(true)} style={buttonStyle}>
            Delete
          </button>
        </>
      )}

      {/* Bootstrap Modal */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content" style={modalContentStyle}>
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Confirm Deletion</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body" style={modalBodyStyle}>
              Are you sure you want to delete this URL?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)} style={buttonStyle}>Cancel</button>
              <button type="button" className="btn btn-danger" onClick={handleDelete} style={buttonStyle}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

// Inline styles
const listItemStyle = {
  backgroundColor: 'black',
  color: 'white',
  padding: '15px',
  borderRadius: '5px',
  marginBottom: '10px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
};

const titleStyle = {
  fontSize: '1.2rem',
  fontWeight: 'bold',
};

const paragraphStyle = {
  fontSize: '1rem',
  color: '#ddd',
};

const smallTextStyle = {
  fontSize: '0.9rem',
  color: '#ccc',
};

const inputStyle = {
  backgroundColor: '#333',
  color: 'white',
  borderColor: '#555',
};

const linkStyle = {
  color: '#ff9900',
  textDecoration: 'none',
};

const buttonStyle = {
  marginTop: '10px',
  marginRight: '5px',
  backgroundColor: '#ff9900',
  color: 'white',
  border: 'none',
  borderRadius: '4px',
  padding: '8px 12px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

const modalContentStyle = {
  backgroundColor: '#222',
  color: 'white',
};

const modalBodyStyle = {
  color: '#ddd',
};

export default UrlItem;
