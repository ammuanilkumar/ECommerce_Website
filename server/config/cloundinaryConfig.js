import { v2 as cloudinary } from "cloudinary";

import dotenv from "dotenv";
dotenv.config();

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

// // Configuration
// cloudinary.config({
//   cloud_name: "deyykwg4w",
//   api_key: "833423173576493",
//   api_secret: "lkvMi9bYX25nBhjV_13ov_Cikk4",
// });
//

export const cloudinaryInstance = cloudinary;
