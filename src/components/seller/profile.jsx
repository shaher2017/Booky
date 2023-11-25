import React, { useEffect, useState } from 'react';
import { Paper, Grid, Typography, Divider } from '@mui/material';
import { Phone, Email, LocationOn } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import axiosinstance from '../axiosinstance';
import Bookcard from '../books/bookcard';
import Pagination from '@mui/material/Pagination';
const Profile = () => {
    const param = useParams();
    const [seller,setSeller] = useState({});
    const [books,setBooks] = useState([]);
    const [page,setPage] = useState(1);
    const [maxpages,setMaxPages] = useState(1);
    const [boughtbooks, setBoughtBooks] = useState([]);
    useEffect(()=>{
        axiosinstance.get(`/user/getsellerinfo/?seller_id=${param.id}&page=${page}`)
        .then((res)=>{setSeller(res.data.seller_info); setBooks(res.data.seller_books);
            setMaxPages(res.data.booksno)})
        .catch((err)=>{console.error(err)});

        if(localStorage.getItem("booky-access-token")){
          axiosinstance.get("/book/customerbooks",{headers:{
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('booky-access-token'),
          },
          withCredentials: true,
        })
        .then((res)=>{setBoughtBooks(res.data.bought_books);})
        .catch((err)=>{console.log(err);});
        }
    },[param.id,page]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      };

  return (
    <div style={{display:"flex", flexDirection:"column", alignItems:"center", backgroundColor:"rgb(232, 229, 229)"}}>
      <Paper elevation={3} style={{ padding: '20px', width:"90%", marginTop:"2rem" }} >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <img alt={seller.name} src={process.env.REACT_APP_IMAGE_URL + seller.image}
             style={{ width: '100%', height: '20rem', objectFit:"contain" }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h3">{seller.name}</Typography>
            <Divider style={{ margin: '10px 0' }} />
            
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Typography variant="body1"  style={{fontSize:"1.2rem", fontWeight:"bold", marginTop:"1rem"}}>
                  <Phone /> {seller.phone}
                </Typography>
                <Typography variant="body1" style={{fontSize:"1.2rem", fontWeight:"bold", marginTop:"1rem"}}>
                  <Email /> {seller.email}
                </Typography>
                <Typography variant="body1" style={{fontSize:"1.2rem", fontWeight:"bold", marginTop:"1rem"}}>
                  <LocationOn /> {seller.address}
                </Typography>
              </Grid>
            </Grid>
            <Divider style={{ margin: '10px 0', marginTop:"1rem"}} />
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <Typography variant="body1"  style={{ fontWeight:"bold", marginTop:"1rem"}}>
                  <u>Joined since</u>: {formatDate(seller.createdAt)}
                </Typography>
                <Typography variant="body1" style={{ fontWeight:"bold", marginTop:"1rem"}}>
                 <u>Offers</u>: {books.length} Books
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      {books.length > 0 ? <Paper elevation={3} style={{ padding: '20px', marginTop:"2rem", width:"98%", backgroundColor:"#e9e9e9"  }} >
      <div style={{display:"flex", flexDirection:"column", alignItems:"center"
  , padding:"50px", width:"100%"}}>
      <div className='books-grid'>
    {books.length > 0 && books.map((book,index)=><Bookcard book={book} key={index} boughtbooks={boughtbooks}/>) }
    </div>
    <Pagination page={page} onChange={(e, v) => setPage(v)} count={maxpages} color="primary" style={{marginTop:"2rem"}} />
    </div>
      </Paper> : <p style={{fontSize:"1.5rem", fontWeight:"bold"}}>This Seller Offers No Boks Currently</p>}
      </div>
  );
};

export default Profile;
