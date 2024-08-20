import { serverURL } from "../../services/FetchNodeServices"
import { Grid } from "@mui/material"
import { useState } from "react"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { useRef } from "react";
export default function ProductImagesComponent(props){
   var sldr=useRef()
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows:false,
        vertical:true,
        verticalSwiping:true
      };
    const [img,setImg]=useState('');
   var images=props.data.picture.split(",");
   const [picture,setPicture]=useState(images[0]);
   
   
// var cards=[{name: 'Water Heater', price: '2500', offer: '2100', save: '400', icon: '2.png'},
// {name: 'Batteries', price: '10000', offer: '9800', save: '200', icon: '3.png'}]
const showItems = () => {
  return images.map((items) => {
  return (<div onClick={()=>handlePicture(items)} style={{width:'50%',height:'50%'}}>
            <img src={`${serverURL}/images/${items}` }style={{width:'100%',borderRadius:'10%',cursor:'pointer',marginBottom:8}}onClick={handlechangeimage} id="img"/>
          </div>)
          })
}

const handlechangeimage=(event)=>{
  setImg(event.target.value)
}
const handleForward=()=>{
  sldr.current.slickNext()
}

const handleBack=()=>{
sldr.current.slickPrev()
}
const handlePicture=(item)=>{
  setPicture(item)

}
  return(
  <div style={{ width:'99%',marginTop:'1%',display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
         <Grid container spacing={2}>
          <Grid item xs={12} style={{display:'flex',alignItems:'center'}}>
          <Grid item xs={1} style={{margin:'1%'}}>
            <div style={{width:'99%',position:'relative',}}>
            <div style={{width:'50%',padding:5, height:'100%' }}>
          <KeyboardArrowUpIcon onClick={handleBack} style={{ cursor:'pointer', color:'grey',fontSize:'3vw',position:'absolute',left:'5%',top:"-13%",zIndex:2}} />

          <Slider  ref={sldr} {...settings}>
          {showItems()}
          </Slider>
          <KeyboardArrowDownIcon onClick={handleForward} style={{ cursor:'pointer', color:'grey',fontSize:'3vw',position:'absolute',left:'5%',top:"99%",zIndex:2}} />

          </div>
          </div>

          </Grid>
          <Grid item xs={8} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <img src={`${serverURL}/images/${picture}` } style={{ width:'75%',background:'lightgrey',}}/>
          </Grid>
          </Grid>
         </Grid>
</div>  )
}