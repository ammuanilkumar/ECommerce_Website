import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DarkMode } from "../ui/DarkMode";
import { CircleUserRound } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { HeartIcon } from "@heroicons/react/24/outline";

export const UserHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg">
      <div className="flex items-center justify-between h-16 px-6 md:px-12">
        {/* Logo */}
        <h1 className="text-3xl font-extrabold">Bella</h1>

        {/* Hamburger Menu Icon */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 text-lg font-semibold">
          <Link to={"/user/home"} className="hover:text-gray-200 transition-colors duration-300">
            Home
          </Link>
          <Link to={"/user/about"} className="hover:text-gray-200 transition-colors duration-300">
            About
          </Link>
          <Link to={"/user/product"} className="hover:text-gray-200 transition-colors duration-300">
            Product
          </Link>
        </nav>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-8">
          <DarkMode />

          <Link to="/user/wishlist" className="relative flex items-center">
            <HeartIcon className="h-6 w-6 text-white hover:text-red-300" />
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-4 w-4 text-xs flex items-center justify-center">
              {/* Replace with dynamic count if available */}
            </span>
          </Link>

          <Link to={"/user/profile"} className="flex items-center">
            <CircleUserRound className="h-6 w-6 text-white hover:text-gray-300" />
          </Link>

          <Link to={"/user/cart"} className="flex items-center">
            <ShoppingCart className="h-6 w-6 text-white hover:text-gray-300" />
          </Link>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-indigo-700 px-6 py-4 space-y-4">
          <Link
            to={"/user/home"}
            className="block text-lg font-semibold hover:text-gray-200 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to={"/user/about"}
            className="block text-lg font-semibold hover:text-gray-200 transition-colors duration-300"
          >
            About
          </Link>
          <Link
            to={"/user/product"}
            className="block text-lg font-semibold hover:text-gray-200 transition-colors duration-300"
          >
            Product
          </Link>
          <div className="flex items-center justify-between">
            <DarkMode />
            <Link to="/user/wishlist" className="relative flex items-center">
              <HeartIcon className="h-6 w-6 text-white hover:text-red-300" />
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-4 w-4 text-xs flex items-center justify-center">
                {/* Replace with dynamic count */}
              </span>
            </Link>

            <Link to={"/user/profile"} className="flex items-center">
              <CircleUserRound className="h-6 w-6 text-white hover:text-gray-300" />
            </Link>

            <Link to={"/user/cart"} className="flex items-center">
              <ShoppingCart className="h-6 w-6 text-white hover:text-gray-300" />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};


// import React from "react";
// import { Link } from "react-router-dom";
// import { DarkMode } from "../ui/DarkMode";
// import { CircleUserRound } from "lucide-react";
// import { ShoppingCart } from "lucide-react";
// import { HeartIcon } from "@heroicons/react/24/outline";

// export const UserHeader = () => {
//   return (
//     <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg h-16 flex items-center justify-between px-6 md:px-12">
//       <div className="flex items-center space-x-4">
//         <h1 className="text-3xl font-extrabold">Bella</h1>
//       </div>

//       <nav className="flex space-x-8 text-lg font-semibold">
//         <Link to={"/user/home"} className="hover:text-gray-200 transition-colors duration-300">
//           Home
//         </Link>
//         <Link to={"/user/about"} className="hover:text-gray-200 transition-colors duration-300">
//           About
//         </Link>
//         <Link to={"/user/product"} className="hover:text-gray-200 transition-colors duration-300">
//           Product
//         </Link>
//         {/* <Link to={"/user/offers"} className="hover:text-gray-200 transition-colors duration-300">
//           Offers
//         </Link> */}
//         {/* <Link to={"/user/wishlist"} className="hover:text-gray-200 transition-colors duration-300">
//           Wishlist
//         </Link> */}
//       </nav>

//       <div className="flex items-center gap-8">
//         <DarkMode />
        
//         <Link to="/user/wishlist" className="relative flex items-center">
//           <HeartIcon className="h-6 w-6 text-white hover:text-red-300" />
//           <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-4 w-4 text-xs flex items-center justify-center">
//              {/* Replace with dynamic count if available */}
//           </span>
//         </Link>

//         <Link to={"/user/profile"} className="flex items-center">
//           <CircleUserRound className="h-6 w-6 text-white hover:text-gray-300" />
//         </Link>

//         <Link to={"/user/cart"} className="flex items-center">
//           <ShoppingCart className="h-6 w-6 text-white hover:text-gray-300" />
//         </Link>
//       </div>
//     </header>
//   );
// };

// import { Link } from "react-router-dom";
// import { DarkMode } from "../ui/DarkMode";
// import { CircleUserRound } from "lucide-react";
// import { ShoppingCart } from "lucide-react";
// import { HeartIcon } from "@heroicons/react/24/outline";
// export const UserHeader = () => {
//   return (
//     <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg h-16 flex items-center justify-between px-6 md:px-12">
//       <div className="flex items-center space-x-4">
//         <h1 className="text-3xl font-extrabold">Bella</h1>
//       </div>

//       <nav className="flex space-x-8 text-lg font-semibold">
//         <Link
//           to={"/user/home"}
//           className="hover:text-gray-200 transition-colors duration-300"
//         >
//           Home
//         </Link>
//         <Link
//           to={"/user/about"}
//           className="hover:text-gray-200 transition-colors duration-300"
//         >
//           About
//         </Link>

//         <Link
//           to={"/user/product"}
//           className="hover:text-gray-200 transition-colors duration-300"
//         >
//           Product
//         </Link>

//         <Link
//           to={"/user/offers"}
//           className="hover:text-gray-200 transition-colors duration-300"
//         >
//           OFFERS
//           <Link to="/wishlist">Wishlist</Link>


//         </Link>
//       </nav>
//       <div className="flex items center gap-8">
//         <DarkMode />
//         <Link to="/wishlist" className="relative flex items-center">
//           <HeartIcon className="h-6 w-6 text-white hover:text-red-300" />
//           <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-4 w-4 text-xs flex items-center justify-center">
//             3 {/* Replace with dynamic count if available */}
//           </span>
//         </Link>
//         <Link to={"/user/profile"}>
//           <CircleUserRound />
//         </Link>
//         <Link to={"/user/cart"}>
       
//           <ShoppingCart />
//         </Link>
//       </div>
//     </header>
//   );
// };
