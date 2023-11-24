import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axiosinstance from '../axiosinstance';
import Typography from '@mui/material/Typography';
import logoimage from "../navbar/booky.png";

const Addbook = ({ handleClose }) => {
  const [book, setBook] = useState({
    title: '',
    price: 0,
    image: '',
    description: '',
    year: "",
    sale: 0,
    bookpdf: "",
    author: "",
  });

  const [bookErr, setBookErr] = useState({
    title: '',
    price: "",
    image: '',
    description: '',
    year: "",
    sale: "",
    bookpdf: "",
    author: "",
  });

  const handleChange = (e) => {
    const { name } = e.target;
    if (name === 'title') {
        if(!e.target.value.trim()){
            setBookErr({...bookErr,title:"Title is required"})
        }
        else if(e.target.value.trim().length < 4){
          setBookErr({...bookErr,title:"Book title myst be at least 4 characters long"})
        }
        else{
            setBookErr({...bookErr,title:""})
        }
      setBook({...book, title:e.target.value})
    } else if (name === 'price') {
        const input = e.target.value.trim();
      if (input === '') {
        setBookErr({ ...bookErr, price: "Required" });
      } else {
        const numericValue = parseFloat(input);
  
        if (isNaN(numericValue) || numericValue <= 0) {
            setBookErr({ ...bookErr, price: "Must be a positive number" });
        } else {
            setBookErr({ ...bookErr, price: "" });
        }
      }
        setBook({...book, price:e.target.value})
    } else if (name === 'image') {
        console.log("here");
        setBook({...book, image:e.target.files[0]})
    } else if (name === 'description') {
        setBook({...book, description:e.target.value})
    } else if (name === 'year') {
      const yearRegex = /^(19|20)\d{2}$/;
      if(!yearRegex.test(e.target.value)){
        setBookErr({...bookErr, year:"Year must be in format YYYY" });
      }
      else{
        setBookErr({...bookErr, year:"" });
      }
        setBook({...book, year:e.target.value})
    } else if (name === 'sale') {
        const input = e.target.value.trim();
        if (input === '') {
          setBookErr({ ...bookErr, rate: "Required" });
        } else {
          const numericValue = parseFloat(input);
    
          if (isNaN(numericValue) || numericValue < 0 || numericValue >100) {
              setBookErr({ ...bookErr, sale: "Must be a number between 0 and 100" });
          } else {
              setBookErr({ ...bookErr, sale: "" });
          }
        }
        setBook({...book, sale:e.target.value})
    } else if (name === 'bookpdf') {
        console.log("here")
        setBook({...book, bookpdf:e.target.files[0]})
    } else if (name === 'author') {
        setBook({...book, author:e.target.value})
    }
  };

  const sendData = async (e) => {
    e.preventDefault();
    if(Object.values(bookErr).every(value => value === ""))
    {
    axiosinstance
      .post('/book/addbook/', book, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': localStorage.getItem('booky-access-token'),
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 201) {
          handleClose();
          
        }
      })
      .catch((error) => {
        console.log(error);
      });}
  };

  return (
    <Container component="main" maxWidth="l">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
         <img
          src={logoimage}
          alt="Logo"
          style={{ width: "200px", height: "150px",  marginTop:".5rem", marginBottom:"2rem"
         }}
        />
        <Box component="form" noValidate onSubmit={sendData} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="title"
                required
                fullWidth
                id="bookTitle"
                label="Book Title"
                autoFocus
                value={book.title}
                onChange={handleChange}
                error={Boolean(bookErr.title)}
              />
              {bookErr.title && (
                <Typography variant="caption" color="error">
                  {bookErr.title}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="price"
                label="Price"
                name="price"
                type="number"
                value={book.price}
                onChange={handleChange}
                error={Boolean(bookErr.price)}
              />
              {bookErr.price && (
                <Typography variant="caption" color="error">
                  {bookErr.price}
                </Typography>
              )}
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                id="author"
                label="Author"
                name="author"
                value={book.author}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                id="year"
                label="Year"
                name="year"
                value={book.year}
                onChange={handleChange}
              />
               {bookErr.year && (
                <Typography variant="caption" color="error">
                  {bookErr.year}
                </Typography>
              )}
            </Grid>
                <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                id="sale"
                label="sale %"
                name="sale"
                value={book.sale}
                onChange={handleChange}
              />
               {bookErr.sale && (
                <Typography variant="caption" color="error">
                  {bookErr.sale}
                </Typography>
              )}
            </Grid>
          <Grid item xs={12} sm={6}>
               <label className="custom-upload-button">
            <Button
              sx={{ width:"100%", height:"100%" }}
              component="span"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Upload Book Image
            </Button>
            <input
  type="file"
  name="image"
  onChange={handleChange}
  accept="image/*"
  style={{ display: "none" }}
/>

          </label>
          {bookErr.bookpdf && (
                <Typography variant="caption" color="error">
                  {bookErr.bookpdf}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
               <label className="custom-upload-button">
            <Button
              sx={{ width:"100%", height:"100%" }}
              component="span"
              variant="contained"
              startIcon={<CloudUploadIcon />}
            >
              Upload Book PDF
            </Button>
            <input
              type="file"
              name="bookpdf"
              onChange={handleChange}
              accept="application/pdf"
              style={{ display: "none" }}
            />
          </label>
          {bookErr.image && (
                <Typography variant="caption" color="error">
                  {bookErr.image}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                rows={3}
                fullWidth
                id="description"
                label="Description"
                name="description"
                value={book.description}
                onChange={handleChange}
              />
               {bookErr.description && (
                <Typography variant="caption" color="error">
                  {bookErr.description}
                </Typography>
              )}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="success"
            sx={{ mt: 3, mb: 2 }}
          >
            Add Book
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Addbook;
