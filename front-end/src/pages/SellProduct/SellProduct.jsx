import React, { useRef, useState } from 'react';
import axiosInstance from '../../../utils/axios';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { AddProduct } from '../../redux/slices/productsSlice';
import Cookies from "js-cookie"

const inputElement = [
    {
        name: "name",
        placeHolder: "product Name",
        type: "text",
    },
    {
        name: "description",
        placeHolder: "product description",
        type: "text",
    },
    {
        name: "price",
        placeHolder: "product price",
        type: "text",
    },
    {
        name: "quantity",
        placeHolder: "product quantity",
        type: "text",
    },
];

const SellProduct = () => {
    const [fileData, setFileData] = useState([])
    const dispatch = useDispatch();
    const productsData = useSelector((state) => state.products)

    const handleFileUpload = async (e) => {
        const ImageData = new FormData();
        ImageData.append('photo', e.target.files?.[0]);
        const token = Cookies.get('token');
        try {
            const res = await axiosInstance.post("product/addProductImage", ImageData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log(res)

            if (res.status === 200) {
                setFileData(res.data)
                toast.success(res.data.message)
            }
        } catch (err) {
            console.error('Error uploading file', err);
            toast.error("some error uploading file");
        }
    };

    const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
        useFormik({
            initialValues: {
                name: "",
                description: "",
                price: "",
                quantity: "",
            },
            onSubmit: async (values, { resetForm }) => {
                const payload = {
                    name: values.name,
                    description: values.description,
                    price: values.price,
                    quantity: values.quantity,
                    imagePath: fileData.imagePath,
                    filename: fileData.filename,
                    originalname: fileData.originalname
                };
                try {
                    const res = await dispatch(AddProduct(payload));
                    console.log(res, 'this is an payload')
                    resetForm();
                    setFileData([]);
                    if (res.payload.success === true) {
                        toast.success(res.payload.message)
                    }
                    else {
                        toast.error(res.payload.message)
                    }

                } catch (error) {
                    console.log(error)
                    toast.error("some error occured while processing!!")
                }
            },
        });


    return (
        <>
            <div className="w-full flex flex-col xl:flex-row lg:flex-col md:flex-col justify-between items-center">
                <div className="flex w-1/2 items-center mt-10 xl:mt-0 mx-7 justify-center bg-grey-lighter">
                    <div>
                        {
                            fileData.filename &&
                            <img src={`https://quadb-back-end-2.onrender.com/${fileData.imagePath}`} alt={fileData.originalname} className='h-56 w-full  xl:w-auto' />
                        }

                        <div className='flex items-center justify-center mt-5'>
                            <label className="w-64 flex flex-col  items-center px-4 py-6 bg-red-500 text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer ">
                                <svg className="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                </svg>
                                <span className="mt-2 text-base leading-normal">upload a file</span>
                                <input type='file' className="hidden" required={true}
                                    onChange={handleFileUpload} />
                            </label>
                        </div>

                    </div>
                </div>

                <div className="w-9/12 xl:w-1/2 shadow-xl px-6 py-7 m-10 xl:mt-0 lg:mt-10 md:mt-10 rounded overflow-hidden">
                    <div className="space-y-2 ">
                        {inputElement.map((input, i) => (
                            <div key={i}>
                                <label htmlFor="name" className="text-gray-600 mb-1 block">
                                    {input.placeHolder}
                                </label>
                                <input
                                    type={input.type}
                                    name={input.name}
                                    value={values[input.name]}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className="block w-full border border-gray-300 px-4 py-3 text-gray-600 text-sm rounded focus:ring-0 focus:border-primary placeholder-gray-400"
                                    placeholder={input.placeHolder}
                                />
                            </div>
                        ))}
                        <button
                            type="submit"
                            className="block w-full py-2 text-center bg-primary border border-primary rounded hover:bg-transparent hover:text-primary transition uppercase font-roboto font-medium mt-4"
                        >
                            {productsData.status == "loading" ? (
                                <div className="flex justify-center items-center">
                                    <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-orange-600"></div>
                                </div>
                            ) : (
                                <div onClick={handleSubmit}>upload product</div>
                            )}

                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SellProduct;
