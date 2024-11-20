import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance"; // Import axiosInstance

export const SuccessPage = () => {
  const navigate = useNavigate();

  const handleRemoveProduct = async () => {
    try {
      const response = await axiosInstance({
        url: `/cart/removeall`, // URL to remove all items from the cart
        method: "DELETE",
        withCredentials: true,
      });

      if (response.status === 200) {
        console.log("All products removed from cart successfully.");
      }
    } catch (error) {
      console.error("Error removing products from cart:", error);
    }
  };

  useEffect(() => {
    const removeAndRedirect = async () => {
      await handleRemoveProduct(); // First remove all products from cart
      const timer = setTimeout(() => {
        navigate("/user/home"); // Then redirect to the home page after 5 seconds
      }, 5000);

      return () => clearTimeout(timer); // Clean up the timer
    };

    removeAndRedirect(); // Invoke the function inside useEffect
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-green-600">Success!</h1>
        <p className="mt-4 text-gray-600">
          You will be redirected to the home page in 5 seconds.
        </p>
      </div>
    </div>
  );
};
