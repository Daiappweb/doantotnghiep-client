import { Box, Divider, styled, TextField, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

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

function CartItem({ cart }) {
  return (
    <Box>
      <Divider className="pt-2" />
      <Box display="flex" gap={2} alignItems="center" className="relative">
        <Box className="w-[155px] h-[70px] ">
          <Link to={`/shoes/${cart.id}`}>
            <img className="w-full h-full " src={cart.image} alt="img" />
          </Link>
        </Box>
        <Box display="flex" flexDirection="column">
          <Link to={`/shoes/${cart.id}`}>
            <ShoesName className="hover:text-primary">{cart.name}</ShoesName>
          </Link>
          <p className="text-sm">
            Màu: {cart.color} <span className="ml-3">Size: {cart.size}</span>
          </p>
          <Box display="flex" mt={2} gap={2} alignItems="center" justifyContent="space-between">
            <TextField type="number" defaultValue={1} className="w-28" size="small" />
            <p className=" text-lg text-[#cc1e1e] font-medium">
              {cart.price} <span className="text-xl text-[#cc1e1e] font-semibold">₫</span>
            </p>
          </Box>
        </Box>
        <p className="absolute top-4 right-0 hover:underline cursor-pointer">Xóa</p>
      </Box>
    </Box>
  );
}

export default CartItem;
