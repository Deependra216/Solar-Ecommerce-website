import React from "react";
import { useState } from "react";
import { MuiTelInput } from 'mui-tel-input'
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { postData } from "../../services/FetchNodeServices";
import { useDispatch } from "react-redux";

export default function SignInMobile()
{
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const [mobileno, setMobileno] = useState('+91')
  const [isError, setIsError] = useState(false);
  // const pattern = new RegExp(/^\d{1,10}$/);  

  const handleChange = (newValue) => {
     setMobileno(newValue)
    
}
  const handleOtp = async() => {
      var otp=parseInt(Math.random()*8999)+1000
      alert(otp)
      // alert("Mobile:"+mobileno)
      var result=await postData('userinterface/check_user_mobileno',{mobileno:mobileno})
      if(result.status)
      {
        // dispatch({type:'ADD_USER',payload:[mobileno,result.data[0]]})
        navigate("/verifyotp",{state:{mobileno:mobileno,otp:otp,user:result.data[0]}})
      }
      else
      {navigate("/notverified",{state:{mobileno:mobileno,otp:otp}})}
  }

return(
  <div style={{display:'flex',width:'100%',height:'100%',justifyContent:'center',alignItems:'center'}}>
     <div style={{display:'flex',flexDirection:'column',width:'60%',height:'60%',background:'#fff',borderRadius:'8%',padding:'64px 32px 0',margin: '35px',boxShadow:'0px 0px 15px 3px rgba(0, 0, 0, .05)',position: 'relative'}}>
 
        <div>
          <div style={{fontFamily:'JioType, helvetica, arial,sans-serif',marginBottom:'.70rem',fontWeight:900,textTransform:'none',fontSize:'2vw',letterSpacing:'-.96',lineHeight:1}}>Sign in to SolarBuddy</div>
          <div style={{color:'grey',fontFamily:'JioType, helvetica, arial,sans-serif',fontWeight:500,textTransform:'none',fontSize:'1vw',lineHeight:'1.4',marginBottom:'2em'}}>to access your Addresses, Orders & Wishlist.</div>
        </div>

          <div style={{alignSelf:'center',marginBottom:'25vh'}}>
            <MuiTelInput value={mobileno} onChange={handleChange}  />
          </div>
         
         <Button onClick={handleOtp} 
         style={{display:'flex',justifyContent:'center',alignItems:'center',alignSelf:'center',width:'20vw',height:'8vh',borderRadius:'10vw',background:'#0078ad',color:'#fff',fontFamily:'JioType, helvetica, arial, sans-serif',fontWeight: 700,
        textTransform: 'none',
        fontSize: '1rem',
        letterSpacing: '-.08px',
        lineHeight: 1.5,
        marginBottom:'2vh',cursor:'pointer'}}>
             GET OTP
         </Button>

         <div style={{    fontFamily:'JioType, helvetica, arial, sans-serif',
    fontWeight: 500,
    textTransform: 'none',
    fontSize: '.75rem',
    letterSpacing: '-.06px',
    lineHeight: 1.3,
    color:'grey'
    }}>
         By continuing, you agree to our Terms of Service and Privacy & Legal Policy
         </div>

     </div>
</div>)
}
 