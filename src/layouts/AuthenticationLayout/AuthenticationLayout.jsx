import { Box, styled } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';

const AuthWrapper = styled(Box)(() => ({
  background: '#b2b8c8',
  width: '100%',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px',
}));

const StyledBody = styled(Stack)(() => ({
  backgroundColor: '#f5f5f5',
  width: 600,
  height: 'auto',
  padding: 40,
  borderRadius: 16,
}));

function AuthenticationLayout({ children }) {
  return (
    <AuthWrapper>
      <StyledBody>
        <Box display="flex" justifyContent="center" mb={2}>
          <Link to="/">
            <img className="w-36 h-14 " src="/assets/images/logo.png" alt="logo" />
          </Link>
        </Box>
        {children}
      </StyledBody>
    </AuthWrapper>
  );
}

export default AuthenticationLayout;
