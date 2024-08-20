import React, { useEffect } from "react"
import { Grid,Avatar,Button,TextField, FormControl, Select, InputLabel, MenuItem, FormHelperText } from "@mui/material";
import { useState } from "react";
import TitleComponent from "../components/TitleComponent";
import { useMyStyles } from "../css/CategoryCss";
import { getData, postData, } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";
export default function Category()
{
    
    const classes=useMyStyles();
    const [brandId,setBrandId]=useState('');
    const [categoryName,setCategoryName]=useState('');
    const [icon,setIcon]=useState({bytes:'',file:'logo.png'});
    const [errorMessage,setErrorMessage]=useState('');
    const [brandList,setBrandList]=useState([]);

    const fetchAllBrands=async()=>{
        var result=await getData('brands/display_all_brands')
        setBrandList(result.data)
    }
    useEffect(function(){
        fetchAllBrands()
    },[])
    
    const fillBrands=()=>{
        return brandList?.map((item)=>{
            return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
        })
    }

    const handleChangeIcon=(event)=>
    {
        // alert(URL.createObjectURL(e.target.files[0])+"")
        setIcon({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
        
    }
    //Error Handle
const handleError=(message,label)=>{
    setErrorMessage((prev)=>({...prev,[label]:message}))
}

    const handleSubmit=async()=>{
        var error=false;
        console.log(errorMessage);        
        if(brandId.length==0)
        {
            handleError("Pls Input Brand Id...",'brandId');//frontend brandId
            error=true;
        }
        if(icon.bytes.length==0)
        {
            handleError("Pls Select Icon...",'icon')
            error=true;
        }
        if(categoryName.length==0)
        {
            handleError("Pls Input Category Name",'categoryname')
            error=true;
        }
        
        if(error==false){
            var formData=new FormData();
            formData.append('brandid',brandId);
            formData.append('categoryname',categoryName);
            formData.append('icon',icon.bytes);
            var result=await postData('category/add_new_category',formData);
            // alert(result)
            if(result.status)
            {
            Swal.fire({
                icon:"success",
                title:"Category Register",
                text: result.message,
                })
        }
        else{
                Swal.fire({
                icon:"error",
                title:"Category Register",
                text: result.message,
                })
        }
}}

    return (
        <div className={classes.root}>
        <div className={classes.cbox}>
            <Grid container spacing={2}>
                <Grid xs={12} item>
                    <TitleComponent title="Category Register" link="/admindashboard/displayallcategory" />
                </Grid>
                
                <Grid xs={12} item>
                <FormControl fullWidth >
                    <InputLabel>Brands</InputLabel>
                    <Select label="Brands" onChange={(e)=>setBrandId(e.target.value)} 
                    value={brandId}
                    helperText={errorMessage.brandId} 
                    error={errorMessage.brandId} 
                    onFocus={()=>handleError('','brandId')}
                    >
                    {fillBrands()}
                    </Select>
                    <FormHelperText style={{ fontWeight:400,
                                color: "#d32f2f",
                                fontSize:"0.75rem",
                                lineHeight:1.66,
                                letterSpacing:"0.03333em",
                                textAlign:"left",
                                marginTop:"3px",
                                marginRight:"14px",
                                marginBottom:"0",
                                marginLeft:"14px",
                                }}>{errorMessage.brandId}</FormHelperText>
                </FormControl>
                    
                </Grid>

                <Grid xs={12} item>
                    <TextField error={errorMessage.categoryname} helperText={errorMessage.categoryname} 
                    onFocus={()=>handleError('','categoryname')} 
                    onChange={(event)=>setCategoryName(event.target.value)} fullWidth label="Category Name"></TextField>
                </Grid>

                <Grid xs={6} item className={classes.center}>
                    <div style={{display:'flex',flexDirection:'column'}}>
                        <Button variant="contained" component='label'>
                            Upload
                            <input onClick={()=>handleError('','icon')} onChange={handleChangeIcon} type="file" accept="image/*" hidden multiple/>
                        </Button>
                        {errorMessage.icon==undefined?<div></div>:errorMessage.icon?<div style={{ fontWeight:400,
                                color: "#d32f2f",
                                fontSize:"0.75rem",
                                lineHeight:1.66,
                                letterSpacing:"0.03333em",
                                textAlign:"left",
                                marginTop:"3px",
                                marginRight:"14px",
                                marginBottom:"0",
                                marginLeft:"14px",
                                }}>Pls Select Icon</div>:<div></div>}
                    </div>
                </Grid>

                <Grid xs={6} item className={classes.center}>
                    <Avatar variant="rounded" alt='Category' src={icon.file}></Avatar>
                </Grid>
                
                <Grid xs={6} item className={classes.center}>
                    <Button onClick={handleSubmit} variant="contained" fullWidth>Submit</Button>
                </Grid>

                <Grid xs={6} item className={classes.center}>  
                    <Button variant="contained" fullWidth>Reset</Button>
                </Grid>
            </Grid>
        </div>
        </div>
    )
}