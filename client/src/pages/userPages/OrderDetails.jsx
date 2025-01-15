import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";

export const OrderDetails = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get("user/order", {
          withCredentials: true,
        });
        console.log(response.data); 

        if (response?.data?.success && response?.data?.orders?.length > 0) {
          setOrders(response.data.orders);
        } else {
          setError("No orders available");
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("no orders available");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="text-center py-6">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-6">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 flex justify-center">
      <div className="container mx-auto max-w-6xl bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-4">All Orders</h1>

        {orders.map((order, orderIndex) => (
          <div key={orderIndex} className="mb-10">
            <div className="border-b pb-4 mb-4">
              <h2 className="text-xl font-semibold mb-2">Order #{orderIndex + 1}</h2>
              <p className="text-gray-700">
                <strong>Order ID:</strong> {order.sessionId}
              </p>
              <p className="text-gray-700">
                <strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}
              </p>
              <p className="text-gray-700">
                <strong>Status:</strong>{" "}
                <span className="badge badge-success">{order.status}</span>
              </p>
              <p className="text-gray-700">
                <strong>Total Price:</strong> {order.totalPrice} {order.currency.toUpperCase()}
              </p>
              <p className="text-gray-700">
                <strong>Payment Status:</strong> completed 
              </p>
            </div>

            <h3 className="text-lg font-semibold mb-3">Products in Order</h3>
            <div className="overflow-x-auto">
              <table className="table w-full border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Product</th>
                    <th className="border border-gray-300 px-4 py-2">Quantity</th>
                    <th className="border border-gray-300 px-4 py-2">Price</th>
                    <th className="border border-gray-300 px-4 py-2">Total</th>
                    <th className="border border-gray-300 px-4 py-2">Image</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((product, productIndex) => (
                    <tr key={productIndex}>
                      <td className="border border-gray-300 px-4 py-2">{product.title}</td>
                      <td className="border border-gray-300 px-4 py-2">{product.quantity}</td>
                      <td className="border border-gray-300 px-4 py-2">{product.price}</td>
                      <td className="border border-gray-300 px-4 py-2">{product.totalProductPrice}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        <img
                          src={product.img}
                          alt={product.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

       
      </div>
    </div>
  );
};
