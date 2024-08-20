import { makeStyles } from "@mui/styles";
const useMyStyles=makeStyles({
    root:{
        width:'100%',
        height:'auto',
        background: '#f5f6fa',
        fontFamily:'Poppins',
        alignItems:'center',
        justifyContent:'center',
        display:'flex',
        
    },
    cbox:{
        width:550,
        height:'auto',
        borderRadius:12,
        background:'#fff',
        padding:25,
    },
    banner_box:{
        width:600,
        height:'auto',
        borderRadius:12,
        background:'#fff',
        padding:25,
    },

    display_box:{
        width:800,
        height:'auto',
        borderRadius:12,
        background:'#fff',      
        marginLeft:1,
        padding:10
    },
    subCat_display_box:{
        width:900,
        height:'auto',
        borderRadius:12,
        background:'#fff',      
        marginLeft:2,
        padding:20
    },
    products_display_box:{
        width:800,
        height:'auto',
        borderRadius:10,
        background:'#fff',      
        marginLeft:2,
        padding:15
    },
    productdetails_root:{
        width:'100%',
        height:'85vh',
        background: '#f5f6fa',
        fontFamily:'Poppins',
        alignItems:'center',
        justifyContent:'center',
        display:'flex',
      },
    productdetails_display_box:{
        width:'100%',
        height:'auto',
        borderRadius:12,
        background:'#fff',      
        marginLeft:2,
        padding:15
    },
    center:{
        display:'flex',
        justifyContent:'center',
        width:35
    }
})

export {useMyStyles}