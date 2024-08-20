import { Checkbox, Divider, Grid } from "@mui/material";
import React from "react";
import ClearIcon from "@mui/icons-material/Clear";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { serverURL } from "../../services/FetchNodeServices";
import PlusMinusComponent from "./PlusMinusComponent";
import { useDispatch, useSelector } from "react-redux";

export default function CartDetailComponent(props) {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  var dispatch = useDispatch();
  const handleChange = (v, item) => {
    if (v >= 1) {
      item["qty"] = v;
      dispatch({ type: "ADD_CART", payload: [item.productdetailid, item] });
    } else {
      dispatch({ type: "DELETE_CART", payload: [item.productdetailid] });
    }
    props.setPageRefresh(!props.pageRefresh);
  };
  var productFromRedux = useSelector((state) => state.cart);
  var product = props.data;
  const showProducts = () => {
    return product.map((item) => {
      return (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#fff",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "90%",
              height: "90%",
              display: "flex",
              flexDirection: "column",
              marginBottom: "1%",
              marginTop: "1%",
            }}
          >
            <div style={{ position: "absolute", right: "1%" }}>
              <ClearIcon />
            </div>
            <Grid container spacing={2}>
              <Grid xs={4} item>
                <img
                  src={`${serverURL}/images/${item.icon}`}
                  style={{ width: "100%", height: "70%" }}
                />
              </Grid>

              <Grid
                xs={8}
                item
                style={{ display: "flex", flexDirection: "column",fontSize:'1.2vw' }}
              >
                <div style={{ fontWeight: "bold", color: "#000" }}>
                  {item.productname}
                </div>
                <div style={{ fontWeight: "bold", color: "#000" }}>
                  {item.productsubname}
                </div>
                <div style={{ fontWeight: "bold", color: "#000" }}>
                  {item.size}
                </div>

                <div
                  style={{
                    width: "70%",
                    display: "flex",
                    fontWeight: "bold",
                    marginTop: "1%",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      color: "#30336b",
                      fontWeight: "bold",
                      fontSize: "1.4vw",
                    }}
                  >
                    &#8377;{item.offerprice}
                  </span>
                  <del
                    style={{
                      color: "grey",
                      fontWeight: "bold",
                      fontSize: "1.5vw",
                    }}
                  >
                    &#8377;{item.price}
                  </del>
                  <span>
                    &#8377;
                    {item.offerprice > 0
                      ? item.offerprice * item.qty
                      : item.price * item.qty}
                  </span>
                </div>

                <div
                  style={{ 
                    display: "flex",
                    width: "80%",
                    justifyContent:'space-betwween',
                    fontWeight: "bolder",
                    marginTop: "1%",
                    color: "#10ac84",
                  }}
                >
                  <span >You Save &#8377; {item.price - item.offerprice}</span>
                 <div style={{marginLeft:'10%'}}>
                 <PlusMinusComponent qty={item.qty}
                    view="Cart"
                    onChange={(v) => handleChange(v, item)}
                  />
                 </div>
                </div>

                <div
                  style={{
                    width: 130,
                    padding: "1%",
                    border: "1px solid #dcdde1",
                    margin: "2%",
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    {...label}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                    style={{ width: 10, height: 10 }}
                  />
                  <div> Save for later </div>
                </div>
              </Grid>
            </Grid>
            <Divider />
          </div>
        </div>
      );
    });
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {showProducts()}
    </div>
  );
}
