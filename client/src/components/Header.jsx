import React from "react";
import { Link } from "react-router-dom";
import { DarkMode } from "./ui/DarkMode";
//import { Wishlist } from "./ui/Wishlist";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg h-16 flex items-center justify-between px-6 md:px-12">
      <div className="flex items-center space-x-4">
        <h1 className="text-3xl font-extrabold">bella</h1>
      </div>

      <nav className="flex space-x-8 text-lg font-semibold">
        <Link
          to={"/"}
          className="hover:text-gray-200 transition-colors duration-300"
        >
          Home
        </Link>
        <Link
          to={"/about"}
          className="hover:text-gray-200 transition-colors duration-300"
        >
          About
        </Link>
        <Link
          to={"/user/product"}
          className="hover:text-gray-200 transition-colors duration-300"
        >
          Product
        </Link>
        <Link
          to={"/user/offers"}
          className="hover:text-gray-200 transition-colors duration-300"
        >
          OFFERS
        </Link>
      </nav>
    

      <div className="flex items-center gap-8">
        <DarkMode/>
       

        <Link to={"/signup"}>


        <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold shadow-md hover:bg-gray-100 transition-colors duration-300">
          Login
        </button>
        </Link>
       
        
      </div>
    </header>
  );
};

export default Header;









