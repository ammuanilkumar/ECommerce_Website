
import { useEffect, useState} from 'react';
import { axiosInstance } from "./../../config/axiosInstance";
import { useLocation, useNavigate } from 'react-router-dom';

export const UserAuth = ({childern}) => {
    const navigate = useNavigate();
    const location = useLocation();
    //const [user, setUser] = userState()

  

    const checkUser = async () => {
        try {
            const response = await axiosInstance({
                url:'/user/check-user',
                method:'GET',
                withCredentials :true,
                
                
            });
           // setUser(true);
            console.log(response,"====response");
            return response?.data;
        } catch (error) {
            navigate("/login");
            console.error("Authentication check failed:", error);
        
            
        }
    };
    useEffect(()=>{
        checkUser();
    },[location.pathname, navigate]);
  //return user ? childern : null;
  return childern ;
};
