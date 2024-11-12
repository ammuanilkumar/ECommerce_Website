import { User } from "../models/userModel.js";
import mongoose from "mongoose";
import { Product } from "../models/productModel.js";
import { Cart } from "../models/cartModel.js";


export const addProductToCart = async (req, res) => {
  try {
    const user = req.user; // Assuming the user is authenticated and attached to the request
    const { id: productId } = req.params; // Extract productId from route parameters
    const { quantity } = req.body; // Extract quantity from request body

    // Check if user exists in the database
    const userExists = await User.findOne({ email: user.email });
    if (!userExists) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Validate the productId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid product ID" });
    }

    // Check if the product exists in the database
    const product = await Product.findById(productId);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Check if the product is already in the user's cart
    const existingCartItem = await Cart.findOne({
      user: userExists._id,
      "items.product": productId,
    });

    if (existingCartItem) {
      // If the product is already in the cart, update the quantity
      existingCartItem.items = existingCartItem.items.map((item) =>
        item.product.toString() === productId
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      await existingCartItem.save();
      return res.status(200).json({
        success: true,
        message: "Product quantity updated in cart",
        cart: existingCartItem,
      });
    } else {
      // If the product is not in the cart, create a new cart item
      const newCartItem = new Cart({
        user: userExists._id,
        items: [{ product: productId, quantity }],
      });
      await newCartItem.save();

      // Add the new cart item to the user's cart reference
      userExists.cart.push(newCartItem._id);
      await userExists.save();

      return res.status(200).json({
        success: true,
        message: "Product added to cart successfully",
        cart: newCartItem,
      });
    }
  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};   

export const getCartList = async (req, res) => {
  try {
    const user = req.user; // Ensure user is attached by middleware

    // Fetch user's cart, including populated product details
    const cart = await User.findOne({ email: user.email }).populate({
      path: "cart",
      populate: {
        path: "items.product", // Populate product details in the cart items
        model: "Product", // Ensure Product model is referenced correctly
      },
    });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Send populated cart details in response
    res.status(200).json({ data: cart });
  } catch (error) {
    console.error("Error fetching cart details:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const removeCartItem = async (req, res) => {
  const { id } = req.params; // Product ID to remove
  const loggedInUser = req.user; // Get the user from authentication middleware

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  try {
    // Find the user
    const user = await User.findOne({ email: loggedInUser.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // // Convert product ID to ObjectId
    // const productId = mongoose.Types.ObjectId(id);

    // Find and update the cart by pulling the specific product from 'items' array
    const updatedCart = await Cart.findOneAndDelete(
      { user: user._id }, // Find the cart for the user
      { $pull: { items: { product: id } } }, // Remove the product from the 'items' array
      { new: true } // Return the updated document
    );

    if (updatedCart) {
      return res.status(200).json({
        message: "Product removed from cart",
        data: updatedCart, // Return the updated cart
      });
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error("Error removing product:", error);
    return res.status(500).json({
      error: "Failed to remove product from cart",
      details: error.message, // Include error message for better debugging
    });
  }
};

export const updateCart = async (req, res) => {
  const userD = req.user; // Ensure user is authenticated
  const { quantity } = req.body;
  const id = req.params.id; // Get product ID from the URL

  try {
    // Find the user
    const user = await User.findOne({ email: userD.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the cart item directly using update operation
    const cartUpdateResult = await Cart.updateOne(
      { user: user._id, "items.product": id }, // Match user and product ID
      { $set: { "items.$.quantity": quantity } } // Update the quantity
    );

    // Check if the update was successful
    if (cartUpdateResult.matchedCount === 0) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    res.status(200).json({ message: "Cart updated successfully" });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const cartRemoveAll = async (req, res) => {
  try {
    const userDetails = req.user;
    console.log("userDetails====", userDetails);

    // Find the user by email and populate the cart
    const user = await User.findOne({ email: userDetails.email }).populate(
      "cart"
    );

    if (!user || !user.cart || user.cart.length === 0) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Iterate through the carts and clear all items
    for (let cart of user.cart) {
      if (cart.items.length > 0) {
        cart.items = []; // Clear the cart items
        await cart.save(); // Save each updated cart
        console.log("cart.save====", cart);
      }
    }

    return res
      .status(200)
      .json({ message: "All products removed from cart successfully" });
  } catch (error) {
    console.error("Error removing all products from cart:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
