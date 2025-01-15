
import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from "../../redux/features/counterSlice";
//import Carousel from "../components/Carousel"; 
import Carousel from "../../components/Carousel";

export const UserHome = () => {
  const { value } = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-5 py-10">
      
      {/* Welcome Section with Background Image */}
      <section
        className="text-center mb-10 bg-cover bg-center relative w-full h-[400px]  md:h-[600px] flex flex-col justify-center items-center text-white"
        style={{ backgroundImage: 'url("/images/blue_homeroot_image.jpg")' }}
      >
        {/* Optional Overlay for better text visibility */}
        <div className></div>
        
        <h1 className="text-4xl font-bold relative z-10">Welcome to Our Store!</h1>
        <p className="text-lg mt-3 relative z-10">
          Discover our exclusive collection and enjoy shopping with special offers!
        </p>
      </section>

      {/* Carousel Section */}
      <Carousel />
       

    </div>
  );
};






