import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Welcome from './components/Welcome';
import Login from './components/Login';
import CategoryPage from './components/CategoryPage';
import ProductPage from './components/ProductPage';
import SalesPage from './components/SalesPage';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/welcome" element={<ProtectedRoute component={Welcome} />} />
          <Route path="/categories" element={<ProtectedRoute component={CategoryPage} />} />
          <Route path="/products" element={<ProtectedRoute component={ProductPage} />} />
          <Route path="/sales" element={<ProtectedRoute component={SalesPage} />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

const ProtectedRoute: React.FC<{ component: React.ElementType }> = ({ component: Component }) => {
  const { user } = useAuth();

  return user ? <Component /> : <Navigate to="/login" replace />;
};

export default App;