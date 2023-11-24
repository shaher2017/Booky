import React,{useState,useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillTransfer, faBook,faCheck,faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { Paper, Grid } from '@mui/material';
import axiosinstance from '../axiosinstance';
import Barchart from './barchart';
import DashboardCard from './dashboardcard';
import Piechart from './piechart';
const Statics = () => {
  const [userdata,setUserData]= useState({});
  useEffect(()=>{
    if(localStorage.getItem('booky-access-token')){
    axiosinstance.get('/user/userstatics/',
    {headers: {'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('booky-access-token'),
  }
    ,withCredentials:true})
    .then((response)=>{setUserData(response.data); console.log(response.data);})
    .catch((err)=>{console.log(err)});}
  },[])
  const transformMonthlySalesData = (monthlySales) => {
    let transformedData = [];

    for (const year in monthlySales) {
      for (const month in monthlySales[year]) {
        const name = `${month}-${year}`;
        const amount = monthlySales[year][month];

        transformedData.push({ name, amount });
      }
    }
    return transformedData;
  };
  return (
    <div>
      <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
          <Paper elevation={3} style={{padding:"5px"}}>
                <p style={{fontWeight:"bold", fontSize:"1.2rem"}}>Total Balance: <strong style={{color:"#ff6800"}}>
                  {userdata.total_revenue} $</strong></p>
                <FontAwesomeIcon size='2xl' icon={faMoneyBillTransfer} style={{color: "#ff6800",}} />
          </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
          <Paper elevation={3} style={{padding:"5px"}}>
                <p style={{fontWeight:"bold", fontSize:"1.2rem"}}>Total Offered Books:
                  <strong style={{color:"#434372"}}> {userdata.offered_books} Books</strong>
                </p>
                <FontAwesomeIcon size='2xl' icon={faBook} style={{color: "#434372",}} />
          </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
          <Paper elevation={3} style={{padding:"5px"}}>
                <p style={{fontWeight:"bold", fontSize:"1.2rem"}}>Current Month Revenue:  <strong style={{color:"green"}}>
                {userdata.currentmonth_sells} $
                  </strong></p>
                <FontAwesomeIcon size='2xl' icon={faCalendarDays} style={{color: "green",}} />
          </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
          <Paper elevation={3} style={{padding:"5px"}}>
                <p style={{fontWeight:"bold", fontSize:"1.2rem"}}>Total Sold Books: 
                <strong style={{color:"red"}}> {userdata.total_sells}</strong></p>
                <FontAwesomeIcon size='2xl' icon={faCheck} style={{color: "red",}} />
          </Paper>
          </Grid>
          <Grid item xs={12} md={12}>
          <Paper elevation={3} style={{ padding: '10px', width: '100%', backgroundColor:"rgb(232, 229, 229)" }}>
            <p style={{fontSize:"1.5rem", fontWeight:"bold"}}>Top Sold Books</p>
            <div className='books-grid' style={{marginBottom:"2rem"}}>
            {userdata.top_sold && userdata.top_sold.length > 0 && 
            userdata.top_sold.map((book,index)=><DashboardCard book={book} key={index}/>) }
            </div>

          </Paper>
        </Grid>
        {userdata.monthlySales && 
         <>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '5px', height: '90%', width: '100%' }}>
            <p style={{fontSize:"1.5rem", fontWeight:"bold", marginBottom:0}}>Months Sells</p>
            
              <div style={{height:"25rem",width:"100%"}}>
                <Barchart data={transformMonthlySalesData(userdata.monthlySales)}/>
              </div> 
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '5px', height: '90%', width: '100%' }}>
            <p style={{fontSize:"1.5rem", fontWeight:"bold", marginBottom:0}}>Revenue books</p>
            
              <div style={{height:"25rem",width:"100%"}}>
                <Piechart data={userdata.sold_books_details}/>
              </div>         
          </Paper>
        </Grid></> 
        }
        </Grid>
    </div>
  )
}

export default Statics