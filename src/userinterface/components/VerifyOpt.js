import React, { useEffect } from "react";
import { useState } from "react";
import OtpInput from "react-otp-input";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function VerifyOpt(props) {
  var navigate = useNavigate();
  const dispatch = useDispatch();
  var location = useLocation();
  var mobileno = location.state.mobileno;
  var getotp = location.state.otp;
  var user = props?.user;
  const [otp, setOtp] = useState("");
  const handleChkOpt = () => {
    // alert(JSON.stringify(user))
    
    if (otp == getotp) {
      dispatch({ type: "ADD_USER", payload: [mobileno, user] });
      navigate("/home");
    } else {
      alert("Wrong Otp");
    }
  };
  useEffect(function () {
    alert(getotp);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "55%",
          height: "60%",
          background: "#fff",
          borderRadius: "32px",
          padding: "64px 32px 0",
          margin: "72px 0 0",
          boxShadow: "0px 0px 15px 3px rgba(0, 0, 0, .05)",
          position: "relative",
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "JioType, helvetica, arial,sans-serif",
              marginBottom: ".70rem",
              fontWeight: 900,
              textTransform: "none",
              fontSize: "1.8rem",
              letterSpacing: "-.96",
              lineHeight: 1,
            }}
          >
            Verify Phone Number
          </div>
          <div
            style={{
              color: "grey",
              fontFamily: "JioType, helvetica, arial,sans-serif",
              fontWeight: 500,
              textTransform: "none",
              fontSize: "0.875.rem",
              lineHeight: "1.4",
              marginBottom: "2em",
            }}
          >
            An SMS with 4-digit OTP was sent to {mobileno} Change
          </div>
        </div>

        <div style={{ alignSelf: "center", marginBottom: "20vh" }}>
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={4}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
            inputStyle={{ width: 50, height: 50, borderRadius: 10, margin: 5 }}
          />
        </div>

        <div
          onClick={handleChkOpt}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            width: "20vw",
            height: "8vh",
            borderRadius: "10vw",
            background: "#0078ad",
            color: "#fff",
            fontFamily: "JioType, helvetica, arial, sans-serif",
            fontWeight: 700,
            textTransform: "none",
            fontSize: "1rem",
            letterSpacing: "-.08px",
            lineHeight: 1.5,
            marginBottom: "2vh",
            cursor: "pointer",
          }}
        >
          Verify
        </div>

        <div
          style={{
            fontFamily: "JioType, helvetica, arial, sans-serif",
            fontWeight: 500,
            textTransform: "none",
            fontSize: ".75rem",
            letterSpacing: "-.06px",
            lineHeight: 1.3,
            color: "grey",
          }}
        >
          
          By continuing, you agree to our Terms of Service and Privacy & Legal
          Policy
        </div>
      </div>
    </div>
  );
}
