import React from 'react';
import { Link } from 'react-router-dom';

export const ErrorPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100 animate-fade-in">
      <h1 className="text-5xl font-bold text-red-500 mb-6 animate-bounce">
        404 Page Not Found
      </h1>
      <p className="text-lg text-gray-700 mb-4 animate-slide-in">
        Oops! The page you are looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 animate-pulse hover:animate-none"
      >
        Go Back To Home
      </Link>
    </div>
  );
};
