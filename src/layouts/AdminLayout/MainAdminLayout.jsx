import React from 'react';
import { Box } from '@mui/material';
import HeaderAdminLayout from './HeaderAdminLayout';
import SideBarAdminLayout from './SideBarAdminLayout';
import { useLocation } from 'react-router-dom';

const MainAdminLayout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="bg-[#f5f5f5]">
      <HeaderAdminLayout />
      <Box>
        {location.pathname === '/admin'}
        <Box className="max-w-[1240px] mx-auto pt-6 px-4 pb-24">{children}</Box>
      </Box>
      <SideBarAdminLayout />
    </div>
  );
};



export default MainAdminLayout;
