import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: { type: String, required: false },

  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});

export const Seller = mongoose.model("Seller", sellerSchema);
