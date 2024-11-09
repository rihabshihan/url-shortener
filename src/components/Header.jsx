import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/authSlice';


function Header() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  // Inline Styles
  const navbarStyle = {
    backgroundColor: 'black', // Grey background
    color: 'white',
  };

  const brandStyle = {
    fontWeight: 'bold',
    // fontStyle: 'italic',
    fontSize: '25px',
    padding: '10px 20px',
    color: 'grey',
    textDecoration: 'none',
    transition: 'color 0.3s ease-in-out',
  };

  const brandHoverStyle = {
    color: '#f8f9fa', // Light color for hover
  };

  const navLinkStyle = {
    color: 'white',
    transition: 'color 0.3s ease-in-out',
  };

  const navLinkHoverStyle = {
    color: '#f8f9fa', // Light color for hover
  };

  const btnLinkStyle = {
    color: 'white',
    fontWeight: 'bold',
    transition: 'color 0.3s ease-in-out',
  };

  const btnLinkHoverStyle = {
    color: '#f8f9fa', // Light color for hover
  };

  return (
    <nav className="navbar navbar-expand-lg" style={navbarStyle}>
      <div className="container">
        <Link
          className="navbar-brand"
          to="/"
          style={brandStyle}
          onMouseEnter={(e) => (e.target.style.color = brandHoverStyle.color)}
          onMouseLeave={(e) => (e.target.style.color = brandStyle.color)}
        >
          SnapLink
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ml-auto">
            {user ? (
              <>
                <li className="nav-item">
                  <button
                    className="btn btn-link nav-link"
                    onClick={handleLogout}
                    style={btnLinkStyle}
                    onMouseEnter={(e) => (e.target.style.color = btnLinkHoverStyle.color)}
                    onMouseLeave={(e) => (e.target.style.color = btnLinkStyle.color)}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/login"
                    style={navLinkStyle}
                    onMouseEnter={(e) => (e.target.style.color = navLinkHoverStyle.color)}
                    onMouseLeave={(e) => (e.target.style.color = navLinkStyle.color)}
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/register"
                    style={navLinkStyle}
                    onMouseEnter={(e) => (e.target.style.color = navLinkHoverStyle.color)}
                    onMouseLeave={(e) => (e.target.style.color = navLinkStyle.color)}
                  >
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
