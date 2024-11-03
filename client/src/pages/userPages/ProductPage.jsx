//import React, { useEffect } from "react";
import toast from "react-hot-toast";

import React, { useEffect, useState } from "react";

import { axiosInstance } from "../../config/axiosInstance";
import ProductCards from "../../components/ui/cards";
export const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const response = await axiosInstance({
        url: "/product/productList",
        method: "GET",
        withCredentials: true,
      });
      setProducts(response?.data?.data);
      console.log("response ===", response);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="px-20 py-10">
      <h1 className="font-bold text-4xl my-5">List of products</h1>
      <div className="grid grid-cols-3 gap-x-10 gap-y-10">
      {products.map((value) => (
        <ProductCards key={value._id} product={value} />
      ))}
    </div>
    </div>
  );
};
