import React from "react";
import { Avatar,Button, Grid, TextField } from "@mui/material";
import { myUseStyle } from "../css/BrandCss";
import { useState } from "react";
import TitleComponent from "../components/TitleComponent";
import { postData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Brands(){
    const classes=myUseStyle();
    const navigate=useNavigate();
    const [brandName,setBrandName]=useState('');
    const [icon,setIcon]=useState({bytes:'',file:'logo.png'});
    const [errorMessage,setErrorMessage]=useState('');
// for handling error
    const handleError=(message,label)=>{
        setErrorMessage((prev)=>({...prev,[label]:message}))
    }

    const handleSubmitData=async()=>{
        var error=false;
        console.log(errorMessage)
        if(brandName.length==0)
        {
            handleError("Pls Input Brand Name",'brandname')
            // setErrorMessage({...errorMessage,brandname:''});
            error=true;
        }

        if(icon.bytes.length==0)
        {
            handleError("PLs Select Icon...",'icon')
            error=true
        }
        
 if(error==false){
    var formData = new FormData()     
    formData.append('brandname',brandName)
    formData.append('icon',icon.bytes)
    var result=await postData('brands/add_new_brand',formData)
     if(result.status)
    {
        Swal.fire({
            icon:"success",
            title:"Brand Register",
            text: result.message,
            toast:true
        })
    }
    else
    {
            Swal.fire({
            icon:"error",
            title:"Brand Register",
            text: result.message,

        })
    }
}
}
const handleIconChange=(event)=>{
        // alert(URL.createObjectURL(event.target.files[0])+"")
        setIcon({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
    }

    return(
        <div className={classes.root}>
        <div className={classes.box}>
            <Grid container spacing={2}>
                <Grid xs={12} item>
                    <TitleComponent title='Brands Register' link="/admindashboard/displayallbrands"/>
                </Grid>     

                <Grid item xs={12}>
                    <TextField error={errorMessage.brandname} 
                    helperText={errorMessage.brandname} onFocus={()=>handleError('','brandname')} onChange={(event)=>setBrandName(event.target.value)} fullWidth label="Brand Name"></TextField>
                </Grid>

                <Grid item xs={6} className={classes.center}>
                    <div style={{display:'flex',flexDirection:'column'}}>
                    <Button variant="contained" component='label' >
                    Upload
                        <input onClick={()=>handleError('','icon')} onChange={handleIconChange} type="file" accept="image/*" hidden multiple/>
                    </Button>
                    {errorMessage.icon==undefined?<div></div>:errorMessage.icon?<div style={{font: "inherit",
                        fontWeight:400,
                        color: "#d32f2f",
                        fontSize:"0.75rem",
                        lineHeight:1.66,
                        letterSpacing:"0.03333em",
                        textAlign:"left",
                        marginTop:"3px",
                        marginRight:"14px",
                        marginBottom:"0",
                        marginLeft:"14px"}}>Pls Select Icon</div>:<div></div>} 
                    </div>
                </Grid>

                <Grid item xs={6} className={classes.center}>
                    <Avatar src={icon.file} alt="Brand" variant="rounded" />
                </Grid>

                <Grid item xs={6} className={classes.center}>
                    <Button onClick={handleSubmitData} variant="contained" fullWidth>Submit</Button>
                </Grid>

                <Grid xs={6} item className={classes.center}>
                    <Button  variant="contained" fullWidth>Reset</Button>
                </Grid>

            </Grid>

        </div>
        </div>
    )

}