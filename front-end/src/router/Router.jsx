import { Routes, Route, Navigate  } from 'react-router-dom';
import PagesNotfound from '../pages/PageNotFound/PageNotFound';
import Home from '../pages/home/Home';
import Cart from '../pages/cart/Cart';
import Login from '../pages/login/Login';
import Product from '../pages/product/Product';
import Register from '../pages/register/Register';
import Cookies from "js-cookie"
import { useEffect } from 'react';
import { useSelector } from "react-redux";
import { useNavigate , useLocation } from "react-router-dom";
import SellProduct from '../pages/SellProduct/SellProduct';

export default function Router() {
  const loginData = useSelector((state) => state.login.status)
  const registerData = useSelector((state) => state.register.status)
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

    let token = Cookies.get('token')  
    
    useEffect(()=>{
      token = Cookies.get('token')  
      if(!token ){
        if(path == "/register"){
          navigate("/register")
        }
        if(path == "/login"){
          navigate("/login")
        }
      }
    },[loginData,registerData]);

    return (
        <Routes>
          <Route  path="/" element={token ? <Home /> : <Navigate to="/login" />}/>
          <Route  path="/login" element={token ? <Navigate to="/" /> : <Login />}/>
          <Route  path="/register" element={token ? <Navigate to="/" /> : <Register />}/>
          <Route  path="/product" element={ <Product /> }/>
          <Route  path="/cart" element={ <Cart /> }/>
          <Route path="/sell-product" element={<SellProduct/>} />
          <Route  path="*" element={<PagesNotfound />} />
        </Routes>
    );
}