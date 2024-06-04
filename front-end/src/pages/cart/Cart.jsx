import React, { useEffect, useState } from 'react'
import { FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux"
import { toast } from "react-toastify";
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { handleCartAction } from '../../redux/slices/CartSlice';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Cart = () => {
    const [productsElements, setProductsElements] = useState([])
    const [removeItemId, setRemovedItemId] = useState(null)

    const dispatch = useDispatch();
    const cartData = useSelector((state) => state.cart)
    console.log(cartData, 'sss')
    let token = Cookies.get('token')
    let userData;
    if (token) {
        userData = jwtDecode(token);
    }

    const getAllProduct = async () => {
        const res = await dispatch(handleCartAction({ actionType: "get", payload: { id: userData.id } }));
        setProductsElements(res?.payload?.cart?.cartItems)
    }

    const removeToCart = async (productId) => {
        const payload = {
            productId: productId,
            userId: userData.id
        }
        setRemovedItemId(productId)
        const res = await dispatch(handleCartAction({ actionType: "remove", payload }));
        if (res?.error?.message === "Rejected") {
            toast.error(res.payload.message)
        }
    }
    useEffect(() => {
        getAllProduct();
        token = Cookies.get('token')
    }, [cartData.data?.cart?.cartItems.length]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:md:grid-cols-4  gap-6">
            {cartData.status === "loading" &&
                <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={true}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            }
            {productsElements?.length > 0 && productsElements?.map((product) => (
                <div
                    key={product?.productId}
                    className="bg-white shadow rounded overflow-hidden group py-5 px-5"
                >
                    <div className="relative">
                        <img
                            src={product?.productImage}
                            alt={product?.itemName}
                            className='w-full h-48'
                        />
                    </div>
                    <div className="pt-4 pb-3 px-4">
                        <a href="#">
                            <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                                {product?.itemName}
                            </h4>
                        </a>
                        <div className="flex items-baseline mb-1 space-x-2">
                            <p className="text-xl text-primary font-semibold">
                                ${product?.price}
                            </p>
                            <p className="text-sm text-gray-400 line-through">$55.90</p>
                        </div>
                        <div className="flex items-center">
                            <div className="flex gap-1 text-sm text-yellow-400">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <span key={index}>
                                        <FaStar />
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div onClick={() => removeToCart(product?.productId)}
                        className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition">
                        {
                            removeItemId == product?.productId && cartData?.status == "loading" ?
                                <div className="flex justify-center items-center">
                                    <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-orange-600"></div>
                                </div> :
                                <div> remove to cart</div>
                        }
                    </div>
                </div>
            ))}
        </div>
    )
}
export default Cart;