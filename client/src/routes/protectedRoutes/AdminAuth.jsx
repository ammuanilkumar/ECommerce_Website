
import { useEffect } from "react";
import { axiosInstance } from "./../../config/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";

export const AdminAuth = ({ children }) => {
  const location = useLocation();
  const navgate = useNavigate();
  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axiosInstance({
          url: "/admin/check-admin",
          method: "GET",
          withCredentials: true,
        });
      
        return response?.data;
      } catch (error) {
        navgate("/adminlogin");
        console.error("Authentication check failed:",error);
      }
    };

    checkUser(location.pathname,navgate);
  })

  return children;
};