import { Grid } from "@mui/material"
import Divider from '@mui/material/Divider';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useState, useEffect } from "react";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import { getData} from "../../services/FetchNodeServices"
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import * as React from 'react';
import { Link } from "react-router-dom";

import { serverURL } from "../../services/FetchNodeServices";
export default function FooterComponent() {
    return (<div>
        <Grid spacing={1} container>
            <Grid item xs={3} style={{ fontWeight: 'bold' }}>
                <img src={`${serverURL}/images/logo.png`} style={{ width: '90%', height: '25%' }} />
                <div style={{ fontSize: '1vw', color: '#576574', marginTop: '10%', display: 'flex', alignItems: "inherit" }} >
                    <LocationOnOutlinedIcon style={{ fontSize: '1.5vw', paddingRight: "4%", color: 'black' }} />Thatipur Gwalior( M.P )
                </div>

                <div style={{ fontSize: '1vw', color: '#576574', marginTop: '5%', display: 'flex', alignItems: "inherit" }} >
                    <PhoneOutlinedIcon style={{ fontSize: '1.5vw', paddingRight: "4%", color: 'black' }} />+91 9584899882
                </div>
                <div style={{ fontSize: '1vw', color: '#576574', marginTop: '5%', display: 'flex', alignItems: "inherit" }} >
                    <MailOutlineOutlinedIcon style={{ fontSize: '1.5vw', paddingRight: "4%", color: 'black' }} />ds1271252@gmail.com
                </div>


            </Grid>

            <Grid item xs={3} style={{ fontWeight: 'bold' }}>
                <div style={{fontSize:'1.5vw'}}>INFORMATION</div>
                <Divider />
                <div style={{ fontSize: '0.9vw', color: '#576574', padding: '2%' }}>
                    <Link to={'#'} style={{textDecoration:'none',color:'gray'}} > 
                    <FiberManualRecordIcon style={{ fontSize: '50%', paddingRight: "4%", color: 'black' }} />About Us
                    </Link>
                </div>
                <div style={{ fontSize: '0.9vw', color: '#7f8c8d', padding: '2%' }}>
                <Link to={'#'} style={{textDecoration:'none',color:'gray'}} >
                    <FiberManualRecordIcon style={{ fontSize: '50%', paddingRight: "4%", color: 'black' }} />Contact Us
                    </Link>
                </div>
                <div style={{ fontSize: '0.9vw', color: '#7f8c8d', padding: '2%' }}>
                <Link to={'#'} style={{textDecoration:'none',color:'gray'}} >
                    <FiberManualRecordIcon style={{ fontSize: '50%', paddingRight: "4%", color: 'black' }} />Shipping Policy
                    </Link>
                </div>

                <div style={{ fontSize: '0.9vw', color: '#7f8c8d', padding: '2%' }}>
                <Link to={'#'} style={{textDecoration:'none',color:'gray'}} >
                    <FiberManualRecordIcon style={{ fontSize: '50%', paddingRight: "4%", color: 'black' }} />Payment Policy
                    </Link>
                </div>
                <div style={{ fontSize: '0.9vw', color: '#7f8c8d', padding: '2%' }}>
                <Link to={'#'} style={{textDecoration:'none',color:'gray'}} >
                    <FiberManualRecordIcon style={{ fontSize: '50%', paddingRight: "4%", color: 'black' }} />Privacy Policy
                    </Link>
                </div>
                <div style={{ fontSize: '0.9vw', color: '#7f8c8d', padding: '2%' }}>
                <Link to={'#'} style={{textDecoration:'none',color:'gray'}} >
                    <FiberManualRecordIcon style={{ fontSize: '50%', paddingRight: "4%", color: 'black' }} />Cancellation and Return Policy
                    </Link>
                </div>
                <div style={{ fontSize: '0.9vw', color: '#7f8c8d', padding: '2%' }}>
                    <Link to={'#'} style={{textDecoration:'none',color:'gray'}} >
                    <FiberManualRecordIcon style={{ fontSize: '50%', paddingRight: "4%", color: 'black' }} />Terms and Conditions
                    </Link>
                    </div>
            </Grid>

            <Grid item xs={3} style={{ fontWeight: 'bold' }}>
            <div style={{fontSize:'1.5vw'}}>MY ACCOUNT</div>
                <Divider />
                <div style={{ fontSize: '0.9vw', color: '#576574', padding: '2%' }}>
                    <FiberManualRecordIcon style={{ fontSize: '50%', paddingRight: "4%", color: 'black' }} />My Account
                </div>
                <div style={{ fontSize: '0.9vw', color: '#7f8c8d', padding: '2%' }}>
                    <FiberManualRecordIcon style={{ fontSize: '50%', paddingRight: "4%", color: 'black' }} />Wishlist
                </div>
                <div style={{ fontSize: '0.9vw', color: '#7f8c8d', padding: '2%' }}>
                    <FiberManualRecordIcon style={{ fontSize: '50%', paddingRight: "4%", color: 'black' }} />Order History
                </div>
                <div style={{ fontSize: '0.9vw', color: '#7f8c8d', padding: '2%' }}>
                    <FiberManualRecordIcon style={{ fontSize: '50%', paddingRight: "4%", color: 'black' }} />Become a Vendor
                </div>
                <div style={{ fontSize: '0.9vw', color: '#7f8c8d', padding: '2%' }}>
                    <FiberManualRecordIcon style={{ fontSize: '50%', paddingRight: "4%", color: 'black' }} />Become an Affiliate
                </div>
                <div style={{ fontSize: '0.9vw', color: '#7f8c8d', padding: '2%' }}>
                    <FiberManualRecordIcon style={{ fontSize: '50%', paddingRight: "4%", color: 'black' }} />Become a Seller
                </div>
            </Grid>

            <Grid item xs={3} style={{ fontWeight: 'bold' }}>
            <div style={{fontSize:'1.5vw'}}>EXTRA</div>
                <Divider />
                <div style={{ fontSize: '0.9vw', color: '#576574', padding: '2%' }}>
                    <FiberManualRecordIcon style={{ fontSize: '50%', paddingRight: "4%", color: 'black' }} />Site Map
                </div>
                <div style={{ fontSize: '0.9vw', color: '#7f8c8d', padding: '2%' }}>
                    <FiberManualRecordIcon style={{ fontSize: '50%', paddingRight: "4%", color: 'black' }} />Shop By Brand
                </div>
                <div style={{ fontSize: '0.9vw', color: '#7f8c8d', padding: '2%' }}>
                    <FiberManualRecordIcon style={{ fontSize: '50%', paddingRight: "4%", color: 'black' }} />Shop By City
                </div>
                <div style={{ fontSize: '0.9vw', color: '#7f8c8d', padding: '2%' }}>
                    <FiberManualRecordIcon style={{ fontSize: '50%', paddingRight: "4%", color: 'black' }} />Shop By Pincode
                </div>
                <div style={{ fontSize: '0.9vw', color: '#7f8c8d', padding: '2%' }}>
                    <FiberManualRecordIcon style={{ fontSize: '50%', paddingRight: "4%", color: 'black' }} />SolarClue Projects
                </div>
                <div style={{ fontSize: '0.9vw', color: '#7f8c8d', padding: '2%' }}>
                    <FiberManualRecordIcon style={{ fontSize: '50%', paddingRight: "4%", color: 'black' }} />Pay Online
                </div>
                <div style={{ fontSize: '0.9vw', color: '#7f8c8d', padding: '2%' }}>
                    <FiberManualRecordIcon style={{ fontSize: '50%', paddingRight: "4%", color: 'black' }} />Investor Relations</div>
                <img src={`${serverURL}/images/logo.png`} style={{ width: '90%', height: '30%' }} />
            </Grid>

            <div style={{ display: 'flex',alignItems:'center' }}>
                <Grid xs={5} item>
                    <img src={`${serverURL}/images/playstore.png`} style={{ width: '20%', height: '80%' }} />
                </Grid>
                <Grid item xs={7}>
                    <div style={{ display: 'flex',justifyContent:'flex-end'}}>
                        <img src={`${serverURL}/images/emi.jpg`} style={{width:'40%',height:'80%'}} />
                    </div>
                </Grid>
            </div>
            {/* 
            
            */}

        </Grid>
    </div>)
}