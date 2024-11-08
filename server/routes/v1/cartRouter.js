import express from "express";
import { authUser } from "../../middlewares/authUser.js";
import {
  addProductToCart,
  getCartList,
  removeCartItem,
  updateCart,
} from "../../controller/cartController.js";

const router = express.Router();

router.post(`/add/:id`, authUser, addProductToCart);

router.get("/cartdetails", authUser, getCartList);

router.delete("/remove/:id", authUser, removeCartItem);

router.patch("/update/:id", authUser, updateCart);

export default router;
