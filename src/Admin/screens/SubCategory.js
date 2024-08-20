import {useState,useEffect} from 'react'
import { myUseStyle } from '../css/BrandCss'
import { FormHelperText,FormControl,InputLabel,Grid,TextField,Button,Avatar,Select,MenuItem } from "@mui/material"
import TitleComponent from "../components/TitleComponent"
import { getData, postData } from "../../services/FetchNodeServices"
import Swal from "sweetalert2"

export default function SubCategory(){
    const classes=myUseStyle()
    const [brandId,setBrandId]=useState('')
    const [categoryID,setCategoryID]=useState('')
    const [subCategoryName,setSubCategoryName]=useState('')
    const [icon,setIcon]=useState({bytes:'',file:'fake.png'})
    const [errorMessage,setErrorMessage]=useState({})
    //DD handling///
    const [brandList,setBrandList]=useState([])    
    const fetchAllBrands=async()=>{
        var result=await getData('brands/display_all_brands')
        setBrandList(result.data)
    }
    const [categoryList,setCategoryList]=useState([])
        const fetchAllCategory=async(bid)=>{
        var result = await postData('category/display_all_categories_by_brands',{brandid:bid})
            setCategoryList(result.data)
    }
    const handleChangeBrand=(event)=>{
        setBrandId(event.target.value)
        fetchAllCategory(event.target.value)
    }

    useEffect(function(){
        fetchAllBrands()
    },[])

    const fillBrands=()=>{
        return brandList?.map((item)=>{
            return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
        })
    }

    const fillCategory=()=>{
        return categoryList?.map((item)=>{
              return  <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
            
            
        })

    }
    //////function
    const handleIconChange=(event)=>{
        setIcon({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
    }

    const handleError=(message,label)=>{
        setErrorMessage((prev)=>({...prev,[label]:message}))
    }

    const handleSubmit=async()=>{
        var error=false
        if(brandId.length==0){
            handleError('Pls select Brand Name..','brandid')
            error=true
        }

        if(categoryID.length==0){
            handleError('Pls select Category Name..','categoryid')
            error=true
        }

        if(subCategoryName.length==0){
            handleError('Pls Enter SubCategory Name..','subcategoryname')
            error=true
        }
        if(icon.bytes.length==0){
            handleError('Pls Select Icon..','icon')
            error=true
        }
        if(error==false){
            var formDATA=new FormData()//When we Have picture
            formDATA.append('brandid',brandId)
            formDATA.append('categoryid',categoryID)
            formDATA.append('subcategoryname',subCategoryName)
            formDATA.append('icon',icon.bytes)
             
            var result =await postData('subcategory/add_subcategory',formDATA)

            if(result.status){
                Swal.fire({
                    icon:'success',
                    title:'Subcategory Register',
                    text:result.message
                })
            }

            else{
                Swal.fire({
                    icon:'error',
                    title:"Subcategory Register",
                    text:result.message
                })
            }
        }
    }

  
   return(<div className={classes.root}>
        <div className={classes.box}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TitleComponent title="SubCategory Register" link="/admindashboard/displayallsubcategory"/>
            </Grid>

            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel>Brands</InputLabel>
                    <Select label="Brands" onChange={handleChangeBrand} 
                    value={brandId} 
                    error={errorMessage.brandid} 
                    onFocus={()=>handleError('','brandid')}
                    >
                        <MenuItem>select Brand</MenuItem>
                        {fillBrands()}
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
  marginLeft: "14px" }}>{errorMessage.brandid}</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select label="Category" 
                    onChange={(event)=>{setCategoryID(event.target.value)}} 
                    value={categoryID} error={errorMessage.categoryid} 
                    onFocus={()=>handleError('','categoryid')}>

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
  marginLeft: "14px" }}>{errorMessage.categoryid}</FormHelperText>
                </FormControl>
            </Grid>

            <Grid item xs={12}>
                <TextField  label='SubCategory Name' 
                error={errorMessage.subcategoryname} 
                helperText={errorMessage.subcategoryname} 
                onFocus={()=>handleError('','subcategoryname')} 
                onChange={(event)=>setSubCategoryName(event.target.value)} fullWidth/>
            </Grid>
                <Grid xs={6} item className={classes.center}>
                    <div style={{display:'flex',flexDirection:'column'}}>
                        
                    <Button onClick={()=>handleError('','icon')} component='label' variant="contained"> 
                    upload
                    <input  onChange={handleIconChange}  type="file"  accept="image/*" multiple hidden/>
                    </Button>
                    {errorMessage.icon==undefined?<div></div>:errorMessage.icon?<div  style={{fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
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
                        Pls select icon...</div>:<div></div>}
                        </div>
                </Grid>
            
        <Grid item xs={6} className={classes.center}> 
        <Avatar alt="Brand" src={icon.file} variant='square'/>
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