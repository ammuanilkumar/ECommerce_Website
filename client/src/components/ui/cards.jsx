import React, { useState } from "react";
import { Link } from "react-router-dom";
export const ProductCards = ({ product }) => {
  return (
    <div className="card card-compact bg-base-100 w-96 shadow-xl">
      <figure>
        <img src={product?.image} alt="product" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.title}</h2>
        <p>{product?.description}</p>
        <div className="card-actions justify-end">
          <Link to={`/user/product-details/${product._id}`}>
            {" "}
            <button className="btn btn-primary">Details</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCards;

export const AdminProductCards = ({ product }) => {
  return (
    <div className="card bg-white w-full md:w-80 lg:w-96 shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out rounded-lg overflow-hidden flex flex-col items-center">
      <figure className="w-full h-60 overflow-hidden">
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
        />
      </figure>
      <div className="card-body p-6 flex flex-col items-center text-center">
        <h1 className="text-xl font-semibold text-gray-900 mb-3">
          {product?.title}
        </h1>
        <p className="text-lg font-semibold text-gray-700 mb-4">
          ₹{product?.price}
        </p>
        <div className="card-actions mt-auto w-full">
          <Link to={`/admin/product-details/${product._id}`}>
            {/* <button className="w-full bg-green-600 text-white rounded-lg py-2 px-4 text-lg font-semibold hover:bg-green-700 transition-colors duration-300">
              More Details
            </button> */}
          </Link>
        </div>
      </div>
    </div>
  );
};



export const CrudProductCards = ({ product, onDelete }) => {
  const [showModal, setShowModal] = useState(false); // Modal state to control visibility

  const handleDeleteClick = () => {
    setShowModal(true); // Show modal when delete is clicked
  };

  const confirmDelete = () => {
    setShowModal(false); // Close modal
    onDelete(); // Call the delete function passed via props
  };

  return (
    <div className="card bg-white w-full md:w-80 lg:w-96 shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out rounded-lg overflow-hidden flex flex-col items-center">
      <figure className="w-full h-60 overflow-hidden">
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
        />
      </figure>
      <div className="card-body p-5 flex flex-col items-center text-center">
        <h1 className="text-xl font-bold text-gray-900 mb-4">
          {product?.title}
        </h1>
        <p className="text-xl font-bold text-indigo-600 mb-4">
          ₹{product?.price}
        </p>
        <div className="card-actions mt-auto w-full flex gap-2 justify-between">
          {/* <Link to={`/admin/product-details/${product._id}`}>
            <button className="flex-1 bg-blue-600 text-white rounded-lg py-2 px-4 text-lg font-semibold hover:bg-blue-700 transition-colors duration-300">
              View Product
            </button>
          </Link> */}
          
          <Link to={`/admin/dashboard/update-product/${product._id}`}>
            <button className="flex-1 bg-yellow-500 text-white rounded-lg py-2 px-4 text-lg font-semibold hover:bg-yellow-600 transition-colors duration-300">
              Update Product
            </button>
          </Link>

          <button
            className="flex-1 bg-red-600 text-white rounded-lg py-2 px-4 text-lg font-semibold hover:bg-red-700 transition-colors duration-300"
            onClick={handleDeleteClick} // Show modal on click
          >
            Delete Product
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-gray-800 bg-opacity-50 absolute inset-0"></div>
          <div className="bg-white p-6 rounded-lg z-10 shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this product? This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
                onClick={() => setShowModal(false)} // Cancel button
              >
                Cancel
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                onClick={confirmDelete} // Confirm delete
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
