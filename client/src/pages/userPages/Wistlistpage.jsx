import express from "express";
import { authUser } from "../../middlewares/authUser.js";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../../controllers/wishlistController.js/wishlistController.js";

const router = express.Router();

router.post("/add/:id", authUser, addToWishlist);

router.delete("/remove/:id", authUser, removeFromWishlist);

router.get("/get", authUser, getWishlist);

export default router;
