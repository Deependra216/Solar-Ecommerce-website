import { useNavigate } from "react-router-dom"
import logo from "../css/logo.png"
import icon from "../css/icon.png"

export default function TitleComponent(props)
{
    const navigate=useNavigate();
    return (
        <div style={{display:'flex',alignItems:'center'}}>
            <img src={logo} style={{width:50,height:50,borderRadius:5}}/>
            <div style={{fontSize:18,fontWeight:'bold',marginLeft:6}}>
                {props.title}
            </div>
            <div style={{marginLeft:'auto',cursor:'pointer'}} onClick={()=>navigate(props.link)}>
                <img src={icon} style={{width:40,borderRadius:5}} />
            </div>
        </div>
    )
}