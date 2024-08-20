import Header from "../components/Header";
import ProductDetailComponent from "../components/ProductDetailComponent";
import ProductImagesComponent from "../components/ProductImagesComponent";
import { Grid } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ShippingComponent from "../components/ShippingComponent";
import FooterComponent from "../components/FooterComponent";
import { useLocation } from "react-router-dom";
import { useState } from "react";
export default function ProductDetail() {
  const theme = useTheme();
  var location = useLocation();
  const [pageRefresh,setPageRefresh]=useState(false)
  var product = location?.state?.product;

  // console.log("from location", product);
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <div style={{fontFamily: "Poppins", width: "100%" }}>
      <Header />
      {matches ? (
        <div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <ProductImagesComponent data={product} />
              </Grid>
               <Grid item xs={12}
                style={{display:"flex",justifyContent:"center" }}
              >
                <div style={{width:'80%'}}>
                <ProductDetailComponent pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} myData={product} />
                </div>
              </Grid> 
            </Grid>
          </div>
        </div>
      ) : (
        <div
          style={{
            width: "90%",
            marginTop: "5%",
            display: "flex",
            flexWrap:'wrap',
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
           
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={8.3}>
              <ProductImagesComponent data={product} />
            </Grid>
            <Grid item xs={3.7} style={{ display: "flex", alignItems: "center" }}>
              <ProductDetailComponent pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} myData={product} />
            </Grid> 
          </Grid>
        
        </div>
      )}

    
      <div style={{ width: "100%", marginTop: "2%" }}>
        <ShippingComponent />
      </div>

      <div style={{ width: "100%",margin: "2%" }}>
        <FooterComponent />
      </div>

    </div>
  );
}
