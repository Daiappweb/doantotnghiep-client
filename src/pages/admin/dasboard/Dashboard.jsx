import { Typography,Grid,Box,TableContainer,Paper,Table,TableHead,TableCell,TableRow,TableBody, Select} from '@mui/material';
import React, { useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar,Pie } from 'react-chartjs-2';
  import { faker } from '@faker-js/faker';
import { authService } from '@/service/auth.service';
import { useEffect } from 'react';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Biểu đồ doanh thu theo tháng',
      },
    },
  };

  export const orderss = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Biểu đồ đơn hàng theo tháng',
      },
    },
  };
const labels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7',"Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12"];
function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];


function DashboardPage() {
    const [orders,setOrders] = useState(0);
    const [totalAmount,setTotalAmount] = useState(0);
    const [orderMonth,setOrderMonth] = useState([]);
    const [dataMonth,setDataMonth] = useState([]);
    const data2 = {
        labels: labels,
        datasets: [{
          label: 'My First Dataset',
          data: dataMonth,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderWidth: 1
        }]
      };

      const data3 = {
        labels: labels,
        datasets: [{
          label: 'My First Dataset',
          data: orderMonth,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderWidth: 1
        }]
      };

      //all month
    const getOrderByAllMonth = async()=>{
        const res = await authService.getOrderByAllMonth();
        let total = 0;
        res.forEach(item => {
            total+=item.totalAmount;
        });
        console.log("orders == ",total);
        setTotalAmount(total);
        setOrders(res.length);
    }

    //a month
    const getOrderByMonth = async(month)=>{
        const res = await authService.getOrderByMonth(month);
        let total = 0;
        res.forEach(item => {
            total+=item.totalAmount;
        });

        dataMonth.push(total);
        orderMonth.push(res.length);
    }
    
    useEffect(()=>{
        getOrderByAllMonth();
    },[])

    useEffect(()=>{
      if(dataMonth.length === 0){
        for(let i=1; i<=12;i++){
            getOrderByMonth(i);
        }
      }else{
        
      }
    },[])

  return (
    
    <Grid md={12} container sx={{display:"flex",flexDirection:'column'}}>

       <Grid item md={10}>
       <Bar options={options} data={data2} />
                <Typography>Tổng doanh thu: {totalAmount} VNĐ</Typography>
       </Grid>
       <Grid item md={10}>
       <Bar options={orderss} data={data3} style={{marginTop:48}}/>
                <Typography>Tổng đơn hàng: {orders} đơn hàng</Typography>
       </Grid>
             
    </Grid>
  );
}

export default DashboardPage;
