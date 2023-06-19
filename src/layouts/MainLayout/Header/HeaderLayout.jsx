/* eslint-disable react/jsx-no-comment-textnodes */
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  styled,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCartOutlined,
  SearchOutlined,
  Close,
  List,
} from "@mui/icons-material";
import CartItem from "./CartItem";
import Cookies from "js-cookie";
import { authService } from "@/service/auth.service";

const HeaderWrapper = styled(Box)(({ theme }) => ({
  maxWidth: 1240,
  margin: "0 auto",
  height: 94,
  padding: "0 16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const HeaderNav = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 20,
  "& p": {
    fontWeight: 600,
  },
  "& p:hover": {
    color: "#1976d2",
  },
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const CartNumber = styled(Box)(() => ({
  position: "absolute",
  top: -6,
  right: -5,
  width: 20,
  height: 20,
  background: "#cc1e1e",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 10,
  color: "#fff",
}));

const CartWrapper = styled(Box)(({ theme }) => ({
  width: 400,
  height: "100%",
  padding: "32px 16px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  [theme.breakpoints.down("md")]: {
    width: 320,
  },
}));

const styles = {
  input: {
    color: 'white',
  },
  label: {
    color: 'white'
  },
  
};



function HeaderLayout() {



  // check login

  const isLoggedIn = Cookies.get("accessToken");

  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isOpenCart, setIsOpenCart] = useState(false);
  const [isOpenSidebarOnMobile, setIsOpenSidebarOnMobile] = useState(false);
  const [cartList, setCartList] = useState([]);
  const [toltalAmount, setToltalAmount] = useState(0);
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [userName,setUserName] = useState('');
  const [email,setEmail] = useState('');
  const [name,setName]= useState('');
  const [address,setAddress] = useState('');
  const navigate = useNavigate();
  const handleClickCart = () => {
    navigate("/cart");
    setIsOpenCart(!isOpenCart);
  };

  const loadUser = ()=>{
    const res = JSON.parse(localStorage.getItem('user'));
    setUserName(res.userName);
    setAddress(res.address);
    setEmail(res.email);
    setName(res.name);
    
    console.log(res);
  }
  const toggleProfile = () => {
    setIsOpenProfile(!isOpenProfile);
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    Cookies.remove("accessToken");
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
    // localStorage.removeItem('products');
    setAnchorElUser(null);
  };

  const toggleCart = () => {
    setIsOpenCart(!isOpenCart);
  };
  const toggleSidebarMobile = () => {
    setIsOpenSidebarOnMobile(!isOpenSidebarOnMobile);
  };

  const handleCloseUserMenuTab = () => {
    setAnchorElUser(null);
  };

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

  const getDataFromLocalStorage = async () => {
    const res = JSON.parse(localStorage.getItem("products")) || [];
    for (const item of res) {
      setToltalAmount(toltalAmount + item.price * item.quantity);
    }
    setCartList(res);
  };

  useEffect(() => {
    getDataFromLocalStorage();
    loadUser();
  }, []);

  const handleInputChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleInputChangeName = (event) => {
    setName(event.target.value);
  };
  const handleInputChangeUserName = (event) => {
    setUserName(event.target.value);
  };
  const handleInputChangeAddress = (event) => {
    setAddress(event.target.value);
  };
  

  return (
    <HeaderWrapper>
      <Box>
        <Link to="/">
          <img
            className="w-20 h-10 sm:w-36 sm:h-14"
            src="/assets/images/logo.png"
            alt="logo"
          />
        </Link>
      </Box>
      <HeaderNav>
        <p>
          <Link to="/">TRANG CHỦ</Link>
        </p>
        <p>
          <Link to="/home/product">SẢN PHẨM</Link>
        </p>
        <p>
          <Link to="/">GIỚI THIỆU</Link>
        </p>
        <p>
          <Link to="/">TRỢ GIÚP</Link>
        </p>
      </HeaderNav>
      <Box display="flex" alignItems="center" justifyContent="flex-end">
        {/* Not login */}
        <Link to="/search" className="hover:text-primary ">
          <SearchOutlined />
        </Link>
        <Box className="px-6">
          <Box onClick={toggleCart} className="cursor-pointer relative">
            <ShoppingCartOutlined />
            <CartNumber>{cartList.length ? cartList.length : 0}</CartNumber>
          </Box>
        </Box>

        {/* Login success */}
        {isLoggedIn ? (
          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/assets/images/avatar.jpg" />
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenuTab}
            >
              <MenuItem onClick={toggleProfile}>
                <Typography textAlign="center">Thông tin cá nhân</Typography>
              </MenuItem>
              <MenuItem>
                <Typography textAlign="center">Cài đặt tài khoản</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography textAlign="center">Đăng xuất</Typography>
              </MenuItem>
            </Menu>
          </Box>
        ) : !smDown ? (
          <Link to="/auth/login">
            <Button variant="contained" size="large">
              Đăng nhập
            </Button>
          </Link>
        ) : null}

        {smDown && <List onClick={toggleSidebarMobile} />}

        {/* Cart */}
        <Box>
          <Drawer open={isOpenCart} anchor="right" onClose={toggleCart}>
            <CartWrapper>
              <Box>
                <Box display="flex" justifyContent="space-between">
                  <h3 className="text-xl font-medium pb-1">
                    Giỏ hàng{" "}
                    <span className="text-base text-primary">x {0}</span>
                  </h3>
                  <Close
                    onClick={toggleCart}
                    className="cursor-pointer hover:text-primary"
                  />
                </Box>
                <Box py={2}>
                  {cartList.length === 0 ? (
                    <p>Chưa có sản phẩm nào trong giỏ hàng</p>
                  ) : (
                    <Stack
                      spacing={2}
                      className="overflow-y-auto max-h-[500px]"
                    >
                      {cartList.map((cart) => (
                        <CartItem key={cart.idProduct} cart={cart} />
                      ))}
                    </Stack>
                  )}
                </Box>
              </Box>
              <Stack spacing={3}>
                <Divider />
                <Box display="flex" justifyContent="space-between">
                  <p className="text-lg font-medium">Tổng tiền: </p>
                  <p className="text-lg font-medium text-[#cc1e1e]">
                    {toltalAmount ? toltalAmount : 0}
                    <span className="text-xl text-[#cc1e1e] font-semibold">
                      ₫
                    </span>
                  </p>
                </Box>
                <Box display="flex" justifyContent="flex-end" gap={2}>
                  <Button variant="contained" onClick={handleClickCart}>
                    Xem giỏ hàng
                  </Button>
                </Box>
              </Stack>
            </CartWrapper>
          </Drawer>
        </Box>

        {/* toggle profile */}

   
        
          <Drawer
           PaperProps={{
            sx: { 
              width: "400px" ,
              display:"flex",
              justifyContent:"space-around",
              alignItems:"center",
              padding:"16px",
              backgroundColor:"#32373f",
              color:"#ffffff"
            },

          }}
            open={isOpenProfile}
            onClose={toggleProfile}
            anchor="right"
          >
            <IconButton sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src="/assets/images/avatar.jpg" />
            </IconButton>
            <Typography>THÔNG TIN CÁ NHÂN</Typography>
            <TextField 
              type="text" 
              label="Tên đăng nhập" 
              fullWidth  
              InputProps={{ style: styles.input }} 
              InputLabelProps={{ style: styles.label }}
              value={userName}
    
              
              />
            <TextField 
              type="text" 
              label="Họ và tên" 
              fullWidth 
              InputProps={{ style: styles.input }} 
              InputLabelProps={{ style: styles.label }}
              defaultValue = {name?name:''}
              onChange={handleInputChangeName}
              />
            <TextField
             type="text" 
             label="Địa chỉ" 
             fullWidth 
             InputProps={{ style: styles.input }} 
             InputLabelProps={{ style: styles.label }}
             defaultValue = {address?address:""}
             onChange={handleInputChangeAddress}
             />
            <TextField 
              type="text" 
              label="Email" 
              fullWidth 
              InputProps={{ style: styles.input }} 
              InputLabelProps={{ style: styles.label }}
              defaultValue = {email?email:""}
              onChange={handleInputChangeEmail}
              />
            <Button variant="contained" color="success" sx={{
              width:160,
           
              
            }}>Cập nhật</Button>
          </Drawer>
     
       
  

        {/* Sidebar on mobile*/}
        <Box>
          <Drawer
            open={isOpenSidebarOnMobile}
            anchor="right"
            onClose={toggleSidebarMobile}
          >
            <CartWrapper>
              <Box>
                <Box display="flex" justifyContent="space-between">
                  <Stack spacing={2} className="font-semibold">
                    <p>
                      <Link href="/">TRANG CHỦ</Link>
                    </p>
                    <p>
                      <Link href="/">SẢN PHẨM</Link>
                    </p>
                    <p>
                      <Link href="/">GIỚI THIỆU</Link>
                    </p>
                    <p>
                      <Link href="/">TRỢ GIÚP</Link>
                    </p>
                    {!isLoggedIn && smDown ? (
                      <Link to="/auth/login">
                        <Button variant="contained" size="large">
                          Đăng nhập
                        </Button>
                      </Link>
                    ) : null}
                  </Stack>
                  <Close
                    onClick={toggleSidebarMobile}
                    className="cursor-pointer hover:text-primary"
                  />
                </Box>
              </Box>
            </CartWrapper>
          </Drawer>
        </Box>
      </Box>
    </HeaderWrapper>
  );
}

export default HeaderLayout;
