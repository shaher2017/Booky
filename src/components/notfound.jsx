import React from 'react'
import notfoundimage from "./404book.jpg";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
const Notfound = () => {
    const navigate = useNavigate();
  return (
    <div style={{position:"relative"}}>
        <img src={notfoundimage} alt="Not Found" />
        <Button variant="contained" color="success" style={{position:"absolute",backgroundColor:"#383838",
         bottom:"24rem", right:"24rem", fontSize:"2.5rem"}} onClick={()=>{navigate("/")}}>
        Back To Home
      </Button>
    </div>
  )
}

export default Notfound