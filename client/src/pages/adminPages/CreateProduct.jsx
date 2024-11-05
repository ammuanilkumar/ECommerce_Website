// import React, { useState } from 'react';
// import { adminCreateProduct } from '../../services/adminApi';


// export const CreateProduct = () => {

//   const {data,setData} =useState(
//     {
//     tittle : "",
//     description : "",
//     image : "",
//     price : "",
//     quantity : "",
//     category : "",
//     brand : "",
//     rating : "",
  
  
//   })

//   return <div>
//     <form>
//       <input placeholder="Enter Tittle" type="text" name="tittle" id= "" />
//       <br />
//       <input  placeholder='Enter Description' type="text" name="description" id= "" />
//       <br />
//       <input placeholder='upload image' type="text" name="image" id= "" />
//       <br />
//       <input type="text" name="" id= "" />
//       <button type='submit'>Create Product</button>
//     </form>
    
//     </div>;
// };
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { adminCreateProduct } from "../../services/adminApi";

export const CreateProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();

  // Watch the file input to access its value
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
        formData.append("image", watchImage[0]); // Add image to formData
      }

      const response = await adminCreateProduct(formData);
      if (response && response.success) {
        toast.success("Product created successfully");
        navigate("/admin/products");
      }
    } catch (error) {
      console.error(error);
      toast.error("Create Product Failed");
    }
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse w-full max-w-6xl">
        <div className="card bg-base-100 w-full max-w-md shadow-2xl p-5">
          <h2 className="text-3xl font-bold text-center mb-6">
            Create Product
          </h2>
          <form
            className="card-body space-y-4"
            encType="multipart/form-data"
            onSubmit={handleSubmit(handleCreateProduct)}
          >
            {/* Title */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Title</span>
              </label>
              <input
                type="text"
                placeholder="Enter Product Title"
                {...register("title", { required: "Title is required" })}
                className="input input-bordered"
              />
              {errors.title && (
                <span className="text-red-500">{errors.title.message}</span>
              )}
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                placeholder="Enter Product Description"
                {...register("desc", { required: "Description is required" })}
                className="textarea textarea-bordered"
              />
              {errors.desc && (
                <span className="text-red-500">{errors.desc.message}</span>
              )}
            </div>

            {/* Brand */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Brand</span>
              </label>
              <input
                type="text"
                placeholder="Enter Product Brand"
                {...register("brand", { required: "Brand is required" })}
                className="input input-bordered"
              />
              {errors.brand && (
                <span className="text-red-500">{errors.brand.message}</span>
              )}
            </div>

            {/* Price */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="number"
                placeholder="Enter Product Price"
                {...register("price", { required: "Price is required" })}
                className="input input-bordered"
              />
              {errors.price && (
                <span className="text-red-500">{errors.price.message}</span>
              )}
            </div>

            {/* Category */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <input
                type="text"
                placeholder="Enter Product Category"
                {...register("category", { required: "Category is required" })}
                className="input input-bordered"
              />
              {errors.category && (
                <span className="text-red-500">{errors.category.message}</span>
              )}
            </div>

            {/* Stock */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Stock</span>
              </label>
              <input
                type="number"
                placeholder="Enter Available Stock"
                {...register("stock", { required: "Stock is required" })}
                className="input input-bordered"
              />
              {errors.stock && (
                <span className="text-red-500">{errors.stock.message}</span>
              )}
            </div>

            {/* Ratings */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Ratings</span>
              </label>
              <input
                type="number"
                step="0.1"
                max="5"
                min="0"
                placeholder="Enter Product Ratings"
                {...register("ratings", { required: "Ratings are required" })}
                className="input input-bordered"
              />
              {errors.ratings && (
                <span className="text-red-500">{errors.ratings.message}</span>
              )}
            </div>

            {/* Image */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Product Image</span>
              </label>
              <input
                type="file"
                {...register("image", { required: "Image is required" })}
                className="file-input file-input-bordered"
              />
              {errors.image && (
                <span className="text-red-500">{errors.image.message}</span>
              )}
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary w-full">
                Create Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};