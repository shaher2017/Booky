import React, { useEffect, useState } from 'react'
import { Paper } from '@mui/material';
import DashboardCard from './dashboardcard';
import axiosinstance from '../axiosinstance';
import Pagination from '@mui/material/Pagination';
const Sellerbooks = () => {
    const [books, setBooks] = useState([]);
    const [page,setPage] = useState(1);
    const [maxpages,setMaxPages] = useState(1);
    useEffect(()=>{
        if(localStorage.getItem('booky-access-token')){
            axiosinstance
            .get('/book/userbooks/',{
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('booky-access-token'),
                  },
                  withCredentials: true,
                })
              .then((res) => {
                setBooks(res.data.books);
                setMaxPages(res.data.booksno)
              })
              .catch((err) => {
                console.error(err);
              });
        }
    },[page,books])
  return (
    <Paper  elevation={3} style={{display:"flex", flexDirection:"column", alignItems:"center", backgroundColor:"rgb(232, 229, 229)"
    , padding:"50px", width:"100%"}}>
        <div className='books-grid'>
        {books.length > 0 && books.map((book)=> <DashboardCard book={book}/>)}

        </div>
        <Pagination page={page} onChange={(e, v) => setPage(v)} count={maxpages} color="primary" style={{marginTop:"2rem"}} />
    </Paper>
  )
}

export default Sellerbooks