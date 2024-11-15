import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { axiosInstance } from "../../config/axiosInstance"; // Ensure axiosInstance is correctly set up

const UserProfileUpdate = () => {
  const { id } = useParams(); // Get the user ID from URL parameters
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    profile: "", // URL or path to profile image
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  // Fetch the user's current profile data on mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`/user/profile-update/${id}`, {
          withCredentials: true, // Ensure cookies are sent with the request if needed
        });
        setUser(response.data); // Set the fetched user data into state
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to fetch user data"); // Set error message in case of failure
      }
    };
    fetchUserData();
  }, [id]); // Dependency array ensures the effect runs when the `id` changes

  // Handle form field changes and update the state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value })); // Dynamically update the respective field
  };

  // Handle form submission with POST method to update user data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true while the request is being processed
    try {
      // Sending the POST request to update user data
      const response = await axiosInstance.post(
        `/user/profile-update/${id}`,
        user,
        {
          withCredentials: true, // Include credentials if needed
        }
      );
      setLoading(false); // Reset loading state after the request
      alert("Profile updated successfully"); // Show success alert
      history.push(`/profile/${id}`); // Redirect to the updated profile page
    } catch (err) {
      setLoading(false); // Reset loading state in case of error
      setError("Error updating profile, please try again."); // Display error message
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Displaying your minimal content */}
      <h1 className="text-2xl font-bold text-center mb-4">Haloo</h1>{" "}
      {/* This is your simple heading */}
      <h2 className="text-2xl font-bold text-center mb-4">Update Profile</h2>
      {error && (
        <div className="text-red-500 text-center mb-4">{error}</div>
      )}{" "}
      {/* Display error message */}
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
            {loading ? "Updating..." : "Update Profile"}{" "}
            {/* Change button text during loading */}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserProfileUpdate;
