import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";
import Product from "@/pages/admin/product/Product";
import { FaShoppingCart, FaUsers,FaHome,FaShopify ,FaFileInvoice, FaBrain} from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import User from "@/pages/admin/user/User";
import Order from "@/pages/admin/order/Order";
import ImportReceipt from "@/pages/admin/importreceipt/ImportReceipt";
import AdminPage from "@/pages/admin";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Brand from "@/pages/admin/brand/Brand";
import DashboardPage from "@/pages/admin/dasboard/Dashboard";


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));



export default function SideBarAdminLayout() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [menuData, setMenuData] = useState("Products");
  const navigate = useNavigate();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logoutApp = ()=>{
    navigate("/auth/login");
  }
  const location = useLocation();
  const { pathname, hash } = location;
  console.log(location)
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        elevation={4}
        sx={{ backgroundColor: "#ffffff", color: "#2f2f2f" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(!open)}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <img
            className="w-20 h-10 sm:w-36 sm:h-14"
            src="/assets/images/logo.png"
            alt="logo"
          />
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <Link to="/admin#home">
          <ListItem
            disablePadding
            sx={{ display: "block"}}
            onClick={() => setMenuData("Home")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <FaHome color={hash ==="#home" ? "#007FFF" : ""}/>
              </ListItemIcon>
              <ListItemText primary="Trang chủ" sx={{ opacity: open ? 1 : 0 ,color:hash ==="#home" ? "#007FFF" : ""}} />
            </ListItemButton>
          </ListItem>
          </Link>
          <Divider />
          <Link to="/admin#product">
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => setMenuData("Products")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <FaShopify color={hash ==="#product" ? "#007FFF" : ""} />
              </ListItemIcon>
              <ListItemText primary="Sản phẩm" sx={{ opacity: open ? 1 : 0, color: hash ==="#product" ? "#007FFF" : "" }} />
            </ListItemButton>
          </ListItem>
          </Link>
          <Divider />
          <Link to="/admin#brand">
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => setMenuData("Brands")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <FaBrain  color={hash ==="#brand" ? "#007FFF" : ""} />
              </ListItemIcon>
              <ListItemText primary="Thương hiệu" sx={{ opacity: open ? 1 : 0, color: hash ==="#brand" ? "#007FFF" : ""   }} />
            </ListItemButton>
          </ListItem>
          </Link>
         

          <Divider />
          <Link to="/admin#user">
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => setMenuData("Users")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <FaUsers color={hash ==="#user" ? "#007FFF" : ""} />
              </ListItemIcon>
              <ListItemText primary="Người dùng" sx={{ opacity: open ? 1 : 0 , color: hash ==="#user" ? "#007FFF" : "" }} />
            </ListItemButton>
          </ListItem>
          </Link>
          <Divider />
          <Link to="/admin#order">
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => setMenuData("Orders")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <FaShoppingCart color={hash ==="#order" ? "#007FFF" : ""}/>
              </ListItemIcon>
              <ListItemText primary="Đơn hàng" sx={{ opacity: open ? 1 : 0,color:hash ==="#order" ? "#007FFF" : "" }} />
            </ListItemButton>
          </ListItem>
          </Link>
          <Divider />
          <Link to="/admin#importreceipt">
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => setMenuData("Import")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <FaFileInvoice color={hash ==="#importreceipt" ? "#007FFF" : ""}/>
              </ListItemIcon>
              <ListItemText
                primary="Nhập hàng"
                sx={{ opacity: open ? 1 : 0 ,color:hash ==="#importreceipt" ? "#007FFF" : ""}}
              />
            </ListItemButton>
          </ListItem>
          </Link>
          <Divider />
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={() => logoutApp()}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <MdLogout />
              </ListItemIcon>
              <ListItemText
                primary="Đăng xuất"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {menuData == "Products" && <Product />}
        {menuData == "Users" && <User />}
        {menuData == "Orders" && <Order />}
        {menuData == "Import" && <ImportReceipt />}
        {menuData == "Home" && <DashboardPage/>}
        {menuData == "Brands"&&<Brand/>}
      </Box>
    </Box>
  );
}
