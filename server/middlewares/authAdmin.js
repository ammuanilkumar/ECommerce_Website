import jwt from "jsonwebtoken";

export const authAdmin = (req, res, next) => {
  try {
    const { token } = req.cookies;

    //token value checking
    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "user Unauthorized access" });
    }

    //verify token
    const tokenVarified = jwt.verify(token, process.env.JWT_ADMIN_SECRET_KEY);

    //token decoding
    if (!tokenVarified) {
      return res
        .status(400)
        .json({ success: false, message: "user Unauthorized acess" });
    }

    req.user = tokenVarified;

    next();
  } catch (error) {
    console.log(error);
  }
};
