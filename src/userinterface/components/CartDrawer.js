import Drawer from '@mui/material/Drawer';
import { List,ListItemButton,ListItemIcon,ListItemText,Divider } from '@mui/material';
import { serverURL } from '../../services/FetchNodeServices';
import CloseIcon from '@mui/icons-material/Close';
import ModeIcon from '@mui/icons-material/Mode';
import {Button} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { Add } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';

export default function CartDrawer({open,setOpen,address,userData,setAddressBoxOpen,setLabelPaymentButton})
{
   // var user=useSelector((state)=>state.user);

   var dispatch=useDispatch();
  
    useEffect(function(){
      setOpen(open)      
    },[open])

   const handleClose=()=>{
    setOpen(false)
   }
   const handleNewAddress=()=>{
    setOpen(false)
    setAddressBoxOpen(true)
   }

   const handleClick=(item)=>{
      var user={...userData,...item}
      dispatch({type:'ADD_USER',payload:[userData.mobileno,user]})
      setLabelPaymentButton('PROCEED TO PAYMENT')
      setOpen(false)

   }
   const showAddressList=()=>{
      return address?.map((item)=>{return(
         <div>      

         <div style={{borderRadius: '16px',
    padding: '20px',
    margin: 20,
    width: '80%',
    minHeight: 'auto',
    height: 'auto',
    boxShadow: '0 4px 16px rgba(0, 0, 0, .08)',
    border: '1px solid '}}
    >
    <div  style={{display:'flex',justifyContent:'space-between',fontFamily: 'JioType, helvetica, arial, sans-serif',fontWeight:'600', textTransform: 'none',fontSize: '16px',letterSpacing: '-.07px', lineHeight: 1}}>
     {userData?.firstname} {userData?.lastname}
     <DeleteIcon style={{width:'20px',}}/>
     <ModeIcon style={{width:'20px'}}/>

    </div>
    <div style={{display:'flex',flexDirection:'column'}}>
        <span style={{color:'gray', margin:3,fontFamily: 'JioType, helvetica, arial, sans-serif',fontWeight:'500', textTransform: 'none',fontSize: '.70rem',letterSpacing: '0.5px', lineHeight: 1}}>{item?.houseno}, {item?.floorno}, {item?.building} </span>
        <span style={{color:'gray',margin:3,fontFamily: 'JioType, helvetica, arial, sans-serif',fontWeight:'500', textTransform: 'none',fontSize: '.70rem',letterSpacing: '0.5px', lineHeight: 1}} >{item?.address}, {item?.landmark}</span>
        <span style={{color:'gray',margin:3,fontFamily: 'JioType, helvetica, arial, sans-serif',fontWeight:'500', textTransform: 'none',fontSize: '.70rem',letterSpacing: '0.5px', lineHeight: 1}} >{item?.pincode},{item?.city},{item?.state}</span>
        <span style={{color:'gray',margin:3,fontFamily: 'JioType, helvetica, arial, sans-serif',fontWeight:'500', textTransform: 'none',fontSize: '.70rem',letterSpacing: '0.5px', lineHeight: 1}}>{item?.mobileno}</span>
    </div>
    
    <div>
    <Button  style={{display:'flex',justifyContent:'center',alignItems:'center',alignSelf:'center',width:'22vw',height:'5vh',borderRadius:'10vw',background:'#0078ad',color:'#fff',fontFamily:'JioType, helvetica, arial, sans-serif',
    fontWeight: 700,
    textTransform: 'none',
    fontSize: '1rem',
    letterSpacing: '-.08px',
    lineHeight: 1.5,
    marginTop:'2vh',cursor:'pointer'}} onClick={()=>handleClick(item)}>
             Deliver Here
         </Button>
    </div>
    
    </div>
   
</div>
      )})
   }


     const showList=()=>{

       return(<div style={{width:'27vw'}}>

        <div style={{display:'flex',justifyContent:'space-between',margin:22}}>
        <span style={{fontFamily: 'JioType, helvetica, arial, sans-serif',fontWeight: 900, textTransform: 'none',fontSize: '1.5rem',letterSpacing: '-.72px', lineHeight: 1.1666666667}}> Select Address</span>
        <span onClick={handleClose}><CloseIcon/></span>
        </div>       
        <div style={{marginLeft:'27px',fontFamily: 'JioType, helvetica, arial, sans-serif',fontWeight: 900, textTransform: 'none',fontSize: '1.rem',letterSpacing: '-.48px', lineHeight: 1.25}}>Saved Addresses</div>
        {showAddressList()}
        
    <div onClick={handleNewAddress} style={{cursor:'pionter', marginTop:'50vh',width:'24vw',height:'6vh',border:'1px solid',borderRadius:'20px',borderColor:'#0078ad',marginTop:'50vh',marginLeft:'25px',display:'flex',justifyContent:'center',alignItems:'center'}}>
    <span style={{color:'#0c5273',margin:'1.5px'}}><Add style={{fontSize:'26px'}} /></span>
    <span style={{fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight:'bold',letterSpacing:'0.8px',color:'#0c5273'}}>Add New Address</span>
    </div>
    
    </div>)
        
     }
     

    return(<div >
   
     <Drawer  anchor='right' open={open} onClose={handleClose}>
        <List>
           {showList()}     
        </List>   
     </Drawer>
    </div>
    )
}