import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";
import ProductCards from "../../components/ui/cards";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductList } from "../../redux/features/productSlice";
import WriteReview from "./WriteReview";

import ProductReviews from "./ProductReviews";


export const ProductPage = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance({
        url: "/product/productList",
        method: "GET",
        withCredentials: true,
      });
      dispatch(fetchProductList(response?.data?.data));
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
    <div className="px-6 sm:px-8 md:px-16 lg:px-20 py-10">
      <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl my-5">
        List of Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
        {products.length > 0 ? (
          products.map((value) => (
            <ProductCards key={value._id} product={value} />
                  // {/* Write a Review */}
                  // <WriteReview productId={value._id} />

                  // {/* Product Reviews */}
                  // <ProductReviews productId={value._id} />

          ))
        ) : (
          <p className="col-span-full text-center text-lg">Loading.....</p>
        )}
      </div>
    </div>
  );
};


