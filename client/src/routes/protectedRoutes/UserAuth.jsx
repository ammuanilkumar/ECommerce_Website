import { useEffect } from "react";
import { axiosInstance } from "./../../config/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";

export const UserAuth = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await axiosInstance({
          url: "/user/check-user",
          method: "GET",
          withCredentials: true,
        });

        return response?.data;
      } catch (error) {
        navigate("/login");
        console.error("Authentication check failed:", error);
      }
    };

    checkUser();
  }, [location.pathname, navigate]);

  return children;
};
