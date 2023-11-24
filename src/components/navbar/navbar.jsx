import React, {useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import logoimage from "./booky.png";
import { createSvgIcon } from '@mui/material/utils';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Addbook from '../books/addbook';
import axiosinstance from '../axiosinstance';
const PlusIcon = createSvgIcon(
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>,
  'Plus',
);

const NavbarBooky = () => {
    const navigate = useNavigate();

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [openAddProductDialog, setOpenAddProductDialog] = useState(false);
    const [name_and_image,setNameAndImage] = useState({});

    useEffect(()=>{
      if(localStorage.getItem('booky-access-token')){
      axiosinstance.get('/user/nameandimage', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('booky-access-token'),
        },
        withCredentials: true,
      })
      .then((response)=>{setNameAndImage(response.data)}).catch((error)=>{console.log(error)});}
    },[])

    const handleOpenNavMenu = (event) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
  
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
  
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };


    const handleRegister = ()=>{
        navigate("/register");
    };
    const gohome=()=>{
        navigate("/");
    };

    const logout = ()=>{
      localStorage.clear();
    }

    const handleOpenAddProductDialog = () => {
      setOpenAddProductDialog(true);
    };
  
    const handleCloseAddProductDialog = () => {
      setOpenAddProductDialog(false);
      window.location.reload();
    };

  return (      
    <AppBar position="static" style={{backgroundColor:"rgb(52 67 92)"}}>
<Container maxWidth="xl">
  <Toolbar disableGutters>
    <Typography
      variant="image"
      noWrap
      component="a"
      
      sx={{
        mr: 2,
        display: { xs: 'none', md: 'flex' },
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.3rem',
        color: 'inherit',
        textDecoration: 'none',
        cursor:"pointer",
        height:"4.1rem"
      }}
      onClick={gohome}
    >
      <img src={logoimage} alt='logo' style={{ height: "100%", objectFit: "contain" }} />
    </Typography>
    

    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      >
        <MenuItem
          onClick={()=>{
            navigate("/")}}
        >
          Books
        </MenuItem>
        <MenuItem
        onClick={()=>{
          navigate("/sellers")}}
        >
          Sellers
        </MenuItem>
        {localStorage.getItem('booky-access-token') && <MenuItem
        onClick={()=>{
          navigate("/userbooks")}}
        >
          My Books
        </MenuItem>}
        <MenuItem
        >
          About us
        </MenuItem>
        <MenuItem
        >
          Contact us
        </MenuItem>
          {localStorage.getItem("booky-access-token") ?  <>
          <MenuItem style={{display:localStorage.getItem('booky-role')!=="seller" && "none"}}>
            <Typography textAlign="center" onClick={handleOpenAddProductDialog} >Add Book</Typography>
          </MenuItem>
		<MenuItem style={{display:localStorage.getItem('booky-role')!=="seller" && "none"}} >
            <Typography  textAlign="center" onClick={() => {navigate('/dashboard');}} >Dashboard</Typography>
          </MenuItem>
          <MenuItem onClick={logout } >
            <Typography textAlign="center" >Logout</Typography>
          </MenuItem>
          </>
: <>
          <MenuItem onClick={() => {navigate('/register');}}>
            <Typography textAlign="center" >Register</Typography>
          </MenuItem>
          <MenuItem onClick={() => {navigate('/login');}} >
            <Typography  textAlign="center" >Login</Typography>
          </MenuItem>
          </> } 
      </Menu>
    </Box>
    <Typography
      variant="h5"
      noWrap
      component="a"
      href="#app-bar-with-responsive-menu"
      sx={{
        mr: 2,
        display: { xs: 'flex', md: 'none' },
        flexGrow: 1,
        fontFamily: 'monospace',
        fontWeight: 700,
        letterSpacing: '.3rem',
        color: 'inherit',
        textDecoration: 'none',
        height:"4.5rem"
      }}
    >
      <img src={logoimage} alt='logoimage' style={{height:"100%",objectFit:"contain"}} />
    </Typography>
    <div style={{display:"flex", justifyContent:"space-between", width:"100%"}}>
    <Box maxWidth="sm" style={{justifyContent:"space-around"}} sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
      <Button
          onClick={()=>{
            navigate("/")}}
          sx={{ my: 2, color: 'white', display: 'block' }}
        >
          Books
        </Button>
        <Button
          sx={{ my: 2, color: 'white', display: 'block' }}
          onClick={()=>{navigate("/sellers")}}
        >
          Sellers
        </Button>
        {localStorage.getItem('booky-access-token') && <Button
          sx={{ my: 2, color: 'white', display: 'block' }}
          onClick={()=>{navigate("/userbooks")}}
        >
          My Books
        </Button>}
        
        <Button
          sx={{ my: 2, color: 'white', display: 'block' }}
        >
          About us
        </Button>
        <Button
          sx={{ my: 2, color: 'white', display: 'block' }}
        >
          Contact us
        </Button>
        
    </Box>
    {localStorage.getItem("booky-access-token") ? (
<Box sx={{ flexGrow: 0, display: 'flex', justifyContent: 'flex-end', alignItems:"center" }}>
      <FontAwesomeIcon icon={faUser} style={{color: "#d8dadf",cursor:"pointer"
    , display:localStorage.getItem('booky-role')!=="seller" && "none"}} onClick={()=>{navigate("/dashboard")}} />
<Button style={{color:"white",marginLeft:"1rem", display:localStorage.getItem('booky-role')!=="seller" && 
"none"}} variant="outlined" startIcon={<PlusIcon />} onClick={handleOpenAddProductDialog}>
        Add  Book
      </Button>
<div style={{cursor:"pointer", marginRight:"1rem", color:"red",display:"flex",alignItems:"center", marginLeft:"1rem"}} >
<FavoriteIcon onClick={()=>{navigate("/favorites");}}/>
</div>
    
<Tooltip title="Open settings">
<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
  <Avatar alt="USER" 
  src={name_and_image.image && `${process.env.REACT_APP_BASE_URL}/${name_and_image.image}`} />
</IconButton>
</Tooltip>
<Menu
sx={{ mt: '45px' }}
id="menu-appbar"
anchorEl={anchorElUser}
anchorOrigin={{
  vertical: 'top',
  horizontal: 'right',
}}
keepMounted
transformOrigin={{
  vertical: 'top',
  horizontal: 'right',
}}
open={Boolean(anchorElUser)}
onClose={handleCloseUserMenu}
>
<MenuItem onClick={handleCloseUserMenu}>
  <Typography onClick={logout } textAlign="center">Logout</Typography>
</MenuItem>
</Menu>

</Box>
) : (
    
<Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', alignItems:"center" }}>
<Button
onClick={handleRegister}
sx={{ my: 2, color: 'white', display: 'block', marginRight: '3rem' }}
>
Register
</Button>
<Button
onClick={() => {
  navigate('/login');
}}
sx={{ my: 2, color: 'white', display: 'block', marginRight: '3rem' }}
>
Login
</Button>
</Box>
)}    
</div>      
  </Toolbar>
</Container>
<Dialog open={openAddProductDialog} onClose={handleCloseAddProductDialog} maxWidth="lg" >
        <DialogTitle>Add Book</DialogTitle>
        <DialogContent>
          <Addbook handleClose={handleCloseAddProductDialog}/>
        </DialogContent>
      </Dialog>
</AppBar>

  );
  
}

export default NavbarBooky;