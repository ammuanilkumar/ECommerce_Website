import React from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axiosInstance from "../../config/axiosInstance"; 

export const AdminLoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const adminLogin = async (data) => {
    try {
      const response = await axiosInstance({
        url: "/admin/login",
        method: "POST",
        withCredentials: true,
        data,
      });

      return response?.data;
    } catch (error) {
      console.error("Error in admin login API call:", error);
      return {
        success: false,
        message: "Login failed: Admin not found or incorrect password",
      };
    }
  };

  const handleLogin = async (data) => {
    try {
      const response = await adminLogin(data);

      if (response && response.success) {
        toast.success("Successfully logged in as Admin");
        navigate("/admin/products");
      } else {
        toast.error(response?.message || "Admin Login failed");
      }
    } catch (error) {
      toast.error("Login failed: Admin not found or incorrect password");
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen flex items-center justify-center p-4">
      <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-6xl">
        <div className="card bg-base-100 w-full max-w-md shrink-0 shadow-xl lg:ml-12 p-6 rounded-lg border border-gray-200">
          <form
            className="card-body space-y-6"
            onSubmit={handleSubmit(handleLogin)}
          >
            <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
              Admin Login
            </h2>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg font-semibold">
                  Admin Email
                </span>
              </label>
              <input
                type="email"
                placeholder="Enter your admin email"
                className="input input-bordered w-full p-3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                {...register("email", {
                  required: "Admin email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg font-semibold">
                  Admin Password
                </span>
              </label>
              <input
                type="password"
                placeholder="Enter your admin password"
                className="input input-bordered w-full p-3 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                {...register("password", {
                  required: "Admin password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="form-control mt-6 flex flex-col gap-4">
              <button className="btn btn-primary w-full bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300">
                Admin Login
              </button>
              <Link to={"/"}>
                <button className="bg-red-600 text-white w-full px-4 py-3 rounded-lg shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300">
                  Back To Home
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
