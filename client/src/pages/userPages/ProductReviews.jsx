import { useEffect, useState } from 'react';
import { axiosInstance } from "../../config/axiosInstance";

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/reviews/${productId}`);
        setReviews(response.data.reviews);
      } catch (error) {
        alert(error.response?.data?.message || 'Error fetching reviews');
      }
    };
    fetchReviews();
  }, [productId]);

  return (
    <div>
      <h3>Product Reviews</h3>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id}>
            <p><strong>{review.user.name}</strong></p>
            <p>Rating: {review.rating}</p>
            <p>{review.comment}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet.</p>
      )}
    </div>
  );
};

export default ProductReviews;
