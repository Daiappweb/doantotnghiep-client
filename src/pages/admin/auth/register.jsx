import { Box, Button, Stack, TextField, useMediaQuery, useTheme } from '@mui/material';
import { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AdminRegisterPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const handleRegister = () => {
    // TODO handle register with api

    // if sign up success the redirect login page
    navigate('/admin/auth/login');
  };
  return (
    <Fragment>
      <form action="#">
        <Stack spacing={3}>
          <Box>
            <p className="text-[#b2bec3] mt-2">Vui lòng đăng ký.</p>
          </Box>
          <TextField name="username" label="Tên Tài Khoản" fullWidth />
          <Box display="flex" flexDirection={smDown ? 'column' : 'row'} gap={smDown ? 3 : 1}>
            <TextField name="password" label="Mật khẩu" fullWidth />
            <TextField name="confirm-password" label="Xác nhận mật khẩu" fullWidth />
          </Box>
          <Button onClick={handleRegister} type="submit" variant="contained" size="large">
            Đăng ký
          </Button>
          <p className="text-center mt-2">
            <Link to="/auth/login">
              <span className="cursor-pointer text-primary font-medium">Đăng nhập</span>
            </Link>
          </p>
        </Stack>
      </form>
    </Fragment>
  );
}

export default AdminRegisterPage;
