import React from 'react'
import { FaStar } from "react-icons/fa";
const productsElements = [
  {
    productImg: "https://picsum.photos/100/100",
    productName: "COUPLE SOFA",
    productPrice: 45.09,
  },
  {
    productImg: "https://picsum.photos/200/200",
    productName: "BED KING SIZE",
    productPrice: 45.09,
  },
  {
    productImg: "https://picsum.photos/300/300",
    productName: "MATTRASS X",
    productPrice: 45.09,
  },
  {
    productImg: "https://picsum.photos/400/400",
    productName: "Guyer Chair",
    productPrice: 45.09,
  },
  {
    productImg: "https://picsum.photos/500/500",
    productName: "Rawat shert",
    productPrice: 45.09,
  },
  {
    productImg: "https://picsum.photos/600/600",
    productName: "singh pent",
    productPrice: 45.09,
  },
  {
    productImg: "https://picsum.photos/700/700",
    productName: "negi Chair",
    productPrice: 45.09,
  },
  {
    productImg: "https://picsum.photos/800/800",
    productName: "rawat pent",
    productPrice: 45.09,
  },
];

const AllProduct = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {productsElements.map((product, index) => (
        <div
          key={index}
          className="bg-white shadow rounded overflow-hidden group"
        >
          <div className="relative">
            <img
              src={product.productImg}
              alt="product 1"
              className="w-full"
            />
          </div>
          <div className="pt-4 pb-3 px-4">
            <a href="#">
              <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                {product.productName}
              </h4>
            </a>
            <div className="flex items-baseline mb-1 space-x-2">
              <p className="text-xl text-primary font-semibold">
                ${product.productPrice}
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
          <a
            href="#"
            className="block w-full py-1 text-center text-white bg-primary border border-primary rounded-b hover:bg-transparent hover:text-primary transition"
          >
            Add to cart
          </a>
        </div>
      ))}
    </div>
  )
}

export default AllProduct