import React, { useEffect, useState } from "react";
import {
  ShoppingBagOutlined,
  DeleteOutlineOutlined,
  AddLocationAltOutlined,
  LocalShippingOutlined,
  PaymentOutlined,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Grid, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { authService } from "@/service/auth.service";

const StyledTableCell = styled(TableCell)(() => ({
  fontSize: 18,
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#16131321",
    color: "#000",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(() => ({
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));



function CartPage(props) {
  const [product ,setProduct] = useState([]);
  const [quantityDefault,setQuantityDefault] = useState(1);
  const [quantityItem,setQuantityItem] = useState(0);
  const [totalOrder,setTotalOrder] = useState(0);

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

  //xoa mot san pham trong gio hang
  const removeItem  =  async(id)=>{
    
    const res =JSON.parse(localStorage.getItem("products"))||[];
    const idToString = id.toString();
    const index  = res.findIndex((item)=>item.idProduct === idToString);

    if(index!==-1){
      res.splice(index,1);
    }
    localStorage.setItem("products",JSON.stringify(res));
    getDataFromLocalStorage();
    
  }


  //lay value cua product co id
  function getValueFromStorage(id){
    const res =JSON.parse(localStorage.getItem("products"))||[];
    const idToString = id.toString();
    const item  = res.find(item=>item.idProduct === idToString);
    if(item){
      return item.quantity;
    }else{
      return quantityDefault;
    }
  }

 
  //khi quantity trong gio hang thay doi thay the gia tri cu bang gia tri moi cho id
  function changeQuantity (event,id){
    const itemChange = event.target.value;
    const res =JSON.parse(localStorage.getItem("products"))||[];
    const idToString = id.toString();
    const item  = res.find(item=>item.idProduct === idToString);
    if(item){
      item.quantity = itemChange;
    }
    localStorage.setItem("products",JSON.stringify(res));
    setQuantityItem(item.quantity);
  }

  //xu li tong tien  hoa don
  function changeTotalOrder(event){
    const res = JSON.parse(localStorage.getItem("products"))||[];
    let total = 0;
    for(const item of res){
      total = total + item.price * item.quantity;
    }
    console.log(total);
    setTotalOrder(total);
  }

  useEffect(() => {
    getDataFromLocalStorage();
  }, []);

  useEffect(()=>{
    changeTotalOrder();
  },[product])
 
  const handlePayment=async()=>{
    //save invoice

    const invoice = {
     totalAmount: totalOrder 
    }

    const order = await authService.saveOrder(invoice);
    console.log("order === ",order.id);

    

    //save invoicedetail
    const res = JSON.parse(localStorage.getItem("products"))||[];
    
    for(const item of res){
      let orderProduct = {
        price:item.price,
        quantity:item.quantity,
        totalItem:item.price*item.quantity
      }
      const result = authService.saveOrderProduct(orderProduct,item.idProduct,order.id);
      console.log("result === ",result);
      
    }


  }

  return (
    <Box>
      <Box>
        <Box className="flex items-center gap-2">
          <ShoppingBagOutlined />
          <h2 className="font-semibold text-2xl">Giỏ hàng của bạn</h2>
        </Box>
        <Box className="mt-6">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>SẢN PHẨM</StyledTableCell>
                  <StyledTableCell align="right">GIÁ</StyledTableCell>
                  <StyledTableCell align="right">SỐ LƯỢNG</StyledTableCell>
                  <StyledTableCell align="right">THÀNH TIỀN</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {product.map((item) => (
                  <StyledTableRow key={item.id}>
                    <StyledTableCell component="th" scope="row">
                      <Box className="flex items-center gap-4">
                        <img
                          className="w-20 h-20 cursor-pointer"
                          src={item.images[0].description}
                          alt="img"
                        />
                        <Box className="flex gap-1 flex-col">
                          <h2 className="text-base font-bold cursor-pointer">
                            {}
                          </h2>
                          <p>
                            Kích thước: <span>{item.sizes[0].name}</span>
                          </p>
                          <p>
                            Màu:{" "}
                            <span className="font-medium">{item.colors[0].name}</span>
                          </p>
                        </Box>
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <p className="font-bold text-base">
                        {item.price}
                        <span className="text-xl  font-semibold">₫</span>
                      </p>
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      <span className="font-bold text-base">
                        <TextField
                          type="number"
                          defaultValue={getValueFromStorage(item.id)}
                          className="w-20"
                          inputProps={{ min: 0 }}
                          size="small"
                          onChange={(event)=>changeQuantity(event,item.id)}
                        />
                      </span>
                    </StyledTableCell>
                    <StyledTableCell align="right" onClick={()=>removeItem(item.id)}>
                      <p className="font-bold text-base">
                        {getValueFromStorage(item.id)*item.price}
                        <span className="text-xl  font-semibold">₫</span>
                      </p>
                      <DeleteOutlineOutlined className="cursor-pointer ml-1"/>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      <Grid container mt={5} spacing={4}>
        <Grid item xs={12} md={8} width="100%">
          <Box>
            <Box className="flex items-center gap-2">
              <AddLocationAltOutlined />
              <h2 className="font-semibold text-2xl">Thông tin nhận hàng</h2>
            </Box>
            <Box className="mt-6 flex flex-col gap-6">
              <Box className="flex gap-3 ">
                <TextField name="username" label="Tên Tài Khoản" fullWidth />
                <TextField name="fullName" label="Họ tên" fullWidth />
              </Box>
              <TextField name="location" label="Địa chỉ" fullWidth />
              <Box className="flex gap-3 ">
                <TextField name="email" label="Email" fullWidth />
                <TextField name="phoneNumber" label="Số điện thoại" fullWidth />
              </Box>
            </Box>
          </Box>
          <Box className=" mt-10">
            <Box className="flex items-center gap-2">
              <LocalShippingOutlined />
              <h2 className="font-semibold text-2xl">Hình Thức Giao Hàng</h2>
            </Box>
            <Box className="mt-1">
              <p>
                Giao hàng tiêu chuẩn, phục vụ tận tình quý khách trên mọi con
                đường.
              </p>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box className="flex items-center gap-2">
            <PaymentOutlined />
            <h2 className="font-semibold text-2xl">Phương Thức Thanh Toán</h2>
          </Box>
          <Box className="mt-4">
            <p className="text-base font-bold">Thanh toán bằng chuyển khoản</p>
            <p className="text-sm">Chuyển tiền qua ví điện tử</p>
          </Box>
          <Box className="mt-10 flex flex-col gap-2">
            <Box className=" flex items-center justify-between">
              <p className="text-base ">Tạm tính:</p>
              <p className="text-lg font-medium ">{totalOrder}<span className="text-xl  font-semibold">₫</span>
              </p>
            </Box>
            <Box className=" flex items-center justify-between">
              <p className="text-base ">Chiết khấu:</p>
              <p className="text-lg font-medium ">
                0<span className="text-xl  font-semibold">₫</span>
              </p>
            </Box>
            <Box className=" flex items-center justify-between">
              <p className="text-base ">Vận chuyển:</p>
              <p className="text-lg font-medium ">
                0<span className="text-xl  font-semibold">₫</span>
              </p>
            </Box>
            <Box className=" flex items-center justify-between">
              <p className="text-lg font-bold">Tổng tiền:</p>
              <p className="text-lg font-medium text-[#cc1e1e]">
                {totalOrder}
                <span className="text-xl text-[#cc1e1e] font-semibold">₫</span>
              </p>
            </Box>
          </Box>
          <Box display="flex" mt={4} justifyContent="flex-end" gap={2}>
            <Link to="/">
              <Button variant="outlined">Tiếp tục mua sắm</Button>
            </Link>
            <Button variant="contained" onClick={handlePayment}>Thanh toán</Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CartPage;
