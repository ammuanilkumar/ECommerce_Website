import bcrypt from "bcrypt";

import { Seller } from "../models/sellerModel.js";
import { generateSellerToken } from "../utils/generateSellerToken.js";
import { cloudinaryInstance } from "../config/cloundinaryConfig.js";
import { Product } from "../models/productModel.js";
import { Session } from "../models/sectionModel.js";
import { User } from "../models/userModel.js";

export const sellerCreate = async (req, res) => {
  try {
    const { name, email, password, mobile, profilepic, product } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const sellerExist = await Seller.findOne({ email: email });
    if (sellerExist) {
      return res
        .status(404)
        .json({ success: false, message: "Seller already exists" });
    }

    const saltRound = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRound);

    const newSeller = new Seller({
      name: name,
      email: email,
      password: hashedPassword,
      mobile,

      profilepic,
      product,
    });

    await newSeller.save();

    const token = generateSellerToken(email);

    res.cookie("token", token);
    res
      .status(201)
      .json({ success: true, message: "seller created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const sellerExists = await Seller.findOne({ email });

    if (!sellerExists) {
      return res
        .status(400)
        .json({ success: false, message: "Seller not found" });
    }

    const passwordMatch = bcrypt.compareSync(password, sellerExists.password);
    if (!passwordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Seller not authenticated" });
    }

    const token = generateSellerToken(sellerExists.email);

    res.cookie("token", token, {
      sameSite: "None",
      secure: true,
      httpOnly: true,
    });
    res.status(200).json({ success: true, message: "seller login successful" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Internal server error !!" });
  }
};

export const sellerProfile = async (req, res) => {
  try {
    const seller = req.seller;
    const sellerData = await Seller.findOne({ email: seller.email }).select(
      "-password"
    );

    res.status(200).json({
      success: true,
      message: "Seller data fetched",
      data: sellerData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const checkSeller = async (req, res) => {
  try {
    const seller = req.seller;

    if (!seller) {
      return res
        .status(400)
        .json({ success: false, message: "Seller not authenticated!" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Seller authenticated successfully!" });
  } catch (error) {
    console.error("Error in checkSeller:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const sellerLogout = (req, res) => {
  try {
    res.clearCookie("token", {
      sameSite: "None",
      secure: true,
      httpOnly: true,
    });
    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Internal server error!!!" });
  }
};

export const createSellerProduct = async (req, res) => {
  try {
    const { title, desc, brand, price, category, stock, ratings } = req.body;
    const seller = req.seller;
    // console.log("image====", req.file);

    // Check if the image is provided
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    // Check if the product with the same title already exists for this seller
    const existingProduct = await Product.findOne({
      title,
      seller: seller._id,
    });
    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: "Product already exists for this seller",
      });
    }

    let uploadResult;
    try {
      // Upload image to Cloudinary
      uploadResult = await cloudinaryInstance.uploader.upload(req.file.path, {
        folder: "e_commerce_website",
      });
      console.log("Cloudinary upload result:====", uploadResult);
    } catch (uploadError) {
      console.error("Cloudinary upload error:=====", uploadError);
      return res.status(500).json({
        success: false,
        message: "Failed to upload image",
      });
    }

    try {
      // Create a new product linked to the seller
      const newProduct = new Product({
        title,
        desc,
        brand,
        price,
        category,
        stock,
        ratings: [],
        image: uploadResult?.url, // Use the uploaded image URL
        seller: seller._id, // Link the product to the seller
      });

      // Save the product to the database
      await newProduct.save();
      console.log("Product created successfully:", newProduct);
      return res.status(201).json({
        success: true,
        message: "Product created successfully",
        product: newProduct,
      });
    } catch (error) {
      console.error("Error saving product to database:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to save product",
      });
    }
  } catch (error) {
    console.error("Error in creating product:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deleteServerProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateSellerProduct = async (req, res) => {
  try {
    const { id } = req.params; // Product ID from request parameters
    const { title, desc, brand, price, category, stock } = req.body;

    console.log("Request params:", req.params);
    console.log("Request body:", req.body);
    console.log("Request file:", req.file);

    // Validate product existence
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    let updatedImageUrl = product.image; // Default to the existing image

    // Handle file upload if a new file is provided
    if (req.file) {
      try {
        const uploadResult = await cloudinaryInstance.uploader.upload(
          req.file.path,
          {
            folder: "e_commerce_website",
          }
        );

        if (!uploadResult || !uploadResult.url) {
          throw new Error("Cloudinary upload failed");
        }

        updatedImageUrl = uploadResult.url; // Use the new image URL
      } catch (error) {
        console.error("Error uploading to Cloudinary:", error.message);
        return res.status(500).json({
          success: false,
          message: "Image upload failed",
        });
      }
    }

    // Update product fields
    product.title = title || product.title;
    product.desc = desc || product.desc;
    product.brand = brand || product.brand;
    product.price = price || product.price;
    product.category = category || product.category;
    product.stock = stock || product.stock;
    product.image = updatedImageUrl;

    // Save the updated product
    const updatedProduct = await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getSellerProductList = async (req, res) => {
  try {
    const productList = await Product.find();
    res.status(200).json({
      success: true,
      message: "fetched product list",
      data: productList,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getAllsellerUserOrders = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users

    if (!users || users.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Users not found" });
    }

    const allOrders = await Promise.all(
      users.map(async (user) => {
        const orders = await Session.find({ user: user._id }).populate({
          path: "products.product", // Populate the product details
          select: "image title price", // Select only the required fields
        });

        if (!orders || orders.length === 0) {
          return null; // Return null for users with no orders
        }

        // Map over orders to format them
        const formattedOrders = orders.map((order) => {
          const totalPrice = order.products.reduce((total, item) => {
            // Check if the product exists before accessing its properties
            if (item.product) {
              return total + item.product.price * item.quantity;
            }
            return total;
          }, 0);

          return {
            sessionId: order.sessionId,
            products: order.products
              .map((item) => {
                if (item.product) {
                  return {
                    img: item.product.image,
                    title: item.product.title,
                    price: item.product.price,
                    quantity: item.quantity,
                    status: item.status, // Individual product status
                    totalProductPrice: item.product.price * item.quantity,
                  };
                }
                return null; // Return null if product is missing
              })
              .filter((p) => p !== null), // Filter out any null products
            totalPrice: totalPrice,
            currency: order.currency,
            payment_status: order.payment_status,
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
            user: {
              id: user._id,
              name: user.name,
              email: user.email,
            },
          };
        });

        return formattedOrders;
      })
    );

    const flattenedOrders = allOrders.flat().filter((order) => order !== null); // Remove null entries and flatten

    if (flattenedOrders.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No orders found" });
    }

    res.status(200).json({ success: true, data: flattenedOrders });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

