import React, { useEffect, useState } from 'react'
import axiosinstance from '../axiosinstance';
import Bookcard from './bookcard';

const Userbooks = () => {
    const [ books, setBooks] = useState([]);
    const [boughtbooks,setBoughtBooks] = useState([]);
    const [voucheredbooks,setVucheredBooks]= useState([]);
    useEffect(()=>{
        axiosinstance.get('/user/customerbooks', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': localStorage.getItem('booky-access-token'),
            },
            withCredentials: true,
          })
        .then((res)=>{
            console.log(res.data);
            setBooks(res.data.booksdata );
        })
        .catch((err)=>{
            console.log(err);
        });


        axiosinstance.get('/book/customerbooks', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': localStorage.getItem('booky-access-token'),
            },
            withCredentials: true,
          })
        .then((res)=>{
            console.log(res.data);
            setBoughtBooks(res.data.bought_books);
            setVucheredBooks(res.data.structured_vouchers)
        })
        .catch((err)=>{
            console.log(err);
        });
    },[])
  return (
    <div style={{ backgroundColor:"rgb(232, 229, 229)", height:"100%", display:"flex",minHeight:"30rem",
   justifyContent:"space-around", flexDirection:"column", alignItems:"center"}}>
    <div className='books-grid' style={{marginTop:"2rem", marginBottom:"2rem"}}>
        {books.map((book,index)=><Bookcard book={book} key={index} boughtbooks={boughtbooks} voucheredbooks={voucheredbooks}/>)}
        </div>
        </div>
  )
}

export default Userbooks