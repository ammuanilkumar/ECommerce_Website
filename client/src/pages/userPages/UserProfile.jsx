import { Link, useNavigate, useParams } from "react-router-dom";
import { userLogout } from "../../services/userApi";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";

export const UserProfile = () => {
  const [user, setUser] = useState({});
  const [orderDetails, setOrderDetails] = useState(null); // New state for order details
  const [error, setError] = useState(null); // Error state for order details
  const [loading, setLoading] = useState(true); // Loading state for fetching data
  const navigate = useNavigate();
  const { id } = useParams(); // Assuming you pass order ID through URL params

  // Fetch user profile data
  const fetchUserProfile = async () => {
    try {
      const response = await axiosInstance({
        url: "/user/profile",
        method: "GET",
        withCredentials: true,
      });
      if (response?.data?.success) {
        setUser(response?.data?.data);
      }
    } catch (error) {
      toast.error("Error fetching data from server");
    }
  };

  const handleLogout = async () => {
    try {
      const response = await userLogout();
      if (response) {
        toast.success("Logout successful");
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error logging out");
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 flex justify-center">
      <div className="container mx-auto max-w-4xl bg-white p-8 shadow-lg rounded-lg">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user.profile} alt="User Avatar" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">{user.name}</h2>
              <p className="text-gray-500">
                <span className="font-medium text-gray-900">Email:</span>{" "}
                {user.email}
              </p>
              {/* Display phone */}
              <p>
                <span className="font-medium text-gray-900">Mobile:</span>{" "}
                {user.mobile}
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4 w-full md:w-auto">
            <Link to={"/user/profile-update"} className="w-full md:w-auto">
              <button className="btn btn-primary mb-2 md:mb-0 w-full md:w-auto">
                Edit Profile
              </button>
            </Link>
            <Link to={"/user/orderdetails"} className="w-full md:w-auto">
              <button className="btn btn-outline btn-secondary mb-2 md:mb-0 w-full md:w-auto">
                Order Details
              </button>
            </Link>
            <button
              className="btn btn-error w-full md:w-auto"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <h2 className="text-center text-1xl font-bold text-gray-900 mb-4 capitalize">
              Name: {user.name}
            </h2>
            <p>
              <span className="font-medium text-gray-900">Email:</span>{" "}
              {user.email}
            </p>
            <p>
              <strong>Phone:</strong> +91 {user.mobile}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
