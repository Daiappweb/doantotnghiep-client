import { Box, Button, Stack, TextField,FormControl,FormControlLabel,Radio,FormLabel,RadioGroup } from "@mui/material";
import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "@/service/auth.service";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
function LoginPage() {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [messageEmail, setMessageEmail] = useState("");
  const [messagePassword, setMessagePassword] = useState("");
  const [role,setRole] = useState("CM");

  const handlKeyPress = (event) => {
    if (event.key === " ") {
      event.preventDefault();
    }
  };

  const handleChangeEmail = (event) => {
    const res = event.target.value;
    setEmail(res);
  };

  const handleEmailBlur = (event) => {
    setErrorEmail(!validateEmail(event.target.value));
  };

  const validateEmail = (email) => {
    console.log("email === ", email);
    const regex =/^[a-zA-z0-9]{6,}$/;
      // /^([a-zA-Z][a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    const result = regex.test(email);

    if (result == false) {
      if (email == "") {
        setMessageEmail("user khong duoc de trong");
      } else {
        setMessageEmail("Vui long nhap dung dinh dang cua user: có ít nhất 6 kí tự là chữ hoặc số");
      }
    }

    return result;
  };

  const validatePassword = (password) => {
    const regex = /^.{8,}$/;
    return regex.test(password);
  };

  const handleChangePassword = (event) => {
    const res = event.target.value;
    setPassword(res);
  };
  const handlePasswordBlur = (event) => {
    setErrorPassword(!validatePassword(event.target.value));
  };

  const handleClick = async () => {
    checkExists(email,password);
    navigate("/");
  };

  const handldeChangeRole = (event)=>{
    if(event.target.value == 'cm'){
      setRole("CM");
    }else{
      setRole("AD");
    }
  }
  useEffect(()=>{
    console.log("role === ",role);
  },[role])

  const checkExists = async(userName,password)=>{
    const res = await authService.checkExists(userName,password);
    if(res === true){
      navigate("/")
    }else{
      console.log("tai khoan hoac mat khau khong chinh xac");
    }
  }




  return (
    <Fragment>
      <form action="#">
        <Stack spacing={3}>
          <Box>
            <p className="text-[#b2bec3] mt-2">
              Chào mừng trở lại, vui lòng đăng nhập vào tài khoản của bạn.
              {/* {t('login')} */}
            </p>
          </Box>
          <TextField
            name="email"
            label="Tên đăng nhập"
            fullWidth
            required
            onKeyPress={handlKeyPress}
            onChange={(event) => handleChangeEmail(event)}
            onBlur={handleEmailBlur}
            error={errorEmail}
            helperText={errorEmail ? messageEmail : ""}
          />
          <TextField
            name="password"
            label="Mật khẩu"
            fullWidth
            required
            type="password"
            onKeyPress={handlKeyPress}
            onChange={(event) => handleChangePassword(event)}
            onBlur={handlePasswordBlur}
            error={errorPassword}
            helperText={errorPassword ? "Mật khẩu phải có ít nhất 8 kí tự" : ""}
          />

          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Đăng nhập với quyền?</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="cm"
              name="radio-buttons-group"
              onChange={handldeChangeRole}
            >
              <FormControlLabel
                value="cm"
                control={<Radio />}
                label="Khách hàng"
              />
              <FormControlLabel 
                value="ad" 
                control={<Radio />} 
                label="Quản trị viên" 
                />
             
            </RadioGroup>
          </FormControl>

          <Link to="/auth/forget">
            <p className="cursor-pointer text-right text-primary">
              Quên mật khẩu?
            </p>
          </Link>
          <Button
            type="submit"
            variant="contained"
            size="large"
            onClick={handleClick}
          >
            Đăng nhập
          </Button>
          <p className="text-center mt-2">
            Bạn chưa có tài khoản? {""}
            <Link to="/auth/register">
              <span className="cursor-pointer text-primary font-medium">
                Tạo một tài khoản
              </span>
            </Link>
          </p>
        </Stack>
      </form>
    </Fragment>
  );
}

export default LoginPage;
