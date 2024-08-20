import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchBarComponent from "./SearchBarComponent";
import { Paper, useMediaQuery,Button, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DrawerComponent from "./DrawerComponent";
import Badge from "@mui/material/Badge";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function Header() {
  var navigate = useNavigate();
  var dispatch=useDispatch()
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [cartWindow,setCartWindow]=useState()
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const products = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  var userData = {};
  try {
    userData = Object.values(user)[0];
  } catch (e) {
    console.log(e);
  }
var cartDataFromRedux=useSelector((state)=>state.cart)
var dataCart=Object.values(cartDataFromRedux)
// var data=Object.keys(cartDataFromRedux)
// console.log("datasingh:=:",datasingh[0].productname)
const keys = Object.keys(products);
const cartValue =Object.values(products)
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleSignin = () => {
    navigate("/signin");
  };

  // {dataCart.map((item)=>{
  //   return(<div style={{margin:"0.2%",display:'flex',background:'red'}}>
  //     {item.productname}
  //     </div>
  //     )
  //  })}

  const getTotalItems=()=>{
    return cartValue.reduce((total,next)=>{
      return total+=next.qty
    },0)
  }

  const showCarts=()=>{
    console.log(cartValue.length)
   return cartValue.map((item)=>{
      return <div style={{width:'100%',display:'flex',justifyContent:'space-between',margin:'3% 0% 3% 0%',fontSize:'.85rem'}}>
        <div style={{width:'80%'}}>{item.productname}</div>
        <div style={{width:'20%',textAlign:'end'}}>qty: {item.qty}</div>
      </div>
     })
  }
  const myCart=()=>{
      return(<Paper elevation={3} style={{width:'300px',height:'auto',zIndex:2,background:'#fff',position:'absolute',top:matches?'200%':'100%',right:'1%',color:'black',padding:'1%',transition:"all ease 2s"}} onMouseOver={handleCartWindow}>
           <div style={{width:'100%',display:'flex',justifyContent:'space-between',fontSize:'.9rem',fontWeight:'bold',marginBottom:'3%'}}>Order Summary <span> qty :{getTotalItems()}</span></div>
      <Divider/>
     <div style={{width:'100%'}}>{showCarts()}</div>

      </Paper>)
  }
<div style={{background:'red'}}><Button variant="container">Proceed to Checkout</Button></div>
  const handleCartWindow=()=>{
    console.log(cartValue)
    setCartWindow(true)
  }
  return (
    <div>
      <Box style={{ flexGrow: 1 }}>
        <AppBar onMouseLeave={()=>setCartWindow(false)} 
        style={{ background: "#2d2d2d" }}>
          <Toolbar>
            {matches ? (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={handleDrawerOpen}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <div></div>
            )}
            
            <div
              onClick={() => navigate("/")} 
              style={{
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: 20,
                flexGrow: 1,
              }}
            >
              SolarBuddy
            </div>

            <div
              style={{
                flexGrow: 1,
                width: "80%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {matches ? (
                <div></div>
              ) : (
                <SearchBarComponent parentWidth="50%" width="80%" />
              )}
            </div>

            <div
              style={{
                padding: 20,
                width: 80,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {!matches ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <PersonOutlinedIcon
                    onClick={handleSignin}
                    style={{ cursor: "pointer", fontSize: 26 }}
                  />
                  <div
                    style={{
                      fontSize: "0.8vw",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {userData?.firstname}
                  </div>
                </div>
              ) : (
                <div></div>
              )}
              <Badge badgeContent={keys.length} color="primary">
                <ShoppingBagOutlinedIcon  onMouseOver={handleCartWindow}
                  onClick={() => navigate("/cart")}
                  style={{ fontSize: 28, cursor: "pointer" }}
                />
              </Badge>
              
            </div>
          </Toolbar>
          {cartWindow?myCart():<div></div>}
        </AppBar>
      </Box>
      {matches ? (
        <div
          style={{
            background: "#7f8fa6",
            width: "100%",
            height: 55,
            marginTop: 72,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SearchBarComponent parentWidth="80%" width="96%" />
        </div>
      ) : (
        <div></div>
      )}
      <DrawerComponent open={open} setOpen={setOpen} />
    </div>
  );
}
