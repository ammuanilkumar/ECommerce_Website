//import ProductModel from '../../models/productModel.js';

// import mongoose from "mongoose";
// import { User } from "../../models/userModel.js";
import { Cart } from "../models/cartModel.js";

export const addProductToCart = async (req, res) => {
  try {
    const { id, productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: id });

    if (!cart) {
      cart = new Cart({ user: id, products: [] });
    }

    const productIndex = cart.products.findIndex(
      (p) => p.product.toString() === productId
    );

    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: "Product added to cart",
      data: cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const removeProductFromCart = async (req, res) => {
  try {
    const { id, productId } = req.body;

    let cart = await Cart.findOne({ user: id });

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    cart.products = cart.products.filter(
      (p) => p.product.toString() !== productId
    );
    await cart.save();

    res.status(200).json({
      success: true,
      message: "Product removed from cart",
      data: cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export const getCartDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findOne({ user: id }).populate(
      "products.product",
      "name price"
    );

    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    res.status(200).json({
      success: true,
      message: "Cart details retrieved successfully",
      data: cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
