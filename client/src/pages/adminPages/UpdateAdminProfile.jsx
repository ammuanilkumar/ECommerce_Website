import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../config/axiosInstance"; // Adjust this path if needed
import { useNavigate } from "react-router-dom"; // If you want to navigate after a successful update

export const UpdateAdminProfile = () => {
  const [userData, setUserData] = useState({
    name: "",
    mobile: "", // Only name and mobile now
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Fetch current admin data (optional, if you need to populate the fields initially)
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axiosInstance({
          url: "/admin/profile", // Assuming this route exists to fetch the current admin profile
          method: "GET",
          withCredentials: true,
        });
        if (response.data.data) {
          setUserData({
            name: response.data.data.name,
            mobile: response.data.data.mobile,
          });
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
        setError("Failed to fetch admin data.");
      }
    };
    fetchAdminData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await axiosInstance({
        url: "/admin/update-admin-details",
        method: "POST",
        withCredentials: true,
        data: userData,
      });

      if (response.data.success) {
        setSuccessMessage("Profile updated successfully!");
        setUserData(response.data.data); // Update with the new user data
        // Optionally redirect after update
        // navigate('/dashboard'); 
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Failed to update profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Update Your Profile
      </h2>

      {loading && <p className="text-center text-blue-500">Updating...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {successMessage && (
        <p className="text-center text-green-500">{successMessage}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <div className="form-group">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={userData.name}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        {/* Mobile Input */}
        <div className="form-group">
          <label
            htmlFor="mobile"
            className="block text-sm font-medium text-gray-700"
          >
            Mobile:
          </label>
          <input
            type="text"
            id="mobile"
            name="mobile"
            value={userData.mobile}
            onChange={handleInputChange}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};
