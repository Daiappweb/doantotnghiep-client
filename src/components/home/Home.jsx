import ShoesItem from '@/components/share-components/shoes/ShoesItem';
import { Box, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Pagination, Select, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { authService } from '@/service/auth.service';
import { useParams } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';
function Home({params}) {
  const [filter, setFilter] = useState(1);
  const [data,setData] = useState([]);
  const[pageAble,setPageAble] = useState(1);
  const [page, setPage] = useState(1);
  const [limit,setLimit] = useState(12);
  // const params = useParams();
  // console.log(params);
  const loadImage = async()=>{
    try{
      // const res = await authService.getAllImage();
      const res = await authService.getAllProdcuts(page,limit);
      console.log("res ===",res)
      setPageAble(res);
      setData(res.products);
    }catch(error){
      console.log(error);
    }
  }
  const handleChangePage = (event,value)=>{
    scroll.scrollToTop({ duration: 500, delay: 10 });
    setPage(value);
  }

  useEffect(()=>{
    loadImage()
  },[page])

  useEffect(()=>{
    loadImage()
  },[])
  console.log("data === ",data);

  const handleChange = (event) => {
    setFilter(event.target.value);
  };
  return (
   
    <Box>
      <h2 className=" font-semibold text-4xl text-center mt-10">Sản phẩm của chúng tôi</h2>
      <Box display="flex" justifyContent="flex-end" mt={8} mb={3}>
        <FormControl style={{ width: 280 }}>
          <InputLabel id="demo-simple-select-label">Chọn Lọc</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filter}
            label="Age"
            onChange={handleChange}
            defaultValue={1}
            input={<OutlinedInput label="Chọn lọc" />}>
            <MenuItem value={1}>Mới nhất</MenuItem>
            <MenuItem value={2}>Thứ tự theo giá: thấp đến cao</MenuItem>
            <MenuItem value={3}>Thứ tự theo giá: cao đến thấp</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={2} width="100%">
        {data.map((item) => (
          <Grid key={item.id} item xs={6} md={3}>
            <ShoesItem shoes={item} />
          </Grid>
        ))}
      </Grid>
      <Box display="flex" justifyContent="center" width="100%" mt={8}>
        <Pagination size="large" count={pageAble.totalPage} page={page} onChange={handleChangePage} color="secondary" />
      </Box>
    </Box>
  );
}
export default Home;
