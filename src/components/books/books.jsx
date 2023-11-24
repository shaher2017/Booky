import React, { useEffect, useState } from 'react'
import "./books.css";
import Bookcard from './bookcard';
import axiosinstance from '../axiosinstance';
import Pagination from '@mui/material/Pagination';


const Books = () => {
  const [books,setBooks] = useState([]);
  const [page,setPage] = useState(1);
  const [maxpages,setMaxPages] = useState(1);
  const [boughtbooks,setBoughtBooks] = useState([]);
  const [voucheredbooks,setVucheredBooks]= useState([]);

  useEffect(()=>{
    axiosinstance.get(`/book/books/?page=${page}`)
    .then((res)=>{setBooks(res.data.books); setMaxPages(res.data.booksno)})
    .catch((err)=>{console.log(err);});

    if(localStorage.getItem("booky-access-token")){
      axiosinstance.get("/book/customerbooks",{headers:{
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('booky-access-token'),
      },
      withCredentials: true,
    })
    .then((res)=>{
      console.log(res.data.structured_vouchers);
      setBoughtBooks(res.data.bought_books);
      setVucheredBooks(res.data.structured_vouchers)
    })
    .catch((err)=>{console.log(err);});
    }
  },
  [page])
  return (<div style={{display:"flex", flexDirection:"column", alignItems:"center", minHeight:"30rem"
  , padding:"50px", width:"100%"}}>
    <div className='books-grid'>
    {books.length > 0 && books.map((book,index)=><Bookcard book={book} key={index} boughtbooks={boughtbooks}
     voucheredbooks={voucheredbooks}/>) }
    </div>
    <Pagination page={page} onChange={(e, v) => setPage(v)} count={maxpages} color="primary" style={{marginTop:"2rem"}} />
    </div>
  )
}


export default Books