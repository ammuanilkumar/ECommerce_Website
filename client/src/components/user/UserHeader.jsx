import React from "react";
import { Link } from "react-router-dom";
import { DarkMode } from "../ui/DarkMode";
import { CircleUserRound } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { HeartIcon } from "@heroicons/react/24/outline";

export const UserHeader = () => {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg h-16 flex items-center justify-between px-6 md:px-12">
      <div className="flex items-center space-x-4">
        <h1 className="text-3xl font-extrabold">Bella</h1>
      </div>

      <nav className="flex space-x-8 text-lg font-semibold">
        <Link to={"/user/home"} className="hover:text-gray-200 transition-colors duration-300">
          Home
        </Link>
        <Link to={"/user/about"} className="hover:text-gray-200 transition-colors duration-300">
          About
        </Link>
        <Link to={"/user/product"} className="hover:text-gray-200 transition-colors duration-300">
          Product
        </Link>
        {/* <Link to={"/user/offers"} className="hover:text-gray-200 transition-colors duration-300">
          Offers
        </Link> */}
        {/* <Link to={"/user/wishlist"} className="hover:text-gray-200 transition-colors duration-300">
          Wishlist
        </Link> */}
      </nav>

      <div className="flex items-center gap-8">
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
    </header>
  );
};

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
