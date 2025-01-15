import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AdminLogout } from "../../services/adminApi";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";

const AdminProfile = () => {
  const [admin, setAdmin] = useState({});
  const navigate = useNavigate();

  // Fetch admin profile details from the server
  const fetchAdminProfile = async () => {
    try {
      const response = await axiosInstance({
        url: "/admin/profile", // No need to pass an id here, it's handled by the server
        method: "GET",
        withCredentials: true, // Ensures the request includes the credentials (cookies)
      });
      setAdmin(response?.data?.data); // Store the fetched admin data in state
    } catch (error) {
      console.error(error);
      toast.error("Error fetching admin data from server");
    }
  };

  // Handle logout functionality
  const handleLogout = async () => {
    try {
      const response = await AdminLogout();
      if (response) {
        toast.success("Logout successful");
        navigate("/adminlogin"); // Redirect to logout page after successful logout
      }
    } catch (error) {
      console.error(error);
      toast.error("Error logging out");
    }
  };

  // Use effect hook to fetch admin data when the component mounts
  useEffect(() => {
    fetchAdminProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 flex justify-center">
      <div className="container mx-auto max-w-4xl bg-white p-8 shadow-lg rounded-lg">
        {/* Profile Header */}
        <div className="flex flex-col lg:flex-row items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="avatar">
              <div className="w-24 lg:w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={admin.profile || "https://via.placeholder.com/150"} // Use admin's profile image or fallback
                  alt="Admin Avatar"
                />
              </div>
            </div>
            <div>
              <p className="text-gray-500">
                <span className="font-medium text-gray-900">Email:</span>{" "}
                {admin.email || "Loading..."}
              </p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row space-x-0 lg:space-x-4 mt-4 lg:mt-0">
            <Link to="/admin/update-admin-details">
              <button className="btn btn-primary">Edit Profile</button>
            </Link>
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
            <h3 className="text-lg font-semibold mb-4">Admin Information</h3>
            <p>
              <span className="font-medium text-gray-900">Email:</span>{" "}
              {admin.email || "N/A"}
            </p>
            <p>
              <strong>Role:</strong> Administrator
            </p>
            <p>
              <strong>Department:</strong> Management
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <p>
              <strong>Phone:</strong> {admin.phone || "N/A"}
            </p>
            <p>
              <strong>Office:</strong> 1234 Admin Street
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-lg font-semibold mb-4">Account Access</h3>
            <p>
              <strong>Last Login:</strong> {admin.lastLogin || "N/A"}
            </p>
            <p>
              <strong>IP Address:</strong> {admin.ip || "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
