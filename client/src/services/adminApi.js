import toast from "react-hot-toast";
import { axiosInstance } from "../config/axiosInstance";

export const adminLogin = async (data) => {
  try {
    const response = await axiosInstance({
      url: "/admin/login",
      method: "POST",
      withCredentials: true,
      data,
    });

    return response?.data;
  } catch (error) {
    console.error("Error in user login:", error);
    return {
      success: false,
      message: "Login failed: User not found or incorrect password",
    };
  }
};


export const adminCreateProduct = async (data) => {
  try {
    const response = await axiosInstance({
      url: "/product/create",
      method: "POST",
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
    toast.success("Product created successfully!");
    return response?.data;
    
  } catch (error) {
    console.error("Error in creating product:", error);
    toast.error("Product creation failed!");
    return {
   
      
      success: false,
      message: "Product creation failed!",
    };
  }
};

export const fetchAdminProfile = async (setAdmin) => {
  try {
    const response = await axiosInstance({
      url: "/admin/profile",
      method: "GET",
      withCredentials: true,
    });
    console.log(response)
    setAdmin(response?.data?.data);
  } catch (error) {
    console.log(error);
    toast.error("error fetching data  from server");
  }
};

export const AdminLogout = async () => {
  try {
    const response = await axiosInstance({
      url: "/admin/logout",
      method: "POST",
      withCredentials: true,
    });

    return response?.data;
  } catch (error) {
    console.log(error);
  }
};