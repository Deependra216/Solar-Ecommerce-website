import MaterialTable from "@material-table/core"
import { useMyStyles } from "../css/CategoryCss"
import { getData,postData,serverURL } from "../../services/FetchNodeServices"
import { FormHelperText, FormControl, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions, Button, MenuItem, Select } from "@mui/material"
import {Grid,TextField,Avatar} from "@mui/material"
import TitleComponent from "../components/TitleComponent"
import Swal from "sweetalert2"
import { useEffect, useState } from "react"
import { useNavigate} from "react-router-dom";

export default function DisplayAllProduct(){
    const classes=useMyStyles()
    const navigate=useNavigate();
    const [categoryList,setCategoryList]=useState([])
    const [brandList,setBrandList]=useState([])
    const [subCategoryList,setSubCategoryList]=useState([])
    const [productList,setProductList]=useState([])
    const [open,setOpen]=useState(false)
    const [brandId,setBrandId]=useState('')
    const [description,setDescription]=useState('')
    const [productName,setProductName]=useState('')
    const [categoryId,setCategoryId]=useState('')
    const [subCategoryId,setSubCategoryId]=useState('')
    const [productId,setProductId]=useState('')
    const [picture,setPicture]=useState({bytes:'',file:'logo.png'})
    const [errorMessage,setErrorMessage]=useState({})
    const [btnStatus,setBtnStatus]=useState(false)
    const [oldPicture,setOldPicture]=useState('')
    
    const twoButtonComponent=()=>{
        return(<div>
            <Button onClick={handleEditPicture}>Save</Button>
            <Button onClick={handleCancle}>Cancel</Button>
        </div>)
    }
    useEffect(function(){
        fetchAllBrands()
    },[])
    const fetchAllProduct=async()=>{
        var result= await getData('products/display_all_products')
        setProductList(result.data)
    }
    const fetchAllBrands=async()=>{
        var result = await getData('brands/display_all_brands')
        setBrandList(result.data)
    }   
    const fetchAllCategory=async(bid)=>{
        var result=await postData('category/display_all_categories_by_brands',{brandid:bid})
        setCategoryList(result.data)
        alert(result)
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
    fetchAllSubCategory(event.target.value)
   }   
   useEffect(function(){
    fetchAllProduct()
   },[])
   const fillCategory=(event)=>{
    return categoryList?.map((item)=>{
        if(event=item.brandid){
        return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
    }
    })
}

const fillSubCategory=(event)=>{
    return subCategoryList?.map((item)=>{
        if(event=item.brandid){
            return<MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
        }
    })
}

const handleCancle=()=>{
    setPicture({bytes:'',file:oldPicture})
    setBtnStatus(false)
}

const handleError=(message,label)=>{
    setErrorMessage((prev)=>({...prev,[label]:message}))
}

const handleEditData=async()=>{
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
        handleError('Pls select SubCategory Name..','productname')
        error=true
    }

    if(description.length==0){
        handleError('Pls Fill Discription..','description')
        error=true
    }

    if(error==false){
        var body={'brandid':brandId,'categoryid':categoryId,'subcategoryid':subCategoryId,'productname':productName,'description':description,'productid':productId}
        var result= await postData('products/edit_data',body)
        alert(result)
    }
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
        fetchAllProduct()
 }
 const handleDeleteData = async(rowData)=>{
    Swal.fire({
      title: 'Are your sure to delete this category',
      text: " You  won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        var result = await postData('products/delete_data', {productid: rowData.productid })
        if (result.status) {
          Swal.fire({
            title: 'Deleted',
            text: result.message,
            icon: 'success',
            toast: true
          })
        }
        else {
          Swal.fire({
            title: "Sorry!",
            text: result.message,
            icon: "error",
            toast: true
          })
        }
      
      }
      fetchAllProduct() 
    })  
   
  }

  const handleEditPicture=async()=>{
    var error = false
    if (picture.bytes.length==0) {
      handleError('Pls select picture...', 'picture')
      error=true
    }
    if (error==false) {
      var formDATA = new FormData()//when we have picture
      formDATA.append('picture', picture.bytes)
      formDATA.append('productid',productId)
      var result = await postData('products/edit_picture', formDATA)

      if (result.status) {
        Swal.fire({
          icon: "success",
          title: "SubCategory Register",
          text: result.message,
          toast: true
        })
      }

      else {
        Swal.fire({
          icon: "error",
          title: "SubCategory Register",
          text:result.message,
          toast:true
        })
      }
    }
    fetchAllProduct()
  }
   const handlePictureChange=(event)=>{
    setPicture({bytes: event.target.files[0], file: URL.createObjectURL(event.target.files[0])})
    setBtnStatus(true)
   }

   const showProductform=()=>{
    return(<div>
        
        <Grid container spacing={2}>

                <Grid item xs={12}>
                    <TitleComponent title='Products Register'/>
                </Grid>

                <Grid item xs={4}>
                <FormControl fullWidth>
                    <InputLabel>Brands</InputLabel>
                    <Select label="Brands" onChange={(event)=>{handleChangeBrand(event)}} value={brandId} error={errorMessage.brandname} onFocus={()=>handleError('','brandname')}>

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
                    <Select label="Category" onChange={(event)=>{setCategoryId(event.target.value)}} value={categoryId} error={errorMessage.categoryname} onFocus={()=>handleError('','categoryname')}>

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
                    <Select label="SubCategory"  onChange={(event)=>{setSubCategoryId(event.target.value)}} value={subCategoryId} error={errorMessage.subcategoryname} onFocus={()=>handleError('','subcategoryname')}>

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
                    <TextField label='Product Name' error={errorMessage.productname} helperText={errorMessage.productname}
                    onFocus={()=>handleError('','productname')} onChange={(event)=>setProductName(event.target.value)}  value={productName} fullWidth/>
                    </Grid>

                <Grid item xs={12}>
                    <TextField label='Description' error={errorMessage.description} helperText={errorMessage.description}
                    onFocus={()=>handleError('','description')} value={description} onChange={(event)=>setDescription(event.target.value)} fullWidth/>
                </Grid>
                <Grid xs={6} item className={classes.center}>
                    {btnStatus?twoButtonComponent():
                    <div style={{display:'flex',flexDirection:'column'}}>
                        
                    <Button onClick={()=>handleError('','picture')} component='label' variant="contained"> 
                    upload
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
   }
                </Grid>
            
        <Grid item xs={6} className={classes.center}> 
        <Avatar alt="Brand" src={picture.file} variant='square'/>
        </Grid>
        </Grid>
    </div>)
   }

   //////////////// 
   const showDialog=()=>{
    return(
        <Dialog open={open} onClose={handleClose}> 
            <DialogContent>
                {showProductform()}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleEditData}>Edit Data</Button>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
   }
   const handleClose=()=>{
    setOpen(false)
   }
const handleDialog=(rowData)=>{
    fetchAllCategory(rowData.brandid)
    fetchAllSubCategory(rowData.categoryid)
    setSubCategoryId(rowData.subcategoryid)
    setCategoryId(rowData.categoryid)
    setBrandId(rowData.brandid)
    setProductId(rowData.productid)
    setProductName(rowData.productname)
    setDescription(rowData.description)
    setPicture({bytes:'',file:`${serverURL}/images/${rowData.picture}`})
    setOldPicture(`${serverURL}/images/${rowData.picture}`)
    setOpen(true)
}

function showProduct(){
    return(<div style={{fontSize:'1vw'}}>
          <MaterialTable
        title="List of Products"
        columns={[

          { title: 'Brand Id/Name', render: (rowData) =><div>{rowData.brandid}/{rowData.brandname}</div> },
          { title: 'Category Id/Name', render: (rowData) => <div>{rowData.categoryid}/{rowData.categoryname}</div> },
          { title: 'SubCategory ID/Name',render: (rowData) => <div>{rowData.subcategoryid}/{rowData.subcategoryname}</div>},
          { title: 'Product ID', field: 'productid' },
          { title: 'Product Name', field: 'productname' },
          { title: 'Description', field: 'description' },
          { title: 'picture', render: (rowData) => <div><img src={`${serverURL}/images/${rowData.picture}`} style={{ width: 40, height: 40, borderRadius: 5 }} /></div> }
        ]}
        data={productList}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Category',
            onClick: (event, rowData) => handleDialog(rowData)
          },
          {
            icon: 'delete',
            tooltip: 'Delete Brand',
            onClick: (event, rowData) => handleDeleteData(rowData)
          },
          {
            icon: 'add',
            isFreeAction:true,
            tooltip: 'New Brand',
            onClick: (event, rowData) =>navigate('/admindashboard/products')
          }
        ]}
      />

    </div>)
}

return(<div className={classes.root}>
    <div className={classes.products_display_box}>
        {showProduct()}
        {showDialog()}

    </div>

</div>)
}