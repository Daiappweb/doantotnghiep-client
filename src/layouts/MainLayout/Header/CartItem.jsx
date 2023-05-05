import { Box, Divider, styled, TextField, Typography, withStyles } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '@/service/auth.service';
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
  const [quantity,setQuantity] = useState(1);
  const [product,setProduct] = useState([]);
   //lay products tu localStorage va gan cho product
   const getDataFromLocalStorage = async () => {
    const res = JSON.parse(localStorage.getItem("products"))||[];
    let newProduct = []
   for(const item of res){
    let p = await authService.getProductById(item.idProduct);
    newProduct =[...newProduct,p];
   }
  setProduct(newProduct);
  console.log("product === ",product)
  };

  const handleChangeQuantity = async (event,id)=>{
    const itemChange = event.target.value;
    const res =JSON.parse(localStorage.getItem("products"))||[];
    const idToString = id.toString();
    const item  = res.find(item=>item.idProduct === idToString);
    if(item){
      item.quantity = itemChange;
    }
    localStorage.setItem("products",JSON.stringify(res));
    setQuantity(item.quantity);
  }

  const handleDelete = (id)=>{
    const res =JSON.parse(localStorage.getItem("products"))||[];
    const idToString = id.toString();
    const index  = res.findIndex((item)=>item.idProduct === idToString);

    if(index!==-1){
      res.splice(index,1);
    }
    localStorage.setItem("products",JSON.stringify(res));
    getDataFromLocalStorage();
    window.location.reload()
  }
  return (
    <Box>
      <Divider className="pt-2" />
      <Box display="flex" gap={2} alignItems="center" className="relative">
        <Box className="w-[155px] h-[70px] ">
          <Link to={`/shoes/${cart.idProduct}`}>
            <img className="w-full h-full " src={cart.image} alt="img" />
          </Link>
        </Box>
        <Box display="flex" flexDirection="column">
          <Link to={`/shoes/${cart.idProduct}`}>
            <ShoesName className="hover:text-primary">{cart.name}</ShoesName>
          </Link>
          <p className="text-sm">
            Màu: {cart.color.name} <span className="ml-3">Size: {cart.size.name}</span>
          </p>
          <Box display="flex" mt={2} gap={2} alignItems="center" justifyContent="space-between">
            <TextField
              type="number" 
              inputProps={{ min: 0 }}
              defaultValue={cart.quantity?cart.quantity:1} 
              className="w-28" 
              size="small" 
              onChange={(event)=>handleChangeQuantity(event,cart.idProduct)}
              />
            <p className=" text-lg text-[#cc1e1e] font-medium">
              {cart.price *quantity} <span className="text-xl text-[#cc1e1e] font-semibold">₫</span>
            </p>
          </Box>
        </Box>
        <p className="absolute top-4 right-0 hover:underline cursor-pointer" onClick={()=>handleDelete(cart.idProduct)}>Xóa</p>
      </Box>
    </Box>
  );
}

export default  CartItem;
