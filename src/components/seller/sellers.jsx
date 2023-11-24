import React, { useEffect, useState } from 'react'
import Sellercard from './sellercard';
import axiosinstance from '../axiosinstance';

const Sellers = () => {
    const [sellers, setSellers] = useState([]);
    useEffect(()=>{
        axiosinstance.get('/user/sellers')
        .then((res)=>{setSellers(res.data.sellers)})
        .catch((err)=>{console.log(err)});
    },[])
  return (<div style={{ backgroundColor:"rgb(232, 229, 229)", height:"100%", display:"flex", minHeight:"30rem",
   justifyContent:"space-around", flexDirection:"column", alignItems:"center"}}>
    <div className='books-grid' style={{marginTop:"2rem", marginBottom:"2rem"}}>
        {sellers.map((seller,index)=><Sellercard seller={seller} key={index} />)}
        </div>
        </div>
  )
}

export default Sellers