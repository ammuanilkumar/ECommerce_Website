import express from "express";
import {
  adminCreate,
  adminProfile,
  adminLogout,
  adminLogin,
  deleteProduct,
  deleteUser,
  getAdminProductDetails,
  getAllProducts,
  getAllUserOrders,
  getSingleUserCart,
  getUsersList,
  checkAdmin,
  getAllUsersCarts,
  getSingleUser,
  getAllReviews,
  updateAdminProfile,
} from "../../controller/adminController.js";
import { authAdmin } from "../../middlewares/authAdmin.js";

const router = express.Router();

router.post("/create", adminCreate);
router.post("/login", adminLogin);
router.get("/profile", authAdmin, adminProfile);
router.post("/logout", adminLogout);
router.get("/check-admin", authAdmin, checkAdmin);
router.get("/getAllProducts", authAdmin, getAllProducts);
router.get("/details/:id", authAdmin, getAdminProductDetails);
router.get("/getuserlist", authAdmin, getUsersList);
router.get("/getSingleUser/:id", authAdmin, getSingleUser);
router.delete("/deleteProduct/:id", authAdmin, deleteProduct);
router.delete("/deleteUser/:id", authAdmin, deleteUser); //enni ??

router.get("/getAllReviews", authAdmin, getAllReviews);

router.post("/update-admin-details", authAdmin, updateAdminProfile);

router.get("/getuserorders", authAdmin, getAllUserOrders);
router.get("/getallcarts", authAdmin, getAllUsersCarts);
router.get("/getCart/:id", authAdmin, getSingleUserCart);

export default router;
