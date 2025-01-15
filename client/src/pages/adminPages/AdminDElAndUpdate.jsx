import { useState, useEffect } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { toast } from "react-hot-toast";

const AdminDelAndUpdate = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [updatingProduct, setUpdatingProduct] = useState(null);
  const [updateData, setUpdateData] = useState({
    title: "",
    description: "",
    brand: "",
    price: "",
    quantity: "",
  });

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/admin/getAllProducts", {
        withCredentials: true,
      });
      setProducts(response?.data?.data || []);
    } catch (error) {
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // Delete a product
  const deleteProduct = async (productId) => {
    try {
      setDeletingProduct(productId);
      await axiosInstance.delete(`/admin/deleteproduct/${productId}`, {
        withCredentials: true,
      });
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
      toast.success("Product deleted successfully");
    } catch (error) {
      toast.error("Failed to delete product");
    } finally {
      setDeletingProduct(null);
    }
  };

  // Update a product
  const updateProduct = async (productId) => {
    if (!updateData.title || !updateData.description || !updateData.brand || !updateData.price) {
      toast.error("All fields are required");
      return;
    }

    try {
      setUpdating(true);
      const response = await axiosInstance.put(
        `/admin/update-product/${productId}`,
        updateData,
        { withCredentials: true }
      );
      toast.success("Product updated successfully");
      fetchProducts();
    } catch (error) {
      toast.error("Failed to update product");
    } finally {
      setUpdating(false);
      closeUpdateModal();
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Close the update modal
  const closeUpdateModal = () => {
    setUpdatingProduct(null);
    setUpdateData({
      title: "",
      description: "",
      brand: "",
      price: "",
      quantity: "",
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="px-4 md:px-20 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Manage Products</h1>
      {loading && <p className="text-center text-gray-600">Loading...</p>}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="card bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-60 object-cover rounded mb-4"
            />
            <h2 className="text-xl font-bold">{product.title}</h2>
            <p className="text-lg text-indigo-600">₹{product.price}</p>
            <div className="mt-4 flex gap-4">
              {/* <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => {
                  setUpdatingProduct(product._id);
                  setUpdateData({
                    title: product?.title || "",
                    description: product?.description || "",
                    brand: product?.brand || "",
                    price: product?.price || "",
                    quantity: product?.quantity || "",
                  });
                  
                }}
              >
                Update
              </button> */}
              <button
                className={`${
                  deletingProduct === product._id
                    ? "bg-gray-500"
                    : "bg-red-500 hover:bg-red-600"
                } text-white px-4 py-2 rounded`}
                onClick={() => deleteProduct(product._id)}
                disabled={deletingProduct === product._id}
              >
                {deletingProduct === product._id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Update Modal */}
      {updatingProduct && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-gray-800 bg-opacity-50 absolute inset-0"></div>
          <div className="bg-white h-auto max-h-screen w-3/4 p-8 rounded-lg shadow-lg z-10 overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Update Product</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                updateProduct(updatingProduct);
              }}
            >
              <div className="mb-4">
                <label className="block font-bold mb-2">Product Name</label>
                <input
                  type="text"
                  name="title"
                  value={updateData.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold mb-2">Description</label>
                <textarea
                  name="description"
                  value={updateData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold mb-2">Brand Name</label>
                <input
                  type="text"
                  name="brand"
                  value={updateData.brand}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold mb-2">Price</label>
                <input
                  type="number"
                  name="price"
                  value={updateData.price}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-bold mb-2">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={updateData.quantity}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                  onClick={closeUpdateModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`${
                    updating ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-600"
                  } text-white px-4 py-2 rounded`}
                  disabled={updating}
                >
                  {updating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDelAndUpdate;



// import { useState, useEffect } from "react";
// import { axiosInstance } from "../../config/axiosInstance";
// import { toast } from "react-hot-toast";

// const AdminDelAndUpdate = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [deletingProduct, setDeletingProduct] = useState(null);
//   const [updatingProduct, setUpdatingProduct] = useState(null);
//   const [updateData, setUpdateData] = useState({
//     title: "",
//     description: "",
//     brand: "",
//     price: "",
//     quantity: "",
//     image: null,
//   });

//   // Fetch all products
//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const response = await axiosInstance({
//         url: "/admin/getAllProducts",
//         method: "GET",
//         withCredentials: true,
//       });
//       setProducts(response?.data?.data || []);
//     } catch (error) {
//       toast.error("Failed to fetch products");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Delete a product
//   const deleteProduct = async (productId) => {
//     try {
//       setLoading(true);
//       await axiosInstance({
//         url: `/admin/deleteproduct/${productId}`,
//         method: "DELETE",
//         withCredentials: true,
//       });
//       setProducts((prevProducts) =>
//         prevProducts.filter((product) => product._id !== productId)
//       );
//       toast.success("Product deleted successfully");
//     } catch (error) {
//       toast.error("Failed to delete product");
//     } finally {
//       setLoading(false);
//       setDeletingProduct(null);
//     }
//   };

//   // Update a product
//   const updateProduct = async (productId) => {
//     if (!updateData.title || !updateData.description || !updateData.brand || !updateData.price) {
//       toast.error("All fields except image are required");
//       return;
//     }

//     try {
//       setLoading(true);
//       const formData = new FormData();
//       Object.entries(updateData).forEach(([key, value]) => {
//         if (value) formData.append(key, value);
//       });

//       const response = await axiosInstance({
//         url: `/admin/update-product/${productId}`,
//         method: "POST",
//         withCredentials: true,
//         data: formData,
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       toast.success("Product updated successfully");
//       fetchProducts();
//     } catch (error) {
//       toast.error("Failed to update product");
//     } finally {
//       setLoading(false);
//       closeUpdateModal();
//     }
//   };

//   // Handle input change
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUpdateData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   // Handle file input change
//   const handleFileChange = (e) => {
//     setUpdateData((prevData) => ({ ...prevData, image: e.target.files[0] }));
//   };

//   // Close the update modal
//   const closeUpdateModal = () => {
//     setUpdatingProduct(null);
//     setUpdateData({
//       title: "",
//       description: "",
//       brand: "",
//       price: "",
//       quantity: "",
//       image: null,
//     });
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   return (
//     <div className="px-4 md:px-20 py-10">
//       <h1 className="text-3xl font-bold mb-8 text-center">Manage Products</h1>
//       {loading && <p className="text-center text-gray-600">Loading...</p>}

//       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//         {products.map((product) => (
//           <div
//             key={product._id}
//             className="card bg-white shadow-lg rounded-lg p-4 flex flex-col items-center text-center"
//           >
//             <img
//               src={product.image}
//               alt={product.title}
//               className="w-full h-60 object-cover rounded mb-4"
//             />
//             <h2 className="text-xl font-bold">{product.title}</h2>
//             <p className="text-lg text-indigo-600">₹{product.price}</p>
//             <div className="mt-4 flex gap-4">
//               <button
//                 className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                 onClick={() => {
//                   setUpdatingProduct(product._id);
//                   setUpdateData({
//                     title: product.title,
//                     description: product.description,
//                     brand: product.brand,
//                     price: product.price,
//                     quantity: product.quantity,
//                     image: null,
//                   });
//                 }}
//               >
//                 Update
//               </button>
//               <button
//                 className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//                 onClick={() => deleteProduct(product._id)}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Update Modal */}
//       {updatingProduct && (
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div className="bg-gray-800 bg-opacity-50 absolute inset-0"></div>
//           <div className="bg-white h-auto max-h-screen w-3/4 p-8 rounded-lg shadow-lg z-10 overflow-y-auto">
//             <h2 className="text-2xl font-bold mb-4">Update Product</h2>
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 updateProduct(updatingProduct);
//               }}
//             >
//               <div className="mb-4">
//                 <label className="block font-bold mb-2">Product Name</label>
//                 <input
//                   type="text"
//                   name="title"
//                   value={updateData.title}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block font-bold mb-2">Description</label>
//                 <textarea
//                   name="description"
//                   value={updateData.description}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block font-bold mb-2">Brand Name</label>
//                 <input
//                   type="text"
//                   name="brand"
//                   value={updateData.brand}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block font-bold mb-2">Price</label>
//                 <input
//                   type="number"
//                   name="price"
//                   value={updateData.price}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded"
//                   required
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block font-bold mb-2">Quantity</label>
//                 <input
//                   type="number"
//                   name="quantity"
//                   value={updateData.quantity}
//                   onChange={handleInputChange}
//                   className="w-full p-2 border rounded"
//                 />
//               </div>
//               <div className="mb-4">
//                 <label className="block font-bold mb-2">Product Image</label>
//                 <input
//                   type="file"
//                   name="image"
//                   onChange={handleFileChange}
//                   className="w-full p-2 border rounded"
//                 />
//               </div>
//               <div className="flex justify-end gap-4">
//                 <button
//                   type="button"
//                   className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
//                   onClick={closeUpdateModal}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                 >
//                   Save Changes
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminDelAndUpdate;
