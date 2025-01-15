import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";
import { Session } from "../models/sectionModel.js";
import { generateUserToken } from "../utils/generateToken.js";
import { syncIndexes } from "mongoose";
import { cloudinaryInstance } from "../config/cloundinaryConfig.js";
import mongoose from "mongoose";

export const userCreate = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, phone, profile, product } =
      req.body;

    // Check if all required fields are present
    if (!name || !email || !password || !confirmPassword || !phone) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, message: "Passwords do not match" });
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    // Create the new user with or without the profile picture
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      profile:
        "https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png",
      product,
    });

    // Save the user to the database
    await newUser.save();

    // Generate and send token
    const token = generateUserToken(email);
    res.cookie("token", token, {
      sameSite: "None",
      secure: true,
      httpOnly: true,
    });
    res.json({ success: true, message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    console.error(error);
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "all fields required" });
    }

    // checking the user is existing
    const userExists = await User.findOne({ email: email });

    if (!userExists.email) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const passwordMatch = bcrypt.compareSync(password, userExists.password);
    if (!passwordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "user not authenticate" });
    }

    const token = generateUserToken(email);
    res.cookie("token", token, {
      sameSite: "None",
      secure: true,
      httpOnly: true,
    });
    res.status(201).json({ success: true, message: "User Login successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const userProfile = async (req, res, next) => {
  try {
    const user = req.user;

    const userData = await User.findOne({ email: user.email });

    const useData = await User.findOne({ _id: userData._id }).select(
      "-password"
    );
    // const useData = await User.findById(id).select("-password");

    res.json({ success: true, message: "user data fetched", data: useData });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

// export const updateUserProfile= async(req, res,)=>{
//   try{
//     const user = req.user;
//     const { name, phone, password } = req.body;
//   }
//   catch(error){
//     console.error("update user profile error:", error.message);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }

// }

export const checkUser = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not authenticated" });
    }

    res.json({ success: true, message: "User authenticated" });
  } catch (error) {
    console.error("Check user error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const userLogout = async (req, res) => {
  try {
    //console.log(token);
    res.clearCookie("token", {
      path: "/",
      sameSite: "None",
      secure: true,
      httpOnly: true,
    });
    res.json({ success: true, message: "user logged out" });
  } catch (error) {
    console.log("logout error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// export const seasonOdearDetails = async (req, res) => {
//   try {
//     const user = req.user; // Assumes authUser middleware sets req.user
//     const userData = await User.find({ email: user.email });

//     if (!userData) {
//       return res
//         .status(404)
//         .json({ success: false, message: "User not found" });
//     }

//     // Fetch the user's order and populate the product details
//     const order = await Session.findOne({ user: userData._id }).populate({
//       path: "products.product", // Populate the product details
//       select: "image title price", // Select only the required fields
//     });
//     console.log("order: ", order);
//     if (!order) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Order not found" });
//     }

//     // Calculate total price
//     const totalPrice = order.products.reduce((total, item) => {
//       return total + item.product.price * item.quantity;
//     }, 0);

//     // Format the response to include product details and total price
//     const response = {
//       sessionId: order.sessionId,
//       products: order.products.map((item) => ({
//         img: item.product.image,
//         title: item.product.title,
//         price: item.product.price,
//         quantity: item.quantity,
//         totalProductPrice: item.product.price * item.quantity,
//       })),
//       totalPrice: totalPrice,
//       currency: order.currency,
//       payment_status: order.payment_status,
//     };

//     // Return the order details
//     res.status(200).json(response);
//   } catch (error) {
//     console.error("Error fetching order:", error);
//     res
//       .status(500)
//       .json({ success: false, message: "Internal server error!!!" });
//   }
// };


// In your backend route handler (assuming you're using Express.js)


export const seasonOdearDetails = async (req, res) => {
  try {
    const user = req.user; // Assumes authUser middleware sets req.user
    const userData = await User.findOne({ email: user.email });

    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Fetch all orders for the user and populate product details
    const orders = await Session.find({ user: userData._id }).populate({
      path: "products.product", // Populate the product details
      select: "image title price", // Select only the required fields
    });

    if (!orders || orders.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No orders found for this user" });
    }

    // Format the response to include all orders
    const response = orders.map((order) => ({
      sessionId: order.sessionId,
      products: order.products.map((item) => ({
        img: item.product.image,
        title: item.product.title,
        price: item.product.price,
        quantity: item.quantity,
        totalProductPrice: item.product.price * item.quantity,
      })),
      totalPrice: order.products.reduce((total, item) => {
        return total + item.product.price * item.quantity;
      }, 0),
      currency: order.currency,
      payment_status: order.payment_status,
      status: order.status,
      createdAt: order.createdAt,
    }));
console.log("response==>",response);
    // Return all orders for the user
    res.status(200).json({ success: true, orders: response });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error!!!" });
  }
};


export const updateUserProfile = async (req, res) => {
  try {
    const { name, phone } = req.body; // Get updated fields from the request body
    const user = req.user; // Assuming `req.user` contains the authenticated user's details
    console.log("User===>", user);

    // Find the user in the database by email
    const userData = await User.findOne({ email: user.email });
    console.log("userData===>", userData);

    // Check if the user exists
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the user by ID and update their profile
    const updatedUser = await User.findByIdAndUpdate(
      userData._id, // Pass the user's `_id` here
      { name, phone }, // Fields to update
      { new: true } // Return the updated document
    );

    // Return the updated user
    return res
      .status(200)
      .json({ message: "Profile updated successfully", updatedUser });
  } catch (error) {
    console.error("Error updating user profile:", error);
    return res
      .status(500)
      .json({ message: "Server error, unable to update profile" });
  }
};
