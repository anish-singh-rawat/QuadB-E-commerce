import { Link, useParams } from "react-router-dom"
import { useEffect } from "react";
import { singleProduct } from "../../redux/slices/SignleProduct";
import { useDispatch, useSelector } from "react-redux"
const Product = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const singleProductData = useSelector((state) => state.singleProduct)
    const getsingleProductData = async () => {
        await dispatch(singleProduct(id))
    }
    useEffect(() => {
        getsingleProductData();
    }, [id])
    return (
            <div className="container grid grid-cols-1 mt-7 mb-7 md:grid-cols-2 gap-6 py-4">
                <div>
                    <img src={singleProductData?.data?.product?.imagePath} alt="product" className="w-full" />
                </div>
                <div>
                    <h2 className="text-3xl font-medium uppercase mb-2">{singleProductData?.data?.product?.name}</h2>
                    <div className="space-y-2">
                        <p className="space-x-2">
                            <span className="text-gray-800 font-semibold">Brand: </span>
                            <span className="text-gray-600">Apex</span>
                        </p>
                        <p className="space-x-2">
                            <span className="text-gray-800 font-semibold">quantity : {singleProductData?.data?.product?.quantity} </span>
                        </p>
                        <p className="space-x-2">
                            <span className="text-gray-800 font-semibold">Category: </span>
                            <span className="text-gray-600">Sofa</span>
                        </p>
                    </div>
                    <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
                        <p className="text-xl text-primary font-semibold">${singleProductData?.data?.product?.price}.00</p>
                        <p className="text-base text-gray-400 line-through">$55.00</p>
                    </div>

                    <p className="mt-4 text-gray-600">
                    {singleProductData?.data?.product?.description}
                    </p>

                    <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
                        <Link to={'/'}
                            className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition">
                            back to home
                        </Link>
                        <Link
                            className="border border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:text-primary transition"> order now
                        </Link>
                    </div>
                </div>
            </div>
    )
}

export default Product