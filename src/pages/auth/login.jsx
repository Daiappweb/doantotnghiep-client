import { Box, Button, Stack, TextField } from '@mui/material';
import { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '@/service/auth.service';
import { useEffect,useState } from 'react';
function LoginPage() {
  const navigate = useNavigate();
  const [data,setData] = useState([]);
  const [users,setUsers] = useState([]);
  const [email,setEmail] = useState(null);
  const [password,setPassword] = useState();
  const [listEmail,setListEmail] = useState([]);
  // const [checked,setChecked] = useState(0);
  const fetchFindEmail = async()=>{
    try{
      const res = await authService.findEmail();
      setListEmail(res);
    }catch(error){
      console.log(error);
    }
  }

  const fetchLoadUser = async () => {
    try{
      const res = await authService.loadUser();
      setData(res);
      setUsers(res.users);
    }catch(error){
      console.log(error);
    }
  }


  useEffect(()=>{
    fetchLoadUser()
  },[]);

   function handleChangeEmail(event){
    setEmail(event.target.value)
  }
  function handleChangePassword(event){
    setPassword(event.target.value)
  }

  function validateEmail(email){
    if(email != null){
      if(listEmail.includes(email)){
        return 1;
      }else{
        return 0;
      }
    }
    return 2;
  }

  function validatePassword(password){
    return password!=null?1:0;
  }

  const handleLogin = () => {
    // let checked = 0;
    // let checkEmail = validateEmail(email);
    // let checkPassword = validatePassword(password);

    // if(checkEmail == 2 && checkPassword == 0){
    //   alert("Email hoặc mật khẩu không được để trống");
    //   return;
    // }

    // if(checkEmail == 0){
    //   alert("Tài khoản không tồn tại");
    //   return;
    // }

    // if(checkEmail ==1){
    //   users.forEach(element => {
    //     if(email == element.email && password == element.password){
    //       alert("Đăng nhập thành công!");
    //       navigate("/");
    //       return;
    //     }
    //     else if(email!=element.email || password != element.password){
    //       alert("Email hoặc mật khẩu không chính xác!");
    //       return;
    //     }
    //     return;
    //   });
    // }

  };
  return (
    
    <Fragment>
      <form action="#">
        <Stack spacing={3}>
          <Box>
            <p className="text-[#b2bec3] mt-2">Chào mừng trở lại, vui lòng đăng nhập vào tài khoản của bạn.</p>
          </Box>
          <TextField name="email" label="Email" fullWidth onChange={handleChangeEmail}/>
          <TextField name="password" label="Mật khẩu" fullWidth onChange={handleChangePassword}/>
          <Link to="/auth/forget">
            <p className="cursor-pointer text-right text-primary">Quên mật khẩu?</p>
          </Link>
          <Button type="submit" onClick={handleLogin} variant="contained" size="large">
            Đăng nhập
          </Button>
          <p className="text-center mt-2">
            Bạn chưa có tài khoản? {''}
            <Link to="/auth/register">
              <span className="cursor-pointer text-primary font-medium">Tạo một tài khoản</span>
            </Link>
          </p>
        </Stack>
      </form>
    </Fragment>
  );
}

export default LoginPage;
