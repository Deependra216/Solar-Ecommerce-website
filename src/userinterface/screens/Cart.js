import React, { useState } from "react";
import Header from "../components/Header";
import CartDetailComponent from "../components/CartDetailComponent";
import PaymentCardComponent from "../components/PaymentCardComponent";
import { useSelector } from "react-redux";

export default function Cart() {
  var products = useSelector((state) => state.cart);
  const [pageRefresh, setPageRefresh] = useState(false);
  var data = Object.values(products);
  return (
    <div style={{ fontFamily: "Poppins", width: "100%" }}>
      <Header />
      <div
        style={{
          height: "100vh",
          width: "100%",
          marginTop: "7%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "90%",display: "flex",justifyContent: "center"}}>
           
           <div style={{ width: "70%", display: "flex", flexDirection: "column"}}>
            <div style={{width: "98%", height: 'auto',display: "flex",justifyContent: "space-between",alignItems: "center",
                 background: "#fff",
                padding: "1%",
                marginBottom: "1%",
                marginTop: "1%",
              }}
            >
              <div
                style={{
                  fontWeight: "bolder",
                  fontSize: "1.5vw",
                  marginLeft: "4%",
                }}
              >
                MY CART
              </div>
              <div
                style={{ fontSize: "1vw", color: "grey", marginRight: "4%" }}
              >
                Items are reserved for 60 minutes
              </div>
            </div>
            <CartDetailComponent 
              data={data}
              pageRefresh={pageRefresh}
              setPageRefresh={setPageRefresh}
            />
          </div>
          <PaymentCardComponent data={data} />
        </div>
      </div>
    </div>
  );
}
