import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from '../../services/FetchNodeServices';

export default function SliderComponent(props) {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:'true',
        arrows:false
      };
      var image=props.images
      const showImages=()=>{
        return image?.map((item)=>{
          return <div>
          <img src={`${serverURL}/images/${item}`} alt='Solar' style={{width:'100%',cursor:'pointer'}} /></div>
        })
      }
  return (
    <div style={{width:'100%'}}>
      <Slider {...settings}>
      {showImages()}
    </Slider>
    </div>
  )
}
