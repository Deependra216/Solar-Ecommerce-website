import { postData,getData } from "../../services/FetchNodeServices";
import CategoryComponent from "../components/CategoryComponent";
import FooterComponent from "../components/FooterComponent";
import Header from "../components/Header";
import PopularBrands from "../components/PopularBrands";
import SolarProduct from "../components/SolarProduct";
import ShippingComponent from "../components/ShippingComponent";
import SliderComponent from "../components/SliderComponent";
import Counter from "../components/Counter";
import { useEffect, useState } from "react";

export default function Home() {
  const [categoryList, setCategoryList] = useState([]);
  const [offerList, setOfferList] = useState([]);
  const [banners, setBanners] = useState([]);
  const [brands, setBrands] = useState([]);
  const [pageRefresh, setPageRefresh] = useState(false);


  const fetchAllCategoryByBrands = async (bname) => { //it will return promise
    var result = await postData(
      "userinterface/display_all_category_by_brands",
      { brandname: bname }
    );
    setCategoryList(result?.data);
  };
  // const fetchAllBanners = async () => {
  //   var result = (result = await getData("userinterface/get_all_banners"));
  //   var images = result.data[0].pictures.split(",");
  //   setBanners(images);
  // };
const  fetchAllBanners =async()=>{
  var result=await getData("userinterface/get_all_banners");
  var images=result?.data[0]?.pictures.split(",");
  setBanners(images);
}
  const fetchAllBrands = async () => {
    var result = await getData("userinterface/get_all_brands");
    setBrands(result?.data);
  };

  const fetchAllOffers = async(ot) => {
    var result = await postData("userinterface/display_all_productdetails_by_offer",{ offertype: ot });
    setOfferList(result?.data);
  };

  useEffect(function () {
    fetchAllCategoryByBrands("WAAREE");
    fetchAllBanners()
    // .then((response)=>{
    //   console.log("Resopnse",response)
    // });
    fetchAllBrands();
    fetchAllOffers("Month End Sale");
  }, []);

  return (
    <div style={{ fontFamily: "Poppins",width:'100%',position:'relative' }}>
      <Header />
      <div style={{width: "100%",display: "flex",marginTop: "4.5%",justifyContent: "center",flexDirection: "column",
        alignItems: "center"}}>
          
        <div style={{width: "100%",display: "flex",marginTop: "0.5%",justifyContent: "center"}}>
          <div style={{ width: "100%" }}>
            <SliderComponent images={banners} />
          </div>
        </div>

        <div style={{width: "100%",display: "flex",marginTop: "3%",justifyContent: "center"}}>
          <div style={{ width: "85%", marginTop: "4%" }}>
            <CategoryComponent data={categoryList} title={"WAAREE"} />
          </div>
        </div>

        <div style={{width: "100%",display: "flex",marginTop: "3%",justifyContent: "center"}}>
          <div style={{ width: "89%", display: "flex"}}>
            <SolarProduct
              data={offerList}
              pageRefresh={pageRefresh}
              setPageRefresh={setPageRefresh}
            />
          </div>
        </div>

        {/* <div style={{width:'100%',display:'flex',marginTop: '3%',justifyContent: 'center'}}>
        <div style={{width:'90%',display:'flex', marginTop: '4%'}}>
          <Counter/>
          </div></div> */}

        <div style={{width: "100%",display: "flex",marginTop: "3%",justifyContent: "center"}}>
          <div style={{ width: "90%", marginTop: '2%' }}>
            <PopularBrands data={brands} />
          </div>
        </div>

        <div style={{ width: "90%", marginTop: '14%' }}>
          <ShippingComponent />
        </div>

        <div style={{width: "100%",display: "flex",justifyContent: "center"}}>
          <div style={{ width: "90%"}}>
            <FooterComponent />
          </div>
        </div>

      </div>
    </div>
  );
}
