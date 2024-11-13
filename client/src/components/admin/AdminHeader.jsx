import React from "react";
import { Link } from "react-router-dom";

export const AdminHeader = () => {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg h-16 flex items-center justify-between px-6 md:px-12">
      <div className="flex items-center space-x-4">
        <h1>Admin dash</h1>
      </div>

      <nav className="flex space-x-8 text-lg font-semibold">
        <Link
          to="/admin/Products"
          className="hover:text-gray-200 transition-colors duration-300"
        >
          Products
        </Link>
        <Link
          to="/admin/create-product"
          className="hover:text-gray-200 transition-colors duration-300"
        >
         Create Product
        </Link>
        <Link
          to="/admin/delete-and-update"
          className="hover:text-gray-200 transition-colors duration-300"
        >
         Delete-and-Update
        </Link>
        <Link
          to="/admin/user-orders"
          className="hover:text-gray-200 transition-colors duration-300"
        >
        User Order
        </Link>
        <Link
          to="/admin/user-details"
          className="hover:text-gray-200 transition-colors duration-300"
        >
       User Details
        </Link>
      </nav>

      <div className="flex items-center gap-8">
        <Link to="/admin/profile">
          <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold shadow-md hover:bg-gray-100 transition-colors duration-300">
            Profile
          </button>
        </Link>
      </div>
    </header>
  );
};
