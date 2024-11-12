import { useState, useEffect } from "react";
import { axiosInstance} from "../../config/axiosInstance"
import { toast } from "react-hot-toast";
import { CrudProductCards } from "../../components/ui/cards";




const AdminDElAndUpdate = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  const deleteProducts = async (productId) => {
    try {
      setLoading(true);
      await axiosInstance({
        url: `/admin/deleteproduct/${productId}`,
        method: "DELETE",
        withCredentials: true,
      });
      // Filter out deleted product from the list
      setProducts((prevProducts) =>
        prevProducts.filter((p) => p._id !== productId)
      );
      setDeleteError(null); // Clear any previous errors
      toast.success("Product deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product");
      setDeleteError("Failed to delete product");
    } finally {
      setLoading(false);
      setDeletingProduct(null); // Reset deletingProduct state after deletion
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance({
        url: "/admin/getAllProducts",
        method: "GET",
        withCredentials: true,
      });
      setProducts(response?.data?.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeleteConfirmation = (productId) => {
    setDeletingProduct(productId);
    setDeleteError(null); 
  };

  const handleConfirmDelete = () => {
    if (deletingProduct) {
      const product = products.find((p) => p._id === deletingProduct);
      if (product && product.brand.toLowerCase() === "black mamba") {
        setDeleteError("This product is default-made and cannot be deleted.");
      } else {
        deleteProducts(deletingProduct);
      }
    }
  };

  return (
    <div className="px-4 md:px-20 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">List of Products</h1>
      {loading && <p className="text-center text-gray-600">Loading...</p>}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <CrudProductCards
            key={product._id}
            product={product}
            onDelete={() => handleDeleteConfirmation(product._id)}
          />
        ))}
      </div>

      {/* Confirmation Modal */}
      {deletingProduct && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-gray-800 bg-opacity-50 absolute inset-0"></div>
          <div className="bg-white p-6 rounded-lg z-10 shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Confirm Deletion</h2>
            {deleteError ? (
              <p className="mb-6 text-red-500">{deleteError}</p>
            ) : (
              <p className="mb-6">
                Are you sure you want to delete this product? This action cannot
                be undone.
              </p>
            )}
            <div className="flex justify-end gap-4">
              <button
                className="btn bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
                onClick={() => setDeletingProduct(null)} // Cancel button
              >
                Cancel
              </button>
              {!deleteError && (
                <button
                  className="btn bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                  onClick={handleConfirmDelete} // Confirm delete
                >
                  Yes, Delete
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDElAndUpdate
