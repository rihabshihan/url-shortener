import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import UrlItem from './UrlItem';

function UrlList() {
  const { user } = useSelector((state) => state.auth);
  const urls = useSelector((state) =>
    state.urls.urls.filter((url) => url.user === user?.email)
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const urlsPerPage = 3;

  // Memoize filtered URLs to optimize performance
  const filteredUrls = useMemo(() => {
    return urls.filter(
      (url) =>
        url.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        url.originalUrl.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [urls, searchTerm]);

  // Pagination Logic
  const indexOfLastUrl = currentPage * urlsPerPage;
  const indexOfFirstUrl = indexOfLastUrl - urlsPerPage;
  const currentUrls = filteredUrls.slice(indexOfFirstUrl, indexOfLastUrl);

  const totalPages = Math.ceil(filteredUrls.length / urlsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="url-list">
      <input
        type="text"
        placeholder="Search URLs"
        className="form-control mb-3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      {currentUrls.length > 0 ? (
        <ul className="list-group">
          {currentUrls.map((url) => (
            <UrlItem key={url.id} url={url} />
          ))}
        </ul>
      ) : (
        <p className="text-muted">No URLs found matching your search.</p>
      )}

      {totalPages > 1 && (
        <nav>
          <ul className="pagination justify-content-center mt-3">
            {Array.from({ length: totalPages }, (_, i) => (
              <li
                className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}
                key={i}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}

export default UrlList;
