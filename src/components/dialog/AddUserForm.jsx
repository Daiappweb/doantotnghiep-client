import {
  TextField,
  Box,
  Grid,
  Typography,
  FormControl,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Button,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { CheckBox } from "@mui/icons-material";
import { authService } from "@/service/auth.service";

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
function AddUserForm(props) {
  const classes = useStyles();
  const { onClosePopup } = props;
  const [cmCheck, setCMCheck] = useState(true);
  const [adCheck, setAdCheck] = useState(true);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  // const [role, setRole] = useState("");
  const handleChangeCmCheck = () => {
    setCMCheck(!cmCheck);
  };
  const handleChangeAdCheck = () => {
    setAdCheck(!adCheck);
  };
  const handleSubmit = async () => {
    const userObject = {
      name: name,
      userName: userName,
      password: password,
      email: email,
      address: address,
    };
    let role='';
    if(cmCheck == true && adCheck ==true){
      // setRole('CM-AD');
      role = 'CM-AD';
    }
    if(cmCheck==false && adCheck==true){
      role = 'AD';
    }
    if(cmCheck==true && adCheck ==false){
      // setRole('CM');
      role = 'CM';
    }
    if(cmCheck == false && adCheck == false){
      // setRole('CM');
      role = 'CM';
    }

    try{
      const res = await authService.createUser(userObject,role);
      console.log("res === ",res);
    }catch(error){
      console.log(error);
    }
  };

  const handleChangeName=(event)=>{
    setName(event.target.value);
  }
  const handleChangeUserName=(event)=>{
    setUserName(event.target.value);
  }
  const handleChangePassword=(event)=>{
    setPassword(event.target.value);
  }
  const handleChangeEmail=(event)=>{
    setEmail(event.target.value);
  }
  const handleChangeAddress=(event)=>{
    setAddress(event.target.value);
  }
  console.log(name+userName+password+email+address);
  // console.log("role === ",role);


  return (
    <Grid container className={classes.boxWrapper}>
      <TextField required fullWidth label="Họ và tên" onChange={(event)=>handleChangeName(event)}/>
      <TextField required fullWidth label="Tên đăng nhập" onChange={(event)=>handleChangeUserName(event)}/>
      <TextField required fullWidth label="Mật khẩu" onChange={(event)=>handleChangePassword(event)}/>
      <TextField required fullWidth label="Email" onChange={(event)=>handleChangeEmail(event)}/>
      <TextField required fullWidth label="Địa chỉ" onChange={(event)=>handleChangeAddress(event)}/>

      <Grid item className={classes.role} xs={12} md={12}>
        <Typography>Quyền truy cập</Typography>
        <Grid item className={classes.formControl}>
          <FormControlLabel
            control={
              <Checkbox checked={cmCheck} onChange={handleChangeCmCheck} />
            }
            label="Khách hàng"
          ></FormControlLabel>
          <FormControlLabel
            control={
              <Checkbox checked={adCheck} onChange={handleChangeAdCheck} />
            }
            label="Nhân viên"
          ></FormControlLabel>
        </Grid>
      </Grid>

      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          color="success"
          size="small"
          onClick={()=>handleSubmit()}
        >
          Tạo tài khoản
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
export default AddUserForm;
