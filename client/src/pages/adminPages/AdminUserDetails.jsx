import React, { useState , useEffect} from 'react'
import { axiosInstance } from '../../config/axiosInstance';
import Swal from "sweetalert2";

const AdminUserDetails = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await axiosInstance({
          url: "/admin/getuserlist",
          method: "GET",
          withCredentials: true,
        });
        setUserData(response?.data?.data || []);
      } catch (error) {
        console.error("Error fetching user list:", error);
        Swal.fire("Error", "Failed to fetch user list", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchUserList();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await axiosInstance({
          url: `/admin/deleteUser/${id}`,
          method: "DELETE",
          withCredentials: true,
        });

        if (response.data.success) {
          Swal.fire("Deleted!", response.data.message, "success");
          setUserData((prevUserData) =>
            prevUserData.filter((user) => user._id !== id)
          );
        } else {
          Swal.fire("Error", response.data.message, "error");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        Swal.fire("Error", "Failed to delete user", "error");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  if (userData.length === 0) {
    return <div className="text-center p-5">No users found.</div>;
  }

  return (
    <div className="overflow-x-auto p-5">
      <table className="table-auto w-full text-left border-separate border-spacing-0">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="p-3">Photo</th>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Date Created</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm font-light">
          {userData.map((user) => (
            <tr
              key={user._id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="p-3">
                <img
                  src={user.photo || "/path/to/default-image.jpg"}
                  alt="User"
                  className="h-12 w-12 rounded-full"
                />
              </td>
              <td className="p-3">
                <span className="font-medium">{user.name}</span>
              </td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td className="p-3 text-center">
                <button
                  className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200"
                  onClick={() => handleDelete(user._id)}
                  aria-label={`Delete ${user.name}`}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUserDetails
