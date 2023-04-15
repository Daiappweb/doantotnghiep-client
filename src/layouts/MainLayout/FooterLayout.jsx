import { Box, Grid, Stack } from '@mui/material';
import React from 'react';
import { Facebook, Instagram, YouTube } from '@mui/icons-material';
import { Link } from 'react-router-dom';

function FooterLayout() {
  return (
    <Box py={4} sx={{ background: '#1e1e1e', color: '#fff' }}>
      <Box sx={{ maxWidth: 1240, margin: '0 auto', padding: '0 16px' }}>
        <Grid container spacing={3}>
          <Grid item xs={6} md={3}>
            <Stack>
              <h3 className="text-lg font-semibold uppercase mb-2">DANH MỤC NỔI BẬT</h3>
              <Stack spacing={1} className="cursor-pointer">
                <p className="hover:text-primary">Giày thể thao</p>
                <p className="hover:text-primary">Giày tây</p>
                <p className="hover:text-primary">Giày bóng rổ</p>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={6} md={3}>
            <Stack>
              <h3 className="text-lg font-semibold uppercase mb-2">CHÍNH SÁCH CÔNG TY</h3>
              <Stack spacing={1} className="cursor-pointer">
                <p className="hover:text-primary">Vận chuyển và giao hàng</p>
                <p className="hover:text-primary">Chính sách bán hàng</p>
                <p className="hover:text-primary">Chính Sách Đổi Trả & Bảo Hành</p>
                <p className="hover:text-primary">Chính sách bảo mật</p>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={6} md={3}>
            <Stack>
              <h3 className="text-lg font-semibold uppercase mb-2">Nhà Phân Phối Độc Quyền</h3>
              <Stack spacing={1} className="cursor-pointer">
                <p className="hover:text-primary">CÔNG TY CP THỜI TRANG ABC </p>
                <p className="hover:text-primary">210 Tôn Đức Thắng, Hàng Bột, Đống Đa, Hà Nội</p>
                <p className="hover:text-primary">Email: contact@peaksport.vn</p>
                <p className="hover:text-primary">Hotline: 0866550286</p>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={6} md={3}>
            <Stack>
              <h3 className="text-lg font-semibold uppercase mb-2">Theo dõi chúng tôi</h3>
              <Box display="flex" gap={1}>
                <Link to="/">
                  <Facebook sx={{ color: '#3F51B5' }} fontSize="large" />
                </Link>
                <Link to="/">
                  <Instagram sx={{ color: '#FF1744' }} fontSize="large" />
                </Link>
                <Link to="/">
                  <YouTube sx={{ color: '#FF3D00' }} fontSize="large" />
                </Link>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default FooterLayout;
