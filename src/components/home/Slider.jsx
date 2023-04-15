import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box, Button } from '@mui/material';

function SimpleSlider() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    dots: false,
    arrows: false,
  };
  return (
    <div className="w-full block">
      <Slider {...settings}>
        <div className="relative">
          <div className="absolute hidden md:flex top-[120px] left-[200px] text-white  flex-col gap-2">
            <p className="text-[24px]">GIẢM GIÁ ĐẾN 30%</p>
            <p className="text-[48px]">ĐỘC QUYỀN</p>
            <p className="text-[48px] font-semibold">SẢM PHẨM MỚI NHẤT</p>
            <Box className="mt-4 border w-[40%] h-14 text-[20px] flex items-center justify-center rounded cursor-pointer">
              <p>Mua ngay</p>
            </Box>
          </div>
          <img alt="img" src="/assets/images/cr2.jpg" />
        </div>
        <div className="relative">
          <div className="absolute hidden md:flex top-[120px] left-[200px] text-white  flex-col gap-2">
            <p className="text-[24px]">GIẢM GIÁ ĐẾN 30%</p>
            <p className="text-[48px]">ĐỘC QUYỀN</p>
            <p className="text-[48px] font-semibold">SẢM PHẨM MỚI NHẤT</p>
            <Box className="mt-4 border w-[40%] h-14 text-[20px] flex items-center justify-center rounded cursor-pointer">
              <p>Mua ngay</p>
            </Box>
          </div>
          <img alt="img" src="/assets/images/cr3.jpg" />
        </div>

        <div className="relative">
          <div className="absolute hidden md:flex top-[120px] left-[200px] text-white  flex-col gap-2">
            <p className="text-[24px]">GIẢM GIÁ ĐẾN 30%</p>
            <p className="text-[48px]">ĐỘC QUYỀN</p>
            <p className="text-[48px] font-semibold">SẢM PHẨM MỚI NHẤT</p>
            <Box className="mt-4 border w-[40%] h-14 text-[20px] flex items-center justify-center rounded cursor-pointer">
              <p>Mua ngay</p>
            </Box>
          </div>
          <img alt="img" src="/assets/images/cr5.jpg" />
        </div>
      </Slider>
    </div>
  );
}

export default SimpleSlider;
