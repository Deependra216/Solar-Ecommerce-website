import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import AdminLogin from "./Admin/screens/AdminLogin";
import AdminDashboard from "./Admin/screens/AdminDashboard"
import ProductDetail from "./userinterface/screens/ProductDetail"
import Home from "./userinterface/screens/Home";
import Cart from "./userinterface/screens/Cart"
import SignIn from "./userinterface/screens/SignIn"
import VerifyOtp from "./userinterface/screens/VerifyOtp"
import NotVerified from "./userinterface/screens/NotVerified"
import AddAddressComponent from "./userinterface/components/AddAddressComponent";
import FilterScreen from "./userinterface/screens/FilterScreen";
import PaymentCardComponent from "./userinterface/components/PaymentCardComponent";
function App() {
  return (
   <div>
    <Router>
    <Routes>
      <Route element={<Cart/>} path="cart"></Route>
      <Route element={<ProductDetail />} path="/productdetail"></Route>
      <Route element={<Home/>} path="/"></Route>
      <Route element={<AdminLogin/>} path="/adminlogin"></Route>
      <Route element={<AdminDashboard/>} path="/admindashboard/*"></Route>
      <Route element={<SignIn/>} path="/signin"/>
      <Route element={<VerifyOtp/>} path="/verifyotp"/>
      <Route element={<NotVerified/>} path="/notverified"/>
      <Route element={<AddAddressComponent/>} path="/addressaddcomponent"/>
      <Route element={<FilterScreen/>} path="/filterscreen/:pattern"/>
      <Route element={<PaymentCardComponent/>} path="/paymentcardcomponent"></Route>

    </Routes>
   </Router>
   </div>
  );
}

export default App;
