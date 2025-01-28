import Review from '../models/reviewModel.js';
import Product from '../models/productModel.js';

// Add a review
export const addReview = async (req, res) => {
  const { productId } = req.params;
  const { rating, comment } = req.body;
  const userId = req.user.id;

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Check if user already reviewed
    const alreadyReviewed = await Review.findOne({ product: productId, user: userId });
    if (alreadyReviewed) {
      return res.status(400).json({ message: 'You have already reviewed this product' });
    }

    const review = await Review.create({
      user: userId,
      product: productId,
      rating,
      comment,
    });

    res.status(201).json({ success: true, review });
  } catch (error) {
    res.status(500).json({ message: 'Error adding review', error });
  }
};

// Get reviews for a product
export const getProductReviews = async (req, res) => {
  const { productId } = req.params;

  try {
    const reviews = await Review.find({ product: productId }).populate('user', 'name');
    if (!reviews.length) {
      return res.status(404).json({ message: 'No reviews found for this product' });
    }

    res.status(200).json({ success: true, reviews });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reviews', error });
  }
};
