import { Box, Button, Stack, TextField } from '@mui/material';
import { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ResetPasswordPage() {
  const navigate = useNavigate();

  const handleResetPassword = () => {
    //TODO handle login with api
    // if reset success the redirect login page
    navigate('/auth/login');
  };
  return (
    <Fragment>
      <form action="#">
        <Stack spacing={3}>
          <Box>
            <p className="text-[#b2bec3] mt-2">Xác minh email được thực hiện. Vui lòng chọn mật khẩu khác.</p>
          </Box>
          <TextField name="password" label="Mật khẩu" fullWidth />
          <TextField name="confirm-password" label="Xác nhận mật khẩu" fullWidth />
          <Button type="submit" onClick={handleResetPassword} variant="contained" size="large">
            Đổi mật khẩu
          </Button>
          <p className="text-center mt-2">
            Quay trở lại {''}
            <Link to="/auth/login">
              <span className="cursor-pointer text-primary font-medium">đăng nhập</span>
            </Link>
          </p>
        </Stack>
      </form>
    </Fragment>
  );
}

export default ResetPasswordPage;
