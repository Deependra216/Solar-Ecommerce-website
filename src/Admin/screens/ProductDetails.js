import { useState,useEffect } from "react";
import React from "react";
import { Avatar, Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useMyStyles } from "../css/CategoryCss"
import TitleComponent from "../components/TitleComponent";
import { getData, postData } from "../../services/FetchNodeServices"
import Swal from "sweetalert2";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function ProductDetails(){
    const classes=useMyStyles();
    const [productName,setProductName]=useState('');
    const [productSubName,setProductSubName]=useState('');
    const [productId,setProductId]=useState('');
    const [picture,setPicture]=useState({file:[]});
    const [description,setDescription]=useState('');
    const [errorMessage,setErrorMessage]=useState({})
    const [weight,setWeight]=useState('')
    const [weighttype,setWeightType]=useState('')
    const [packaging,setPackaging]=useState('')
    const [qty,setQty]=useState('')
    const [price,setPrice]=useState('')
    const [offerprice,setOfferPrice]=useState('')
    const [offertype,setOfferType]=useState('')
    // const [value,setValue]=useState('')

///This is for Brand Fill///
    const [brandList,setBrandList]=useState([]);
    const fetchAllBrands=async()=>{
        var result= await getData('brands/display_all_brands')
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

    const [brandId,setBrandId]=useState('')
    const handleChangeBrand=(event)=>{
        setBrandId(event.target.value)
        fetchAllCategory(event.target.value)

    }

//////////End of Brand Fill//////

///This is for Category Fill///
    const [categoryList,setCategoryList]=useState([]);
    const fetchAllCategory=async(bid)=>{
        var result = await postData('category/display_all_categories_by_brands',{brandid:bid})
        setCategoryList(result.data)
    }
    useEffect(function(){
        fetchAllCategory()
    },[])
    const fillCategory=()=>{
        return categoryList?.map((item)=>{
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        })
    }
    const [categoryId,setCategoryId]=useState('')
    const handleChangeCategory=(event)=>{
    setCategoryId(event.target.value)
    fetchAllSubCategory(event.target.value)
    
}
////////End of Category Fill///////////


/////////This is for subCategory Fill/////
const [subCategoryList,setSubCategoryList]=useState([]);
const fetchAllSubCategory=async(cid)=>{
    var result = await postData('subcategory/display_all_subcategories_by_category',{categoryid:cid})
        setSubCategoryList(result.data)
}
useEffect(function(){
    fetchAllSubCategory()
},[])

    const fillSubCategory=()=>{
        return subCategoryList?.map((item)=>{
            return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
        })
    }


/////////End of subCategory Fill/////


////This is for Product Fill/////////
const [productList,setProductList]=useState([]);
const fetchAllProducts=async(sid)=>{
    var result= await postData('products/display_all_products_by_subcategory',{subcategoryid:sid})
        setProductList(result.data)
}
useEffect(function(){
    fetchAllProducts()
},[])

const [subCategoryId,setSubCategoryId]=useState('');
const handleChangeSubCategory=(event)=>{
    setSubCategoryId(event.target.value)
    fetchAllProducts(event.target.value)

}
const fillProducts=()=>{
    return productList?.map((item)=>{
        return <MenuItem value={item.productid}>{item.productname}</MenuItem>
    })
}

///////////////End of Product Fill//////////////

///////work on Submit Button//////////

//functions ////////////////////////
const handlePictureChange=(event)=>{
    alert({file:Object.values(event.target.files)}+"")
    // setPicture({file:Object.values(event.target.files)})
    if(Object.values(event.target.files).length <=4)
    {
        Swal.fire({
            icon:"error",
            title:"Pls Upload 4 or more files",
            timer:1700,
            toast:true
        })
    }
    else
    {
        setPicture({file:Object.values(event.target.files)})
    }
    
}
const showImages=()=>{
    return picture?.file.map((item)=>{
        return (<div style={{margin:2,display:'flex'}}><Avatar src={URL.createObjectURL(item)} variant="rounded" /></div>)
    })
}
const handleError=(message,label)=>{
    setErrorMessage((prev)=>({...prev,[label]:message}))
}


const handleSubmit=async()=>{
    var error=false
    if(brandId.length==0){
        handleError('Pls select Brand Name..','brandname')
        error=true
    }
    if(categoryId.length==0){
        handleError('Pls select Category Name..','categoryname')
        error=true
    }
    if(subCategoryId.length==0){
        handleError('Pls select SubCategory Name..','subcategoryname')
        error=true
    }
    if(productId.length==0){
        handleError('Pls select Product Name..','productname')
        error=true
    }

    if(productSubName.length==0)
    {
        handleError('Pls Fill Product Sub Name..','productsubname')
        error=true
    }
    
    if(description.length==0){
        handleError('Pls Fill Discription..','description')
        error=true
    }
    if(weight.length==0)
    {
        handleError('Pls Fill Weight..','weight')
        error=true
    }
    if(weighttype.length==0)
    {
        handleError('Pls Fill Weight Type..','weighttype')
        error=true
    }
    if(packaging.length==0)
    {
        handleError('Pls Select Packaging..','packaging')
        error=true
    }
    if(qty.length==0)
    {
        handleError('Pls Fill Quantity..','qty')
        error=true
    }
    if(price.length==0)
    {
        handleError('Pls Fill Price..','price')
        error=true
    }
    if(offerprice.length==0)
    {
        handleError('Pls Fill Offer Price..','offerprice')
        error=true
    }
    if(offertype.length==0)
    {
        handleError('Pls Select Offer Type..','offertype')
    }
    if(picture.file.length==0){
        handleError('Pls Select Picture..','picture')
        error=true
    }
   
    if(error==false){
        var formDATA=new FormData()
        formDATA.append('brandid',brandId)
        formDATA.append('categoryid',categoryId)
        formDATA.append('subcategoryid',subCategoryId)
        formDATA.append('productid',productId)
        formDATA.append('productsubname',productSubName)
        formDATA.append('description',description)
        formDATA.append('weight',weight)
        formDATA.append('weighttype',weighttype)
        formDATA.append('packaging',packaging);
        formDATA.append('qty',qty)
        formDATA.append('price',price)
        formDATA.append('offerprice',offerprice)
        formDATA.append('offertype',offertype)
        picture.file.map((item,i)=>{
            formDATA.append('picture'+i,item)
        })
        // alert(formDATA)
        var result= await postData('productdetails/add_productdetails',formDATA)
        if(result.status){
            Swal.fire({
                icon:'success',
                title:'Product Sub Name Register',
                text:result.message
            })
        }

        else{
            Swal.fire({
                icon:'error',
                title:"Product Sub Name Register",
                text:result.message
            })
        }
        
         }
    }



///////End of Submit Button//////////
 

    return (
        <div className={classes.productdetails_root}>
            <div className={classes.productdetails_display_box}>

                <Grid container spacing={2}>  
                    <Grid xs={12} item>
                        <TitleComponent title="Product Details" link="/admindashboard/displayallproductdetails"/>
                    </Grid>

                    <Grid xs={3} item>
                        <FormControl fullWidth>
                            <InputLabel>Brands</InputLabel>
                            <Select
                            error={errorMessage.brandname} onFocus={()=>handleError('','brandname')} value={brandId} 
                            onChange={handleChangeBrand}>
                                {fillBrands()}
                            </Select>
                            <FormHelperText style={{color:'#d32f2f'}}>  {errorMessage.brandname}</FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid xs={3} item>
                        <FormControl fullWidth>
                            <InputLabel>Category</InputLabel>
                            <Select error={errorMessage.categoryname} onFocus={()=>handleError('','categoryname')} value={categoryId}  onChange={handleChangeCategory} >
                                {fillCategory()}
                            </Select>
                            <FormHelperText style={{color:'#d32f2f'}}> {errorMessage.categoryname}</FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid xs={3} item>
                        <FormControl fullWidth>
                            <InputLabel>SubCategory</InputLabel>
                            <Select error={errorMessage.subcategoryname} onFocus={()=>handleError('','subcategoryname')} value={subCategoryId} onChange={handleChangeSubCategory} >
                                {fillSubCategory()}
                            </Select>
                            <FormHelperText style={{color:'#d32f2f'}}> {errorMessage.subcategoryname}</FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid xs={3} item>
                        <FormControl fullWidth>
                            <InputLabel>Product</InputLabel>
                            <Select error={errorMessage.productname} onFocus={()=>handleError('','productname')} 
                            value={productId} onChange={(event)=>setProductId(event.target.value)} >
                                {fillProducts()}
                            </Select>
                            <FormHelperText style={{color:'#d32f2f'}}> 
                            {errorMessage.productname}</FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid xs={12} item>
                        <TextField helperText={errorMessage.productsubname} error={errorMessage.productsubname}
                        onFocus={()=>handleError('','productsubname')} onChange={(event)=>setProductSubName(event.target.value)} label='Product Sub Name' fullWidth />
                    </Grid>

                    <Grid xs={12} item>
                        <ReactQuill theme="snow" value={description} onChange={setDescription}/>
                        {/* <TextField error={errorMessage.description} helperText={errorMessage.description} onFocus={()=>handleError('','description')} onChange={(event)=>setDescription(event.target.value)} label='Description' fullWidth /> */}
                    </Grid>

                    <Grid xs={3} item>
                        <TextField error={errorMessage.weight} helperText={errorMessage.weight}
                        onFocus={()=>handleError('','weight')} onChange={(event)=>setWeight(event.target.value)} label='Weight' fullWidth />
                    </Grid>

                    <Grid xs={3} item>
                        <TextField error={errorMessage.weighttype} helperText={errorMessage.weighttype} onFocus={()=>handleError('','weighttype')} onChange={(event)=>setWeightType(event.target.value)} label='Weight Type' fullWidth />
                    </Grid>

                    <Grid xs={3} item>
                        <FormControl fullWidth>
                            <InputLabel>Packaging</InputLabel>
                            <Select error={errorMessage.packaging} onFocus={()=>handleError('','packaging')}  onChange={(event)=>setPackaging(event.target.value)} label="Packaging" >
                                <MenuItem value={"Box"}>Box</MenuItem>
                                <MenuItem value={"Bottle"}>Bottle</MenuItem>
                                <MenuItem value={"Cartoon"}>Cartoon</MenuItem>

                            </Select>
                            <FormHelperText style={{color:'#d32f2f'}}> 
                            {errorMessage.packaging}</FormHelperText>
                        </FormControl>
                    
                    </Grid>

                    <Grid xs={3} item>
                        <TextField error={errorMessage.qty} helperText={errorMessage.qty} onFocus={()=>handleError('','qty')} onChange={(event)=>setQty(event.target.value)} label='Quantity' fullWidth />
                    </Grid>

                    <Grid xs={4} item>
                        <TextField error={errorMessage.price} helperText={errorMessage.price} onFocus={()=>handleError('','price')} onChange={(event)=>setPrice(event.target.value)} label='Price' fullWidth />
                    </Grid>

                    <Grid xs={4} item>
                        <TextField error={errorMessage.offerprice} helperText={errorMessage.offerprice} onFocus={()=>handleError('','offerprice')}  onChange={(event)=>setOfferPrice(event.target.value)} label='Offer Price' fullWidth />
                    </Grid>

                    <Grid xs={4} item>
                        <FormControl fullWidth>
                            <InputLabel>Offer Type</InputLabel>
                            <Select error={errorMessage.offertype} onChange={(event)=>setOfferType(event.target.value)} label="Offer Type" >
                                <MenuItem value={'Month End Sale'}> Month End Sale</MenuItem>
                                <MenuItem value={"Festival Sale"}>Festival Sale</MenuItem>
                                <MenuItem value={"Big Billion Days Sale"}>Big Billion Days Sale</MenuItem>
                                

                            </Select>
                            <FormHelperText style={{color:'#d32f2f'}}> 
                            {errorMessage.offertype}</FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid xs={6} item className={classes.center}>
                    <div style={{display:'flex',flexDirection:'column'}}>
                        
                        <Button onClick={()=>handleError('','picture')} component='label' variant="contained"> 
                        Picture
                        <input onChange={handlePictureChange}  type="file" accept="image/*" multiple hidden/>
                        </Button>
                        {errorMessage.picture==undefined?<div></div>:errorMessage.picture?<div style={{fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
                            fontWeight: 400,
                            color:' #d32f2f',
                            fontSize: "0.75rem",
                            lineHeight: 1.66,
                            letterSpacing: "0.03333em",
                            textAlign: "left",
                            marginTop: "3px",
                            marginRight: "14px",
                            marginBottom: "0",
                            marginLeft: "14px"}}>Pls Select Picture</div>:<div></div>}
                                                    </div>
                    </Grid>

                    <Grid  xs={6} item className={classes.center}> 
                        {showImages()}
                    </Grid>

                    <Grid xs={6} item>
                        <Button fullWidth variant="contained" onClick={handleSubmit}>Submit</Button>
                    </Grid>
                    
                    <Grid xs={6} item> 
                        <Button fullWidth variant="contained">Reset</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}