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
} from "@mui/material";
import React, { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { makeStyles } from "@material-ui/core";
import { authService } from "@/service/auth.service";
import { useEffect } from "react";

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
  uploadFile:{
    display:'flex',
    justifyContent:'space-between'
  }
});
function AddProductForm(props) {
  const classes = useStyles();
  const { onClosePopup } = props;
  const [cmCheck, setCMCheck] = useState(true);
  const [adCheck, setAdCheck] = useState(true);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [file, setFile] = useState();
  const [fileName,setFileName] = useState('');
  const handleSubmit = async () => {};

  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const handleChangeUserName = (event) => {
    setUserName(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleChangeAddress = (event) => {
    setAddress(event.target.value);
  };
  const handleFile = (event) => {
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
    
  };
  const removeFile = ()=>{
    setFileName('');
    setFile(null);
  }
  
  return (
    <Grid container className={classes.boxWrapper}>
      <TextField required fullWidth label="Tên sản phẩm" />
      <TextField required fullWidth label="Mã sản phẩm" />
      <TextField required fullWidth label="Số lượng" />
      <TextField required fullWidth label="Giá nhập" />
      <TextField required fullWidth label="Giá bán" />

      <Grid item className={classes.role} xs={12} md={12}>
        <Typography>Quyền truy cập</Typography>
        <Grid item className={classes.formControl}>
          <FormControlLabel
            control={<Checkbox checked={cmCheck} />}
            label="Khách hàng"
          ></FormControlLabel>
          <FormControlLabel
            control={<Checkbox checked={adCheck} />}
            label="Nhân viên"
          ></FormControlLabel>
        </Grid>
      </Grid>
      <Grid item xs={6} md={6} className={classes.uploadFile}>
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
        <Typography>{fileName?fileName:'***'} <AiFillDelete onClick={()=>removeFile()}/></Typography>
      </Grid>
      <Grid item xs={6} md={6}>
      </Grid>
      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          color="success"
          size="small"
          onClick={() => handleSubmit()}
        >
          Thêm sản phẩm
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
export default AddProductForm;
