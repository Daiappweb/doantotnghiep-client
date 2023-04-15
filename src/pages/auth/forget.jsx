import { Button, Stack, TextField } from '@mui/material';
import { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ForgetPage() {
  const navigate = useNavigate();

  const handleForget = () => {
    //TODO handle forget with api
    // if send success the redirect reset-password page
    navigate('/auth/reset-password');
  };
  return (
    <Fragment>
      <form action="#">
        <Stack spacing={3}>
          <p className="text-[#b2bec3] mt-2">
            {' '}
            Chúng tôi sẽ gửi email cho bạn các hướng dẫn về cách đặt lại mật khẩu của bạn.
          </p>
          <TextField name="email" label="Email" fullWidth />
          <Button type="submit" onClick={handleForget} variant="contained" size="large">
            Gửi
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

export default ForgetPage;
