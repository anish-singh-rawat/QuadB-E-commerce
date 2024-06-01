import { Link } from "react-router-dom"
import AllProduct from "../../components/AllProduct"

const Product = () => {
    return (
        <div>
            <div className="container grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
                <div>
                    <img src="images/products/product1.jpg" alt="product" className="w-full" />
                </div>
                <div>
                    <h2 className="text-3xl font-medium uppercase mb-2">Italian L Shape Sofa</h2>
                    <div className="space-y-2">
                        <p className="space-x-2">
                            <span className="text-gray-800 font-semibold">Brand: </span>
                            <span className="text-gray-600">Apex</span>
                        </p>
                        <p className="space-x-2">
                            <span className="text-gray-800 font-semibold">Category: </span>
                            <span className="text-gray-600">Sofa</span>
                        </p>
                    </div>
                    <div className="flex items-baseline mb-1 space-x-2 font-roboto mt-4">
                        <p className="text-xl text-primary font-semibold">$45.00</p>
                        <p className="text-base text-gray-400 line-through">$55.00</p>
                    </div>

                    <p className="mt-4 text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos eius eum
                        reprehenderit dolore vel mollitia optio consequatur hic asperiores inventore suscipit, velit
                        consequuntur, voluptate doloremque iure necessitatibus adipisci magnam porro.</p>

                    <div className="mt-6 flex gap-3 border-b border-gray-200 pb-5 pt-5">
                        <Link
                            className="bg-primary border border-primary text-white px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:bg-transparent hover:text-primary transition">
                            Add to cart
                        </Link>
                        <Link
                            className="border border-gray-300 text-gray-600 px-8 py-2 font-medium rounded uppercase flex items-center gap-2 hover:text-primary transition"> order now
                        </Link>
                    </div>
                </div>
            </div>

            <div className="px-3 lg:px-14">
                <AllProduct />
            </div>
        </div>
    )
}

export default Product