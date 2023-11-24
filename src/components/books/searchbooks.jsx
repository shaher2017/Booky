import React, { useEffect, useState } from 'react';
import "./books.css";
import Bookcard from './bookcard';
import Sellercard from "../seller/sellercard";
import axiosinstance from '../axiosinstance';
import Pagination from '@mui/material/Pagination';

const SearchBooks = (props) => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(1);
  const [boughtbooks,setBoughtBooks] = useState([]);
  const [voucheredbooks,setVucheredBooks]= useState([]);
  useEffect(() => {
    let apiUrl = '';
    if (props.target === "books") {
      apiUrl = `/book/searchbooks/?book=${props.query}&page=${page}`;
    } else if (props.target === "sellerbooks") {
      apiUrl = `/book/searchsellerbooks/?seller=${props.query}&page=${page}`;
    } else if (props.target === "sellers") {
      apiUrl = `/user/searchseller/?seller=${props.query}&page=${page}`;
    }

    
    axiosinstance.get(apiUrl)
      .then((res) => {
        setItems(res.data.sellers || res.data.books);
        setMaxPages(res.data.sellersno || res.data.booksno);
        console.log(res.data.sellers);
      })
      .catch((err) => {
        console.log(err);
      });

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
  }, [props.target, props.query, page]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "50px", width: "100%" }}>
      <div className='books-grid'>
        {items.length > 0 && items.map((item, index) => (
          props.target === "sellers" ? 
            <Sellercard seller={item} key={index} /> :
            <Bookcard book={item} key={index} boughtbooks={boughtbooks}  voucheredbooks={voucheredbooks}/>
        ))}
      </div>
      <Pagination page={page} onChange={(e, v) => setPage(v)} count={maxPages} color="primary" style={{ marginTop: "2rem" }} />
    </div>
  );
}

export default SearchBooks;
