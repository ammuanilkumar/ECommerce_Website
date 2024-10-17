import React from "react";
import { Link } from "react-router-dom";
import { DarkMode } from "../ui/DarkMode";
import { CircleUserRound } from "lucide-react";
import { ShoppingCart } from "lucide-react";

export const UserHeader = () => {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg h-16 flex items-center justify-between px-6 md:px-12">
      <div className="flex items-center space-x-4">
        <h1 className="text-3xl font-extrabold">Logo</h1>
      </div>

      <nav className="flex space-x-8 text-lg font-semibold">
        <Link
          to={"/user/home"}
          className="hover:text-gray-200 transition-colors duration-300"
        >
          Home
        </Link>
        <Link
          to={"/user/about"}
          className="hover:text-gray-200 transition-colors duration-300"
        >
          About
        </Link>

        <Link
          to="/user/product"
          className="hover:text-gray-200 transition-colors duration-300"
        >
          Product
        </Link>

        <Link
          to="/user/offers"
          className="hover:text-gray-200 transition-colors duration-300"
        >
          OFFERS
        </Link>
      </nav>
      <div className="flex items center gap-8">
        <DarkMode />
        <Link to={"/user/profile"}>
          <CircleUserRound />
        </Link>
        <Link to={"/user/cart"}>
       
          <ShoppingCart />
        </Link>
      </div>
    </header>
  );
};
