import { serverURL } from "../../services/FetchNodeServices";
import { Divider, useMediaQuery } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import PlusMinusComponent from "./PlusMinusComponent";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
export default function SolarProduct(props) {
var navigate = useNavigate();
const theme = useTheme();
const matches =useMediaQuery(theme.breakpoints.down('md'))
const showProduct = props.data
  var dispatch = useDispatch();
  var productFromRedux = useSelector(state => state.cart)
  // console.log("data from redux", productFromRedux)

  const [pageRefresh, setPageRefresh] = useState(false);
  const handleChange = (v, item) => {
    if (v >= 1) {
      item['qty'] = v
      dispatch({ type: 'ADD_CART', payload: [item.productdetailid, item] })
    }
    else {
      dispatch({ type: 'DELETE_CART', payload: [item.productdetailid] })
    }
    props.setPageRefresh(!props.pageRefresh)
  }
  const handleNextPage = (item) => {
    navigate('/productdetail', { state: { product: item } })
  }
  const showItems = () => {
    return showProduct?.map((item) => {
      return (
        <div style={{fontFamily:'poppins',cursor: 'pointer'}}>
          <div onClick={() => handleNextPage(item)}
            style={{background: '#fff',width: '280px',height: '70%',flexWrap: "wrap",display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row"}}>

            <div style={{ position: "relative" }}>
              {!matches?( <div style={{
                width: "70px",
                height: "25px", 
                background: "#f1c40f", 
                clipPath: "polygon(100% 0, 90% 48%, 100% 100%, 0% 100%, 0 51%, 0% 0%)",
                fontWeight: 'bolder',
                fontSize: '1.1vw',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'}}>

                {(((item.price - item.offerprice) / item.price) * 100).toFixed(1)}%</div>):(<div 
                style={{
                  width: "70px",
                  height: "25px",
                  background: "#f1c40f",
                  clipPath: "polygon(100% 0, 90% 48%, 100% 100%, 0% 100%, 0 51%, 0% 0%)",
                  fontWeight: 'bolder',
                  fontSize: '2.5vw',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'}}>
                {(((item.price - item.offerprice) / item.price) * 100).toFixed(1)}%</div>)}
            </div>

            <div style={{ marginLeft: 'auto' }}>
              <Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '4%' }}>
                <img src={`${serverURL}/images/${item.icon}`} style={{ width: '80%' }} />
              </div>
            </div>

            <div style={{ justifyContent: 'cneter', alignItems: 'center', display: 'flex', flexDirection: 'column', marginRight: 'auto', marginTop: '3%', width: '100%' }}>
              {!matches?(<div style={{ fontWeight: 'bold', fontSize: '1vw', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis", width: 150 }}>
                {item.productname}
              </div>):(<div style={{ fontWeight: 'bold', fontSize: '2.6vw', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis", width: 150 }}>{item.productname} </div>)}

              {!matches?(<div style={{ fontWeight: 'bold', fontSize: '1vw', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis", }}>
                {item.productsubname}
              </div>):(<div style={{ fontWeight: 'bold', fontSize: '2.7vw', whiteSpace: 'nowrap', overflow: "hidden", textOverflow: "ellipsis", }}>
                {item.productsubname}
              </div>)}


              <div style={{ fontWeight: 'bolder', marginTop: '4%' }}>
                ₹{item.offerprice} 
              <del style={{ marginLeft: '2%', color: 'red', fontWeight: 'lighter' }}>
                  ₹{item.price}
                </del>
              </div>

              <div style={{ marginTop: '3%' }}>
                {matches?(<div style={{ fontWeight: 'bolder',fontSize: '3vw', }}>
                  <span style={{ color: 'green', fontWeight: 'bolder', }}>You Save </span>
                  ₹ {item.price - item.offerprice}
                </div>):(<div style={{ fontWeight: 'bolder',fontSize: '1vw', }}>
                  <span style={{ color: 'green', fontWeight: 'bolder', }}>You Save </span>
                  ₹ {item.price - item.offerprice}
                </div>)}                
                <Divider />
              </div>
            </div>
          </div>
{/* 
          <div style={{ marginTop: '1.4%', width: '100%' }}>
            <PlusMinusComponent qty={productFromRedux[item.productdetailid] == undefined ? 0 : productFromRedux[item.productdetailid].qty} view='Card' data={item} onChange={(v) => handleChange(v, item)} />
          </div> */}
        </div>
      )
    })
  };
  return (
    <div style={{ width:'100%',display: 'flex', flexWrap: 'wrap', alignItems: 'center', marginLeft: '3%' }}>
      {showItems()}
    </div>
  );
}
