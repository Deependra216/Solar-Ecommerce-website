import MaterialTable from "@material-table/core"
import { myUseStyle } from "../css/BrandCss"
import { getData,serverURL } from "../../services/FetchNodeServices"
import { useState,useEffect } from "react"
import { Dialog,DialogContent,DialogActions,Button } from "@mui/material"
import { FormControl,FormHelperText,MenuItem,InputLabel,Select,Grid,TextField,Avatar } from "@mui/material"
import TitleComponent from "../components/TitleComponent"
import { postData } from "../../services/FetchNodeServices"
import Swal  from "sweetalert2"
import { useNavigate } from "react-router-dom"
 
export default function DisplayAllCategoryy(){

      const classes=myUseStyle();
      const navigate=useNavigate();
      const [categoryList,setCategoryList]=useState([]);
      const [status,setStatus]=useState(false);
      const [brandId,setBrandId]=useState('');
      const [categoryId,setCategoryId]=useState('');
      const [categoryName,setCategoryName]=useState('');
      const [icon,setIcon]=useState({bytes:'',file:'fake.png'});
      const [errorMessage,setErrorMessage]=useState({});
      const [btnStatus,setBtnStatus]=useState(false);
      const [oldPicture,setOldPicture]=useState('');
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

      const twoButtonComponent=()=>{
        return(<div>
          <Button onClick={handleEditIcon} >Save</Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </div>)
      }
      const handleEditIcon=async()=>{
        var error=false;
        if(icon.bytes.length==0)
              {
                  handleError("PLs Select Icon...",'icon')
                  error=true
              }
              
 if(error==false){
  var formData=new FormData()
    formData.append('icon',icon.bytes)
    formData.append('categoryid',categoryId)
    var result=await postData('category/edit_icon',formData)
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
fetchAllCategory()
}
      
      const handleCancel=()=>{
        setIcon({bytes:'',file:oldPicture})
        setBtnStatus(false)
      }
       const handleError=(message,label)=>{
        setErrorMessage((prev)=>({...prev,[label]:message}))
      }
      const handleEditData=async()=>{
        var error=false
        if(brandId.length==0){
          handleError("Pls input Brand ID..",'brandname')
          error=true
         }

        if(categoryName.length==0){
          handleError('Pls input Category Name..','categoryname')
          error=true
        }

        if(error==false){
          var body={'brandid':brandId,'categoryname':categoryName,'categoryid':categoryId}
          var result=await postData('category/edit_data',body)
          if(result.status){
            Swal.fire({
              icon:'success',
              title:'Category Register',
              text:result.message,
              toast:true
            });
          }
          else{
              Swal.fire({
                icon:'error',
                title:'Category Register',
                text:result.message,
                toast:true
              });
            }
        }
        fetchAllCategory()
      }

      const handleDeleteData=async(rowData)=>{
        Swal.fire({
          title:'Are your sure to delete this category',
          text:" You  won't be able to revert this!",
          icon:"warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then(async(result)=>{
          if(result.isConfirmed){
            var result=await postData('category/delete_data',{categoryid:rowData.categoryid})
            if(result.status){
              Swal.fire({
                title:'Deleted',
                text:result.message,
                icon:'success',
                toast:true
              })
            }
            else{
              Swal.fire({
              title: "Sorry!",
                text: result.message,
                icon: "error",
                toast:true
              })
            }
      fetchAllCategory()
          }
        })
      }

      const handleIconChange=(event)=>{
        setIcon({bytes:event.target.files[0],file:URL.createObjectURL(event.target.files[0])})
        setBtnStatus(true)
      }


      const showCategoryForm=()=>{
        return(
          <div>
            <Grid container spacing={2} >
            <Grid item xs={12}>
                <TitleComponent title="Category Register"/>
            </Grid>

            <Grid item xs={12}>
                <FormControl fullWidth>
                        <InputLabel>Brands</InputLabel>
                        <Select
                        label="Brands"
                        onChange={(e)=>setBrandId(e.target.value)}
                        value={brandId}
                        error={errorMessage.brandId}
                        helperText={errorMessage.brandId} 
                        onFocus={()=>handleError('','brandId')}
                        >
                       {fillBrands()}
                        </Select>
                        <FormHelperText style={{ fontWeight:400,fontFamily:"Roboto",
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


            <Grid item xs={12}>
                <TextField label='Category Name' error={errorMessage.categoryname} value={categoryName}
                helperText={errorMessage.categoryname} onFocus={()=>handleError('','categoryname')} 
                onChange={(event)=>setCategoryName(event.target.value)} fullWidth/>
            </Grid>

            <Grid xs={6} item className={classes.center}> 
            {btnStatus?twoButtonComponent():
                <div style={{display:'flex',flexDirection:'column'}}>
                <Button  onClick={()=>handleError('','icon')} component='label' variant="contained">
                    upload
                    <input  onChange={handleIconChange} type="file" accept="image/*" multiple hidden />
                </Button>
                {errorMessage.icon==undefined?<div></div>:errorMessage.icon?<div  style={{
                  fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
                  fontWeight: 400,
                  color:' #d32f2f',
                  fontSize: "0.75rem",
                  lineHeight: 1.66,
                  letterSpacing: "0.03333em",
                  textAlign: "left",
                  marginTop: "3px",
                  marginRight: "14px",
                  marginBottom: "0",
                  marginLeft: "14px" }}>Pls select icon...</div>:<div></div>}
                  </div>}
            </Grid>

            <Grid item xs={6} className={classes.center}>
                <Avatar alt="Brand" src={icon.file} variant="square"/>
            </Grid>

            </Grid>
          </div>
        )
      }
      /////////////////////////////////////////////////

      const fetchAllCategory=async()=>{
        var result=await getData('category/display_all_categories')
        setCategoryList(result.data)
      }
      useEffect(function(){
          fetchAllCategory()
      },[])
/////////////////////////Dialog//////////////////////////

const showDialog=()=>{
   return(
    <Dialog open={status} onClose={handleClose}>
      <DialogContent>
        {showCategoryForm()}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleEditData}>Edit Data</Button>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
   )
}
const handleClose=()=>{
  setStatus(false)
 }

 const handleDialog=(rowData)=>{
  setCategoryId(rowData.categoryid)
  setBrandId(rowData.brandid)
  setCategoryName(rowData.categoryname)
  setIcon({bytes:'',file:`${serverURL}/images/${rowData.icon}`})
  setOldPicture(`${serverURL}/images/${rowData.icon}`)
  setStatus(true)
 }

    function showCategory(){
        return(
            <MaterialTable
      title="List of Categories"
      columns={[
        { title: 'Category Id', field: 'categoryid' },
        { title: 'Brand Id', render:(rowData)=><div>{rowData.brandid}/{rowData.brandname}</div> },
        { title:'Category name',field:'categoryname'},
        { title: 'Icon', render:(rowData)=><div><img src={`${serverURL}/images/${rowData.icon}`} style={{width:40,height:40,borderRadius:5}}/></div>} ]}
    
      data={categoryList}    
      actions={[
        {
          icon: 'edit',
          tooltip: 'Edit Category',
          onClick: (event, rowData) => handleDialog(rowData) 
        },
        {
          icon:'delete',
          tooltip:'Delete Brand',
          onClick:(event,rowData)=>handleDeleteData(rowData)
        },
        {
          icon: 'add',
          isFreeAction:true,
          tooltip: 'New Category',
          onClick: (event, rowData) =>navigate('/admindashboard/category')
        }
      ]}
    />

        )
    }

    return(<div className={classes.root}>
            <div className={classes.display_box}>
        {showCategory()}
        {showDialog()}
</div>
    </div>)
}