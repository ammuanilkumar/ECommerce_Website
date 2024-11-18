
import { Link } from "react-router-dom";

import { ShoppingCart } from "lucide-react";
import { HeartIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Trash } from "lucide-react";
// import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import { axiosInstance } from "../../config/axiosInstance";

export const WishlistPage = () => {
    const [products, setProducts] = useState([]);
  
    // Fetch wishlist products
    const fetchWishlistProducts = async () => {
      try {
        const response = await axiosInstance({
          url: "/wishlist/get",
          method: "GET",
          withCredentials: true,
        });
        if (response?.data?.data) {
          setProducts(response?.data?.data);
        } else {
          toast.error("No items found in your wishlist");
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch wishlist products");
      }
    };
  
    useEffect(() => {
      fetchWishlistProducts();
    }, []);
  
    // Remove item from wishlist
    const handleRemove = async (id) => {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you really want to remove this item from your wishlist?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, remove it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await axiosInstance({
              url: `/wishlist/remove/${id}`,
              method: "DELETE",
              withCredentials: true,
            });
            if (response?.data?.message === "Product removed from wishlist") {
              setProducts((prevProducts) =>
                prevProducts.filter((item) => item.product._id !== id)
              );
              Swal.fire("Removed!", "Your item has been removed.", "success");
            } else {
              toast.error("Failed to remove item");
            }
          } catch (error) {
            console.error(error);
            toast.error("Error removing product");
          }
        }
      });
    };
  
    const addProductToUserCart = async (id, quantity = 1) => {
      try {
        const response = await axiosInstance({
          url: `/cart/add/${id}`,
          method: "POST",
          withCredentials: true,
          data: { quantity },
        });
  
        if (response?.data?.message === "Product added to cart successfully") {
          toast.success("Product added to cart successfully!");
        } else {
          toast.error("Failed to add product to cart");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error adding product to cart");
      }
    };
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 via-white to-gray-100 p-4 md:p-6">
        <div className="bg-white p-6 md:p-10 rounded-3xl shadow-2xl w-full max-w-5xl">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
            Your Wishlist
          </h1>
          {products.length === 0 ? (
            <p className="text-lg text-gray-600 text-center">
              Your wishlist is empty. Start adding your favorite products!
            </p>
          ) : (
            <div className="space-y-6 md:space-y-8">
              {products.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col md:flex-row items-center justify-between p-4 md:p-6 border border-gray-200 rounded-xl shadow-lg bg-gradient-to-tr from-green-50 to-white"
                >
                  <div className="flex items-center gap-4 md:gap-6">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-xl shadow-sm"
                    />
                    <div>
                      <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
                        {item.product.name}
                      </h2>
                      <p className="text-md md:text-lg text-gray-700">
                        ${item.product.price}
                      </p>
                    </div>
                  </div>

                  <div className="flex mt-4 md:mt-0 items-center gap-2 md:gap-4">
                    {/* <HeartIcon className="text-red-500 hover:text-red-700 transition-colors" /> */}
                    <button
                      onClick={() => addProductToUserCart(item.product._id)}
                      className="bg-blue-600 text-white font-semibold py-2 px-3 md:py-2 md:px-4 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md text-sm md:text-base"
                      >
                        
                      <ShoppingCart className="inline-block mr-1" size={18} />
                      Add to Cart
                    </button>
                    <button
                      onClick={() => handleRemove(item.product._id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="mt-8 text-center">
            <Link
              to="/user/product"
              className="inline-block bg-gradient-to-r from-purple-500 to-purple-700 text-white font-bold py-2 px-6 md:py-3 md:px-8 rounded-xl hover:from-purple-600 hover:to-purple-800 transition duration-300 shadow-lg"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  };


