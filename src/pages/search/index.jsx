import { Box,TextField } from '@mui/material';
import React from 'react';

function SearchPage() {
  return (
    <Box sx={{
      width:'100%',
      display:'flex',
      justifyContent:'center'
    }}>
      <TextField sx={{
        width:"50%",
      }}>

      </TextField>
    </Box>
  );
}

export default SearchPage;
