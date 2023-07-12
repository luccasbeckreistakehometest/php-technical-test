import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

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
    <div>
      <h2>Welcome, {user?.name}!</h2>
      <p>You are logged in!</p>
      <button onClick={goToCategories}>Go to Categories</button>
      <button onClick={goToProducts}>Go to Products</button>
      <button onClick={goToSales}>Go to Sales</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Welcome;
