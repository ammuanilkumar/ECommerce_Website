import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance";

const UserProfileUpdate = () => {
  const { id } = useParams(); // Get user ID from the URL
  const navigate = useNavigate(); // Hook for navigation

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    profile: "", // URL or path to profile image
  });
  const [error, setError] = useState(""); // For error messages
  const [loading, setLoading] = useState(false); // Loading state for the submit button

  // Fetch the user's current profile data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`/user/profile-update/${id}`, {
          withCredentials: true,
        });
        setUser(response.data); // Set the user data
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to fetch user data");
      }
    };

    fetchUserData();
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value })); // Update user state dynamically
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true during the update process
    try {
      await axiosInstance.post(`/user/profile-update/${id}`, user, {
        withCredentials: true,
      });
      setLoading(false);
      alert("Profile updated successfully");
      navigate(`/profile/${id}`); // Redirect to the updated profile page
    } catch (err) {
      setLoading(false);
      console.error("Error updating profile:", err);
      setError("Error updating profile, please try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Update Profile</h2>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        {/* Name Input */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-semibold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        {/* Phone Input */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-sm font-semibold mb-2">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        {/* Profile Image URL Input */}
        <div className="mb-4">
          <label htmlFor="profile" className="block text-sm font-semibold mb-2">
            Profile Image URL
          </label>
          <input
            type="text"
            id="profile"
            name="profile"
            value={user.profile}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className={`px-6 py-2 text-white rounded-md ${
              loading ? "bg-gray-400" : "bg-blue-500"
            }`}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfileUpdate;
