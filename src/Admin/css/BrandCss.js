import { makeStyles } from "@mui/styles";

const myUseStyle=makeStyles({
    root:{
        width:'100%',
        height:'auto',
        background:'#f5f6fa',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        fontFamily:'Poppins'
    },
    box:{
        width:550,
        height:'auto',
        borderRadius:10,
        background:'#fff',      
        marginLeft:2,
        padding:13
        
    },
    dispay_box:{
        width:800,
        height:'auto',
        borderRadius:10,
        background:'#fff',      
        marginLeft:2,
        padding:15
        
    },
    center:{
        display:'flex',
        justifyContent:'center'
    }
})

export {myUseStyle};