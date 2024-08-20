import Drawer from '@mui/material/Drawer';
import { Divider, List,ListItemButton,ListItemIcon,ListItemText } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import PaymentsIcon from '@mui/icons-material/Payments';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { serverURL } from '../../services/FetchNodeServices';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DrawerComponent({open,setOpen}){
    var options=[{text:'Your Orders',icon:<ShoppingCartCheckoutIcon/>,link:''},
                 {text:'Track Orders',icon:<LocalShippingIcon/>,link:''},
                 {text:'Payment Details',icon:<PaymentsIcon/>,link:''},
                 {text:'Return',icon:<RemoveShoppingCartIcon/>, link:''},
                 ]
    const navigate=useNavigate();

const [logStatus,setLogStatus]=useState('Login')
const handleLogStatus=()=>{
    if(logStatus=='Login')
        {
            navigate('/signIn')
        }
    else
    {   
        // dispatch({type:'DELETE_USER',})
        setLogStatus('Login')

    }
}

const handleClose=()=>{
setOpen(false)
}

    const showList=()=>{
        return options.map((item)=>{
            return <ListItemButton>
                <ListItemIcon>
                    {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text}/>
              
            </ListItemButton>
        })}
    return(<div>
        <Drawer open={open} onClose={handleClose}>
           <List>
         <ListItemButton>
            <ListItemIcon>
                <img src={`${serverURL}/images/ak.jpg`} style={{width:50,height:50}}/>
            </ListItemIcon>
            <ListItemText primary={<div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}> <span style={{fontWeight:'bold'}}>Guest User</span><span style={{fontSize:11}}>+91 9584899882</span></div>}></ListItemText>

         </ListItemButton>
         <Divider/>
           {showList()}
           <Divider/>
           <ListItemButton onClick={handleLogStatus}>
            <ListItemIcon>
                <LogoutIcon/>
            </ListItemIcon>
            <ListItemText primary={"Logout"}></ListItemText>

         </ListItemButton>
           </List>
        </Drawer>
    </div>)
}