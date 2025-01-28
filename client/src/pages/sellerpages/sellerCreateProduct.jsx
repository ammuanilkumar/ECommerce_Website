import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { axiosInstance } from "../../config/axiosInstance";

// API function to create a product
const sellerCreateProduct  = async (data) => {
  try {
    const response = await axiosInstance({
      url: "/seller/createproduct",
      method: "POST",
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data,
    });
    toast.success("Product created successfully!");
    return response?.data;
  } catch (error) {
    console.error("Error in creating product:", error);
    toast.error("Product creation failed!");
    return {
      success: false,
      message: "Product creation failed!",
    };
  }
};

const SellerCreateProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();
  const watchImage = watch("image");

  const handleCreateProduct = async (data) => {
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("desc", data.desc);
      formData.append("brand", data.brand);
      formData.append("price", data.price);
      formData.append("category", data.category);
      formData.append("stock", data.stock);
      formData.append("ratings", data.ratings);
      if (watchImage && watchImage[0]) {
        formData.append("image", watchImage[0]);
      }

      const response = await sellerCreateProduct(formData);
      if (response && response.success) {
        toast.success("Product created successfully");
        navigate("/seller/products");
      }
    } catch (error) {
      console.error(error);
      toast.error("Create Product Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 via-purple-800 to-indigo-900 text-white flex items-center justify-center">
      <div className="bg-gray-900 p-8 rounded-lg shadow-xl w-full max-w-xl">
        <h2 className="text-4xl font-bold text-center mb-6">
          Create New Product
        </h2>
        <form
          className="space-y-5"
          encType="multipart/form-data"
          onSubmit={handleSubmit(handleCreateProduct)}
        >
          {/* Title */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white">Title</span>
            </label>
            <input
              type="text"
              placeholder="Product Title"
              {...register("title", { required: "Title is required" })}
              className="input input-bordered w-full bg-gray-700 border-transparent focus:border-indigo-500"
            />
            {errors.title && (
              <span className="text-red-400">{errors.title.message}</span>
            )}
          </div>

          {/* Description */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white">Description</span>
            </label>
            <textarea
              placeholder="Product Description"
              {...register("desc", { required: "Description is required" })}
              className="textarea textarea-bordered w-full bg-gray-700 border-transparent focus:border-indigo-500"
            />
            {errors.desc && (
              <span className="text-red-400">{errors.desc.message}</span>
            )}
          </div>

          {/* Brand */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white">Brand</span>
            </label>
            <input
              type="text"
              placeholder="Product Brand"
              {...register("brand", { required: "Brand is required" })}
              className="input input-bordered w-full bg-gray-700 border-transparent focus:border-indigo-500"
            />
            {errors.brand && (
              <span className="text-red-400">{errors.brand.message}</span>
            )}
          </div>

          {/* Price */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white">Price</span>
            </label>
            <input
              type="number"
              placeholder="Price"
              {...register("price", { required: "Price is required" })}
              className="input input-bordered w-full bg-gray-700 border-transparent focus:border-indigo-500"
            />
            {errors.price && (
              <span className="text-red-400">{errors.price.message}</span>
            )}
          </div>

          {/* Category */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white">Category</span>
            </label>
            <input
              type="text"
              placeholder="Category"
              {...register("category", { required: "Category is required" })}
              className="input input-bordered w-full bg-gray-700 border-transparent focus:border-indigo-500"
            />
            {errors.category && (
              <span className="text-red-400">{errors.category.message}</span>
            )}
          </div>

          {/* Stock */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white">Stock</span>
            </label>
            <input
              type="number"
              placeholder="Stock Quantity"
              {...register("stock", { required: "Stock is required" })}
              className="input input-bordered w-full bg-gray-700 border-transparent focus:border-indigo-500"
            />
            {errors.stock && (
              <span className="text-red-400">{errors.stock.message}</span>
            )}
          </div>

          {/* Ratings */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white">Ratings</span>
            </label>
            <input
              type="number"
              step="0.1"
              max="5"
              min="0"
              placeholder="Ratings (0 - 5)"
              {...register("ratings", { required: "Ratings are required" })}
              className="input input-bordered w-full bg-gray-700 border-transparent focus:border-indigo-500"
            />
            {errors.ratings && (
              <span className="text-red-400">{errors.ratings.message}</span>
            )}
          </div>

          {/* Image */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white">Product Image</span>
            </label>
            <input
              type="file"
              {...register("image", { required: "Image is required" })}
              className="file-input file-input-bordered w-full bg-gray-700 border-transparent focus:border-indigo-500"
            />
            {errors.image && (
              <span className="text-red-400">{errors.image.message}</span>
            )}
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6">
            <button
              type="submit"
              className="btn btn-primary w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-purple-500 hover:to-indigo-500"
            >
              Create Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellerCreateProduct;