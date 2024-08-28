import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import UrlItem from './UrlItem';

function UrlList() {
  const { user } = useSelector((state) => state.auth); //user: Extracts the authenticated user’s data from the auth slice in the Redux store.
  const urls = useSelector((state) => state.urls.urls.filter((url) => url.user === user.email)); //extracts the list of URLs with the logged-in users
  const [searchTerm, setSearchTerm] = useState(''); //
  const [currentPage, setCurrentPage] = useState(1);
  const urlsPerPage = 3; //how many URLs are displayed per page (3 in this case).

  const filteredUrls = urls.filter( //filteredUrls: An array of URLs that match the search term, filtering by both the title and original URL.
    (url) =>
      url.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      url.originalUrl.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUrl = currentPage * urlsPerPage;
  const indexOfFirstUrl = indexOfLastUrl - urlsPerPage;
  const currentUrls = filteredUrls.slice(indexOfFirstUrl, indexOfLastUrl);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); //handlePageChange: Updates the currentPage state when the user clicks on a different page number.
  };

  return (
    <div className="url-list">
      <input
        type="text"
        placeholder="Search URLs"
        className="form-control mb-3" //Search Input: An input field that allows users to filter the displayed URLs based on the title or original URL.
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} //The onChange event updates the searchTerm state as the user types.
      />
      <ul className="list-group">
        {currentUrls.map((url) => (
          <UrlItem key={url.id} url={url} />
        ))}
      </ul>
      <nav>
        <ul className="pagination">  
          {Array.from({ length: Math.ceil(filteredUrls.length / urlsPerPage) }, (_, i) => (
            <li className={`page-item ${currentPage === i + 1 ? 'active' : ''}`} key={i}>
              <button className="page-link" onClick={() => handlePageChange(i + 1)}> 
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default UrlList;
