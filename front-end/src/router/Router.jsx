import { Routes, Route, Navigate } from 'react-router-dom';
import PagesNotfound from '../pages/PageNotFound/PageNotFound';
import Home from '../pages/home/Home';
import Cart from '../pages/cart/Cart';
import Login from '../pages/login/Login';
import Product from '../pages/product/Product';
import Register from '../pages/register/Register';
import Cookies from "js-cookie"
import { useEffect } from 'react';
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import SellProduct from '../pages/SellProduct/SellProduct';
import { jwtDecode } from "jwt-decode";

export default function Router() {
  const loginData = useSelector((state) => state.login.status)
  const registerData = useSelector((state) => state.register.status)
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  let token = Cookies.get('token')
  let protectedToken;
  let userData;
  if (token) {
    protectedToken = jwtDecode(token);
    userData = jwtDecode(token);
  }

  useEffect(() => {
    token = Cookies.get('token')
    if (!token) {
      if (path == "/register") {
        navigate("/register")
      }
      if (path == "/login") {
        navigate("/login")
      }
    }
  }, [loginData, registerData]);

  return (
    <Routes>
      <Route path="/" element={protectedToken?.id ? <Home /> : <Navigate to="/login" />} />
      <Route path="/login" element={protectedToken?.id ? <Navigate to="/" /> : <Login />} />
      <Route path="/register" element={protectedToken?.id ? <Navigate to="/" /> : <Register />} />
      <Route path="/product" element={<Product />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/sell-product" element={protectedToken?.id ? (userData?.admin === true ? <SellProduct /> : <Navigate to="/" />) : <Navigate to="/login" />} />

      <Route path="*" element={<PagesNotfound />} />
    </Routes>
  );
}