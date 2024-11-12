import React from "react";
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
            <button className="w-full bg-green-600 text-white rounded-lg py-2 px-4 text-lg font-semibold hover:bg-green-700 transition-colors duration-300">
              More Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
