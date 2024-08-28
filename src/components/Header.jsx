import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';

function Header() {
  const { user } = useSelector((state) => state.auth); //the user object from the auth slice of your Redux store,
  const dispatch = useDispatch(); //Used to dispatch the logout action.
  const navigate = useNavigate(); //Allows navigation to the login page after logout.

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login'); //After logging out, it navigates the user to the login page.
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-warning">
      <div className="container">
        <Link className="navbar-brand" to="/">
          URL Shortener
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            {user ? (
              <>
                <li className="nav-item">
                  <button className="btn btn-link nav-link" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
