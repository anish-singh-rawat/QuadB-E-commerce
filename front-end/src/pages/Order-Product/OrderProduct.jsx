import { useEffect } from "react";
import { singleProduct } from "../../redux/slices/SignleProduct";
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"

const OrderProduct = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const singleProductData = useSelector((state) => state.singleProduct)
    console.log(singleProductData)

    const getsingleProductData = async () => {
        dispatch(singleProduct(id))
    }

    useEffect(() => {
        if (id) {
            getsingleProductData();
        }
    }, [id])
    
    return (
        <>
            <div>
                <div className="container grid md:grid-cols-12 pb-16 pt-6 gap-6">
                    <div className="shadow-slate-900 shadow-2xl w-full md:col-span-8 border border-gray-200 p-4 rounded">
                        <h3 className="text-lg text-red-600 font-bold capitalize mb-4">Checkout</h3>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="first-name" className="text-gray-600">First Name <span
                                        className="text-primary">*</span></label>
                                    <input type="text" name="first-name" id="first-name" className="input-box" />
                                </div>
                                <div>
                                    <label htmlFor="last-name" className="text-gray-600">Last Name <span
                                        className="text-primary">*</span></label>
                                    <input type="text" name="last-name" id="last-name" className="input-box" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="region" className="text-gray-600">Country/Region</label>
                                    <input type="text" name="region" id="region" className="input-box" />
                                </div>
                                <div>
                                    <label htmlFor="address" className="text-gray-600">Street address</label>
                                    <input type="text" name="address" id="address" className="input-box" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="city" className="text-gray-600">City</label>
                                <input type="text" name="city" id="city" className="input-box" />
                            </div>
                            <div>
                                <label htmlFor="phone" className="text-gray-600">Phone number</label>
                                <input type="text" name="phone" id="phone" className="input-box" />
                            </div>
                            <div>
                                <label htmlFor="email" className="text-gray-600">Email address</label>
                                <input type="email" name="email" id="email" className="input-box" />
                            </div>
                        </div>
                    </div>

                    <div className="w-full shadow-slate-900 shadow-2xl md:col-span-4 border border-gray-200 p-4 rounded">
                        <h4 className=" text-red-600 font-bold text-lg mb-4 uppercase">
                            order summary</h4>
                        <div>
                            <img src={singleProductData?.data?.product?.imagePath} alt="product" />
                        </div>
                        <div className="space-y-2 mt-4">
                            <div className="flex justify-between text-lg">
                                <div>
                                    <h5 className="text-gray-800 font-medium">product name</h5>
                                </div>
                                <p className="text-gray-800 font-medium">{singleProductData?.data?.product?.name}</p>
                            </div>
                            <div className="flex justify-between text-lg">
                                <div>
                                    <h5 className="text-gray-800 font-medium">product quantity</h5>
                                </div>
                                <p className="text-gray-800 font-medium">{singleProductData?.data?.product?.quantity}</p>
                            </div>
                            <div className="flex justify-between text-lg">
                                <div>
                                    <h5 className="text-gray-800 font-medium">product price</h5>
                                </div>
                                <p className="text-gray-800 font-medium">
                                    {singleProductData?.data?.product?.price}$
                                </p>
                            </div>
                        </div>



                        <div className="flex justify-between text-gray-800 font-medium py-3 uppercas">
                            <p className="font-semibold">Total</p>
                            <p>{singleProductData?.data?.product?.price}$</p>
                        </div>

                        <buttton
                            className="block w-full py-3 px-4 text-center text-white bg-primary border border-primary rounded-md hover:bg-transparent hover:text-primary cursor-pointer transition font-medium">Place
                            order
                        </buttton>
                    </div>

                </div>

            </div>
        </>
    )
}

export default OrderProduct