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

      if (response?.data?.data?.cart) {
        const allCartItems = response.data.data.cart.flatMap(
          (cart) => cart.items
        );
        setCartProduct(allCartItems);
      } else {
        setError("Product details not found");
      }
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
          prev.filter((product) => product.product._id.toString() !== id)
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
        (product) => product.product._id.toString() === id
      );
      if (!currentItem) {
        console.error("Item not found in cart for ID:", id);
        return;
      }

      const newQuantity = currentItem.quantity + change;

      if (newQuantity < 1) {
        await handleRemoveProduct(id);
        return;
      }

      const updatedCart = cartProduct.map((product) =>
        product.product._id.toString() === id
          ? { ...product, quantity: newQuantity }
          : product
      );

      setCartProduct(updatedCart);

      // Log to check if the correct quantity is sent to the API
      console.log(`Updating ${id} to new quantity: ${newQuantity}`);

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

  // Calculate Subtotal
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
      if (!stripePublishableKey) {
        throw new Error("Stripe publishable key is not defined");
      }

      const stripe = await loadStripe(stripePublishableKey);

      const response = await axiosInstance({
        url: "/payment/create-checkout-session",
        method: "POST",
        withCredentials: true,
        data: { products: cartProduct },
      });

      const sessionId = response?.data?.sessionId;

      if (!sessionId) {
        console.error("Failed to create a checkout session.");
        return;
      }

      const result = await stripe.redirectToCheckout({ sessionId });

      if (result.error) {
        console.error("Stripe Checkout Error:", result.error.message);
      }
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>

      <div className="mx-auto max-w-5xl px-6 md:flex md:space-x-6 xl:px-0">
        {/* Cart Items Section */}
        <div className="rounded-lg md:w-2/3">
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : cartProduct.length > 0 ? (
            cartProduct.map((product) => (
              <div
                key={product.product._id}
                className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
              >
                {/* Image Container */}
                <div className="w-full sm:w-40">
                  <img
                    src={product.product.image}
                    alt={product.product.title}
                    className="w-full rounded-lg"
                  />
                </div>

                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div className="mt-5 sm:mt-0">
                    {product.product?.title && (
                      <h2 className="text-lg font-bold text-gray-900">
                        {product.product.title}
                      </h2>
                    )}
                  </div>
                  <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center border-gray-100">
                      <span
                        className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-white"
                        onClick={() =>
                          handleQuantityChange(product.product._id, -1)
                        }
                      >
                        -
                      </span>
                      <input
                        className="h-8 w-8 border bg-white text-center text-xs outline-none"
                        type="number"
                        readOnly
                        value={product.quantity}
                        min={1}
                      />
                      <span
                        className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-white"
                        onClick={() =>
                          handleQuantityChange(product.product._id, 1)
                        }
                      >
                        +
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <p className="text-sm">₹{product.product.price}</p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                        onClick={() => handleRemoveProduct(product.product._id)}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Your cart is empty</p>
          )}
        </div>

        {/* Subtotal Section */}
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">₹{subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">₹{shipping.toFixed(2)}</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <p className="text-lg font-bold"> ₹{total.toFixed(2)} INR</p>
          </div>
          <button
            onClick={makePayment}
            className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-white hover:bg-blue-600"
          >
            Check out
          </button>
        </div>
      </div>
    </div>
  );
};
