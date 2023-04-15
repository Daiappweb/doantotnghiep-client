import React from 'react';
import { Box } from '@mui/material';
import HeaderLayout from './Header/HeaderLayout';
import FooterLayout from './FooterLayout';
import SimpleSlider from '@/components/home/Slider';
import { useLocation } from 'react-router-dom';

const MainLayout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="bg-[#f5f5f5]">
      <HeaderLayout />
      <Box>
        {location.pathname === '/' && <SimpleSlider />}
        <Box className="max-w-[1240px] mx-auto pt-6 px-4 pb-24">{children}</Box>
      </Box>
      <FooterLayout />
    </div>
  );
};

export default MainLayout;
