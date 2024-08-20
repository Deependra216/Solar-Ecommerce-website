import { serverURL } from "../../services/FetchNodeServices"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useRef } from "react";
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
export default function CategoryComponent(props)
{
    const navigate=useNavigate();
    const theme=useTheme();
    const matches=useMediaQuery(theme.breakpoints.down('md'));
    var sldr=useRef();//this is reference of pointer
    var settings = {
        dots: false,
        infinite: true,
        speed: 600,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay:'true',
        arrows:false,
      };
    var items=props.data
    const handleclick=(e)=>{
        // console.log("EEEEE:",e)
          var pattern = e.categoryid
          navigate(`/filterscreen/${pattern}`)
    }
        const showItems=()=>{
           return items.map((item)=>{
            return <div style={{display:'flex',flexDirection:'column',justifyContent:'center',
            alignItems:'center',margin:'10%'}}>

                <div style={{width:'90%',height:'90%',borderRadius:'50%',background:'#dfe4ea',display:'flex',
                justifyContent:'center',alignItems:'center'}} onClick={()=>handleclick(item)}>
                     <img src={`${serverURL}/images/${item.icon}`} style={{width:'100%',height:'100%'}}/>
                </div>

                <div style={{margin:10,fontWeight:'bolder',fontSize:'1.2vw',letterSpacing:1,textAlign:'center',width:'78%'}}>
                    {item.categoryname}
                </div>
            </div>

           })
        }
        const handleForward=()=>{
            sldr.current.slickNext()
            
        }
        const handleBack=()=>{
            sldr.current.slickPrev()
        }
return(<div style={{display:'flex',flexDirection:'column'}}>
    <div style={{margin:5,fontWeight:'bold',fontSize:'2vw'}}>{props.title}</div>
    
    <div style={{width:'100%',position:'relative',cursor:'pointer'}}>
      {!matches?<ArrowBackIosNewIcon onClick={handleBack}
       style={{cursor:'pointer',color:'grey',fontSize:'5vw',position:'absolute',left:'-8%',top:'22%',zIndex:2}}/>:<div></div>}
      <Slider ref={sldr}{...settings}>
        {showItems()}
    </Slider>
    {!matches?<ArrowForwardIosIcon onClick={handleForward} style={{cursor:'pointer',color:'grey',fontSize:'5vw',position:'absolute',right:'-5%',top:'22%',zIndex:2}}/>:<div></div>}
    </div>
    
</div>)
}