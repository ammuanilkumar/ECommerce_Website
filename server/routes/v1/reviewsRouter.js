import express from "express";
import { authUser } from "../../middlewares/authUser.js";
import {
  addReview,
  getProductReviews,
} from "../../controller/reviewController.js";

const router = express.Router();

// Add a review
router.post("/add/:productId", authUser, addReview);

// Get reviews for a product
router.get("/:productId", authUser, getProductReviews);

export default router;
