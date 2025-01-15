import React, { useState } from "react";
import { Link } from "react-router-dom";
import { DarkMode } from "./ui/DarkMode";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg">
      <div className="flex items-center justify-between h-16 px-6 md:px-12">
        {/* Logo */}
        <h1 className="text-3xl font-extrabold">bella</h1>

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
            to={"/product"}
            className="hover:text-gray-200 transition-colors duration-300"
          >
            Product
          </Link>
        </nav>

        {/* Dark Mode & Login Button */}
        <div className="hidden md:flex items-center gap-8">
          <DarkMode />
          <Link to={"/signup"}>
            <button className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold shadow-md hover:bg-gray-100 transition-colors duration-300">
              Login
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-indigo-700 px-6 py-4 space-y-4">
          <Link
            to={"/"}
            className="block text-lg font-semibold hover:text-gray-200 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to={"/about"}
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
            <Link to={"/signup"}>
              <button className="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold shadow-md hover:bg-gray-100 transition-colors duration-300">
                Login
              </button>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;










