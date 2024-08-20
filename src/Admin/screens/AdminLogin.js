import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Swal from "sweetalert2";
import { postData } from '../../services/FetchNodeServices';
import { useNavigate } from 'react-router-dom';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://sandeepsappal.in" >
        Ps-Softech Gwalior
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function AdminLogin() {
    const [emailId,setEmailId]=useState('')
    const [password,setPassword]=useState('')
    const navigate=useNavigate();

  const handleSubmit = async() => {
    var body={emailid:emailId,password:password}
     var result= await postData('admin/check_admin_password',body)
     console.log("body result",result)
    
    if(result.status)
    {
      alert("result",result)
    //  const  [password,...userData]=result.data
      localStorage.setItem('ADMIN',JSON.stringify(result.data))
        navigate('/admindashboard')
        Swal.fire({
            icon:'success',
            title:'Admin Login',
            text:result.message
        })
    }
    else
    {
        Swal.fire({
            icon:"error",
            title:"Admin Login",
            text: result.message,

        })
    }
    
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container  maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box noValidate sx={{ mt: 1 }}>
            <TextField
            style={{marginTop:10}}
              fullWidth
              label="Email Address"
              
               onChange={(event)=>setEmailId(event.target.value)}
            />
            <TextField
              style={{marginTop:10}}
              fullWidth
              
              label="Password"
              type="password"
              
           
              onChange={(event)=>setPassword(event.target.value)}
            />
            <Button

              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              Sign In
            </Button>
           
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}