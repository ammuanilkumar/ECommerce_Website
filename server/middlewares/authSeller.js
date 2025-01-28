import jwt from "jsonwebtoken";

export const authSeller = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access. Token missing.",
      });
    }

    // Verify the token using the secret key
    const tokenVerified = jwt.verify(token, process.env.JWT_SELLER_SECRET_KEY);

    if (!tokenVerified) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access. Invalid token.",
      });
    }

    // Attach the decoded token (which contains the admin's data) to req.admin
    req.seller = tokenVerified;

   
    next();
  } catch (error) {
    console.log("Error in seller middleware:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
