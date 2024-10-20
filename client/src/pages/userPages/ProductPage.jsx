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
    <div>
      {/* <h1>List of Products</h1>
      {products.map((value) => (<ProductCards />)

      )}  */}
      {products.map((value) => (
        <ProductCards key={value.id} product={value} />
      ))}
    </div>
  );
};
