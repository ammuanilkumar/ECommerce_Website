// import mongoose from "mongoose";
//  import  {User }from " ../../models/userModel.js";
// import { Product}  from "../../models/productModel.js";
// //import Wishlist from "../../models/wishlistModel.js";
 import{ Wishlist} from "../models/wishlistModel.js";  // Correct
 
 import {Product} from "../models/productModel.js"; // Example for product model import
 import { User } from "../models/userModel.js";

 


//import User from "../../models/userModel.js"; // Example for user model import


export const addToWishlist = async (req, res) => {
    const userId = req.user.id; // Assuming `authUser` middleware attaches `user` to `req`
    const productId = req.params.id;
    try {
      // Code to find the user’s wishlist and add the product
      // Example: Find the wishlist by userId and add productId to it
      const wishlist = await Wishlist.findOneAndUpdate(
        { user: userId },
        { $addToSet: { items: productId } }, // Add to set to avoid duplicates
        { new: true, upsert: true }
      );
      res.status(200).json({ data: wishlist, message: "Product added to wishlist" });
    } catch (error) {
      res.status(500).json({ message: "Failed to add product to wishlist", error });
    }
  };
  
  // Function to get the user's wishlist
  export const getWishlist = async (req, res) => {
    const userId = req.user.id;
    try {
      const wishlist = await Wishlist.findOne({ user: userId }).populate("items");
      if (!wishlist) {
        return res.status(404).json({ message: "Wishlist not found" });
      }
      res.status(200).json({ data: wishlist });
    } catch (error) {
      res.status(500).json({ message: "Failed to retrieve wishlist", error });
    }
  };
  
  // Function to remove a product from the wishlist
  export const removeFromWishlist = async (req, res) => {
    const userId = req.user.id;
    const productId = req.params.id;
    try {
      const wishlist = await Wishlist.findOneAndUpdate(
        { user: userId },
        { $pull: { items: productId } }, // Remove the product
        { new: true }
      );
      if (!wishlist) {
        return res.status(404).json({ message: "Wishlist not found" });
      }
      res.status(200).json({ data: wishlist, message: "Product removed from wishlist" });
    } catch (error) {
      res.status(500).json({ message: "Failed to remove product from wishlist", error });
    }
  };
  