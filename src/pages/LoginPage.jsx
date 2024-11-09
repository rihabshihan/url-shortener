import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/slices/authSlice';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve registered user credentials from localStorage
    const registeredUser = JSON.parse(localStorage.getItem('registeredUser'));

    // Check if email and password match registered credentials
    if (registeredUser && registeredUser.email === email && registeredUser.password === password) {
      const user = { email, password };
      dispatch(login(user));
      navigate('/');
    } else {
      alert('Invalid email or password.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-black text-white">
      <div className="card p-4 shadow-lg" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
