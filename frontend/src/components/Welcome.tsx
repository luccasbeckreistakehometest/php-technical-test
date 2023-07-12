import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Welcome.css'

const Welcome = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const goToCategories = () => {
    navigate('/categories');
  };

  const goToProducts = () => {
    navigate('/products');
  };

  const goToSales = () => {
    navigate('/sales');
  };

  return (
    <div className="welcome-container">
      <h2 className="welcome-title">Welcome, {user?.name}!</h2>
      <div className="button-group">
        <button className="nav-button" onClick={goToCategories}>
          Go to Categories
        </button>
        <button className="nav-button" onClick={goToProducts}>
          Go to Products
        </button>
        <button className="nav-button" onClick={goToSales}>
          Go to Sales
        </button>
      </div>
      <button className="logout-button" onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default Welcome;
