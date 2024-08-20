import React, { useEffect, useState } from "react";
import { Grid, Button, Divider } from "@mui/material";
import { postData, serverURL } from "../../services/FetchNodeServices";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartDrawer from './CartDrawer'
import AddNewAddress from './AddNewAddress'
import { useLocation } from "react-router-dom";

export default function PaymentCardComponent(props) {
  var location = useLocation()
  var tata = location?.state?.data
  var pmc = location?.state?.pmc
  console.log('data data:',tata)

  var navigate = useNavigate();
  // var products = useSelector((state) => state.cart);
  // var data = Object.values(products);
  
  var user = useSelector((state) => state.user);  
  const [open,setOpen]=useState(false)
  const [address,setAddress]=useState([])
  const [addressBoxOpen,setAddressBoxOpen]=useState(false)
  const [labelPaymentButton,setLabelPaymentButton]=useState('CHECKOUT')
  var userKeys = Object.keys(user);
  var userData = Object.values(user);
  var mobileno = "";
  try {
    mobileno = userKeys[0]
  }
  catch (e) {
    console.log(e);
  }

  var data = props?.data;
 
  var totalamount = data?.reduce((p1, p2) => {
    var amt = p1 + p2.price * p2.qty;
    return amt;
  }, 0);

  var totalamountpaid = data.reduce((p1, p2) => {
    var amt =
      p1 + (p2.offerprice > 0 ? p2.offerprice * p2.qty : p2.price * p2.qty);
    return amt;
  }, 0);

  var savings = totalamount - totalamountpaid;

  ///********Payment Gateway***********/
  const options = {
    key: "rzp_test_GQ6XaPC6gMPNwH",
    amount: totalamountpaid * 100, // = INR 1
    name: "SolorBuddy",
    description: "some description",
    image: `${serverURL}/images/logo1.png`,
    handler: function (response) {
      // generateOrder(response.razorpay_payment_id);
      alert(response.razorpay_payment_id);
    },
    prefil: {
      name: "",
      contact: "",
      email: "",
    },
    notes: {
      address: "some address",
    },
    theme: {
      color: "blue",
      hide_topbar: false,
    },
  };

  const handlePayment = async () => {
    if (userKeys.length == 0) {
      navigate("/signin");
    } 
    else {
      
      var result = await postData("userinterface/check_user_address", {mobileno: mobileno});
      if (result.status) 
        {
          if(labelPaymentButton=="CHECKOUT")
            {
            setOpen(true)
            setAddress(result.data)
          }
          else
          {
            var rzp1= new window.Razorpay(options);
            rzp1.open();
          }
        } 
      else {
        setOpen(true)
        setAddress([])
      }
    }
    
  }

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  ////************//

  const showProducts = () => {
    return (
      <div style={{width: "100%",display: "flex",justifyContent: "center",alignItems: "center",background: "#fff",margin:'1.8%'}}>
        <div style={{ width:'100%'}}>
          <div style={{fontWeight: "bolder",fontSize: "1.8vw",marginTop: '4%',marginBottom: '7%'}}>
            TOTAL
          </div>

          <div style={{ fontWeight: "bold", fontSize: "1.2vw" }}>
            Product Amount
            <span
              style={{
                fontWeight: "bold",
                fontSize: "1.2vw",
                float: "right",
                color: "grey",
              }}
            >
              &#8377;{totalamount}
            </span>
          </div>

          <div style={{ fontWeight: "bold", fontSize: "1.2vw" }}>
            Amount to be Paid
            <span
              style={{
                fontWeight: "bold",
                fontSize: "1.2vw",
                float: "right",
                color: "grey",
              }}
            >
              &#8377;{totalamountpaid}
            </span>
          </div>

          <div
            style={{ fontWeight: "bold", fontSize: "1.2vw", marginTop: "2%" }}
          >
            Delivery Charges
            <span
              style={{
                float: "right",
                width: "17%",
                height: "18px",
                cursor: "pointer",
              
                fontWeight: "bold",
                fontSize: "1.2vw",
                color: "grey",
              }}
            >
              &#8377;0
            </span>
          </div>
          <Divider />
          <div style={{ fontWeight: "bold", fontSize: "1.3vw", marginTop: "1.2%"}} >
            Net Amount
            <span style={{
                float: "right",
                width: "17%",
                height: "18px",
                cursor: "pointer",
                color: "grey",
                
              }}
            >
              &#8377;{totalamountpaid}
            </span>
          </div>

          <div
            style={{
              fontWeight: "bold",
              fontSize: "1.3vw",
              marginTop: "1%",
              color: "green",
            }}
          >
            Savings:
            <span
              style={{
                float: "right",
                width: "17%",
                height: "16px",
                cursor: "pointer",
                color: "grey",
              }}
            >
              &#8377;{savings}
            </span>
          </div>

          <div style={{ marginTop: "20px", borderTop: "2px solid #fff" }}>
            <Button
              variant="contained"
              fullWidth
              style={{
                marginTop: '1%',
                background: "#018849",
                borderRadius: 0,
                fontWeight: "bolder",
                fontSize: "1.3vw",
              }}
              onClick={handlePayment}
            >
              {labelPaymentButton}
            </Button>
          </div>

          <div
            style={{ fontWeight: "bold", fontSize: "1.3vw", marginTop: "3%" }}
          >
            WE ACCEPT :
          </div>

          <div
            style={{
              boxSizing: "border-box",
              maxWidth: "50%",
              maxHeight: "20px",
              marginTop: "15px",
              marginBottom: "10px",
              background:'blue'
            }}
          >
            <img
              src={`${serverURL}/images/emi.jpg`}
              style={{ width: "99%", height: "100%", display: "flex" }}
            />
          </div>
          <div
            style={{fontSize:'1.5vw',
              letterSpacing: "0.4px",
              color: "grey",
              fontSize: "1.1vw",
              marginBottom: "8%",
            }}
          >
            Got a discount code? Add it in the next step.
          </div>
        </div>
      </div>
    );
  };
  
  return (
      <div>
        {showProducts()}
      <CartDrawer setLabelPaymentButton={setLabelPaymentButton} open={open} setOpen={setOpen} address={address}  setAddressBoxOpen={setAddressBoxOpen} addressBoxOpen={addressBoxOpen} userData={userData[0]}/>
      <AddNewAddress setAddressBoxOpen={setAddressBoxOpen} addressBoxOpen={addressBoxOpen} userData={userData[0]}/>
      </div>)
}
