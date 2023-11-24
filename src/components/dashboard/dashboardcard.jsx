import React,{useState} from "react";
import Card from "react-bootstrap/Card";
import { Container } from "react-bootstrap";
import Typography from "@mui/material/Typography";
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Button from "@mui/material/Button";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import axiosinstance from "../axiosinstance";
export default function DashboardCard(props) {
  const {book} = props;
  const [openAddProductDialog, setOpenAddProductDialog] = useState(false);
  const [openAddVoucherDialog, setOpenAddVoucherDialog] = useState(false);
  const [amount,setAmount]= useState(0);
  const [amounterr,setAmountErr] = useState("");

  const handleOpenAddProductDialog = () => {
    setOpenAddProductDialog(true);
  };

  const handleCloseAddProductDialog = () => {
    setOpenAddProductDialog(false);
  };
  const handleOpenAddVoucherDialog = () => {
    setOpenAddVoucherDialog(true);
  };

  const handleCloseAddVoucherDialog = () => {
    setOpenAddVoucherDialog(false);
  };

  const addvoucher = ()=>{
    axiosinstance.post('/book/addvoucher',{amount,"book_id":book._id},
    {headers:{'Content-Type':'application/json',
    'Authorization': localStorage.getItem('booky-access-token'),
  }
    ,withCredentials:true})
    .then((response)=>{
      if(response.status === 200){
        handleCloseAddProductDialog();
        handleOpenAddVoucherDialog();
      }
    })
    .catch((error)=>{console.log(error);});
  }
    
  

  const handleChange = (e)=>{
    try{
      const amountnumber = Number(e.target.value);
      if(amountnumber <0 || amountnumber > 100){
        setAmountErr("Amount Mush be between 0 and 100");
      }
      else{
        setAmountErr("");
      }
    }
    catch{
      setAmountErr("Amount Mush be between 0 and 100");
    }
    setAmount(e.target.value);
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
        }}
      >
         <CardMedia
        component="img"
        height="250"
        image={process.env.REACT_APP_BASE_URL + "/" + book.image}
        alt=""
      />
        <CardHeader
          title={<span style={{ fontSize: "20px", fontWeight: "bold" }}>{book.title}</span>}
          subheader={book.year}
        />
        <div style={{ display: "flex", width: "100%",flexDirection:"column", minHeight:"4rem", marginBottom:".5rem",minHeight:"12rem",
         justifyContent: "space-around", marginTop:"0rem", alignItems:"center" }}>
          <div style={{ display: "flex", width: "100%", justifyContent: "space-around", alignItems:"center"}}>
          <Typography style={{ fontFamily: "cursive", color:"#ED553B" }}>
            <strong>Author:</strong> {book.author}
          </Typography>
          <Typography style={{ fontFamily: "cursive" , color:"#ED553B"}}>
            <strong>{book.price} $</strong> 
          </Typography>
          </div>
          {book.sale > 0 && (
            <Typography style={{ fontFamily: "cursive", color:"green", marginBottom:".5rem" }}>
              <strong>This book have a Sale by:</strong> {book.sale} %
            </Typography>
          )}
          <Typography style={{ fontFamily: "cursive", color:"green", marginBottom:".5rem" }}>
              <strong>Sold:</strong> {book.buy_times} times
            </Typography>
            <Button
            style={{ width: "90%"}}
            variant="contained"
            color="success"
            onClick={()=>{handleOpenAddProductDialog()}}
          >
            Add Voucher
          </Button>
        </div>
      </Card>
      <Dialog open={openAddProductDialog} onClose={handleCloseAddProductDialog} maxWidth="sm" >
        <DialogTitle>Add Voucher</DialogTitle>
        <DialogContent>
          <div style={{width:"100%", height:"100%", display:"flex", flexDirection:"column",alignItems:"center"}}
           handleClose={handleCloseAddProductDialog}>
          <TextField
                required
                fullWidth
                id="amount"
                label="Amount %"
                name="amount"
                type="number"
                value={amount}
                onChange={handleChange}
                error={Boolean(amounterr)}
                style={{marginTop:"1rem", marginBottom:"1rem"}}
              />
              {amounterr && (
                <Typography variant="caption" color="error">
                  {amounterr}
                </Typography>
              )}
               <Button
            style={{ width: "90%"}}
            variant="contained"
            color="success"
            onClick={()=>{addvoucher()}}
          >
            Confirm
          </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={openAddVoucherDialog} onClose={handleCloseAddVoucherDialog} maxWidth="sm" >
        <DialogTitle>Add Voucher</DialogTitle>
        <DialogContent>
          <p style={{width:"100%", height:"100%", fontSize:"2rem", fontWeight:"bold", color:"green"}}
           handleClose={handleCloseAddVoucherDialog}>
            Voucher has been added successfully!
          </p>
        </DialogContent>
      </Dialog>
    </Container>
  );
}

