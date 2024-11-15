import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";

export const OrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Dynamic order ID from URL

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axiosInstance.get(`user/order/${id}`, {
          withCredentials: true,
        });
       
        
        if (response?.data) {
          setOrderDetails(response.data);
        } else {
          setError("No order details available");
        }
      } catch (error) {
        console.error("Error fetching order details:", error);
        setError("No order details available");
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [id]);

  if (loading) return <div className="text-center py-6">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-6">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 flex justify-center">
      <div className="container mx-auto max-w-4xl bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-4">Order Details</h1>

        <div className="flex justify-between mb-6">
          <div>
            <p className="text-gray-700"><strong>Order ID:</strong> {orderDetails?.id}</p>
            <p className="text-gray-700"><strong>Date:</strong> {orderDetails?.date}</p>
            <p className="text-gray-700"><strong>Status:</strong> <span className="badge badge-success">{orderDetails?.status}</span></p>
          </div>
          <div className="text-right">
            <p className="text-gray-700"><strong>Total:</strong> {orderDetails?.totalPrice}</p>
            <p className="text-gray-700"><strong>Payment Status:</strong> {orderDetails?.payment_status}</p>
          </div>
        </div>

        <div className="bg-base-200 p-4 rounded-lg mb-6">
          <h2 className="text-xl font-semibold mb-3">Shipping Information</h2>
          <p className="text-gray-700"><strong>Shipping Address:</strong> {orderDetails?.shippingAddress}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Items Purchased</h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails?.products?.map((item, index) => (
                  <tr key={index}>
                    <td>{item?.title}</td>
                    <td>{item?.quantity}</td>
                    <td>{item?.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <button className="btn btn-outline btn-secondary">Back to Orders</button>
        </div>
      </div>
    </div>
  );
};
