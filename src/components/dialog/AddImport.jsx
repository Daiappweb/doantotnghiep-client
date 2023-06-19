import {
  TextField,
  Grid,
  Typography,
  FormControl,
  Button,
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import { InputLabel, Select, makeStyles } from "@material-ui/core";
import { CheckBox } from "@mui/icons-material";
import { authService } from "@/service/auth.service";
import DialogApp from "@/components/dialog";
import { useEffect } from "react";
import { array, object } from "zod";
import { updateArray } from "cx/data";
const useStyles = makeStyles({
  boxWrapper: {
    height: 500,
    direction: "column",
    justifyContent: "space-around",
  },
  role: {
    justifyContent: "flex-start",
  },
  formControl: {
    display: "flex",
    flexDirection: "row",
  },
  buttonControl: {
    justifyContent: "space-around",
  },
});

const scrollStyle = {
    maxHeight: 200, // Định dạng kích thước chiều cao cố định cho thanh cuộn
    overflowY: 'auto', // Hiển thị thanh cuộn khi nội dung vượt quá kích thước
  };
function AddImportForm(props) {
  const classes = useStyles();
  const { onClosePopup } = props;
  const [products, setProducts] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [user,setUser] = useState('');
  const [product,setProduct] = useState(null);
  const [quantity,setQuantity] = useState(0);
  const [price,setPrice] = useState(0);
  const [totalItem,setTotalItem] = useState(0);
  const [dataArray,setDataArray]= useState([]);
  const [importReceipt,setImportReceipt] = useState(null);
  const [importReceiptDetail,setImportReceiptDetail] = useState([]);

  //save
  const handleSubmit = async () => {

    let totalAmount = 0;
    dataArray.forEach(item => {
        totalAmount+= item.totalItem;
    });

    console.log(totalAmount);

    const importReceipt = {
      name: "Phiếu nhập kho",
      code: "PN"+Math.floor(Math.random() * 100000) + 1,
      description: "phiếu nhập kho",
      createdByUser: user,
      updatedByUser: user,
      isDeleted: 0,
      totalAmount: totalAmount,
      importReceiptDetails:dataArray
  }

    const saveImportReceipt = await authService.saveImportReceipt(importReceipt);

    const updatedImport = dataArray.map(item => {
      return { ...item, importReceipt: {id:saveImportReceipt.id} };
    });

    console.log("updated === ",updatedImport);
   
    for (const item of updatedImport) {
      await authService.saveImportReceiptDetail(item);
    }
    

  };



  const getUserFromLocalStorage = async () => {
    const res = JSON.parse(localStorage.getItem("user"));
    setUser(res.userName);
  };

  const handleChangeQuantity=(event,index)=>{
    console.log(index);
    const newQuantity = event.target.value;
      setDataArray(prevSizes => {
      const updatedSizes = [...prevSizes];
      updatedSizes[index] = { ...updatedSizes[index], price:price,quantity: newQuantity,totalItem:newQuantity*price,product:{id:product},importReceipt:{id:null}};
      return updatedSizes;
    });

    console.log("dataArray === ",dataArray);
  }

  const handleChangeProduct=async(event)=>{
    setProduct(event.target.value);
    let showPrice = await authService.getProductById(event.target.value);
    setPrice(showPrice.importPrice);
    console.log("product === ",event.target.value);
  }

  const loadProducts = async () => {
    const data = await authService.getAllProdcut();
    setProducts(data.products);
  };
  const loadSizes = async () => {
    const data = await authService.getAllSizes();
    const tempData = [];
    data.forEach(item => {
      //tao ra object importDetail
      let itemImportDetail = {
        name: "Phiếu nhập kho chi tiết ",
        code: "PNK"+Math.floor(Math.random() * 100000) + 1,
        description: "phiếu nhập kho",
        isDeleted: 0,
        price:0,
        quantity:0,
        totalItem:0,
        size:item.code,
        createdByUser:JSON.parse(localStorage.getItem("user")).userName,
        updatedByUser:JSON.parse(localStorage.getItem("user")).userName,
        product:{
            id:null
        },
        importReceipt:{
            id:null
        }
      }
      tempData.push(itemImportDetail);
    });
    setSizes(data);
    setDataArray(tempData);
  };
  const paymentMethod=()=>{
    setTotalItem(quantity*price);
  }

  useEffect(() => {
    loadProducts();
    loadSizes();
    getUserFromLocalStorage();
  }, []);

  useEffect(()=>{
    paymentMethod();
  },[quantity])

  return (
    <Grid container className={classes.boxWrapper}>
        <Typography md={6} xs={6} sx={{textAlign:"left"}}>Phiếu nhập kho</Typography>
        <Typography md={6} xs={6} sx={{textAlign:"left"}}>Người nhập: <Typography>{user}</Typography></Typography>
      
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sản phẩm</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Sản phẩm"
          onChange={handleChangeProduct}
          MenuProps={{
            PaperProps: {
              style: scrollStyle, // Áp dụng kiểu dáng cho menu
            },
          }}
        >
          {products.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
        </Select>
      </FormControl>

      {/* table nhập */}
      <Grid md={12} xs={12}>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="table">
            <TableHead>
              <TableRow>
                <TableCell>Size</TableCell>
                <TableCell>Số lượng</TableCell>
                <TableCell>Giá nhập</TableCell>
                <TableCell>Thành tiền</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataArray.map((item,index) => (
                <TableRow>
                  <TableCell>{item.size}</TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      onChange={(event) => handleChangeQuantity(event, index)}
                      inputProps={{
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      disabled
                      value={price}
                      inputProps={{
                        inputMode: "numeric",
                        pattern: "[0-9]*",
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                     
                      defaultValue={0}
                      value={item.totalItem}
                      disabled
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          color="success"
          size="small"
          onClick={() => handleSubmit()}
        >
          Tạo hóa đơn nhập
        </Button>
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={onClosePopup}
        >
          Thoát
        </Button>
      </Stack>
    </Grid>
  );
}
export default AddImportForm;
