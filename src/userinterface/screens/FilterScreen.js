import { useEffect, useState } from "react"
import Header from "../components/Header"
import { getData, postData } from "../../services/FetchNodeServices"
import { Grid, Box, Button, FormGroup, FormControlLabel, Checkbox } from "@mui/material"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useParams } from "react-router-dom";
import SolarProduct from "../components/SolarProduct";
import Slider from '@mui/material/Slider';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';


export default function FilterScreen() {
    const theme=useTheme();
    const matches=useMediaQuery(theme.breakpoints.down('md'));
    const [brandIdd, setBrandId] = useState('')
    const [brandList, setBrandList] = useState([])
    const [categoryId, setCategoryId] = useState('')
    const [categoryList, setCategoryList] = useState([])
    const [SubCategoryId, setSubcategoryId] = useState('')
    const [productList, setProductList] = useState([])

    const [pageRefresh, setPageRefresh] = useState(false);
    var params = useParams()
    const fetchProducts = async () => {
        // console.log("params.pattern:::",params.pattern)
        var result = await postData('userinterface/display_all_productdetails_by_filterscreen', { pattern: params.pattern })
        setProductList(result.data)
}
    const [subCategoryList, setSubcategoryList] = useState([])
    useEffect(function () {
        fetchProducts()
    }, [params.pattern])

    useEffect(function () {
        fetchbrand()
    }, [])

    const fetchbrand = async () => {
        var result = await getData('brands/display_all_brands')
        setBrandList(result.data)
    }

    const fetchCategory = async (brandid) => {
        var result = await postData('category/display_all_categories_by_brands', { brandid: brandid })
        setCategoryList(result.data)
    }
    const fetchSubCategory = async (categoryid) => {
        var result = await postData('subcategory/display_all_subcategories_by_category', { categoryid: categoryid })
        setSubcategoryList(result.data)
    }

    const handleChangeBrand = (event) => {
        setBrandId(event.target.value)
        fetchCategory(event.target.value)
    }
    const handleChangeCategory = (event) => {
        setCategoryId(event.target.value)
        fetchSubCategory(event.target.value)
    }

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
    const fillSubCategory = (event) => {
        return subCategoryList?.map((item) => {
            if (event = item.brandid) {
                return <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
            }
        })
    }


    return (<div>
        <Header />
        <div style={{ paddingLeft: 10, paddingRight: 20, marginTop: '10%' }} >
            <Grid container spacing={2}>
                
                <Grid item xs={2}>
                    <FormGroup>
                    <FormControlLabel control={<Checkbox />} label="Label" />
                    <FormControlLabel control={<Checkbox />} label="Required" />
                    <FormControlLabel control={<Checkbox />} label="Required" />
                    <FormControlLabel control={<Checkbox />} label="Required" />
                    <FormControlLabel control={<Checkbox />} label="Required" />
                    <FormControlLabel control={<Checkbox />} label="Required" />
                    <FormControlLabel control={<Checkbox />} label="Required" />
                    <FormControlLabel control={<Checkbox />} label="Required" />

                    
                    </FormGroup>
                </Grid>
                <Grid item xs={2} >
                
                {!matches?<><FormControl fullWidth>
                        <InputLabel> Brands</InputLabel>
                        <Select label="Brands" onChange={(event) => (handleChangeBrand(event))}>
                            <MenuItem>select Brand</MenuItem>
                            {fillBrand()}
                        </Select>
                    </FormControl>
                    

                    <FormControl fullWidth style={{ marginTop: "8%" }}>
                        <InputLabel>Category</InputLabel>
                        <Select label="Category" onChange={(event) => (handleChangeCategory(event))}>
                            <MenuItem>select Category</MenuItem>
                            {fillCategory()}
                        </Select>

                    </FormControl>

                    <FormControl fullWidth style={{ marginTop: "8%" }}>
                        <InputLabel>SubCategory</InputLabel>
                        <Select label="Subcategory">
                            <MenuItem>select SubCategory</MenuItem>
                            {fillSubCategory()}
                        </Select>

                    </FormControl></>:<div></div>}

                    <Box sx={{ width: '100%', marginTop: 2 }}>
                        {/* <Slider size="small" defaultValue={70} aria-label="Small" valueLabelDisplay="auto"/> */}

                        <div style={{ display: 'flex', flexDirection: 'column' }}>Price :
                            <Slider size="small" min={0} max={1000} defaultValue={1000} aria-label="Default" valueLabelDisplay="auto" />
                        </div>
                    </Box>
                </Grid>

                <Grid item xs={10} >
                    <div style={{ fontSize: '2vw', fontWeight: 'bold', marginLeft: '5%' }}>Result {params.pattern} </div>
                    <SolarProduct data={productList} setPageRefresh={setPageRefresh} />
                </Grid>

            </Grid>

        </div>
    </div>)
}

