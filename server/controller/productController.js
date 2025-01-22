//import { Product } from "../../models/productModel.js";
import { cloudinaryInstance } from "../config/cloundinaryConfig.js";
import { Product } from "../models/productModel.js";

export const getProductList = async (req, res) => {
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

//Function Declaration
export const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params; //Extracting the ID
    const productDetails = await Product.findById(id); //Fetching Product Details

    res.status(200).json({
      success: true, //Success Response
      message: "fetche product Details",
      data: productDetails,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  } //Error Handling
};

export const createProduct = async (req, res) => {
  try {
    const { title, desc, brand, price, category, stock, ratings } = req.body;

    // Check if the image is provided
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }

    // Check if the product with the same title already exists
    const existingProduct = await Product.findOne({ title: title });
    if (existingProduct) {
      return res
        .status(400)
        .json({ success: false, message: "Product already exists" });
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
      // Create a new product
      const newProduct = new Product({
        title,
        desc,
        brand,
        price,
        category,
        stock,
        ratings: [],
        image: uploadResult?.url, // Use the uploaded image URL
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

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params; // Product ID from request parameters
    const { title, desc, brand, price, category, stock } = req.body;

    console.log("Request params:", req.params);
    console.log("Request body:", req.body);
    console.log("Request file:", req.file);

    // Validate product existence
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    let updatedImageUrl = product.image; // Default to the existing image

    // Handle file upload if a new file is provided
    if (req.file) {
      try {
        const uploadResult = await cloudinaryInstance.uploader.upload(req.file.path, {
          folder: "e_commerce_website",
        });

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

