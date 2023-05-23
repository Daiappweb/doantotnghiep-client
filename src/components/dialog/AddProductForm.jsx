import {
  TextField,
  Grid,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Button,
  Stack,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Autocomplete,
  OutlinedInput,
  Chip,
  Box,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { makeStyles } from "@material-ui/core";
import { authService } from "@/service/auth.service";
import { useEffect } from "react";
import { convertLength } from "@mui/material/styles/cssUtils";

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
  uploadFile: {
    display: "flex",
    justifyContent: "space-between",
  },
});

function AddProductForm(props) {
  const classes = useStyles();
  const { onClosePopup } = props;
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [quantity, setQuantity] = useState("");
  const [priceImport, setPriceImport] = useState("");
  const [priceSell, setPriceSell] = useState("");
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [brand, setBrand] = useState([]);
  const [category, setCategory] = useState([]);
  const [color, setColor] = useState([]);
  const [size, setSize] = useState([]);
  const [brandSelect, setBrandSelect] = useState("");
  const [colorSelect, setColorSelect] = useState("");
  const [sizeSelect, setSizeSelect] = useState([]);
  const [categorySelect, setCategorySelect] = useState([]);
  
  const handleSubmit = async (event) => {
    
    event.preventDefault();
    const objectProduct = {
      name: name,
      code: code,
      quantity: quantity,
      price: priceImport,
    };


    const sizeSend = [];
    const categorySend = [];

    for(const item of sizeSelect){
      sizeSend.push(item.code);
    }
    for(const item of categorySelect){
      categorySend.push(item.code);
    }

    const formData = new FormData();
    const productSend = JSON.stringify(objectProduct);
    formData.append('product', productSend);
    formData.append("files",file);
    formData.append("brand",brandSelect);
    formData.append("color",colorSelect);
    formData.append("size",sizeSend.join('-'));
    formData.append("category",categorySend.join('-'));



   const createProduct = await authService.createProduct(formData);
   console.log("create product === ",createProduct);
  };

  const handleChangeBrand = (event) => {
    setBrandSelect(event.target.value);
  };
  const handleChangeColor = (event) => {
    setColorSelect(event.target.value);
  };
  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const handleChangeCode = (event) => {
    setCode(event.target.value);
  };
  const handleChangeQuantity = (event) => {
    setQuantity(event.target.value);
  };
  const handleChangePriceImport = (event) => {
    setPriceImport(event.target.value);
  };
  const handleChangePriceSell = (event) => {
    setPriceSell(event.target.value);
  };
  const handleFile = (event) => {
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  };
  const removeFile = () => {
    setFileName("");
    setFile(null);
  };
  
  const getAllBrands = async () => {
    const res = await authService.getAllBrands();
    setBrand(res);
  };
  const getAllColors = async () => {
    const res = await authService.getAllColors();
    setColor(res);
  };

  const getAllSizes = async () => {
    const res = await authService.getAllSizes();
    setSize(res);
  };

  const getAllCategories = async () => {
    const res = await authService.getAllCategories();
    setCategory(res);
  };
  useEffect(() => {
    getAllBrands();
    getAllCategories();
    getAllColors();
    getAllSizes();
  }, []);

  return (
    <Grid container className={classes.boxWrapper}>
      <Grid item xs={12}>
        <Stack spacing={2}>
          <TextField
            required
            fullWidth
            label="Tên sản phẩm"
            onChange={(event) => handleChangeName(event)}
          />
          <TextField
            required
            fullWidth
            label="Mã sản phẩm"
            onChange={(event) => handleChangeCode(event)}
          />
          <TextField
            required
            fullWidth
            label="Số lượng"
            onChange={(event) => handleChangeQuantity(event)}
          />
          <TextField
            required
            fullWidth
            label="Giá nhập"
            onChange={(event) => handleChangePriceImport(event)}
          />
          <TextField
            required
            fullWidth
            label="Giá bán"
            onChange={(event) => handleChangePriceSell(event)}
          />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Hãng sản xuất</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={brandSelect}
              label="Brand"
              onChange={handleChangeBrand}
              input={<OutlinedInput label="Chọn thành phố" />}
            >
              {brand.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Màu sắc</InputLabel>
            <Select
              value={colorSelect}
              onChange={handleChangeColor}
              input={<OutlinedInput label="Màu sắc" />}
            >
              {color.map((item) => (
                <MenuItem key={item.id} value={item.code}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Autocomplete
            multiple
            options={size}
            getOptionLabel={(option) => option.name}
            value={sizeSelect}
            onChange={(event, newValue) => {
              setSizeSelect(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Size"
                placeholder="sizes"
              />
            )}
          />


        <Autocomplete
            multiple
            options={category}
            getOptionLabel={(option) => option.name}
            value={categorySelect}
            onChange={(event, newValue) => {
              setCategorySelect(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Kiểu dáng"
                placeholder="kiểu dáng"
              />
            )}
          />

          <Box mt={3} item className={classes.uploadFile}>
            <Button variant="contained" component="label" size="small">
              Upload
              <input
                hidden
                accept="image/*"
                multiple
                type="file"
                onChange={handleFile}
              />
            </Button>
            <Typography>
              {fileName ? fileName : "***"}{" "}
              <AiFillDelete onClick={() => removeFile()} />
            </Typography>
          </Box>
          <Box display={"flex"} justifyContent={"flex-end"} py={3} gap={2}>
            <Button
              variant="contained"
              color="error"
              size="medium"
              onClick={onClosePopup}
            >
              Thoát
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="success"
              size="medium"
              onClick={(event)=>handleSubmit(event)}
            >
              Thêm sản phẩm
            </Button>
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
}
export default AddProductForm;
