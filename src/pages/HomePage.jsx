import React from 'react';
import { useSelector } from 'react-redux';
import UrlForm from '../components/UrlForm';
import UrlList from '../components/UrlList';

function HomePage() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="home-page">
      {user ? (
        //UrlForm: Allows users to add new URLs.
        //UrlList: Displays the list of URLs associated with the logged-in user.
        <>
          <UrlForm /> 
          <UrlList />
        </>
      ) : (
        <p>Please log in to manage your URLs.</p> //If user is false (i.e., the user is not logged in): shows this message!
      )}
    </div>
  );
}

export default HomePage;
