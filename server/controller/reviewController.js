import { Product } from "../models/productModel.js";
import Review from "../models/reviewModel.js";
import { User } from "../models/userModel.js";

// Add a review
export const addReview = async (req, res) => {
  const { productId } = req.params;
  const { rating, comment } = req.body;
  const userData = req.user; // Extract user from request

  console.log("User Data:", userData);

  try {
    // Find user by email to get user ID
    const user = await User.findOne({ email: userData.email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User not found",
      });
    }

    const userId = user._id; // Extract user ID

    // Input validation
    if (!rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "Rating and comment are required",
      });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check if the user already reviewed the product
    const alreadyReviewed = await Review.findOne({
      product: productId,
      user: userId,
    });

    if (alreadyReviewed) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this product",
      });
    }

    // Create a new review
    const review = await Review.create({
      user: userId,
      product: productId,
      rating,
      comment,
    });

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      review,
    });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({
      success: false,
      message: "Error adding review",
      error: error.message,
    });
  }
};

// Get reviews for a product
export const getProductReviews = async (req, res) => {
  const { productId } = req.params;

  try {
    const reviews = await Review.find({ product: productId }).populate(
      "user",
      "name"
    );
    if (!reviews.length) {
      return res
        .status(404)
        .json({ message: "No reviews found for this product" });
    }

    res.status(200).json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ message: "Error fetching reviews", error });
  }
};
