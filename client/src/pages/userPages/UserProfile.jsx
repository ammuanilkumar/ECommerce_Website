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
      setUser(response?.data?.data);
    } catch (error) {
      toast.error("Error fetching data from server");
    }
  };

  // Fetch order details based on order ID
  const fetchOrderDetails = async () => {
    try {
      const response = await axiosInstance({
        url: `/user/order/${id}`, // Ensure you have the correct URL for fetching order details
        method: "GET",
        withCredentials: true,

      });
      console.log(response)
      if (response?.data) {
        setOrderDetails(response.data);
      } else {
        setError("Order details not found");
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
      setError("No order details available");
    } finally {
      setLoading(false);
    }
  };

  // Handle logout
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
    fetchOrderDetails();
  
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 flex justify-center">
      <div className="container mx-auto max-w-4xl bg-white p-8 shadow-lg rounded-lg">
        {/* Profile Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user.profile} alt="User Avatar" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">{user.name}</h2>
              <p className="text-gray-500">
                <span className="font-medium text-gray-900">Email:</span> {user.email}
              </p>
            </div>
          </div>
          <div className="flex space-x-4">
            <button className="btn btn-primary">Edit Profile</button>
            <Link to={"/user/orderdetails"} className="w-full">
              <button className="btn btn-outline btn-secondary">
                Order Details
              </button>
            </Link>
            <button className="btn btn-error" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>

        {/* Profile Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <h2 className="text-center text-1xl font-bold text-gray-900 mb-4 capitalize">Name: {user.name}</h2>
            <p><span className="font-medium text-gray-900">Email:</span> {user.email}</p>
            <p><strong>Phone:</strong> +91</p>
            <p><strong>Address:</strong> 1234 Erkm Street</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
            <p><strong>Shipping Address:</strong> 4567 Avenue , Springfield</p>
            <p><strong>Delivery Preferences:</strong> Leave at the front door</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-lg font-semibold mb-4">Payment Methods</h3>
            <p><strong>Credit Card:</strong> **** **** **** 1234</p>
            <p><strong>PayPal:</strong> jithu1234@paypal.com</p>
          </div>
        </div>

        {/* Order History */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Order History</h3>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Details</th> {/* New column for order details */}
                </tr>
              </thead>
              <tbody>
                {/* Example order rows */}
                <tr>
                  <td>#123456</td>
                  <td>October 10, 2024</td>
                  <td><span className="badge badge-success">Delivered</span></td>
                  <td>$49.99</td>
                  <td>
                    <button className="btn btn-outline btn-primary btn-sm">
                      View Details
                    </button> {/* View Order Details Button */}
                  </td>
                </tr>
                <tr>
                  <td>#123457</td>
                  <td>October 5, 2024</td>
                  <td><span className="badge badge-warning">Processing</span></td>
                  <td>$89.99</td>
                  <td>
                    <button className="btn btn-outline btn-primary btn-sm">
                      View Details
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>#123458</td>
                  <td>September 30, 2024</td>
                  <td><span className="badge badge-error">Cancelled</span></td>
                  <td>$24.99</td>
                  <td>
                    <Link to="/user/orderdetails" className="w-full">
                      <button className="btn btn-outline btn-primary btn-sm">
                        View Details
                      </button>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Account Settings */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Account Settings</h3>
          <div className="flex space-x-4">
            <button className="btn btn-error">Delete Account</button>
            <button className="btn btn-outline btn-secondary">Change Password</button>
          </div>
        </div>
      </div>
    </div>
  );
};
