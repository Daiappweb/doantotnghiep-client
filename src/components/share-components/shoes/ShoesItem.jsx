import styled from '@emotion/styled';
import { Box, Rating, Typography } from '@mui/material';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

const ShoesWrapper = styled(Box)(() => ({
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
  borderRadius: 6,
  backgroundColor: '#fff',
}));

const ShoesName = styled(Typography)(() => ({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: ' -webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  marginRight: 40,
  marginTop: 16,
  cursor: 'pointer',
}));

function ShoesItem({ shoes }) {
  return (
    <ShoesWrapper>
      <Link to={`/shoes/${shoes.id}`}>
        <img src={shoes.images[0].description} alt="img" />
      </Link>
      <Box display="flex" flexDirection="column" p={2}>
        <Link to={`/shoes/${shoes.id}`}>
          <ShoesName className="hover:text-primary">{shoes.name}</ShoesName>
        </Link>
        <Box display="flex" mt={2} gap={2} alignItems="center" justifyContent="space-between">
          <p className=" text-lg text-[#cc1e1e] font-medium">
            {shoes.price} <span className="text-xl text-[#cc1e1e] font-semibold">₫</span>
          </p>
          <Rating readOnly name="half-rating" defaultValue={4.5} size="small" precision={0.5} />
        </Box>
      </Box>
    </ShoesWrapper>
  );
}

export default ShoesItem;
