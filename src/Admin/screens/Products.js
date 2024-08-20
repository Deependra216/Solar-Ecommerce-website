import React,{ useState,useEffect } from "react";
import { myUseStyle } from "../css/BrandCss";
import {FormHelperText,FormControl,InputLabel,Grid,TextField,Button,Avatar,Select,MenuItem} from '@mui/material'
import TitleComponent from "../components/TitleComponent";
import { getData,postData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2"


export default function Product(){
    const classes=myUseStyle()
    const [brandId,setBrandId]=useState('')
    const [subCategoryId,setSubCategoryId]=useState('')
    const [productName,setProductName]=useState('')
    const [picture,setPicture]=useState({bytes:'',file:'fake.png'})
    const [description,setDescription]=useState('')
    const [brandList,setBrandList]=useState([])
    const [categoryList,setCategoryList]=useState([])
    const [subCategoryList,setSubCategoryList]=useState([])
    const [errorMessage,setErrorMessage]=useState({})

    useEffect(function(){
        fetchAllBrands()
    },[])

    const fetchAllBrands=async()=>{
        var result = await getData('brands/display_all_brands')
        setBrandList(result.data)
    }   
    const fetchAllCategory=async(bid)=>{
        var result=await postData('category/display_all_categories_by_brands',{brandid:bid})
        setCategoryList(result.data)
    }
    const fetchAllSubCategory=async(cid)=>{
        var result = await postData('subcategory/display_all_subcategories_by_category',{categoryid:cid})
        setSubCategoryList(result.data)
    }

    const fillBrand=()=>{
        return brandList?.map((item)=>{
            return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
        })
   }
   const handleChangeBrand=(event)=>{
    setBrandId(event.target.value)
    fetchAllCategory(event.target.value)
  
   }
   
   const [categoryId,setCategoryId]= useState('')
   const handleChangeCategory=(event)=>{
    setCategoryId(event.target.value)
    fetchAllSubCategory(event.target.value)
   }


   
   const fillCategory=(event)=>{
    return categoryList?.map((item)=>{
        if(event=item.brandid){
        return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
    }
    })
}

const fillSubCategory=()=>{
    return subCategoryList?.map((item)=>{
        
            return<MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
        
    })
}

//functions ////////////////////////
const handlePictureChange=(event)=>{
    // alert(URL.createObjectURL(event.target.files[0]+""))
    setPicture({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
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
    if(productName.length==0){
        handleError('Pls select Product Name..','productname')
        error=true
    }

    if(description.length==0){
        handleError('Pls Fill Discription..','description')
        error=true
    }

    if(picture.bytes.length==0){
        handleError('Pls Select Picture..','picture')
        error=true
    }

    if(error==false){
        var formDATA=new FormData()
        formDATA.append('brandid',brandId)
        formDATA.append('categoryid',categoryId)
        formDATA.append('subcategoryid',subCategoryId)
        formDATA.append('productname',productName)
        formDATA.append('description',description)
        formDATA.append('picture',picture.bytes)
        var result= await postData('products/add_products',formDATA)
        
        if(result.status){
            Swal.fire({
                icon:'success',
                title:'Product Register',
                text:result.message
            })
        }

        else{
            Swal.fire({
                icon:'error',
                title:"Product Register",
                text:result.message
            })
        }
        
        }
    }


//////return///////
    return(<div className={classes.root}>
        <div className={classes.box}>
            <Grid container spacing={2}>

                <Grid item xs={12}>
                    <TitleComponent title='Products Register'link="/admindashboard/displayallproducts" />
                </Grid>

                <Grid item xs={4}>
                <FormControl fullWidth>
                    <InputLabel>Brands</InputLabel>
                    <Select label="Brands" onChange={handleChangeBrand} 
                    value={brandId} error={errorMessage.brandname} onFocus={()=>handleError('','brandname')}>

                        <MenuItem>select Brand</MenuItem>
                        {fillBrand()}
                    </Select>
                    <FormHelperText style={{fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
  fontWeight: 400,
  color:' #d32f2f',
  fontSize: "0.75rem",
  lineHeight: 1.66,
  letterSpacing: "0.03333em",
  textAlign: "left",
  marginTop: "3px",
  marginRight: "14px",
  marginBottom: "0",
  marginLeft: "14px" }}>{errorMessage.brandname}</FormHelperText>
                </FormControl>

                </Grid>

                <Grid item xs={4}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select label="Category" onChange={handleChangeCategory} 
                    value={categoryId} error={errorMessage.categoryname} 
                    onFocus={()=>handleError('','categoryname')}>

                        <MenuItem>select Category</MenuItem>
                        {fillCategory()}
                    </Select>
                    <FormHelperText style={{fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
  fontWeight: 400,
  color:' #d32f2f',
  fontSize: "0.75rem",
  lineHeight: 1.66,
  letterSpacing: "0.03333em",
  textAlign: "left",
  marginTop: "3px",
  marginRight: "14px",
  marginBottom: "0",
  marginLeft: "14px" }}>{errorMessage.categoryname}</FormHelperText>
                </FormControl>

                </Grid>

                <Grid item xs={4}>
                <FormControl fullWidth>
                    <InputLabel>SubCategory</InputLabel>
                    <Select label="SubCategory"  
                    onChange={(event)=>{setSubCategoryId(event.target.value)}} 
                    value={subCategoryId} error={errorMessage.subcategoryname} 
                    onFocus={()=>handleError('','subcategoryname')}>

                        <MenuItem>select Category</MenuItem>
                        {fillSubCategory()}
                    </Select>
                    <FormHelperText style={{fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
  fontWeight: 400,
  color:' #d32f2f',
  fontSize: "0.75rem",
  lineHeight: 1.66,
  letterSpacing: "0.03333em",
  textAlign: "left",
  marginTop: "3px",
  marginRight: "14px",
  marginBottom: "0",
  marginLeft: "14px" }}>{errorMessage.subcategoryname}</FormHelperText>
                </FormControl>

                </Grid>
                <Grid item xs={12}>
                    <TextField label='Product Name' error={errorMessage.productname} 
                    helperText={errorMessage.productname}
                    onFocus={()=>handleError('','productname')} 
                    onChange={(event)=>setProductName(event.target.value)} fullWidth/>

                </Grid>
                <Grid item xs={12}>
                    <TextField label='Description' error={errorMessage.description} helperText={errorMessage.description}
                    onFocus={()=>handleError('','description')} onChange={(event)=>setDescription(event.target.value)} fullWidth/>
                </Grid>
                <Grid xs={6} item className={classes.center}>
                    <div style={{display:'flex',flexDirection:'column'}}>
                        
                    <Button onClick={()=>handleError('','icon')} component='label' variant="contained"> 
                    Picture
                    <input  onChange={handlePictureChange}  type="file"  accept="image/*" multiple hidden/>
                    </Button>
                    {errorMessage.picture==undefined?<div></div>:errorMessage.picture?<div  style={{fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
  fontWeight: 400,
  color:' #d32f2f',
  fontSize: "0.75rem",
  lineHeight: 1.66,
  letterSpacing: "0.03333em",
  textAlign: "left",
  marginTop: "3px",
  marginRight: "14px",
  marginBottom: "0",
  marginLeft: "14px" }}>
                        Pls select picture...</div>:<div></div>}
                        </div>
                </Grid>
            
        <Grid item xs={6} className={classes.center}> 
            <Avatar alt="Brand" src={picture.file} variant='square'/>
        </Grid>

        <Grid item xs={6}>
                <Button fullWidth variant="contained" onClick={handleSubmit}>Submit
                </Button>
            </Grid>
            <Grid item xs={6}> 
            <Button fullWidth variant="contained">Reset</Button>
            </Grid>

            </Grid>
            

        </div>

    </div>)

}