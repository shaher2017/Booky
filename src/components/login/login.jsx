import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import "./SignInStyles.css";
import axiosinstance from "../axiosinstance";
import logoimage from "../navbar/booky.png";
import coverphoto from "../register/newbook.jpg";

export default function SignIn() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState({ email: "", password: "" });
  const [userErr, setUserErr] = React.useState({ email: "", password: "" });
  
// eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(()=>{
    if(localStorage.getItem('booky-access-token')) navigate('/');
  },[])
  const handlechange = (e) => {
    if (e.target.name === "email") {
      const email = e.target.value.trim();
      if (email.length < 3) {
        setUserErr({ ...userErr, email: "Email is Required" });
      } else {
        setUserErr({ ...userErr, email: "" });
      }
      setUser({ ...user, email: e.target.value });
    }
    if (e.target.name === "password") {
      setUserErr({...userErr, password:""})
      setUser({ ...user, password: e.target.value });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axiosinstance
      .get(`/User/checkemail/?email=${user.email}`)
      .then((response) => 
       {console.log(response); if (response.status === 204) {setUserErr({ ...userErr, email: "Email is not registered" });}})
      .catch((err) => {
        console.log(err)
      });
    if (userErr.email === "" && userErr.password === "") {
      axiosinstance
        .post("/User/login/", user, {
          Headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          localStorage.setItem(
            "booky-access-token",
            res.data.token
          );
          localStorage.setItem(
            "booky-role",
            res.data.role
          );
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          setUserErr({...userErr,password:"Wrong Password"});
        });
    }
  };

  return (
       <div style={{background: `url(${coverphoto}) center/cover no-repeat`,minHeight: "100vh", 
    fontWeight:"bold",
    display:"flex",justifyContent:"space-around",alignItems:"center",
    zIndex:-1,
    width:"100%"}}>
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          backgroundColor:"transparent",
          border:"2px solid black",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding:"20px",
          borderRadius:"50px",
        }}
      >
        <img
          src={logoimage}
          alt="Logo"
          style={{ width: "200px", height: "150px",  marginTop:".5rem", marginBottom:"2rem"
         }}
        />
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={user.email}
              onChange={handlechange}
              error={Boolean(userErr.email)}
              InputProps={{style:{fontWeight:"bold"}}}
              InputLabelProps={{style:{fontWeight:"bold"}}}
            />
            {userErr.email && (
              <Typography variant="caption" color="error" sx={{fontWeight:"bold", fontSize:"1rem"}}>
                {userErr.email}
              </Typography>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={user.password}
              onChange={handlechange}
              error={Boolean(userErr.password)}
              InputProps={{style:{fontWeight:"bold"}}}
              InputLabelProps={{style:{fontWeight:"bold"}}}
            />
             {userErr.password && (
              <Typography variant="caption" color="error" sx={{fontWeight:"bold", fontSize:"1rem"}}>
                {userErr.password}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="success"
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
      </div>
  );
}
