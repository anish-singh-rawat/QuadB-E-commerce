import { Routes, Route, Navigate  } from 'react-router-dom';
import PagesNotfound from '../pages/PageNotFound/PageNotFound';
import Home from '../pages/home/Home';
import Cart from '../pages/cart/Cart';
import Login from '../pages/login/Login';
import Product from '../pages/product/Product';
import Register from '../pages/register/Register';

export default function Router() {
    let token = false;
    return (
        <Routes>
          <Route  path="/" element={token ? <Home /> : <Navigate to="/login" />}/>
          <Route  path="/login" element={token ? <Navigate to="/" /> : <Login />}/>
          <Route  path="/register" element={token ? <Navigate to="/" /> : <Register />}/>
          <Route  path="/product" element={ <Product /> }/>
          <Route  path="/cart" element={ <Cart /> }/>
          <Route  path="*" element={<PagesNotfound />} />
        </Routes>
    );
}