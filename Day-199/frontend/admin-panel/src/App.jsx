import React, { useState } from 'react';
import AdminLogin from './components/AdminLogin';
import ProductList from './components/ProductList';

const App = () => {
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);
  const [adminData, setAdminData] = useState(null);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Admin Panel</h1>
      {!adminLoggedIn ? (
        <AdminLogin setAdminLoggedIn={setAdminLoggedIn} setAdminData={setAdminData} />
      ) : (
        <div>
          <p>Welcome, {adminData.email}</p>
          <ProductList />
        </div>
      )}
    </div>
  );
};

export default App;
