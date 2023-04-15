import { Box, Button, Stack, TextField } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '@/service/auth.service';

function AdminLoginPage() {
  const navigate = useNavigate();
  const [data,setData] = useState([]);

  useEffect(()=>{
    setData(AuthService.loadUser());
  },[]);
  console.log("data === ",data);
  const handleLogin = () => {
    navigate('/admin');
  };
  return (
    <Fragment>
      <form action="#">
        <Stack spacing={3}>
          <Box>
            <p className="text-[#b2bec3] mt-2">Hãy đăng nhập với tư cách là quản trị viên.</p>
          </Box>
          <TextField name="email" label="Email" fullWidth />
          <TextField name="password" label="Mật khẩu" fullWidth />
          <Button type="submit" onClick={handleLogin} variant="contained" size="large">
            Đăng nhập
          </Button>
          <p className="text-center mt-2">
            <Link to="/admin/auth/register">
              <span className="cursor-pointer text-primary font-medium">Tạo một tài khoản</span>
            </Link>
          </p>
        </Stack>
      </form>
    </Fragment>
  );
}

export default AdminLoginPage;
