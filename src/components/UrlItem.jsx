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
    <li className="list-group-item">
      {isEditing ? (
        <>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="form-control mb-2"
          />
          <input
            type="url"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            className="form-control mb-2"
          />
          <button className="btn btn-success btn-sm mr-2" onClick={handleUpdate}>
            Save
          </button>
          <button className="btn btn-secondary btn-sm" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <h5>{url.title}</h5>
          <p>
            Original URL: <a href={url.originalUrl} target="_blank" rel="noopener noreferrer">{url.originalUrl}</a>
          </p>
          <p>
            Short URL: <a href={url.shortUrl} target="_blank" rel="noopener noreferrer">{url.shortUrl}</a>
          </p>
          <small>Added on: {new Date(url.addedAt).toLocaleString()}</small>
          <button className="btn btn-success btn-sm ml-3" onClick={() => setIsEditing(true)}>
            Edit
          </button>
          <button className="btn btn-danger btn-sm ml-2" onClick={() => setShowModal(true)}>
            Delete
          </button>
        </>
      )}

      {/* Bootstrap Modal */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Confirm Deletion</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this URL?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default UrlItem;

