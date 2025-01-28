import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";

const SellerProfile = () => {
  const [seller, setSeller] = useState(null); // Initial state is null
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  // Fetch seller profile details from the server
  const fetchSellerProfile = async () => {
    try {
      const response = await axiosInstance({
        url: "/seller/profile",
        method: "GET",
        withCredentials: true,
      });
      setSeller(response?.data?.data); // Update seller state
    } catch (error) {
      console.error(error);
      toast.error("Error fetching seller data from server");
    } finally {
      setIsLoading(false); // Loading complete
    }
  };

  // Logout API for seller
  const SellerLogout = async () => {
    try {
      const response = await axiosInstance({
        url: "/seller/logout",
        method: "POST",
        withCredentials: true,
      });
      return response?.data;
    } catch (error) {
      console.error(error);
    }
  };

  // Handle logout functionality
  const handleLogout = async () => {
    try {
      const response = await SellerLogout();
      if (response) {
        toast.success("Logout successful");
        navigate("/sellerlogin");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error logging out");
    }
  };

  // Use effect hook to fetch seller data when the component mounts
  useEffect(() => {
    fetchSellerProfile();
  }, []);

  // Render loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 flex justify-center">
      <div className="container mx-auto max-w-4xl bg-white p-8 shadow-lg rounded-lg">
        {/* Profile Header */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="avatar">
              <div className="w-24 lg:w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={seller?.profile || "https://via.placeholder.com/150"} // Use seller's profile image or fallback
                  alt="Seller"
                />
              </div>
            </div>
            <div>
              <p className="text-gray-500">
                <span className="font-medium text-gray-900">Email:</span>{" "}
                {seller?.email || "N/A"}
              </p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-4 mt-4 lg:mt-0">
            <button
              className="btn btn-error mt-2 lg:mt-0"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-lg font-semibold mb-4">Seller Information</h3>
            <p>
              <span className="font-medium text-gray-900">Email:</span>{" "}
              {seller?.email || "N/A"}
            </p>
            <p>
              <span className="font-medium text-gray-900">Name:</span>{" "}
              {seller?.name || "N/A"}
            </p>
            <p>
              <span className="font-medium text-gray-900">Mobile:</span>{" "}
              {seller?.mobile || "N/A"}
            </p>
            <p>
              <strong>Role:</strong> Seller
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
