// import React from 'react';
// import { Link } from 'react-router-dom';
// //import ErrorPage from '/errorPage/ErrorPage';



// export const ErrorPage = () => {
//   return (
//     <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-100 animate-fade-in">
//       <h1 className="text-5xl font-bold text-red-500 mb-6 animate-bounce">
//         404 Page Not Found
//       </h1>
//       <p className="text-lg text-gray-700 mb-4 animate-slide-in">
//         Oops! The page you are looking for doesn't exist.
//       </p>
//       <Link
//         to="/"
//         className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 animate-pulse hover:animate-none"
//       >
//         Go Back To Home
//       </Link>
//     </div>
//   );
// };

import { Link } from "react-router-dom";

export const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="text-center p-10 bg-white rounded-lg shadow-lg">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">
          404
        </h1>
        <p className="text-2xl font-light text-gray-600 mb-8">
          Oops! The page you are looking for does not exist.
        </p>
        <div className="flex justify-center mb-8">
          <div className="w-24 h-24 bg-indigo-500 rounded-full animate-bounce"></div>
        </div>
        <Link
          to="/"
          className="px-8 py-3 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};