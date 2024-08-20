import React from "react";
import Header from "../components/Header";
import { Grid } from "@mui/material";
import SignInImageComponent from "../components/SignInImageComponent";
import SignInMobile from "../components/SigninMob";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
export default function SignIn(){
const theme=useTheme();
const matches = useMediaQuery(theme.breakpoints.down('md'));
return(<div>
    <div>
    <Header/>
    </div>
  < Grid container spacing={2} >

      {!matches?<Grid item xs={7} > 
         <SignInImageComponent/>
        </Grid>:<Grid item xs={12} >
        <SignInMobile/>
    </Grid>}
   
    {matches?<></>:<Grid item xs={5} >
    <SignInMobile/>
    </Grid>}
  
    </Grid>


</div>)
}