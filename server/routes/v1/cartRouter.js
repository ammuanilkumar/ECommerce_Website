

import express from "express";
import { authUser } from "../../middlewares/authUser.js";
import {
  addProductToCart,
  getCartDetails,
  removeProductFromCart,
} from "./../../controller/cartController.js";
const router = express.Router();

router.post("/add", authUser, addProductToCart);

router.post("/remove", authUser, removeProductFromCart);
router.get("/get/:id", authUser, getCartDetails);

export default router;
