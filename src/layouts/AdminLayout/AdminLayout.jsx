import React from 'react';

const AdminLayout = ({ children }) => {
  return (
    <div>
      <p>Admin</p>
      {children}
    </div>
  );
};

export default AdminLayout;
