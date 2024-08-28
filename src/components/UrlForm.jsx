import React, { useState } from 'react'; //useState: A hook for managing local state within the component
import { useDispatch, useSelector } from 'react-redux'; //useSelector: A hook to extract data from the Redux store.
import { addUrl } from '../redux/slices/urlSlice';
import { shortenUrl } from '../utils/urlShortener';

function UrlForm() {
  const [title, setTitle] = useState(''); // variables to store the input values for the title 
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();
  const urls = useSelector((state) => state.urls.urls);
  const { user } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Allow URL addition only if the user is logged in and matches the registered credentials
    const registeredUser = JSON.parse(localStorage.getItem('registeredUser'));
    if (registeredUser && registeredUser.email === user.email && registeredUser.password === user.password) {
      if (urls.filter((u) => u.user === user.email).length >= 5) {  //the user has already added 5 URLs, an alert is shown, and no new URL is added.
        alert('You can only add 5 URLs per day.');
        return;
      }
      const shortUrl = shortenUrl(url);
      dispatch(addUrl({ id: Date.now(), title, originalUrl: url, shortUrl, addedAt: new Date().toISOString(), user: user.email }));
      setTitle('');
      setUrl('');
    } else {
      alert('Invalid session. Please log in again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Title</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>URL</label>
        <input
          type="url"
          className="form-control"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Shorten URL
      </button>
    </form>
  );
}

export default UrlForm;
