import express from 'express';
import { addReview, getProductReviews } from '../../controllers/reviewController.js';
import { authUser } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Add a review
router.post('/add/:productId', authUser, addReview);

// Get reviews for a product
router.get('/:productId', authUser, getProductReviews);

export default router;
