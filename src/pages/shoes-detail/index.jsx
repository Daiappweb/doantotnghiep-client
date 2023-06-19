import { authService } from "@/service/auth.service";
import {
  Box,
  Grid,
  styled,
  Stack,
  Button,
  TextField,
  Rating,
  withStyles,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";



const ShoesWrapper = styled(Grid)(() => ({
  background: "#fff",
  borderRadius: 4,
  padding: 16,
  width: "100%",
}));




function ShoesDetailPage(shoes,classes) {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [sizeSelected,setSizeSelected] = useState(null);
  const param = useParams();
  const pId = param.id;
  console.log("pid === ", pId);
  const loadProductById = async () => {
    try {
      const res = await authService.getProductById(pId);
      setProduct(res);
    } catch (error) {
      console.log(error);
    }
  };

  //changeSize
  const handleSizeClick = (size) => {
    setSizeSelected(size);
    console.log("sizeSelected === ",size);
  };

  const changeQuantity = (event) => {
    const value = event.target.value;
    console.log("quantity === ", value);
    setQuantity(value);
  };

  const addToCarts = async () => {
    // Lấy giá trị hiện tại của key "products" trong localStorage
    const products = JSON.parse(localStorage.getItem("products")) || [];

    //tìm vị trí của pId xem tồn tại hay không
    const index = products.findIndex((item)=>item.idProduct === pId)
    const product = await authService.getProductById(pId);

    if(index === -1){
      products.push({ 
        idProduct: pId, 
        quantity: quantity,
        price:product.price,
        name:product.name,
        color:product.colors[0],
        size:sizeSelected,
        image:product.imageSrc
      });
    }else{
      products[index].quantity = quantity;
    }

    // Lưu lại mảng "products" vào localStorage
    localStorage.setItem("products", JSON.stringify(products));
    window.location.reload()
  };

  useEffect(() => {}, [quantity]);

  useEffect(() => {
    loadProductById(pId);
  }, [pId]);



  return (
    
    <Box>
      
      {product ? (
        <ShoesWrapper container spacing={3}>
          <Grid item xs={12} sm={5}>
            <img src={product.imageSrc} alt="img" />
          </Grid>
          <Grid item xs={12} sm={7}>
            <Stack spacing={2}>
              <h3 className="font-semibold text-2xl">{product.name}</h3>
              <p className=" text-[30px] text-[#cc1e1e] font-medium">
                {product.price}{" "}
                <span className="text-[30px] text-[#cc1e1e] font-semibold">
                  ₫
                </span>
              </p>
            
              <Box display="flex" alignItems="center" gap={2}>
                <p className="text-[#777]">
                  Đã bán:{" "}
                  <span className="text-black">
                    {product.quantitySell}
                  </span>
                </p>
              </Box>

              <Box className="flex items-center">
                <p className="text-[#777] mr-2">Đánh giá:</p>
                <span className="underline mr-1 text-[#ecab14]">{4}</span>
                <Rating
                  readOnly
                  name="half-rating"
                  defaultValue={4}
                  size="small"
                  precision={0.5}
                />
              </Box>
              <Box display="flex" alignItems="center" gap={2}>
                <p className="text-[#777]">
                  Kiểu dáng:{" "}
                  <span className="text-black">
                    {product.categories[0].name}
                  </span>
                </p>
              </Box>

              <Box display="flex" alignItems="center" gap={2}>
                <p className="text-[#777]">
                  Thương hiệu:{" "}
                  <span className="text-black">{product.brand.name}</span>
                </p>
              </Box>
              <p className="text-[#777]">
                Màu sắc:{" "}
                <span className="text-black">{product.colors[0].name}</span>
              </p>
              <Box
                display="flex"
                alignItems="center"
                gap={2}
                className="text-[#777]"
              >
                <p>Kích thước: </p>
                <Box display="flex" gap={2}>
                  {product.sizes.map((size, index) => (
                    <Button key={index}
                            variant="outlined"
                            sx={{backgroundColor:sizeSelected === size.code?"green":"none"}}
                            onClick={()=>handleSizeClick(size.code)}
                            >
                      {size.name}
                    </Button>
                  ))}
                </Box>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                gap={2}
                className="text-[#777]"
              >
                <p>Số lượng: </p>
                <Box display="flex" alignItems="center" gap={2}>
                  <TextField
                    type="number"
                    defaultValue={1}
                    className="w-20"
                    size="small"
                    onChange={changeQuantity}
                  />
                  <Link to="/cart">
                    <Button variant="contained" onClick={addToCarts}>
                      Thêm vào giỏ hàng
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Stack>
          </Grid>
          <Box mt={8}>
            <p className="font-semibold text-xl">MÔ TẢ SẢN PHẨM</p>
            <Box mt={2}>
              <p>{product.description}</p>
            </Box>
          </Box>
        </ShoesWrapper>
      ) : null}
    </Box>
  );
}

export default ShoesDetailPage;
