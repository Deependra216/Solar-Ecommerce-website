import React, { useState } from 'react'
import {Fab, Button, Grid,FormControl, Select, InputLabel,  } from "@mui/material";
import { serverURL } from '../../services/FetchNodeServices';
export default function Counter() {
//     const [count, setCount]=useState(0);
//     const handldeMinus=()=>{
//         count>0?setCount(count-1):<div></div>
//     }
//   return (
//     <div>
//         <p> You clicked {count} times</p>
//         <Button variant='contained' onClick={()=>setCount(count+1)}>
//             +
//         </Button>
//         <Button variant='contained' onClick={handldeMinus}>
//             -
//         </Button>
//     </div>
//   )
return(
    <div style={{background:'red',display:'flex',width:'100%'}}>
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <div style={{border:'2px solid black', width:'55%',margin:15}}>
                    <img src={`${serverURL}/images/${'1.png'}`} style={{width:'100%',height:'100%'}} />
                    <FormControl fullWidth >
                        <InputLabel>Brands</InputLabel>
                        <Select label="Brands">
                        
                    </Select>
                    </FormControl>
                
                </div>
            </Grid>
            <Grid item xs={12}>
                <p>Hello Everyone</p>
            </Grid>
        </Grid>
    </div>
)
}
