import React, { useEffect,useSelector, useState } from 'react'
import { FaStar } from "react-icons/fa";
import {useDispatch} from "react-redux"
import { GetProduct } from '../redux/slices/getProducts';

const AllProduct = () => {
  const dispatch = useDispatch();
  const [productsElements, setProductsElements] = useState([])

  const getAllProduct = async ()=>{
    const res = await dispatch(GetProduct());
    setProductsElements(res.payload.products)
    console.log(res.payload.products);
  }
  useEffect(()=>{
    getAllProduct();
  },[])
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:md:grid-cols-4  gap-6">
      {productsElements.length>0 && productsElements.map((product) => (
        <div
          key={product._id}
          className="bg-white shadow rounded overflow-hidden group"
        >
          <div className="relative">
            <img
              src={product.imagePath}
              alt={product.filename}
              className='w-full h-48'
            />
          </div>
          <div className="pt-4 pb-3 px-4">
            <a href="#">
              <h4 className="uppercase font-medium text-xl mb-2 text-gray-800 hover:text-primary transition">
                {product.name}
              </h4>
            </a>
            <div className="flex items-baseline mb-1 space-x-2">
              <p className="text-xl text-primary font-semibold">
                ${product.price}
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