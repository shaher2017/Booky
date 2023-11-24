import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axiosinstance from "../axiosinstance";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import logoimage from "../navbar/booky.png";
import coverphoto from "./newbook.jpg";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function SignUp() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    image: "",
    role:"customer",
  });
  const [userErrors, setUserErrors] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  const [openAddProductDialog, setOpenAddProductDialog] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(()=>{
    if(localStorage.getItem('booky-access-token')) navigate('/');
  },[])

  const handleOpenAddProductDialog = () => {
    setOpenAddProductDialog(true);
  };

  const handleCloseAddProductDialog = () => {
    setOpenAddProductDialog(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if(name === "name"){
      if(value === ""){
     setUserErrors({...userErrors,name:"Name is Required"});}
     else{ setUserErrors({...userErrors,name:""}); }
    }

    else if(name === "email"){
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if(value === ""){
     setUserErrors({...userErrors,email:"Email is Required"});
    }
     else if(!emailRegex.test(value)){
      setUserErrors({...userErrors,email:"Email is not valid"});
     }
     else{ setUserErrors({...userErrors,email:""}); }
    }
    else if(name === "phone"){
      const egyptMobileRegex = /^(010|011|012|015)[0-9]{8}$/;
      if(value === ""){
     setUserErrors({...userErrors,phone:"Phone is Required"});}
     else if(!egyptMobileRegex.test(value)){
      setUserErrors({...userErrors,phone:"Phone is not valid"});
     }
     else{
      setUserErrors({...userErrors,phone:""}); 
    }
    }
    else if(name==="confirmPassword"){
      if(value !== userData.password){
        setUserErrors({...userErrors,confirmPassword:"Password Does not Match!"}); 
      }
      else{
        setUserErrors({...userErrors,confirmPassword:""}); 
      }
    }
    if(name !== "image"){    setUserData({
      ...userData,
      [name]: value,
    });}
    else {
      setUserData({...userData, image:e.target.files[0]})
    }

  };

  const senddata = async (e) => {
    e.preventDefault();
    if (userData.image === ""){
      setUserErrors({...userErrors,image:"Image must be added"})
    }
    else if( userData.password === ""){
      setUserErrors({...userErrors,password:"Password must be added"});
    }
    else{
      setUserErrors({...userErrors,password:"",image:""});
    }
    axiosinstance.get(`/user/checkphone?phone=${userData.phone}`)
    .then((response) => {
      if (response.status === 200) setUserErrors({ ...userErrors, phone: "Phone is already used" });
    })
    .catch((error) => { console.log(error) });
    
    axiosinstance
      .get(`/User/checkemail/?email=${userData.email}`)
      .then((response) => 
       {console.log(response); if (response.status === 200) 
        {setUserErrors({ ...userErrors, email: "Email is already registered" });}})
      .catch((err) => {
        console.log(err)
      });
    if(Object.values(userErrors).every(value => value === "")
    && userData.phone !== "" && userData.email !== "" && userData.name !== "" && userData.password !=="" && userData.image !=="")
{ console.log("here");
    try{
      const response = await axiosinstance.post("/user/register", userData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 201) {
        handleOpenAddProductDialog();
      } else {
        console.error("Registration failed");
      }
    }
      catch{
        console.log("registeration failed");
      }}
  };

  return (
    <div
      style={{
        background: `url(${coverphoto}) center/cover no-repeat`,
        minHeight: "100vh",
        fontWeight: "bold",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        zIndex: -1,
        width: "100%",
      }}
    >
      <Container component="main" maxWidth="md">
        <Box
          sx={{
            backgroundColor: "transparent",
            border: "2px solid black",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
            padding: "20px",
            borderRadius: "50px",
          }}
        >
          <img
            src={logoimage}
            alt="Logo"
            style={{
              width: "200px",
              height: "150px",
              marginTop: ".5rem",
              marginBottom: "2rem",
            }}
          />
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
            onSubmit={(e) => {
              e.preventDefault();
              senddata(e);
            }}
          >
            <Grid container spacing={2}>
              {/* Name and Email in the same row */}
              <Grid item xs={12} md={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                  value={userData.name}
                  onChange={handleInputChange}
                  style={{ width: "100%" }}
                  InputProps={{ style: { fontWeight: "bold" } }}
                  InputLabelProps={{ style: { fontWeight: "bold" } }}
                />
                {userErrors.name && (
                  <span style={{ color: "red" }}>{userErrors.name}</span>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  style={{ width: "100%" }}
                  InputProps={{ style: { fontWeight: "bold" } }}
                  InputLabelProps={{ style: { fontWeight: "bold" } }}
                />
                {userErrors.email && (
                  <span style={{ color: "red" }}>{userErrors.email}</span>
                )}
              </Grid>

              {/* Phone and Address in the same row */}
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  name="phone"
                  label="Phone Number"
                  id="phone"
                  value={userData.phone}
                  onChange={handleInputChange}
                  style={{ width: "100%" }}
                  InputProps={{ style: { fontWeight: "bold" } }}
                  InputLabelProps={{ style: { fontWeight: "bold" } }}
                />
                {userErrors.phone && (
                  <span>
                    <span style={{ color: "red" }}>{userErrors.phone}</span>
                  </span>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="address"
                  label="Address"
                  id="address"
                  value={userData.address}
                  onChange={handleInputChange}
                  style={{ width: "100%" }}
                  InputProps={{ style: { fontWeight: "bold" } }}
                  InputLabelProps={{ style: { fontWeight: "bold" } }}
                />
                {userErrors.address && (
                  <span>
                    <span style={{ color: "red" }}>{userErrors.address}</span>
                  </span>
                )}
              </Grid>

              {/* Password and Confirm Password in the same row */}
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={userData.password}
                  onChange={handleInputChange}
                  style={{ width: "100%" }}
                  InputProps={{ style: { fontWeight: "bold" } }}
                  InputLabelProps={{ style: { fontWeight: "bold" } }}
                />
                {userErrors.password && (
                  <span>
                    <span style={{ color: "red" }}>{userErrors.password}</span>
                  </span>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  id="confirmPassword"
                  value={userData.confirmPassword}
                  onChange={handleInputChange}
                  style={{ width: "100%" }}
                  InputProps={{ style: { fontWeight: "bold" } }}
                  InputLabelProps={{ style: { fontWeight: "bold" } }}
                />
                {userErrors.confirmPassword && (
                  <span>
                    <span style={{ color: "red" }}>
                      {userErrors.confirmPassword}
                    </span>
                  </span>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <label className="custom-upload-button">
                  <Button
                    sx={{ width: "100%", height: "100%", backgroundColor: "rgb(52, 67, 92)"  }}
                    component="span"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload Image
                  </Button>
                  <input
                  required
                    type="file"
                    name="image"
                    onChange={handleInputChange}
                    accept="image/*"
                    style={{ display: "none" }}
                        />
                </label>
                {userErrors.image && (
                  <span style={{ color: "red" }}>{userErrors.image}</span>
                )}
              </Grid>
                  <Grid item xs={12} md={6}>
                  <Select
              required
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={userData.role}
               label="role"
              name='role'
            onChange={handleInputChange}
            style={{
             fontWeight:"bold", width:"100%",
            backgroundColor:"rgb(52, 67, 92)", color:"white"}}
        >
             <MenuItem value="customer">Customer</MenuItem>
             <MenuItem value="seller">Seller</MenuItem>
        </Select>
                  </Grid>
            </Grid>
            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="success"
              sx={{ mt: 3, mb: 2}}
            >
              Sign Up
            </Button>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              sx={{ mt: 2 }}
            >
              <Grid item>
                <RouterLink to="/login" variant="body2">
                  Already have an account? Sign in
                </RouterLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Dialog
          open={openAddProductDialog}
          onClose={handleCloseAddProductDialog}
        >
          <DialogTitle>Registered</DialogTitle>
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
              <p
                style={{
                  color: "green",
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                }}
              >
                You Have Registered Successfully!
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
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </Container>
    </div>
  );
}
