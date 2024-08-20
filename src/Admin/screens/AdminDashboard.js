import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import SolarPowerIcon from '@mui/icons-material/SolarPower';
import BoltIcon from '@mui/icons-material/Bolt';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import AssessmentIcon from '@mui/icons-material/Assessment';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DraftsIcon from '@mui/icons-material/Drafts';
import { Grid, Typography,Paper } from '@mui/material';
import {AppBar,Toolbar} from '@mui/material';
import { useStyle } from '../css/AdminDashboardCss';
import { Routes, useNavigate } from 'react-router-dom';
import { serverURL } from '../../services/FetchNodeServices';
import Brands from "./Brands";
import DisplayAllBrands from "./DisplayAllBrands";
import Category from "./Category";
import DisplayAllCategory from "./DisplayAllCategory";
import SubCategory from "./SubCategory";
import DisplayAllSubCategory from "./DisplayAllSubCategory";
import Products from "./Products";
import DisplayAllProducts from "./DisplayAllProducts";
import ProductDetails from "./ProductDetails";
import DisplayAllProductDetails from "./DisplayAllProductDetails";
import Banners from "./Banners";
import { Route } from 'react-router-dom';


export default function AdminDashboard(prpos) {
  const classes=useStyle()
  const navigate=useNavigate()
  const admin=JSON.parse(localStorage.getItem('ADMIN'))
  return (
    <div style={{height:'100vh',background:'#fff'}}>
      {/* <Grid item xs={12}>
        <AppBar position="sticky">
      <Toolbar variant="dense">
      <Typography variant="h6" color="inherit" component="div">
        Solar Buddy
       </Typography>
      </Toolbar>
      </AppBar>
        </Grid> */}
      
      <Grid container spaces={3} style={{paddingInlineStart:5 , height:'90%'}}>
        
        <Grid item xs={2.2} style={{height:'100%'}}>
          <Paper style={{background:'#fff',overflowY:'scroll',}}>
        <div className={classes.leftBarStyle}>
        <img src={`${serverURL}/images/${admin.picture}`} style={{width: 70, height: 70, borderRadius: 35 }}/>
        <div className={classes.nameStyle}>{admin?.adminname}</div>
        <div className={classes.emailStyle}>{admin?.emailid}</div>
        <div className={classes.phoneStyle}>+91-{admin?.mobileno}</div>
        </div>
        {/* name div */}
        <div className={classes.menuStyle}  >
              <div style={{height:'100%',width:'100%'}}>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <DashboardIcon/>
                  </ListItemIcon>
                  <ListItemText primary={
                  <span>Dashboard</span>}>
                  </ListItemText>
                </ListItemButton>
              </ListItem>
             

              <ListItem disablePadding>
                <ListItemButton 
                  onClick={()=>navigate('/admindashboard/displayallbrands')}
                >
                  <ListItemIcon>
                    <BoltIcon/>
                  </ListItemIcon>
                  <ListItemText primary={
                  <span>Brand List</span>}>
                  </ListItemText>
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                onClick={()=>navigate('/admindashboard/displayallcategory')}
                >
                  <ListItemIcon>
                    <WbSunnyIcon/>
                  </ListItemIcon>
                  <ListItemText primary={
                  <span>Category List </span>}>
                  </ListItemText>
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton  
                onClick={()=>navigate('/admindashboard/displayallsubcategory')}
                >
                  <ListItemIcon>
                    <BoltIcon/>
                  </ListItemIcon>
                  <ListItemText primary={
                  <span>SubCategory List</span>}>
                  </ListItemText>
                </ListItemButton>
              </ListItem>

           <ListItem disablePadding>
                <ListItemButton
                onClick={()=>navigate('/admindashboard/displayallproducts')}
                >
                  <ListItemIcon>
                    <SolarPowerIcon/>
                  </ListItemIcon>
                  <ListItemText primary={
                  <span>Products List</span>}>
                  </ListItemText>
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                onClick={()=>navigate('/admindashboard/displayallproductdetails')}
                >
                  <ListItemIcon>
                    <SolarPowerIcon/>
                  </ListItemIcon>
                  <ListItemText primary={
                  <span>Product Details</span>}>
                  </ListItemText>
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                onClick={()=>navigate('/admindashboard/banners')}
                >
                  <ListItemIcon>
                    <ViewCarouselIcon/>
                  </ListItemIcon>
                  <ListItemText primary={
                  <span>Banners</span>}>
                  </ListItemText>
                </ListItemButton>
              </ListItem>

             

              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <AssessmentIcon/>
                  </ListItemIcon>
                  <ListItemText primary={
                  <span>Sales Report</span>}>
                  </ListItemText>
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
              
                <ListItemButton >
                  <ListItemIcon>
                    <LogoutIcon/>
                  </ListItemIcon>        
                  <ListItemText primary={
                  <span>Logout</span>}>
                  </ListItemText>
                </ListItemButton>
              </ListItem>

      </div>
      </div>
        </Paper>
        </Grid>
         
         <Grid xs={9.8} item style={{padding:20,fontFamily:'Poppins',overflowY:'scroll',height:'100vh'}}>
            <Routes>
            <Route element={<Brands />} path="/brands" />
            <Route element={<DisplayAllBrands />} path="/displayallbrands" />
            <Route element={<Category />} path="/category"></Route>
            <Route element={<DisplayAllCategory/>} path="/displayallcategory"></Route>
            <Route element={<SubCategory/>} path="/subcategory"></Route>
            <Route element={<DisplayAllSubCategory/> }path="/displayallsubcategory"></Route>
            <Route element={<Products/>} path="/products"></Route>
            <Route element={<DisplayAllProducts/>} path="/displayallproducts"></Route>
            <Route element={<ProductDetails/>} path="/productdetails"></Route>
            <Route element={<DisplayAllProductDetails/>} path="/displayallproductdetails"></Route>
            <Route element={<Banners/>} path="/banners"></Route> 
      
            </Routes>
          
         </Grid>
     
      </Grid>
    
    </div>);
}