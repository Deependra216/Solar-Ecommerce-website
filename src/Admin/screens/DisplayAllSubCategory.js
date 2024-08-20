import MaterialTable from "@material-table/core"
import { myUseStyle } from "../css/BrandCss"
import { getData, serverURL } from "../../services/FetchNodeServices"
import { useState, useEffect } from "react"
import { FormHelperText, FormControl, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions, Button, MenuItem, Select } from "@mui/material"
import { Grid, TextField, Avatar } from "@mui/material"
import TitleComponent from "../components/TitleComponent"
import { postData } from "../../services/FetchNodeServices"
import Swal from "sweetalert2"
import { useNavigate} from "react-router-dom";


export default function DisplayAllSubCategory() {
  const classes = myUseStyle()
  const navigate=useNavigate();
  const [brandList, setBrandList] = useState([])
  const [subCategoryList, setSubCategoryList] = useState([])
  const [open, setOpen] = useState(false)
  const [brandId, setBrandId] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [subCategoryId, setSubCategoryId] = useState('')
  const [subCategoryName, setSubCategoryName] = useState('') 
  const [icon, setIcon] = useState({ bytes: '', file: "fake.png" })
  const [errorMessage, setErrorMessage] = useState({})
  const [btnStatus, setBtnStatus] = useState(false)
  const [oldPicture, setOldPicture] = useState('')

  const fetchAllBrands = async () => {
    var result = await getData('brands/display_all_brands')
    setBrandList(result.data)
  }
  useEffect(function () {
    fetchAllBrands()
  }, [])
  
  const [categoryList, setCategoryList] = useState([])
  const fetchAllCategory=async(bid)=>{
    var result = await postData('category/display_all_categories_by_brands',{brandid:bid})
        setCategoryList(result.data)
}
const handleChangeBrand=(event)=>{
    setBrandId(event.target.value)
    fetchAllCategory(event.target.value)
}

  const fetchAllSubCategory = async () => {
    var result = await getData('subcategory/display_all_subcategory')
    setSubCategoryList(result.data)
  }
  useEffect(function () {
    fetchAllSubCategory()
  }, [])


  const fillBrand = () => {
    return brandList?.map((item) => {
      return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
    })
  }

  const fillCategory = (event) => {
    return categoryList?.map((item) => {
      if (event = item.brandid) {
        return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
      }

    })

  }

  const twoButtonComponent = () => {
    return (<div>
      <Button onClick={handleEditIcon}>Save</Button>
      <Button onClick={handleCancel}>Cancel</Button>
    </div>)
  }

  const handleCancel = () => {
    setIcon({ bytes: '', file: oldPicture })
    setBtnStatus(false)
  }
  const handleError = (message, label) => {
    setErrorMessage((prev) => ({ ...prev, [label]: message }))
  }

  const handleEditData = async () => {
    var error = false
    if (brandId.length == 0) {
      handleError('Pls select Brand name..', "brandid")
      error = true
    }
    if (categoryId.length == 0) {
      handleError('Pls select Category name..', "brandid")
      error = true
    }
    if (subCategoryName.length == 0) {
      handleError('Pls Enter Subcategory..', 'subcategory')
      error = true
    }

    if (error == false) {
      var body = { 'brandid': brandId, 'categoryid': categoryId, 'subcategoryname': subCategoryName, 'subcategoryid': subCategoryId }
      var result = await postData('subcategory/edit_data', body)

    }
    if (result.status) {
      Swal.fire({
        icon: 'success',
        title: 'SubCategory Register',
        text: result.message,
        
      });
    }
    else {
      Swal.fire({
        icon: 'error',
        title: 'SubCategory Register',
        text: result.message,
        
      });
    }

    fetchAllSubCategory()
  }

  const handleDeleteData = async (rowData) => {
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
        var result = await postData('subcategory/delete_data', { subcategoryid: rowData.subcategoryid })
        if (result.status) {
          Swal.fire({
            title: 'Deleted',
            text: result.message,
            icon: 'success',
            
          })
        }
        else {
          Swal.fire({
            title: "Sorry!",
            text: result.message,
            icon: "error",
            
          })
        }
        fetchAllCategory()
      }
    })
  }

  const handleEditIcon = async () => {
    var error = false
    if (icon.bytes.length == 0) {
      handleError('Pls select icon...', 'icon')
      error = true
    }
    if (error == false) {
      var formDATA = new FormData()//when we have picture
      formDATA.append('icon', icon.bytes)
      formDATA.append('subcategoryid', subCategoryId)
      var result = await postData('subcategory/edit_icon', formDATA)

      if (result.status) {
        Swal.fire({
          icon: "success",
          title: "SubCategory Register",
          text: result.message,
        
        })
      }

      else {
        Swal.fire({
          icon: "error",
          title: "SubCategory Register",
          text: result.message,
          
        })
      }
    }
    fetchAllSubCategory()
  }

  const handleIconChange = (event) => {
    setIcon({ bytes: event.target.files[0], file: URL.createObjectURL(event.target.files[0]) })
    setBtnStatus(true)
  }

  const showSubCategoryform = () => {
    return (<div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TitleComponent title="SubCategory Register" />
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Brands</InputLabel>
            <Select label="Brands" onChange={handleChangeBrand}
             value={brandId} error={errorMessage.brandid}
              onFocus={() => handleError('', 'brandid')}>
                {fillBrand()}
            </Select>
            <FormHelperText style={{
              fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
              fontWeight: 400,
              color: ' #d32f2f',
              fontSize: "0.75rem",
              lineHeight: 1.66,
              letterSpacing: "0.03333em",
              textAlign: "left",
              marginTop: "3px",
              marginRight: "14px",
              marginBottom: "0",
              marginLeft: "14px"
            }}>{errorMessage.brandid}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select label="Category"            
            onChange={(event)=>{setCategoryId(event.target.value)}} 
            value={categoryId} error={errorMessage.categoryid} 
            onFocus={() => handleError('', 'categoryid')}>

              {fillCategory()}
            </Select>
            <FormHelperText style={{
              fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
              fontWeight: 400,
              color: ' #d32f2f',
              fontSize: "0.75rem",
              lineHeight: 1.66,
              letterSpacing: "0.03333em",
              textAlign: "left",
              marginTop: "3px",
              marginRight: "14px",
              marginBottom: "0",
              marginLeft: "14px"
            }}>{errorMessage.categoryid}</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField value={subCategoryName} label='SubCategory Name' error={errorMessage.subcategoryname} 
          helperText={errorMessage.subcategoryname} onFocus={() => handleError('', 'subcategoryname')} 
          onChange={(event) => setSubCategoryName(event.target.value)} fullWidth />
        </Grid>
        <Grid xs={6} item className={classes.center}>
        {btnStatus ? twoButtonComponent() :
          <div style={{ display: 'flex', flexDirection: 'column' }}>

            <Button onClick={() => handleError('', 'icon')} component='label' variant="contained">
              upload
              <input onChange={handleIconChange} type="file" accept="image/*" multiple hidden />
            </Button>
            {errorMessage.icon == undefined ? <div></div> : errorMessage.icon ? <div style={{
              fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
              fontWeight: 400,
              color: ' #d32f2f',
              fontSize: "0.75rem",
              lineHeight: 1.66,
              letterSpacing: "0.03333em",
              textAlign: "left",
              marginTop: "3px",
              marginRight: "14px",
              marginBottom: "0",
              marginLeft: "14px"
            }}>
              Pls select icon...</div> : <div></div>}
          </div>}
        </Grid>

        <Grid item xs={6} className={classes.center}>
          <Avatar alt="Brand" src={icon.file} variant='square' />
        </Grid>
      </Grid>

    </div>)
  }
  ////////////////////////
  const showDialog = () => {
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          {showSubCategoryform()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditData}>Edit Data</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    )
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleDialog = (rowData) => {
    fetchAllCategory(rowData.brandid)
    setCategoryId(rowData.categoryid)
    setBrandId(rowData.brandid)
    setSubCategoryId(rowData.subcategoryid)
    setSubCategoryName(rowData.subcategoryname)
    setIcon({ bytes: '', file: `${serverURL}/images/${rowData.icon}` })
    setOldPicture(`${serverURL}/images/${rowData.icon}`)
    setOpen(true)
  }

  function showSubcategory() {
    return (<div>
      <MaterialTable
        title="List of SubCategories"
        columns={[
          { title: 'SubCategory ID', field: 'subcategoryid' },
          { title: 'Brand Id/Name', render: (rowData) => <div>{rowData.brandid}/{rowData.brandname}</div> },
          { title: 'Category Id/Name', render: (rowData) => <div>{rowData.subcategoryid}/{rowData.categoryname}</div> },          
          { title: 'SubCategory Name', field: 'subcategoryname' },
          { title: 'Icon', render: (rowData) => <div><img src={`${serverURL}/images/${rowData.icon}`} style={{ width: 40, height: 40, borderRadius: 5 }} /></div> }
        ]}
        data={subCategoryList}
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
            tooltip: 'New Category',
            onClick: (event, rowData) =>navigate('/admindashboard/subcategory')
          }
        ]}
      />

    </div>)
  }

  return (<div className={classes.root}>
    <div className={classes.display_box}>
      {showSubcategory()}
      {showDialog()}
    </div>
  </div>)
}