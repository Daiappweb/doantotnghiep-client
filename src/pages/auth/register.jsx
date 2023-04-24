import { authService } from '@/service/auth.service';
import { Box, Button, Stack, TextField, useMediaQuery, useTheme } from '@mui/material';
import { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function RegisterPage() {
  const navigate = useNavigate();

  //user
  const [errorUser,setErrorUser] = useState(false);
  const [userName,setUserName] = useState('');
  const [messageUser,setMessageUser] = useState('');

  //name
  const [errorName,setErrorName] = useState(false);
  const [name,setName] = useState('');
  const [messageName,setMessageName] = useState('');

  //email & password
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [errorEmail,setErrorEmail] = useState(false);
  const [errorPassword,setErrorPassword] = useState(false);
  const [messageEmail,setMessageEmail] = useState('');
  const [messagePassword,setMessagePassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');
  const [messageCofirm,setMessageConfirm] = useState('');
  const [errorConfirm,setErrorConfirm] = useState(false);

  //address
  const [errorAddress,setErrorAddress] = useState(false);
  const [address,setAddress] = useState('');
  const [messageAddress,setMessageAddress] = useState('');

  //role 
  const [role,setRole] = useState("CM");

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const handlKeyPress = (event)=>{
    if (event.key === " ") {
      event.preventDefault();
    }
  }

  // username
  const handleChangeUserName = (event)=>{
    const res = event.target.value;
    setUserName(res);
  }

  const validateUserName = (userName) =>{
    const regex = /^[a-zA-z0-9]{6,}$/;
    const result = regex.test(userName);
    if(result == false){
      if(userName == ''){
        setMessageUser("Username khong duoc de trong");
      }else{
        setMessageUser("UserName phai co it nhat 6 ki tu va phai la chu hoac so"); 
      }
    }
    return result;
  }

  const handleUserBlur = (event) =>{
    setErrorUser(!validateUserName(event.target.value));
  }

  //name
  const handleChangeName = (event)=>{
    const res = event.target.value;
    setName(res);
  }

  const validateName = (name) =>{
    const regex = /^[a-zA-ZÀ-ỹ\s]+$/;
    const result = regex.test(name);
    if(result == false){
      if(name == ''){
        setMessageName("ten khong duoc de trong");
      }else{
        setMessageName("ten phai co it nhat 6 ki tu va phai la chu"); 
      }
    }
    return result;
  }

  const handleNameBlur = (event) =>{
    setErrorName(!validateName(event.target.value));
  }

  //email
  const handleChangeEmail=(event)=>{
    const res = event.target.value;
    setEmail(res);
  }

  const handleEmailBlur=(event)=>{
    
    setErrorEmail(!validateEmail(event.target.value));
  }

  const validateEmail = (email)=>{
    console.log("email === ",email);
    const regex = /^([a-zA-Z][a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    const result = regex.test(email);
    
    if(result == false){
      if(email == ''){
        setMessageEmail("Email khong duoc de trong");
      }else{
        setMessageEmail("Vui long nhap dung dinh dang cua email")
      }
    }

    return result;
  }

  const validatePassword=(password)=>{
    const regex = /^.{8,}$/;
    return regex.test(password);
  }

  const handleChangePassword = (event)=>{
    const res = event.target.value;
    setPassword(res);
  }
  const handlePasswordBlur=(event)=>{
    
    setErrorPassword(!validatePassword(event.target.value));
  }
  
  //confirm
  const handleChangeConfirmPassword = (event)=>{
    setConfirmPassword(event.target.value);
  }
  const handleConfirmBlur = (event)=>{
    setErrorConfirm(!validateCofirm(event.target.value));
  }
  const validateCofirm = (confirmPassword)=>{
    if(confirmPassword!==password){
      setMessageConfirm("Mat khau khong trung nhau");
      return false;
    }
    return true;
  }

  //address
  const handleChangeAddress = (event)=>{
    const res = event.target.value;
    setAddress(res);
  }

  const validateAddress = (address) =>{
    const regex = /^[a-zA-ZÀ-ỹ0-9\s,;_\-]+$/u;
    const result = regex.test(address);
    if(result == false){
      if(address == ''){
        setMessageAddress("dia chi khong duoc de trong");
      }else{
        setMessageAddress("dia chi phai la chu va so"); 
      }
    }
    return result;
  }

  const handleAddressBlur = (event) =>{
    setErrorAddress(!validateAddress(event.target.value));
  }

  const handleRegister = async(event) => {
      event.preventDefault();
      // const userNameTest = await authService.checkUserName(userName);
      // const emailTest = await authService.checkEmail(email);
      const user = {
        name: name,
        userName:userName,
        email: email,
        password: password,
        address:address
      };
      try{
        const result = await authService.createUser(user,role);
        navigate("/")
      }catch(error){
        console.log(error);
      }
      
      
}
  return (
    <Fragment>
      <form action="#">
        <Stack spacing={3}>
          <Box>
            <p className="text-[#b2bec3] mt-2">
              Vui lòng đăng ký tài khoản cá nhân của bạn nếu bạn muốn sử dụng tất cả các sản phẩm của chúng tôi.
            </p>
          </Box>
          <Box display="flex" flexDirection={smDown ? 'column' : 'row'} gap={smDown ? 3 : 1}>
            <TextField 
              name="username" 
              label="Tên Tài Khoản" 
              fullWidth 
              required
              onKeyPress={handlKeyPress}
              onChange={(event)=>handleChangeUserName(event)}
              onBlur={handleUserBlur}
              error={errorUser}
              helperText={errorUser?messageUser:""}
            />
            <TextField 
              name="fullName" 
              label="Tên của bạn" 
              fullWidth
              // onKeyPress={handlKeyPress}
              onChange={(event)=>handleChangeName(event)}
              onBlur={handleNameBlur}
              error={errorName}
              helperText={errorName?messageName:""}
               />
          </Box>
          <TextField 
            name="email" 
            label="Email" 
            required
            fullWidth 
            onKeyPress={handlKeyPress}
            onChange={(event)=>handleChangeEmail(event)}
            onBlur={handleEmailBlur}
            error={errorEmail}
            helperText={errorEmail?messageEmail:""}
            />
          <Box display="flex" flexDirection={smDown ? 'column' : 'row'} gap={smDown ? 3 : 1}>
            <TextField 
              name="password" 
              label="Mật khẩu" 
              fullWidth
              required
              type='password'
              onKeyPress={handlKeyPress}
              onChange={(event)=>handleChangePassword(event)}
              onBlur={handlePasswordBlur}
              error={errorPassword}
              helperText={errorPassword?"Mật khẩu phải có ít nhất 8 kí tự":""} 
              />
            <TextField 
              name="confirm-password" 
              label="Xác nhận mật khẩu" 
              fullWidth 
              required
              type='password'
              onKeyPress={handlKeyPress}
              onChange={(event)=>handleChangeConfirmPassword(event)}
              onBlur={handleConfirmBlur}
              error={errorConfirm}
              helperText={errorConfirm?messageCofirm:""}
              />
          </Box>
          <TextField
              name="Address" 
              label="Địa chỉ" 
              fullWidth
              required
              // onKeyPress={handlKeyPress}
              onChange={(event)=>handleChangeAddress(event)}
              onBlur={handleAddressBlur}
              error={errorAddress}
              helperText={errorAddress?messageAddress:""}
              />
          <Button onClick={handleRegister} type="submit" variant="contained" size="large">
            Đăng ký
          </Button>
          <p className="text-center mt-2">
            Bạn đã có một tài khoản? {''}
            <Link to="/auth/login">
              <span className="cursor-pointer text-primary font-medium">Đăng nhập</span>
            </Link>
          </p>
        </Stack>
      </form>
    </Fragment>
  );
}

export default RegisterPage;
