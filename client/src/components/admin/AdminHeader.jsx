import React, { useState } from "react";
import { Link } from "react-router-dom";

export const AdminHeader = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg h-16 flex items-center justify-between px-6 md:px-12 relative z-10">
      {/* Logo and Title */}
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold">ADMIN DASHBOARD</h1>
      </div>

      {/* Navigation Links for Desktop */}
      <nav className="hidden md:flex space-x-8 text-lg font-semibold">
        <Link
          to="/admin/Products"
          className="hover:text-gray-200 transition-colors duration-300"
        >
          PRODUCTS
        </Link>
        <Link
          to="/admin/create-product"
          className="hover:text-gray-200 transition-colors duration-300"
        >
          CREATE PRODUCT
        </Link>
        <Link
          to="/admin/delete-and-update"
          className="hover:text-gray-200 transition-colors duration-300"
        >
          DELETE / update
        </Link>
        <Link
          to="/admin/user-orders"
          className="hover:text-gray-200 transition-colors duration-300"
        >
          USER ORDERS
        </Link>
        <Link
          to="/admin/user-details"
          className="hover:text-gray-200 transition-colors duration-300"
        >
          USER DETAILS
        </Link>
      </nav>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button
          className="text-white focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu (Responsive Links) */}
      <div
        className={`${
          isMobileMenuOpen ? "block" : "hidden"
        } absolute top-16 left-0 w-full bg-gradient-to-r from-blue-500 to-indigo-600 md:hidden p-6 z-20`}
      >
        <nav className="flex flex-col space-y-4 text-lg font-semibold">
          <Link
            to="/admin/Products"
            className="text-white hover:text-gray-200 transition-colors duration-300"
            onClick={toggleMobileMenu}
          >
             PRODUCTS
          </Link>
          <Link
            to="/admin/create-product"
            className="text-white hover:text-gray-200 transition-colors duration-300"
            onClick={toggleMobileMenu}
          >
            CREATE PRODUCT
          </Link>
          <Link
            to="/admin/delete-and-update"
            className="text-white hover:text-gray-200 transition-colors duration-300"
            onClick={toggleMobileMenu}
          >
            DELETE / update
          </Link>
          <Link
            to="/admin/user-orders"
            className="text-white hover:text-gray-200 transition-colors duration-300"
            onClick={toggleMobileMenu}
          >
            USER ORDERS
          </Link>
          <Link
            to="/admin/user-details"
            className="text-white hover:text-gray-200 transition-colors duration-300"
            onClick={toggleMobileMenu}
          >
             USER DETAILS
          </Link>
        </nav>
      </div>

      {/* Profile Button */}
      <div className="flex items-center gap-8">
        <Link to="/admin/profile">
          <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold shadow-md hover:bg-gray-100 transition-colors duration-300">
            PROFILE
          </button>
        </Link>
      </div>
    </header>
  );
};
