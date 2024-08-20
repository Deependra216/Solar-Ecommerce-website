import { Grid, } from "@mui/material"
import {Divider} from "@mui/material"
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PlusMinusComponent from "./PlusMinusComponent";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
export default function ProductdetailComponent(props)
{ 
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  var dispatch=useDispatch();
  var productFromRedux=useSelector(state=>state.cart)

  const items=props.myData
    // console.log("productss",items)
  const handleChange=(v,item)=>{
    
    if(v>=1){
      item['qty']=v
      dispatch({type:'ADD_CART',payload:[item.productdetailid,item]})
      
    }
    else{
      dispatch({type:'DELETE_CART',payload:[item.productdetailid]})

    }
    props.setPageRefresh(!props.pageRefresh)
  }  
  const showItems=()=>{
    return (      
    <div style={{fontWeight:'bold', width:'100%',margin:'1%',letterSpacing:1,textAlign:'center'}}>
      <div style={{display:'flex', justifyContent:'center',fontWeight:'bolder', alignItems:'center',fontSize:matches?"2vw":'1.1vw',margin:'2%'}}>
         {items?.productname}
        </div>
        <div style={{display:'flex',justifyContent:'center', alignItems:'center',fontSize:matches?"2vw":'1vw',margin:'2%'}}>
          {items?.productsubname}
          </div>
        <Divider/>
          <div style={{display:'flex',alignItems:'center',fontSize:matches?"2vw":'0.8vw',textDecorationLine: 'line-through'}}>
              M.R.P : <CurrencyRupeeIcon style={{fontSize:matches?"2vw":'0.9vw'}}/>{items?.price}
          </div>
        <div style={{display:'flex',alignItems:'center',fontSize:matches?"2vw":'1vw',color:'#3867d6'}}>
          Price : <CurrencyRupeeIcon style={{fontSize:matches?"2vw":'0.9vw'}}/>{items?.offerprice}</div> 
        <div style={{display:'flex',alignItems:'center',fontSize:matches?"2vw":'0.8vw'}}>
          Save : <CurrencyRupeeIcon style={{fontSize:matches?"2vw":'0.9vw'}}/>{items?.price-items?.offerprice}</div> 
        <div style={{display:'flex',alignItems:'center',fontSize:matches?"2vw":'0.7vw'}}>Inclusive of all taxes</div>
        
        <div style={{display:'flex',fontSize:matches?"2w":'1.5vw',margin:'2%'}}>
        <PlusMinusComponent view='' qty={productFromRedux[items.productdetailid]==undefined?0:productFromRedux[items.productdetailid].qty} onChange={(v)=>handleChange(v,items)}/>
        
        </div>
        <Divider/>
        <div style={{display:'flex',alignItems:'center',fontSize:matches?"2vw":'1.2vw',margin:'2%'}}>
          <LocalOfferIcon style={{fontSize:'large'}}/>
	          Offer available for you
        </div>
        <div style={{display:'flex',alignItems:'center',fontSize:matches?"2vw":'0.9vw',marginBottom:'1%'}}>
          {items?.OA}
        </div>
        <Divider/>
        <div style={{display:'flex',alignItems:'center',fontSize:matches?"2vw":'0.8vw',marginTop:'2%'}}>
          Brand : {items?.brandname}
        </div>
        <div style={{display:'flex',alignItems:'center',fontSize:matches?"2vw":'0.8vw'}}>
          Product Code : {items?.productdetailid}
        </div>
        <div style={{display:'flex',alignItems:'center',fontSize:matches?"2vw":'0.8vw'}}>
          Seller : PS-SOFTECH Corpration
        </div> 
      
        </div>
        )
  
}
    return( <div style={{ width:'100%',display:'flex',flexDirection:'column',alignItems:'center'}}>
      <Grid container spacing={2}>
         <Grid item xs={12} >
          {showItems()}
         </Grid>
         </Grid>
        </div>
 )
}