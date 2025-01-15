import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        enum: ["order placed"],
        default: "order placed", // Default status for individual products
      },
    },
  ],
  amount_total: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: "inr",
  },
  payment_status: {
    type: String,
    enum: ["pending", "completed", "canceled"],
    default: "completed",
  },
  status: {
    type: String,
    enum: ["order placed", "shipped", "delivered", "canceled"],
    default: "order placed",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});


export const Session = mongoose.model("Session", sessionSchema);
