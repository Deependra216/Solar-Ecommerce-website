import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import { FormHelperText, FormControl, InputLabel, Grid, TextField, Avatar, Select, MenuItem } from '@mui/material'
export default function ShippingCompon() {
  return (<div style={{width:'100%',height:100}}>
    <Grid container spacing={2} >
        <Grid item xs={3} display={{display:'flex'}}> 
        <LocalShippingOutlinedIcon style={{fontSize:'2.5vw',marginLeft:'3%'}}/>  
    <div style={{marginLeft:'5%',marginTop:'1%'}}>

    <div  style={{fontWeight:'bolder',fontSize:'1.1vw'}}>FREE SHIPPING</div>
    <div  style={{fontWeight:'initial',fontSize:'0.9vw'}}>Free Shipping Order INR 100</div>
  </div>
    </Grid> 
    
        <Grid item xs={3} style={{display:'flex'}}> 
    <LockOutlinedIcon style={{fontSize:'2.5vw',marginLeft:'3%'}}/>  
  <div style={{marginLeft:'5%',marginTop:'1%'}}>

  <div  style={{fontWeight:'bolder',fontSize:'1.1vw'}}>SECURE PAYEMENT</div>
  <div  style={{fontWeight:'initial',fontSize:'0.9vw'}}>We Value Your Security</div>
  </div>
    </Grid> 

    <Grid item xs={3} style={{display:'flex'}}> 
    <SupportAgentOutlinedIcon style={{fontSize:'2.5vw',marginLeft:'3%'}}/>  
  <div style={{marginLeft:'5%',marginTop:'1%'}}>

  <div  style={{fontWeight:'bolder',fontSize:'1.1vw'}}> ONLINE SUPPORT</div>
  <div  style={{fontWeight:'initial',fontSize:'0.9vw'}}>We Have Support 24/7</div>
  </div>
    </Grid> 

    <Grid item xs={3} display={{display:'flex'}}> 
    <AccountBalanceWalletOutlinedIcon style={{fontSize:'2.5vw',marginLeft:'3%'}}/>  
  <div style={{marginLeft:'5%',marginTop:'1%'}}>

  <div  style={{fontWeight:'bolder',fontSize:'1.1vw'}}>PAYEMENT ON DELIVERY</div>
  <div  style={{fontWeight:'initial',fontSize:'0.9vw'}}>Cash On Delivery Option</div>
  </div>
    </Grid> 



    </Grid>
  </div>)
}
