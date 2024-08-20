import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function SearchBarComponent(props){
    var navigate=useNavigate();
    const [pattern,setPattern]=useState('')
    const handleGotoFilterScreen=()=>{
        navigate(`/filterscreen/${pattern}`)
    }

    const handleEnter=(e)=>{
        if(e.key=='Enter'){
            navigate(`/filterscreen/${pattern}`)
        }
    }
    return (
    <div style={{width:props.parentWidth,display:'flex',justifyContent:'space-between',background:'#fff',
    height:43,borderRadius:20,paddingLeft:15,}}>
   <input onKeyUp={handleEnter} onChange={(e)=>setPattern(e.target.value)} type="text" placeholder='Search items and brands..' 
   style={{fontSize:13,color:'#636e72',border:0,outline:'none',width:props.width,height:32,margin:3}} />
   <SearchOutlinedIcon onClick={handleGotoFilterScreen} style={{padding:6,color:'#000',fontSize:33,cursor:'pointer'}}/>    
    </div>)
}