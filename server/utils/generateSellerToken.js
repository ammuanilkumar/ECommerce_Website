import jwt from "jsonwebtoken";

export const generateSellerToken = (email) => {
    const token = jwt.sign(
      { email: email, role: "seller" },
      process.env.JWT_SELLER_SECRET_KEY
    );
    return token;
  };
  