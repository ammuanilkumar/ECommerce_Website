import { useEffect, useState } from "react";
import { axiosInstance } from "./../../config/axiosInstance";
import { loadStripe } from "@stripe/stripe-js";

export const CartPage = () => {
  const [cartProduct, setCartProduct] = useState([]);
  const [error, setError] = useState(null);

  // Fetch Cart Products
  const fetchCartProducts = async () => {
    try {
      const response = await axiosInstance({
        url: "/cart/cartdetails",
        method: "GET",
        withCredentials: true,
      });

      const allCartItems =
        response?.data?.data?.cart?.flatMap((cart) => cart.items) || [];
      setCartProduct(allCartItems);
    } catch (error) {
      console.error("Failed to fetch product details:", error);
      setError("Failed to fetch product details");
    }
  };

  useEffect(() => {
    fetchCartProducts();
  }, []);

  // Handle Remove Product from Cart
  const handleRemoveProduct = async (id) => {
    try {
      const response = await axiosInstance({
        url: `/cart/remove/${id}`,
        method: "DELETE",
        withCredentials: true,
      });

      if (response.status === 200) {
        setCartProduct((prev) =>
          prev.filter((product) => product.product._id !== id)
        );
      }
    } catch (error) {
      console.error("Failed to remove product:", error);
      setError("Failed to remove product");
    }
  };

  const handleQuantityChange = async (id, change) => {
    try {
      const currentItem = cartProduct.find(
        (product) => product.product._id === id
      );
      if (!currentItem) return;

      const newQuantity = currentItem.quantity + change;
      if (newQuantity < 1) return await handleRemoveProduct(id);

      setCartProduct(
        cartProduct.map((product) =>
          product.product._id === id
            ? { ...product, quantity: newQuantity }
            : product
        )
      );

      await axiosInstance({
        url: `/cart/update/${id}`,
        method: "PATCH",
        data: { quantity: newQuantity },
        withCredentials: true,
      });
    } catch (error) {
      console.error("Failed to update quantity:", error);
      setError("Failed to update quantity");
    }
  };

  const subtotal = cartProduct.reduce(
    (sum, item) => sum + (item.product.price || 0) * item.quantity,
    0
  );
  const shipping = 50;
  const total = subtotal + shipping;

  // Handle Payment
  const makePayment = async () => {
    try {
      const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
      const stripe = await loadStripe(stripePublishableKey);

      const response = await axiosInstance({
        url: "/payment/create-checkout-session",
        method: "POST",
        data: { products: cartProduct },
      });

      const sessionId = response?.data?.sessionId;
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>

      <div className="mx-auto max-w-5xl px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : cartProduct.length > 0 ? (
            cartProduct.map((product) => (
              <div
                key={product.product._id}
                className="mb-6 rounded-lg bg-white p-6 shadow-md sm:flex"
              >
                <div className="w-full sm:w-40">
                  <img
                    src={product.product.image}
                    alt={product.product.title}
                    className="w-full rounded-lg"
                  />
                </div>

                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-gray-900">
                      {product.product.title}
                    </h2>
                    <p className="text-sm">₹{product.product.price}</p>
                  </div>
                  <div className="flex items-center">
                    <button
                      onClick={() =>
                        handleQuantityChange(product.product._id, -1)
                      }
                    >
                      -
                    </button>
                    <input
                      className="w-8 text-center"
                      value={product.quantity}
                      readOnly
                    />
                    <button
                      onClick={() =>
                        handleQuantityChange(product.product._id, 1)
                      }
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleRemoveProduct(product.product._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Your cart is empty</p>
          )}
        </div>

        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
          <p>Shipping: ₹{shipping.toFixed(2)}</p>
          <p>Total: ₹{total.toFixed(2)} INR</p>
          <button
            onClick={makePayment}
            className="mt-6 w-full bg-blue-500 text-white"
          >
            Check out
          </button>
        </div>
      </div>
    </div>
  );
};

// import React from 'react'

// export const CartPage = () => {
//   return (
//     <div>
//       cartPage
//     </div>
//   )
// }

// import React, { useContext, useEffect } from 'react';
// import { CartContext } from '../contexts/CartContext'; // Assuming you have a CartContext for managing cart state
// import { Link } from 'react-router-dom';
// import { Toaster, toast } from 'react-hot-toast'; // Using Toaster for notifications

// export const CartPage = () => {
//   const { cartItems, removeFromCart, updateQuantity, totalAmount } = useContext(CartContext);

//   useEffect(() => {
//     if (cartItems.length === 0) {
//       toast.info('Your cart is empty.');
//     }
//   }, [cartItems]);

//   const handleQuantityChange = (item, quantity) => {
//     if (quantity < 1) {
//       removeFromCart(item.id);
//     } else {
//       updateQuantity(item.id, quantity);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <Toaster />
//       <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>

//       {cartItems.length === 0 ? (
//         <div className="text-center">
//           <p className="text-gray-500">Your cart is empty.</p>
//           <Link to="/products" className="text-blue-500 underline">
//             Continue Shopping
//           </Link>
//         </div>
//       ) : (
//         <div>
//           <ul className="space-y-4">
//             {cartItems.map((item) => (
//               <li key={item.id} className="flex items-center justify-between border-b pb-4">
//                 <div className="flex items-center space-x-4">
//                   <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
//                   <div>
//                     <h3 className="font-semibold">{item.name}</h3>
//                     <p className="text-gray-500">${item.price.toFixed(2)}</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <input
//                     type="number"
//                     value={item.quantity}
//                     onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
//                     className="border rounded w-16 p-1 text-center"
//                   />
//                   <button
//                     onClick={() => removeFromCart(item.id)}
//                     className="text-red-500 hover:underline"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//           <div className="mt-6 flex justify-between items-center">
//             <h3 className="text-lg font-semibold">Total: ${totalAmount.toFixed(2)}</h3>
//             <Link to="/checkout" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
//               Proceed to Checkout
//             </Link>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartPage;
