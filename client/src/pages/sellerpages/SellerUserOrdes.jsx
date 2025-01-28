import React from "react";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";

const SellerUserOrdes = () => {
  const [orderDetails, setOrderDetails] = useState([]); // State to hold order details
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState(null); // State to manage errors

  // Function to fetch order details
  const handleOdearDetails = async () => {
    try {
      const response = await axiosInstance({
        url: `/seller/getuserorders`, // Adjust this URL based on your API
        method: "GET",
        withCredentials: true,
      });
      console.log(response);
      if (response?.data?.data) {
        setOrderDetails(response.data.data); // Set order details in state
      } else {
        setError("Order details not found");
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
      setError(
        error.response?.data?.message || "Failed to fetch order details"
      ); // More detailed error handling
    } finally {
      setLoading(false); // Set loading to false after fetch attempt
    }
  };

  // Effect to fetch order details when the component mounts
  useEffect(() => {
    handleOdearDetails();
  }, []);

  if (loading) return <div className="text-center text-lg">Loading...</div>; // Display loading state
  if (error) return <div className="text-red-500 text-lg">{error}</div>; // Display error if exists

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Seller Order Details
      </h1>
      {orderDetails.length > 0 ? (
        <ul className="space-y-6">
          {orderDetails.map((order) => (
            <li
              key={order.sessionId}
              className="bg-white p-6 rounded-lg shadow-lg border border-gray-200"
            >
              {/* User details */}
              <div className="mb-4 bg-gray-50 p-4 rounded">
                <p className="text-gray-600">
                  <strong>Name:</strong> {order.user.name}
                </p>
                <p className="text-gray-600">
                  <strong>Email:</strong> {order.user.email}
                </p>{" "}
                <p className="text-gray-600">
                  <strong>Address:</strong> {order.user.address}
                </p>
              </div>

              {/* Order details */}
              <div className="mb-4 bg-gray-50 p-4 rounded">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Order Information
                </h2>

                <p className="text-gray-600">
                  <strong>Total Price:</strong> ₹
                  {(order.totalPrice / 100).toFixed(2)} {order.currency}
                </p>
              </div>

              {/* Products in the order */}
              <div className="bg-gray-50 p-4 rounded">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  Products
                </h2>
                <ul className="space-y-4">
                  {order.products.map((product, index) => (
                    <li
                      key={index}
                      className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200"
                    >
                      <img
                        src={product.img}
                        alt={product.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">
                          {product.title}
                        </p>
                        <p className="text-gray-600">
                          Price: ₹{(product.price / 100).toFixed(2)}
                        </p>
                        <p className="text-gray-600">
                          Quantity: {product.quantity}
                        </p>
                        <p className="text-gray-600">
                          Total: ₹{(product.totalProductPrice / 100).toFixed(2)}
                        </p>
                        <p className="text-gray-600">
                          Status:{" "}
                          <span
                            className={`font-semibold ${
                              product.status === "delivered"
                                ? "text-green-500"
                                : "text-yellow-500"
                            }`}
                          >
                            {product.status}
                          </span>
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-lg text-gray-500">No orders found.</p>
      )}
    </div>
  );
};

export default SellerUserOrdes;
