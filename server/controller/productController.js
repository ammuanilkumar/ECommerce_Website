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

// export const createProduct = async (req, res,next) => {
//   try {
//     const{title,description,price,category,brand,rating}=req.body;
//   console.log('image===',req.file);
//   if (!req.file){
//     return res.status(400).json({message: 'image not visible'});
//   }

//   // Upload an image
//   const uploadResult =await cloudinaryInstance.uploader.upload(req.file.path).catch((error) => {
//     console.log(error);
//   });

//   console.log(uploadResult);
//   const newProduct = new Product({title,description,price,category,brand,rating});
//   if(uploadResult?.url){
//     newProduct.image = uploadResult.url;
//   }
//   await newProduct.save();

//     res.json({success: true, message:"Product saved successfully",});
//   } catch (error) {
//     res.status(error.status||500).json({ message:error.message||"Internal server error" });
//   }
// };

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

export const updateProduct = async (req, res, next) => {
  try {
    const { title, description, price, category, brand, rating, image } =
      req.body;
    const { id } = req.params;

    const updateProduct = await Product.findByIdAndDelete(
      { id, description, price, category, brand, rating, image },
      { new: true }
    );

    res.json({
      success: true,
      message: "Product updated",
      data: updateProduct,
    });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};
