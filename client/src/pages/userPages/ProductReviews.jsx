// import { useParams } from "react-router-dom";
// import { axiosInstance } from "../../config/axiosInstance";
// import { useEffect, useState } from "react";

// export const ProductDetails = () => {
//   const [productDetails, setProductDetails] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [cartMessage, setCartMessage] = useState(null);
//   const [wishlistMessage, setWishlistMessage] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [reviews, setReviews] = useState([]);
//   const { id } = useParams();

//   // Fetch product details and reviews
//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       try {
//         const response = await axiosInstance.get(`/product/details/${id}`);
//         setProductDetails(response?.data?.data || null);
//       } catch (error) {
//         setError(error.response?.data?.message || "Failed to fetch product details");
//       } finally {
//         setLoading(false);
//       }
//     };

//     const fetchReviews = async () => {
//       try {
//         const response = await axiosInstance.get(`/reviews/${id}`);
//         setReviews(response?.data?.reviews || []);
//       } catch (error) {
//         console.error("Error fetching reviews:", error);
//       }
//     };

//     fetchProductDetails();
//     fetchReviews();
//   }, [id]);

//   // Auto-hide messages after 3 seconds
//   useEffect(() => {
//     if (cartMessage) {
//       setTimeout(() => setCartMessage(null), 3000);
//     }
//     if (wishlistMessage) {
//       setTimeout(() => setWishlistMessage(null), 3000);
//     }
//   }, [cartMessage, wishlistMessage]);

//   const addProductToUserCart = async () => {
//     try {
//       const response = await axiosInstance.post(`/cart/add/${id}`, { quantity });
//       setCartMessage(response?.data?.message || "Product added to cart successfully!");
//     } catch (error) {
//       setCartMessage(error.response?.data?.message || "Error adding product to cart");
//     }
//   };

//   const addProductWishlist = async () => {
//     try {
//       const response = await axiosInstance.post(`/wishlist/add/${id}`);
//       setWishlistMessage(response?.data?.message || "Product added to wishlist successfully!");
//     } catch (error) {
//       setWishlistMessage(error.response?.data?.message || "Error adding product to wishlist");
//     }
//   };

//   const handleNewReview = (newReview) => {
//     setReviews((prevReviews) => [newReview, ...prevReviews]);
//   };

//   if (loading) return <div className="text-center py-24">Loading...</div>;
//   if (error) return <div className="text-center py-24 text-red-500">Error: {error}</div>;

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       <section className="text-gray-700 body-font overflow-hidden">
//         <div className="container px-5 py-24 mx-auto">
//           <div className="lg:w-4/5 mx-auto flex flex-wrap bg-white p-8 shadow-lg rounded-lg">
//             <img
//               alt={productDetails?.title || "Product Image"}
//               className="lg:w-1/2 w-full object-cover object-center rounded-lg border border-gray-300 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg"
//               src={productDetails?.image || "https://via.placeholder.com/500"}
//             />
//             <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
//               <h2 className="text-sm title-font text-gray-500 tracking-widest uppercase mb-1">
//                 {productDetails?.brand || "Unknown Brand"}
//               </h2>
//               <h1 className="text-gray-900 text-4xl title-font font-semibold mb-3">
//                 {productDetails?.title || "Product Title"}
//               </h1>
//               <p className="leading-relaxed text-base text-gray-600 mb-5">
//                 {productDetails?.desc || "Product description not available."}
//               </p>
//               <div className="flex items-center mb-5">
//                 <span className="mr-3 text-gray-900 font-semibold">Quantity</span>
//                 <input
//                   type="number"
//                   min="1"
//                   value={quantity}
//                   onChange={(e) => {
//                     const newQuantity = Number(e.target.value);
//                     setQuantity(isNaN(newQuantity) ? 1 : newQuantity);
//                   }}
//                   className="w-16 p-2 text-center border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500"
//                 />
//               </div>
//               <div className="flex items-center mb-5">
//                 <span className="title-font font-semibold text-2xl text-gray-900">
//                   ₹{productDetails?.price || "N/A"}
//                 </span>
//                 <button
//                   onClick={addProductToUserCart}
//                   className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 transition-all duration-300 rounded-lg shadow-md"
//                 >
//                   Add to Cart
//                 </button>
//                 <button
//                   onClick={addProductWishlist}
//                   className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 hover:text-red-500 ml-4 transition-all duration-300"
//                 >
//                   ❤️
//                 </button>
//               </div>
//               {cartMessage && <p className="mt-4 text-sm text-green-600">{cartMessage}</p>}
//               {wishlistMessage && <p className="mt-4 text-sm text-green-600">{wishlistMessage}</p>}
//             </div>
//           </div>
//         </div>
//       </section>

//       <div className="container mx-auto p-8 bg-white rounded-lg shadow-md">
//         <h2 className="text-2xl font-semibold mb-4">Write a Review</h2>
//         <WriteReview productId={id} onReviewAdded={handleNewReview} />
//       </div>

//       <div className="container mx-auto p-8 bg-white mt-6 rounded-lg shadow-md">
//         <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
//         <ProductReviews reviews={reviews} />
//       </div>
//     </div>
//   );
// };

// const ProductReviews = ({ reviews }) => (
//   <div>
//     <h3 className="text-xl font-bold">Product Reviews</h3>
//     {reviews?.length > 0 ? (
//       reviews.map((review) => (
//         <div key={review._id} className="border-b pb-4 mb-4">
//           <p>
//             <strong>{review?.user?.name || "Anonymous"}</strong>
//           </p>
//           <p>Rating: {review.rating} ⭐</p>
//           <p>{review.comment}</p>
//         </div>
//       ))
//     ) : (
//       <p>No reviews yet.</p>
//     )}
//   </div>
// );

// const WriteReview = ({ productId, onReviewAdded }) => {
//   const [rating, setRating] = useState(0);
//   const [comment, setComment] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!rating || rating < 1) {
//       alert("Please select a rating.");
//       return;
//     }
//     try {
//       const response = await axiosInstance.post(`/reviews/add/${productId}`, { rating, comment });
//       onReviewAdded(response.data.review);
//       setRating(0);
//       setComment("");
//     } catch (error) {
//       alert(error.response?.data?.message || "Error adding review");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <label>Rating:</label>
//       <select value={rating} onChange={(e) => setRating(Number(e.target.value))} required>
//         <option value="">Select Rating</option>
//         {[1, 2, 3, 4, 5].map((num) => <option key={num} value={num}>{num}</option>)}
//       </select>
//       <textarea value={comment} onChange={(e) => setComment(e.target.value)} required />
//       <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit Review</button>
//     </form>
//   );
// };
