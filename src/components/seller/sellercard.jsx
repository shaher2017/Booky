import React from 'react'
import CardHeader from '@mui/material/CardHeader';
import Card from "react-bootstrap/Card";
import { Container } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
const Sellercard = (props) => {
    const navigate = useNavigate();
    const { seller } = props;
  return (
    <Container className="card-hover-grow" style={{backgroundColor:"white", borderRadius:"15px"}}>
    <Card
      style={{
        boxShadow: "7px 7px 10px ##34435c",
        borderRadius: "15px",
        padding: "5px",
        height: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        maxWidth: "20rem",
      }}
      className="my-product-card"
    >
      <img
        style={{
          objectFit: "contain",
          width: "100%",
          height: "40vh",
        }}
        src={process.env.REACT_APP_BASE_URL + "/" + seller.image}
        className="card-img-top img-fluid"
        alt="..."
      />
      <CardHeader
        title={<span onClick={()=>{navigate(`/seller/${seller._id}`)}} style={{ fontSize: "20px", fontWeight: "bold", cursor:"pointer" }}>{seller.name}</span>}
        subheader={seller.email}
      />
      </Card>
      </Container>
  )
}

export default Sellercard