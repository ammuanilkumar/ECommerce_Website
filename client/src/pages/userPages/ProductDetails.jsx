import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";
import { useEffect, useState } from "react";

export const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartMessage, setCartMessage] = useState(null);
  const [wishlistMessage, setWishlistMessage] = useState(null); // State for wishlist message
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams(); // productId from URL

  // Fetch product details on component mount
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axiosInstance({
          url: `/product/details/${id}`,
          method: "GET",
          withCredentials: true,
        });

        if (response?.data?.data) {
          setProductDetails(response.data.data);
        } else {
          setError("Product details not found");
        }
      } catch (error) {
        console.error(error);
        setError("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  // Add product to the user's cart

  const addProductToUserCart = async () => {
    try {
      const response = await axiosInstance({
        url: `/cart/add/${id}`,
        method: "POST",
        withCredentials: true,
        data: { quantity: 1 },
      });

      if (response?.data?.message === "Product added to cart successfully") {
        setCartMessage("Product added to cart successfully!");
      } else {
        setCartMessage("Product quntity has been increased sussfully!");
      }
    } catch (error) {
      console.error(error);
      setCartMessage("Error adding product to cart");
    }
  };

  // Add product to wishlist
  const addProductWishlist = async () => {
    try {
      const response = await axiosInstance({
        url: `/wishlist/add/${id}`, // Product ID in URL params
        method: "POST",
        withCredentials: true,
      });

      if (
        response?.data?.message === "Product added to wishlist successfully"
      ) {
        setWishlistMessage("Product added to wishlist successfully!");
      } else {
        setWishlistMessage("Failed to add product to wishlist ");
      }
    } catch (error) {
      console.error(error);
      setWishlistMessage("Product already in wishlist");
    }
  };

  // Loading and error states
  if (loading) {
    return <div className="text-center py-24">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-24 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <section className="text-gray-700 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap bg-white p-8 shadow-lg rounded-lg">
            <img
              alt={productDetails?.title || "Product Image"}
              className="lg:w-1/2 w-full object-cover object-center rounded-lg border border-gray-300 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              src={productDetails?.image || "https://via.placeholder.com/500"}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest uppercase mb-1">
                {productDetails?.brand || "Unknown Brand"}
              </h2>
              <h1 className="text-gray-900 text-4xl title-font font-semibold mb-3">
                {productDetails?.title || "Product Title"}
              </h1>
              <p className="leading-relaxed text-base text-gray-600 mb-5">
                {productDetails?.desc || "Product description not available."}
              </p>
              <div className="flex items-center mb-5">
                <span className="mr-3 text-gray-900 font-semibold">
                  Quantity
                </span>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value) || 1)}
                  className="w-16 p-2 text-center border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="flex items-center mb-5">
                <span className="title-font font-semibold text-2xl text-gray-900">
                  ₹{productDetails?.price || "N/A"}
                </span>
                <button
                  onClick={addProductToUserCart}
                  className={`flex ml-auto text-white ${
                    loading ? "bg-gray-500" : "bg-red-500"
                  } border-0 py-2 px-6 focus:outline-none hover:${
                    loading ? "bg-gray-600" : "bg-red-600"
                  } transition-all duration-300 rounded-lg shadow-md`}
                  disabled={loading}
                >
                  Add to Cart
                </button>
                <button
                  onClick={addProductWishlist} // Add to wishlist when heart is clicked
                  className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 hover:text-red-500 ml-4 transition-all duration-300"
                >
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                </button>
              </div>
              {cartMessage && (
                <p
                  className={`mt-4 text-sm ${
                    cartMessage.includes("success")
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {cartMessage}
                </p>
              )}
              {wishlistMessage && (
                <p
                  className={`mt-4 text-sm ${
                    wishlistMessage.includes("success")
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {wishlistMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
