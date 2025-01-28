import { useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";

const WriteReview = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`/reviews/add/${productId}`, {
        rating,
        comment,
      });
      alert("Review added successfully");
    } catch (error) {
      alert(error.response?.data?.message || "Error adding review");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Rating:</label>
      <select
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        required
      >
        <option value="">Select Rating</option>
        {[1, 2, 3, 4, 5].map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>

      <label>Comment:</label>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />

      <button type="submit">Submit Review</button>
    </form>
  );
};

export default WriteReview;
