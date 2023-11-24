import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import axiosinstance from '../axiosinstance';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPages] = useState(1);
  const [maxpages, setMaxPages] = useState(1);

  useEffect(() => {
    if(localStorage.getItem('booky-access-token')){
      axiosinstance
      .get(`/user/usertransactions/?page=${page}`,{
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': localStorage.getItem('booky-access-token'),
            },
            withCredentials: true,
          })
        .then((res) => {
          console.log(res.data.user_transactions);
          setTransactions(res.data.user_transactions);
          setMaxPages(Math.ceil((res.data.transactionsno)/12));
  
        })
        .catch((err) => {
          console.error(err);
        });}
  }, [page]);
  
  return (
    <div >
        <Table>
          <TableHead style={{backgroundColor:"rgb(52 67 92)", width:"100%"}}>
            <TableRow>
              <TableCell style={{textAlign:"center", fontSize:"1.2rem", color:"white"}}>Book Name</TableCell>
              <TableCell style={{textAlign:"center", fontSize:"1.2rem", color:"white"}}>Amount </TableCell>
              <TableCell style={{textAlign:"center", fontSize:"1.2rem", color:"white"}}>Month</TableCell>
              <TableCell style={{textAlign:"center", fontSize:"1.2rem", color:"white"}}>Year</TableCell>
              <TableCell style={{textAlign:"center", fontSize:"1.2rem", color:"white"}}>Customer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction,index) => (
              <TableRow key={transaction.id} style={{textAlign:"center", backgroundColor:index%2 === 0 && "white"}}>
                <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>{transaction.bookId}</TableCell>
                <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>{transaction.amount} $</TableCell>  
                <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>{transaction.month}</TableCell>
                <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>{transaction.year}</TableCell>
                <TableCell style={{textAlign:"center", fontSize:"1.2rem"}}>{transaction.buyer_name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>


      <div style={{ display: 'flex', justifyContent: 'center', marginTop:"2rem" }}>
      <Pagination page={page} onChange={(e, v) => setPages(v)} count={maxpages} color="primary" />

      </div>
    </div>
    
  );
};

export default Transactions;
