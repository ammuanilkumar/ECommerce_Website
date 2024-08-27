import bcrypt from "bcrypt";
import { Admin } from "../models/adminModel.js";
import { generateAdminToken } from "../utils/generateAdminToken.js";

export const adminCreate = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      product,
      // role,
    } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "all fields required" });
    }

    const adminExists = await Admin.findOne({ email: email });
    if (adminExists) {
      return res
        .status(404)
        .json({ success: false, message: "Admin allredy exist" });
    }

    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      product,
    });
    await newAdmin.save();

    const token = generateUserToken(email, Admin);

    res.cookie("token", token);
    res.json({ success: true, message: "Admin created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: " Internal server error" });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const adminExists = await Admin.findOne({ email: email });

    if (!adminExists) {
      return res
        .status(400)
        .json({ success: false, message: "Admin not found" });
    }

    const passwordMatch = bcrypt.compareSync(password, adminExists.password);
    if (!passwordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Admin not authenticated" });
    }

    const token = generateAdminToken(email);

    res.cookie("token", token);
    res
      .status(200)
      .json({ success: true, message: "Admin login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error !!" });
  }
};


export const adminProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const adminData = await Admin.findById(id);

    if (!adminData) {
      return res
        .status(404)
        .json({ success: false, message: "admin not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "admin data fetched", data: adminData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const checkAdmin = async (req, res) => {
  const admin = req.admin;
  if (!admin) {
    return res
      .status(400)
      .json({ success: false, message: "admin not authericated" });
  }
  try {
  } catch (error) {
    console.error(error);
    res.status(500).json({ sucess: false, message: "Internal server error" });
  }
};

export const adminLogout = (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error!!!" });
  }
};

export const getUsersList = (req, res) => {};
