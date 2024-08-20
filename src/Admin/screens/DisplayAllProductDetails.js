import MaterialTable from "@material-table/core"
import { useMyStyles } from "../css/CategoryCss"
import { getData,postData,serverURL } from "../../services/FetchNodeServices"
import { FormHelperText, FormControl, InputLabel,Dialog,DialogContent, DialogActions, Button, MenuItem, Select } from "@mui/material"
import {Grid,TextField,Avatar} from "@mui/material"
import TitleComponent from "../components/TitleComponent"
import Swal from "sweetalert2"
import { useEffect, useState } from "react"
import { useNavigate} from "react-router-dom";
export default function DisplayAllProduct(){
    const classes=useMyStyles();
    const navigate=useNavigate();
    const [categoryList,setCategoryList]=useState([])
    const [brandList,setBrandList]=useState([])
    const [subCategoryList,setSubCategoryList]=useState([])
    const [productList,setProductList]=useState([])
    const [open,setOpen]=useState(false)
    const [brandId,setBrandId]=useState('')
    const [description,setDescription]=useState('')
    const [productName,setProductName]=useState('')
    const [productSubName,setProductSubName]=useState('')
    const [weight,setWeight]=useState('')
    const [weightType,setWeightType]=useState('');
    const [packaging,setPackaging]=useState('')
    const [qty,setQty]=useState('')
    const [price,setPrice]=useState('');
    const [offerPrice,setOfferPrice]=useState('');
    const [offerType,setOfferType]=useState('');
    const [categoryId,setCategoryId]=useState('')
    const [subCategoryId,setSubCategoryId]=useState('')
    const [productId,setProductId]=useState('')
    const [productDetailId,setProductDetailId]=useState('')
    const [picture,setPicture]=useState('')
    const [errorMessage,setErrorMessage]=useState({})
    const [btnStatus,setBtnStatus]=useState(false)
    const [oldPicture,setOldPicture]=useState('')
    const [productDetailsList,setProductDetailsList]=useState([])
    const [picArray,setPicArray]=useState('')
    const [oldPicArry,setOldPicArry]=useState()
    const twoButtonComponent=()=>{
        return(<div>
            <Button onClick={handleEditPicture}>Save</Button>
            <Button onClick={handleCancle}>Cancel</Button>
        </div>)
    }
    useEffect(function(){
        fetchAllBrands()
    },[])
    const fetchAllProductDetails=async()=>{
        var result= await getData('productdetails/display_all_productdetails')
        setProductDetailsList(result.data)
    }
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
    const fetchAllProduct=async(pid)=>{
        var result = await postData('productdetails/display_all_productdetails_by_product',{productid:pid})
        setProductList(result.data)
    }
     const fillProduct=()=>{
        return productList?.map((item)=>{
            return <MenuItem value={item.productid}>{item.productname}</MenuItem>
        })
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
    fetchAllProductDetails()
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
            return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
        }
    })
}


const handleCancle=()=>{
    {showOld()}
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
    if(productId.length==0){
        handleError('Pls select SubCategory Name..','productname')
        error=true
    }
    if(productSubName.length==0)
    {
        handleError('Pls Fill Product Sub Name..','productsubname')
    }
   
    if(description.length==0){
        handleError('Pls Fill Discription..','description')
        error=true
    }

    if(weight.length==0)
    {
        handleError('Pls Fill Weight..','weight')
    }

    if(weightType.length==0)
    {
        handleError('Pls Fill WeightType..','weighttype')
    }
    if(packaging.length==0)
    {
        handleError('Pls Select Packaging..','packaging')
    }
    if(qty.length==0)
    {
        handleError('Pls Fill Quantity..','qty')
    }
    if(price.length==0)
    {
        handleError('Pls Fill Price..','price')
    }if(offerPrice.length==0)
    {
        handleError('Pls Fill Offer Price..','offerprice')
    }if(offerType.length==0)
    {
        handleError('Pls Select Offer Type..','offertype')
    }
    if(error==false){
        var body={'brandid':brandId,'categoryid':categoryId,'subcategoryid':subCategoryId,'productid':productId,'productsubname':productSubName,'description':description,'weight':weight, 'weighttype':weightType, 'packaging':packaging,'qty':qty,'price':price, 'offerprice':offerPrice, 'offertype':offerType,'productdetailid':productDetailId}
        var result= await postData('productdetails/edit_data',body)
       
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
        fetchAllProductDetails()
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
        var result = await postData('productdetails/delete_data',{productdetailid: rowData.productdetailid })
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
      fetchAllProductDetails()
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
      formDATA.append('productdetailid',productDetailId)
      var result = await postData('productdetails/edit_picture', formDATA)

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
    fetchAllProductDetails()
  }
   const handlePictureChange=(event)=>{
    alert({file:Object.values(event.target.files)}+"")
    if(Object.values(event.target.files).length<=4){
        Swal.fire({
            icon:'error',
            title:'Pls Upload 4 then more files',
            timer:1500,
            toast:true
        })
    }
    else{
  
    setPicture({file:Object.values(event.target.files)})
    setBtnStatus(true)

    }
    fetchAllProductDetails()
}
const handleChoose=()=>{
    if(picture.length==0){
             const showArry=()=>{
            return picArray?.split(",").map((item)=>{
            return <div><img src={`${serverURL}/images/${item }`} style={{ width: 40, height: 40, borderRadius: 5,margin:2 }} /></div>
            })
            }
            
            return showArry()
    }
    
    else{
        const showImages=()=>{
            return picture?.file?.map((item)=>{
                return(<div style={{margin:2}}><Avatar alt="Remy Sharp" src={URL.createObjectURL(item)} variant="rounded"/></div>)
            })
           
          
        }
        return showImages()
    }

    }
    const showOld=()=>{

        return picArray?.split(",").map((item)=>{
            return <div><img src={`${serverURL}/images/${item }`} style={{ width: 40, height: 40, borderRadius: 5,margin:2 }} /></div>
            })

    }
   const showProductform=()=>{
    return(<div>
        
        <Grid container spacing={2}>

                <Grid item xs={12}>
                    <TitleComponent title='Products Sub Name Register'/>
                </Grid>

                <Grid item xs={3}>
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

                <Grid item xs={3}>
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

                <Grid item xs={3}>
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

                <Grid item xs={3}>
                <FormControl fullWidth>
                    <InputLabel>Product Name</InputLabel>
                    <Select label="Product Name"  onChange={(event)=>{setProductId(event.target.value)}} value={productId} error={errorMessage.productname} onFocus={()=>handleError('','product')}>

                        <MenuItem>select Product</MenuItem>
                        {fillProduct()}
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
  marginLeft: "14px" }}>{errorMessage.productsubname}</FormHelperText>
                </FormControl>

                </Grid>
                <Grid item xs={12}>
                    <TextField label='Product Sub Name' error={errorMessage.productsubname} helperText={errorMessage.productsubname}
                    onFocus={()=>handleError('','productsubname')} onChange={(event)=>setProductSubName(event.target.value)}  value={productSubName} fullWidth/>

                </Grid>
                <Grid item xs={12}>
                    <TextField label='Description' error={errorMessage.description} helperText={errorMessage.description}
                    onFocus={()=>handleError('','description')} value={description} onChange={(event)=>setDescription(event.target.value)} fullWidth/>
                </Grid>
                <Grid item xs={3}>
                    <TextField label='Weight' error={errorMessage.weight} helperText={errorMessage.weight}
                    onFocus={()=>handleError('','weight')} value={weight} onChange={(event)=>setWeight(event.target.value)} fullWidth/>
                </Grid>

                <Grid item xs={3}>
                    <TextField label='Weight Type' error={errorMessage.weighttype} helperText={errorMessage.weighttype}
                    onFocus={()=>handleError('','weighttype')} value={weightType} onChange={(event)=>setWeightType(event.target.value)} fullWidth/>
                </Grid>

                <Grid item xs={3}>
                <FormControl fullWidth>
                            <InputLabel>Packaging</InputLabel>
                            <Select value={packaging} error={errorMessage.packaging} onFocus={()=>handleError('','packaging')}  onChange={(event)=>setPackaging(event.target.value)} label="Packaging" >
                                <MenuItem value={"Box"}>Box</MenuItem>
                                <MenuItem value={"Bottle"}>Bottle</MenuItem>
                                <MenuItem value={"Cartoon"}>Cartoon</MenuItem>

                            </Select>
                            <FormHelperText style={{color:'#d32f2f'}}> 
                            {errorMessage.packaging}</FormHelperText>
                        </FormControl>
                </Grid>

                <Grid item xs={3}>
                    <TextField label='Quantity' error={errorMessage.qty} helperText={errorMessage.qty}
                    onFocus={()=>handleError('','qty')} value={qty} onChange={(event)=>setQty(event.target.value)} fullWidth/>
                </Grid>
                <Grid item xs={4}>
                    <TextField label='Price' error={errorMessage.price} helperText={errorMessage.price}
                    onFocus={()=>handleError('','price')} value={price} onChange={(event)=>setPrice(event.target.value)} fullWidth/>
                </Grid>

                <Grid item xs={4}>
                    <TextField label='Offer Price' error={errorMessage.offerprice} helperText={errorMessage.offerPrice}
                    onFocus={()=>handleError('','offerPrice')} value={offerPrice} onChange={(event)=>setOfferPrice(event.target.value)} fullWidth/>
                </Grid>

                <Grid item xs={4}>
                <FormControl fullWidth>
                            <InputLabel>Offer Type</InputLabel>
                            <Select value={offerType} onFocus={()=>handleError('','offertype')} error={errorMessage.offertype} onChange={(event)=>setOfferType(event.target.value)} label="Offer Type" >
                                <MenuItem value={'Month End Sale'}> Month End Sale</MenuItem>
                                <MenuItem value={"Festival Sale"}>Festival Sale</MenuItem>
                                <MenuItem value={"Big Billion Days Sale"}>Big Billion Days Sale</MenuItem>
                                

                            </Select>
                            <FormHelperText style={{color:'#d32f2f'}}> 
                            {errorMessage.offertype}</FormHelperText>
                        </FormControl>
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
         {handleChoose()}
        </Grid>
        </Grid>
    </div>)
   }

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
    fetchAllProduct(rowData.productid)
    setSubCategoryId(rowData.subcategoryid)
    setCategoryId(rowData.categoryid)
    setBrandId(rowData.brandid)
    setProductId(rowData.productid)
    setProductDetailId(rowData.productdetailid)
    setProductName(rowData.productname)
    setProductSubName(rowData.productsubname)
    setPackaging(rowData.packaging)
    setDescription(rowData.description)
    setPrice(rowData.price)
    setWeight(rowData.weight)
    setWeightType(rowData.weighttype)
    setQty(rowData.qty)
    setOfferPrice(rowData.offerprice)
    setOfferType(rowData.offertype)
    // setPicture({file:`${serverURL}/images/${rowData.picture}`})
    setPicArray(rowData.picture)
    setOldPicture(`${serverURL}/images/${rowData.picture}`)
    setOpen(true)
}

function showProduct(){
    return(<div style={{fontSize:'1vw'}}>
          <MaterialTable 
        title="List of Product Details"
        columns={[
            { title: 'Brand Id/Name', render: (rowData)=><div>{rowData.brandid}/{rowData.brandname}</div>},
            { title: 'Category Id/Name', render: (rowData)=><div>{rowData.categoryid}/{rowData.categoryname}</div> },
            { title: 'SubCategory ID/Name',render: (rowData)=><div>{rowData.subcategoryid}/{rowData.subcategoryname}</div>},
            { title: 'Product ID', render: (rowData)=><div>{rowData.productid}/{rowData.productname}</div> },
            { title: 'Product SubName',render:(rowData)=><div>{rowData.productsubname}</div> },
            { title: 'Weight/Type', render: (rowData)=><div>{rowData.weight} {rowData.weighttype}</div> },
            { title: 'Package', render: (rowData)=><div style={{display:'flex',flexDirection:'column',flexWrap:'wrap'}}><div>{rowData.packaging}</div> <div>Quantity:{rowData.qty}</div> </div> },
            { title: 'Price/offerPrice', render: (rowData)=><div style={{display:'flex',flexDirection:'column',flexWrap:'wrap'}}><div>{rowData.price}/{rowData.offerprice}</div><div>{rowData.offertype}</div></div> },
            { title: 'Picture', render: (rowData) =><div style={{display:'flex',flexWrap:'wrap',width:125}}>
                {rowData.picture.split(",").map((item)=>{
                 return <div><img src={`${serverURL}/images/${item}`} style={{ width: 40, height: 40, borderRadius: 5,margin:2 }} /></div>
            })} 
            </div>}]}
        data={productDetailsList}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Product Details',
            onClick: (event, rowData) => handleDialog(rowData)
          },
          {
            icon: 'delete',
            tooltip: 'Delete Product Details',
            onClick: (event, rowData) => handleDeleteData(rowData)
          },
          {
            icon: 'add',
            isFreeAction:true,
            tooltip: 'New Brand',
            onClick: (event, rowData) =>navigate('/admindashboard/productdetails')
          }
        ]}
      /></div>
    )
}

return(<div className={classes.root}>
    <div className={classes.productdetails_display_box}>
        {showProduct()}
        {showDialog()}
     </div>
</div>)
}