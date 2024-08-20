import { useState } from "react";
import {getData,serverURL} from "../../services/FetchNodeServices"
import { useEffect } from "react";
import {Grid} from "@mui/material"

export default  function PopularBrands(props){
    
    const showImg=()=>{
        return props.data?.map((item)=>{
            return <div style={{background:'red',width:'20%',height:'35%',background:'#fff',display:'flex',outline:'groove',outlineWidth:'1px',outlineColor:"GrayText",alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                <img src={`${serverURL}/images/${item.icon}`} style={{width:'35%',height:'45%',flexWrap:"wrap",flexDirection:'row'}} />
            </div>
        })
    }

    return(<div style={{display:'flex'}}>
        <Grid spacing={2} container style={{flexDirection:'row'}}>
            <Grid item xs={12} style={{display:'flex'}}>
            <div  style={{fontWeight:'bolder',fontSize:"2vw",flexGrow:1,marginBottom:'3%'}}>
                Popular Brands
            </div>
            <div style={{fontWeight:"bold",color:'#576574',fontSize:'1vw',marginTop:'2%'}}>
                View all
            </div>
            </Grid>
        {showImg()}
        </Grid>
    </div>)
}