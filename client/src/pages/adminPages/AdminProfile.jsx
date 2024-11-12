import React from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import { AdminLogout } from "../../services/adminApi";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { axiosInstance } from '../../config/axiosInstance';


const AdminProfile = () => {
  const [admin, setAdmin] = useState({});
  const navigate = useNavigate();
  const id = useParams()
  console.log(id);
  

  const fetchAdminProfile = async () => {
    try {
      const response = await axiosInstance({
        url: "/admin/profile",
        method: "GET",
        withCredentials: true,
      });
      console.log(admin)
      setAdmin(response?.data?.data);
    } catch (error) {
      console.error(error);
      toast.error("Error fetching admin data from server");
    }
  };

  const handleLogout = async () => {
    try {
      const response = await AdminLogout();
      if (response) {
        toast.success("Logout successful");
        navigate("/admin/logout");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error logging out");
    }
  };

  useEffect(() => {
    fetchAdminProfile();
    console.log(id);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10 flex justify-center">
      <div className="container mx-auto max-w-4xl bg-white p-8 shadow-lg rounded-lg">
        
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <div className="avatar">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={admin.profile} alt="Admin Avatar" />
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">{admin.name}</h2>
              <p className="text-gray-500">
                <span className="font-medium text-gray-900">Email:</span> {admin.email}
              </p>
            </div>
          </div>
          <div className="flex space-x-4">
            <button className="btn btn-primary">Edit Profile</button>
            <Link to="/admin/reports">
              <button className="btn btn-outline btn-secondary">Reports</button>
            </Link>
            <button className="btn btn-error" onClick={handleLogout}>Logout</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-lg font-semibold mb-4">Admin Information</h3>
            <p><span className="font-medium text-gray-900">Email:</span> {admin.email}</p>
            <p><strong>Role:</strong> Administrator</p>
            <p><strong>Department:</strong> Management</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <p><strong>Phone:</strong> +91</p>
            <p><strong>Office:</strong> 1234 Admin Street</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-inner">
            <h3 className="text-lg font-semibold mb-4">Account Access</h3>
            <p><strong>Last Login:</strong> October 10, 2024</p>
            <p><strong>IP Address:</strong> 192.168.0.1</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Activity</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>User Management</td>
                  <td>October 10, 2024</td>
                  <td><span className="badge badge-success">Completed</span></td>
                  <td><button className="btn btn-outline btn-primary btn-sm">View Details</button></td>
                </tr>
                <tr>
                  <td>System Backup</td>
                  <td>October 5, 2024</td>
                  <td><span className="badge badge-warning">Pending</span></td>
                  <td><button className="btn btn-outline btn-primary btn-sm">View Details</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

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
  
}

export default AdminProfile
