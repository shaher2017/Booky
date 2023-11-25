import React,{ useState} from "react";
import Card from "react-bootstrap/Card";
import { Container } from "react-bootstrap";
import "./ProductCard.css";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import axiosinstance from "../axiosinstance";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import logoimage from "../navbar/booky.png";
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Bookcard(props) {
  const navigate = useNavigate();
  const { book, boughtbooks, voucheredbooks } = props;
  const [expanded, setExpanded] = React.useState(false);
  const [dialogview, setDialogview] = useState();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [openAddProductDialog, setOpenAddProductDialog] = useState(false);

  const handleOpenAddProductDialog = () => {
    setOpenAddProductDialog(true);
  };

  const handleCloseAddProductDialog = () => {
    setOpenAddProductDialog(false);
  };

  const buying = ()=>{
    if(localStorage.getItem('booky-access-token')){axiosinstance.post('/book/buying',{"book":book._id},{headers:{
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('booky-access-token'),
    },
    withCredentials: true,
  })
    .then((response)=>{
      setDialogview( <p
        style={{
          color: "green",
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      >
        You Have Bought {book.title} Successfully!
      </p>)
      handleOpenAddProductDialog();
      setTimeout(()=> window.location.reload(),2000);
    })
    .catch((error)=>{console.log(error)});}
    else{
      setDialogview( <><p
        style={{
          color: "red",
          fontSize: "1.5rem",
          fontWeight: "bold",
        }}
      >
        You need to login first!
      </p>
       <Button
       type="button"
       fullWidth
       variant="contained"
       color="success"
       onClick={() => {
         navigate("/login");
       }}
     >
       Go To Login Page
     </Button></>)
      handleOpenAddProductDialog();
    }
    
  }
  return (
    <Container className="card-hover-grow" style={{ borderRadius:"15px"}}>
      <Card
        style={{
          boxShadow: "7px 7px 10px ##34435c",
          borderRadius: "15px",
          padding: "5px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          maxWidth: "20rem",
          backgroundColor:"white",
          position:"relative",
          minHeight:"33rem"
        }}
      >
         <CardMedia
        component="img"
        height="300"
        image={process.env.REACT_APP_IMAGE_URL + book.image}
        alt=""
        style={{objectFit:"contain"}}
      />
        <CardHeader
          title={<span style={{ fontSize: "20px", fontWeight: "bold",fontFamily: 'YourFont', }}>{book.title}</span>}
          subheader={<>
           Released in: { book.year}<br/>
           Author: {book.author}
           </>
          }
        />
        <div style={{ display: "flex", width: "100%",flexDirection:"column",
         justifyContent: "space-around", marginTop:"0rem", alignItems:"center" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems:"center", width:"90%"
        , position:"absolute", top:"15px", left:"10px"}}>
         
          <Typography style={{ fontFamily: "cursive" , color:"white", padding:"5px",backgroundColor:"#2e5c2e",
         borderRadius:"5px"}}>
            Price: <strong>{book.price} $</strong> 
          </Typography>
          {book.sale > 0 && !boughtbooks.includes(book._id) && ( 
            <Typography style={{ fontFamily: "cursive"
            , color:"white", padding:"5px",backgroundColor:"red",
         borderRadius:"5px" }}>
              <strong>Sale:</strong> {book.sale} %
            </Typography>
          )}
          </div>
{voucheredbooks && voucheredbooks.length > 0 && !boughtbooks.includes(book._id) &&
    voucheredbooks.map((voucher) => {
      if (voucher.bookid === book._id) {
        return <Typography style={{ fontFamily: "cursive", color: "white"
         ,padding:"5px",backgroundColor:"#4ac34a", fontSize:".95rem",width:"95%",
         borderRadius:"5px" }}>
        <strong>You have Voucher:</strong> {voucher.discount} % on this book!</Typography>
      }
      return null;
    })
}
          {book.vouchers && book.vouchers.length > 0 && !boughtbooks.includes(book._id) && ( 
            <Typography style={{ fontFamily: "cursive", color:"green" }}>
              <strong>Get Voucher:</strong> {book.vouchers[0].discount} % for next buy!
            </Typography>
            )}
        </div>
        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
          {
          boughtbooks.includes(book._id) ?  <Button
            style={{ marginLeft: "2rem", width: "20rem", display:localStorage.getItem('booky-role')==="seller" && "none" }}
            variant="contained"
            color="warning"
            onClick={()=>{navigate(`/checkbook/${book._id}`)}}
          >
            Read Book!
          </Button> : 
          <Button
            style={{ marginLeft: "2rem", width: "20rem", display:localStorage.getItem('booky-role')==="seller" && "none",
          backgroundColor:"#3a79b3" }}
            variant="contained"
            color="success"
            onClick={()=>{buying()}}
          >
            Buy Now!
          </Button>}
          <CardActions disableSpacing>
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
        </div>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <p style={{ color: '#393280' }}>
              <strong>Seller:</strong> {book.ownername}
            </p>
            <Typography style={{ color: "#888888" }} paragraph>{book.description}</Typography>
          </CardContent>
        </Collapse>
      </Card>
      <Dialog
          open={openAddProductDialog}
          onClose={handleCloseAddProductDialog}
        >
          <DialogTitle>Bought</DialogTitle>
          <DialogContent>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              <img
                src={logoimage}
                alt="Logo"
                style={{
                  width: "200px",
                  height: "150px",
                  borderRadius: "50%",
                }}
              />
             {dialogview}
            </div>
          </DialogContent>
        </Dialog>
    </Container>
  );
}

