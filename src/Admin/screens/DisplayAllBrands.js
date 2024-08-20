import MaterialTable from "@material-table/core"
import { myUseStyle } from "../css/BrandCss";
import { getData, serverURL } from "../../services/FetchNodeServices";
import { useState,useEffect } from "react";
import { Dialog,DialogContent,DialogActions, Button } from "@mui/material";
import TitleComponent from "../components/TitleComponent";  
import { postData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";
import {Grid,TextField,Avatar} from "@mui/material";
import { useNavigate} from "react-router-dom";

function DisplayAllBrands(){
    const classes=myUseStyle();
    const navigate=useNavigate()
    const [brandList,setBrandList]=useState([])
    const [status,setStatus]=useState(false)
////////////Edit and Delete Brands///////////////
const [brandId,setBrandId]=useState('')
const [brandName,setBrandName]=useState('');
const [icon,setIcon]=useState({bytes:'',file:'logo.png'});
const [errorMessage,setErrorMessage]=useState('');
const [btnStatus,setBtnStatus]=useState(false);
const [oldPicture,setOldPicture]=useState('');
const twoButtonComponent=()=>{
  return (<div>
    <Button onClick={handleEditIcon}>Save</Button>
    <Button onClick={handleCancel} >Cancel</Button>
  </div>)
}

const handleCancel=()=>{
  setIcon({bytes:'',file:oldPicture})
  setBtnStatus(false)
}
// for handling error
    const handleError=(message,label)=>{
        setErrorMessage((prev)=>({...prev,[label]:message}))
    }

const handleEditData=async()=>{
  var error=false;
  console.log(errorMessage)
    if(brandName.length==0)
      {
         handleError("Pls Input Brand Name",'brandname')
          // setErrorMessage({...errorMessage,brandname:''});
          error=true;
      }

 if(error==false){
    var body={'brandname':brandName,'brandid':brandId}
    var result=await postData('brands/edit_data',body)
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
fetchAllBrands()
}

//handle editIcon//
const handleEditIcon=async()=>{
  var error=false;
  if(icon.bytes.length==0)
        {
            handleError("PLs Select Icon...",'icon')
            error=true
        }

 if(error==false){
  var formData=new FormData
    formData.append('icon',icon.bytes)
    formData.append('brandid',brandId)
    var result=await postData('brands/edit_icon',formData)
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
fetchAllBrands()
}
//////////handle editIcon////////

//////////handle delete data//////

const handleDeleteData=async(rowData)=>{
  Swal.fire({
    title: "Are you sure to delete this brand??",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
    toast:true
  }).then(async(result) => {
    if (result.isConfirmed) {
      var result=await postData('brands/delete_data',{brandid:rowData.brandid})
      if(result.status){
        Swal.fire({
        title: "Deleted!",
        text: result.message,
        icon: "success"
      });
    }
      else{
        Swal.fire({
        title: "Sorry!",
        text: result.message,
        icon: "error"
      });
    } 
    fetchAllBrands()
    }
    
  });
  
}
//////////handle delete data//////

const handleIconChange=(event)=>{
        // alert(URL.createObjectURL(event.target.files[0])+"")
        setIcon({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
        setBtnStatus(true)
  }


const showBrandsForm=()=>{
  return(
    <div>
        <Grid container spacing={2}>
            <Grid xs={12} item>
                <TitleComponent title='Edit Brands '/>
            </Grid>

            <Grid item xs={12}>
                <TextField value={brandName} error={errorMessage.brandname} helperText={errorMessage.brandname} onFocus={()=>handleError('','brandname')} onChange={(event)=>setBrandName(event.target.value)} fullWidth label="Brand Name"></TextField>
            </Grid>

            <Grid item xs={6} className={classes.center}>
                {btnStatus?twoButtonComponent():
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
                </div>}
            </Grid>

            <Grid item xs={6} className={classes.center}>
                <Avatar src={icon.file} alt="Brand" variant="rounded" />
            </Grid>
        </Grid>
    </div>)
 }
////////////Edit and Delete Brands///////////////
    const fetchAllBrands=async()=>{
      var result= await getData('brands/display_all_brands',)
        setBrandList(result.data)
    }
    useEffect(function(){
      fetchAllBrands()

    },[])
///////Dialog Box//////////////
    const showDialog=()=>{
      return (
        <Dialog open={status} onClose={handleClose}>
           <DialogContent>{showBrandsForm()}</DialogContent>
          <DialogActions>
          <Button onClick={handleEditData}>Edit Data</Button>
            <Button onClick={handleClose}>close</Button>
          </DialogActions>
        </Dialog>
      )
    }
const handleClose=()=>
{
  setStatus(false)
}

const handleDialog=(rowData)=>
{
  setBrandId(rowData.brandid) 
  setBrandName(rowData.brandname)
  setIcon({bytes:'',file:`${serverURL}/images/${rowData.icon}`})
  setOldPicture(`${serverURL}/images/${rowData.icon}`)
  setStatus(true)
}


//////////Dialog Box/////////////////////
  function showBrands() {
        return (
          <MaterialTable 
            title="List of Brands"
            columns={[
              { title: 'Brand ID', field: 'brandid' },
              { title: 'Brand Name', field: 'brandname' },
              { title: 'Icon', render:(rowData)=><div><img src={`${serverURL}/images/${rowData.icon}`}  style={{width:80,height:55}} /></div>},
            ]}
            data={brandList}  
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Brand',
                onClick: (rowData) => handleDialog(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete Brand',
                onClick: (event, rowData) =>handleDeleteData(rowData)
              },
              {
                icon: 'add',
                isFreeAction:true,
                tooltip: 'New Brand',
                onClick: (event, rowData) =>navigate('/admindashboard/brands')
              }
            ]}
          />
        )
      }
return (
    <div className={classes.root}>
        <div className={classes.dispay_box}>
            {showBrands()}
            {showDialog()}
        </div>
    </div>
)}
export default DisplayAllBrands