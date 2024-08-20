import { useEffect,useState } from "react";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {Fab, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function PlusMinusComponent(props) 
{var data =props?.data
  var location = useLocation()
  var data =location?.data
  const navigate=useNavigate()
  const [value,setValue] =useState(0)
  useEffect(function(){
    setValue(props.qty)
  },[props.qty])
  
  const handlePlus=()=>{
      var v= value
      v=v+1
      setValue(v)
      props.onChange(v)

  }

  const handleMinus=()=>{
      var v=value
      if(v>=1){
          v=v-1
      setValue(v)
      props.onChange(v)

      }
  }  
  const handleBuy=()=>{

    navigate('/cart', { state: { data: data } } )
  }

  return (
    <div style={{display:'flex',width:'100%',justifyContent:"space-between"}}>
      {value==0 ?<Button onClick={handlePlus} style={{color:'#000'}} size='small' variant='text' endIcon={<AddShoppingCartIcon/>}>
        Add</Button>:
        <div style={{display:'flex',width:50,padding:"1px 8px 1px 8px",justifyContent:"space-between",alignItems:'center',flexDirection:'row',borderRadius:5,color:'#fff',background:'#000'}}>
            <div onClick={handlePlus} style={{fontWeight:'bolder',cursor:'pointer'}}>+</div>
            <div style={{fontWeight:'bolder',cursor:'pointer'}}>{value}</div>
            <div onClick={handleMinus} style={{fontWeight:'bolder',cursor:'pointer'}}>-</div>

        </div>}
        {props.view=='Cart'?<div></div>:<Button style={{color:'#fff',background:'#000',}} onClick={handleBuy}  size="small" variant="contained" >
            Buy
        </Button>}
    </div>)
}
