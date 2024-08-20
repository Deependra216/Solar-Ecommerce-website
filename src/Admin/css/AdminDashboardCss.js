import { makeStyles } from "@mui/styles";
const useStyle=makeStyles({
    leftBarStyle:{
        margin:15,
        // padding:15,
        justifyContent:'center',
        alignItems:'center',
        display:'flex',
        flexDirection:'column'
      },
      nameStyle:{
        fontSize:'1.2rem',
        fontWeight:'700',
        

      },
      emailStyle:{
        margin: 2,
        fontSize:'0.9rem'
      },
      phoneStyle:{
        margin: 2,
        fontSize:'0.9rem'
      },
      menuStyle:{
        
        fontFamily:'Poppins'
      }
})

export {useStyle}