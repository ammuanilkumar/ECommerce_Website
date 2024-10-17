import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";

import { generateUserToken } from "../utils/generateToken.js";

export const userCreate = async (req, res) => {
  try {
    console.log(req.body);

    const {
      name,
      email,
      password,
      phone,
      profile,
      wishlist,
      product,
      address,
    } = req.body;
    if (!name || !email || !password || !phone) {
      return res
        .status(400)
        .json({ success: false, message: "all fields required" });
    }

    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return res
        .status(404)
        .json({ success: false, message: "User allredy exist" });
    }

    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      profile,
      wishlist,
      product,
      address,
    });
    await newUser.save();

    const token = generateUserToken(email);

    res.cookie("token", token);
    res.json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: " Internal server error" });
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

    res.cookie("token", token);
    res.status(201).json({ success: true, message: "User Login successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const userProfile = async (req, res, next) => {
  try {
    const user = req.user;
    // const id = req.id//
    const useData = await User.findOne({ email: user.email }).select(
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
    res.clearCookie("token",{
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

