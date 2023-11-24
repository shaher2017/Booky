import React from "react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faChartSimple,faBook} from "@fortawesome/free-solid-svg-icons";
import AssignmentIcon from '@mui/icons-material/Assignment';
import Paper from '@mui/material/Paper';
import logo from "../navbar/booky.png";
import "./dashboard.css";
import logouticon from "./logout.svg";
import { useNavigate } from "react-router-dom";
import PaidIcon from "@mui/icons-material/Paid";
import Transactions from "./transactions";
import Statics from "./statics";
import Sellerbooks from "./sellerbooks";
const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default function Dashboard() {
  const navigate = useNavigate();
  const [ selected , setSelected] = React.useState("Statistics");
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [view,setView] = React.useState(<Statics/>);
  //////////////////////////////////////////////////////////////////////////////
  const mainListItems = (
    <React.Fragment>
      <ListItemButton
      onClick={()=>{navigate('/')}}
      sx={{
        opacity: "1",
        color:"#0096FF",
        fontWeight:"bold",
      }}
      >
        <ListItemIcon>
          <DashboardIcon style={{color:"rgb(52, 67, 92)"}}/>
        </ListItemIcon>
        <ListItemText primary="Main Page"  />
      </ListItemButton>
      <Divider sx={{ my: 1, opacity:"1" }} />


      <ListItemButton
       onClick={() => {setView(<Statics/>);return setSelected("Statistics")}}
       sx={{
         backgroundColor: selected === "Statistics" && "#CDCDCD",
         opacity: selected === "Statistics" && "1",
       }}
       className="sidebtn"
      >
        <ListItemIcon>
          <FontAwesomeIcon size="lg" icon={faChartSimple} style={{textAlign:"center", marginLeft:".25rem"}}/>
        </ListItemIcon>
        <ListItemText primary= "Statistics" />
      </ListItemButton>

      <ListItemButton
       onClick={() => {setView(<Sellerbooks/>);return setSelected("Books")}}
       sx={{
         backgroundColor: selected === "Books" && "#CDCDCD",
         opacity: selected === "Books" && "1",
       }}
       className="sidebtn"
      >
        <ListItemIcon>
          <FontAwesomeIcon size="lg" icon={faBook} style={{textAlign:"center", marginLeft:".25rem"}}/>
        </ListItemIcon>
        <ListItemText primary= "Books" />
      </ListItemButton>
      
      
      <ListItemButton
       onClick={() => {setView(<Transactions/>);setSelected("Transactions")}}
       sx={{
         backgroundColor: selected === "Transactions" && "#CDCDCD",
         opacity: selected === "Transactions" && "1",
       }}
       className="sidebtn"
      >
        <ListItemIcon>
          <PaidIcon  />
        </ListItemIcon>
        <ListItemText primary="Transactions" />
      </ListItemButton>
    </React.Fragment>
  );
  const secondaryListItems = (
    <React.Fragment>
      <ListItemButton
       onClick={() => { return setSelected("Settings");}}
       sx={{
         backgroundColor: selected === "Settings" && "#CDCDCD",
         opacity: selected === "Settings" && "1",
       }}
       className="sidebtn"
      >
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItemButton>
      <ListItemButton
      className="sidebtn"
      >
        <ListItemIcon onClick={() => {
                  localStorage.removeItem("booky-access-token");
                  localStorage.removeItem("booky-refresh-token");
                  navigate("/");
                }}>
          <img src={logouticon} alt="logouticon" />
        </ListItemIcon>
        <ListItemText primary="Logout"/>
      </ListItemButton>
    </React.Fragment>
  );
////////////////////////////////////////////////////////////////////////////
  return (

      <Box sx={{ display: "flex", flexDirection:"row" }}>
        <CssBaseline />
        <AppBar  position="absolute" open={open}
        className="app-bar-left"
        >
          <Toolbar
          className="lightnav"
            sx={{
              pr: "24px",color:"white",backgroundColor:"rgb(52, 67, 92)"
            }}
          >
           <div className="dashboardtitle">
  <IconButton
    edge="start"
    color="inherit"
    aria-label="open drawer"
    onClick={toggleDrawer}
    sx={{
      marginRight: "36px",
      ...(open && { display: "none" }),
    }}
  >
    <MenuIcon />
  </IconButton>
</div>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1, fontSize:"2rem", fontWeight:"bold" }}
              className="dashboardtitle"
            >
              {selected === "Statistics" && "Statistics" }
              {selected === "Books" &&  "Books" }
              {selected === "Transactions" &&  "Transactions" }
              {selected === "Settings" &&  "Settings" }
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open} >
          <Toolbar sx={{ display: "flex",alignItems: "center",justifyContent: "flex-end",px: [1],}}
            className="lightsidebar"
          >
            {open && <img src={logo} alt="logo" style={{ height:"7rem", objectFit:"contain"}} />}
            <IconButton  onClick={toggleDrawer} >
               <ChevronLeftIcon />
            </IconButton>
            
          </Toolbar>

          <List style={{height:"100%"}} component="nav" className="lightsidebar">

            {mainListItems}
            <Divider sx={{ my: 1, opacity:"1" }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component="main" sx={{flexGrow: 1,height: "100vh",verflow: "auto",}}>
          <Toolbar />
          <Paper sx={{p: 2, display: 'flex',flexDirection: 'column',backgroundColor: '#CDCDCD', }}>
                  {view}
              </Paper>
        </Box>
      </Box>
  );
}