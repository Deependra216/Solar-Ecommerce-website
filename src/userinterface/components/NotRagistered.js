import React from "react";
import { useState } from "react";
import { MuiTelInput } from 'mui-tel-input'
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import {TextField} from "@mui/material";
import OtpInput from "react-otp-input";
import { postData } from "../../services/FetchNodeServices";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";


export default function NotRagistered(props){ 
  const navigate=useNavigate()
  const dispatch=useDispatch()
  const [otp, setOtp] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailid, setEmailid] = useState('');
  
const handleChkOpt=async()=>{
   if(otp==props.otp)
   {
    var body={firstname:firstName,lastname:lastName,mobileno:props.mobileno,emailid:emailid}
    var result=await postData('userinterface/submit_user',body)
    if(result.status)
    {
        dispatch({type:'ADD_USER',payload:[props.mobileno,body]})
      Swal.fire({
        icon:'success',
        title:'Solor Buddy ',
        text:result.message
    })
  }
    else
    {
      Swal.fire({
        icon:"error",
        title:"Solor Buddy",
        text: result.message,})
   }
   navigate('/signin')
  }
   else
   {
    alert('Invalid Otp')
   }
    
}

 

return(<div style={{display:'flex',width:'100%',height:'100%',paddingTop:'120px',paddingLeft:'80px'}}>
     <div style={{display:'flex',flexDirection:'column',width:'55%',height:'85%',background:'#fff',borderRadius:'32px',padding:'30px 32px 0',margin:'75px 75px 75px 75px ; ',boxShadow:'0px 0px 15px 3px rgba(0, 0, 0, .05)',position: 'relative'}}>
         

        <div>
          <div style={{fontFamily:'JioType, helvetica, arial,sans-serif',marginBottom:'.70rem',fontWeight:900,textTransform:'none',fontSize:'1.5rem',letterSpacing:'-.96',lineHeight:1}}>Welcome to SolarBuddy</div>
          <div style={{color:'grey',fontFamily:'JioType, helvetica, arial,sans-serif',fontWeight:500,textTransform:'none',fontSize:'0.875.rem',lineHeight:'1.4'}}>Please enter your details for a better shopping experience</div>
        </div>

          <div style={{alignSelf:'center',marginBottom:'8vh'}}>
          <TextField onChange={(e)=>setFirstName(e.target.value)} style={{margin:'10px'}} fullWidth id="standard-basic" label="Enter First Name*" variant="standard" />
          <TextField onChange={(e)=>setLastName(e.target.value)} style={{margin:'10px'}} fullWidth id="standard-basic" label="Enter Last Name(Optional)*" variant="standard" />
          <TextField onChange={(e)=>setEmailid(e.target.value)} style={{margin:'10px'}} fullWidth id="standard-basic" label="Enter Email Id(Optional)*" variant="standard" />
          </div>
         

        <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
            <div style={{fontFamily:'JioType, helvetica, arial,sans-serif',marginBottom:'.70rem',fontWeight:900,textTransform:'none',fontSize:'1.5rem',letterSpacing:'-.96',lineHeight:1}}>Verify Phone Number
          </div>

          <div style={{color:'grey',fontFamily:'JioType, helvetica, arial,sans-serif',fontWeight:500,textTransform:'none',fontSize:'0.6rem',lineHeight:'1.4',marginBottom:'2em'}}>
            An SMS with 4-digit OTP was sent to <b style={{color:'#000'}}>{props?.mobileno}</b> Change
          </div>
        
          <div style={{alignSelf:'center',marginBottom:'3vh'}}>
            <OtpInput value={otp} onChange={setOtp} numInputs={4} renderSeparator={<span>-</span>} 
            renderInput={(props) => <input {...props} />} 
            inputStyle={{ width: 50, height: 50,borderRadius:10,margin:5 }} />
     </div>   
         
         <div onClick={handleChkOpt} style={{display:'flex',justifyContent:'center',alignItems:'center',alignSelf:'center',width:'20vw',height:'8vh',borderRadius:'10vw',background:'#0078ad',color:'#fff',fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight: 700, textTransform: 'none',fontSize: '1rem', letterSpacing: '-.08px', lineHeight: 1.5,marginBottom:'2vh',cursor:'pointer'}}>
             Register
         </div>
         
         <div style={{    fontFamily:'JioType, helvetica, arial, sans-serif',
    fontWeight: 500,
    textTransform: 'none',
    fontSize:'0.6rem',
    letterSpacing: '-.06px',
    lineHeight: 1.3,
    color:'grey'
    }}>
         By continuing, you agree to our Terms of Service and Privacy & Legal Policy
         </div>

</div>
        
     </div>
</div>


   )
}
 