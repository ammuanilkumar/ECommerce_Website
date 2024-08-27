import jwt from "jsonwebtoken";

export const generateAdminToken = (email) => {
  const token = jwt.sign(
    { email: email, role: "Admin" },
    process.env.JWT_ADMIN_SECRET_KEY
  );
  return token;
};
