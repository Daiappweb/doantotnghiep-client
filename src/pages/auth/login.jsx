import {
  Box,
  Button,
  Stack,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  FormLabel,
  RadioGroup,
} from "@mui/material";
import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authService } from "@/service/auth.service";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSnackbar } from "notistack";

const loginFormSchema = z.object({
  username: z.string().min(6, "Địa chỉ email không hợp lệ."),
  password: z.string().min(8, "Mật khẩu phải có 8 ký tự trở lên."),
});

function LoginPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [role, setRole] = useState("CM");

  const { enqueueSnackbar } = useSnackbar();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginFormSchema),
  });

  const handldeChangeRole = (event) => {
    if (event.target.value == "cm") {
      setRole("CM");
    } else {
      setRole("AD");
    }
  };
  useEffect(() => {
    console.log("role === ", role);
  }, [role]);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    const result = await authService.checkExists(data.username, data.password);
    if (result !== null && result !== undefined) {
      localStorage.setItem("user", JSON.stringify(result.user));
      Cookies.set("accessToken", result.accessToken);
      navigate("/");
      enqueueSnackbar("Đăng nhập thành công", {
        variant: "success",
      });
    } else {
      enqueueSnackbar("Đăng nhập thất bại", {
        variant: "error",
      });
    }
  });

  return (
    <Fragment>
      <form onSubmit={onSubmit} action="#">
        <Stack spacing={3}>
          <Box>
            <p className="text-[#b2bec3] mt-2">
              Chào mừng trở lại, vui lòng đăng nhập vào tài khoản của bạn.
              {/* {t('login')} */}
            </p>
          </Box>

          <TextField
            {...register("username")}
            error={!!errors.username}
            helperText={errors.username?.message}
            label="Tên đăng nhập"
            variant="outlined"
            fullWidth
          />
          <TextField
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            type="password"
            label="Mật khẩu"
            variant="outlined"
            fullWidth
          />

          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">
              Đăng nhập với quyền?
            </FormLabel>
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
          <Button type="submit" variant="contained" size="large">
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
