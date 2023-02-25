import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import LoginSeller from "./Pages/LoginSeller";
import SignupSeller from "./Pages/SignupSeller";
import AddProduct from "./Pages/AddProduct";
import MyProducts from "./Pages/MyProducts";
import SellerProfile from "./Pages/SellerProfile";
import MainForUser from "./Pages/MainForUser";
import SingleProduct from "./Pages/SingleProduct";
import AllProducts from "./Pages/AllProducts";
import Cart from "./Pages/Cart";
import UserProfile from "./Pages/UserProfile";
import OrderHistory from "./Pages/OrderHistory";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
      <Route exact path="/" element={<MainForUser/>}/>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/loginSeller" element={<LoginSeller/>}/>
        <Route exact path="/signupSeller" element={<SignupSeller/>}/>
        <Route exact path="/addProducts" element={<AddProduct/>} />
        <Route exact path="/myProducts" element={<MyProducts/>}/>
        <Route exact path="/sellerProfile" element={<SellerProfile/>}/>
        <Route exact path="/singleProduct/:id" element={<SingleProduct/>}/>
        <Route exact path="/allProduct/?" element={<AllProducts/>}/>
        <Route exact path="/cart" element={<Cart/>}/>
        <Route exact path="/UserProfile" element={<UserProfile/>}/>
        <Route exact path="/orderH" element={<OrderHistory/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
