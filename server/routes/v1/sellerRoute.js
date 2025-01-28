import express from "express";
import {
  checkSeller,
  createSellerProduct,
  deleteServerProduct,
  getAllsellerUserOrders,
  getSellerProductList,
  sellerCreate,
  sellerLogin,
  sellerLogout,
  sellerProfile,
  updateSellerProduct,
} from "../../controller/sellerController.js";
import { authSeller } from "../../middlewares/authSeller.js";
import { upload } from "../../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post("/create", sellerCreate);
router.post("/login", sellerLogin);
router.get("/profile", authSeller, sellerProfile);
router.post("/logout", sellerLogout);
router.get("/check-seller", authSeller, checkSeller);

// product

router.post(
  "/createproduct",
  upload.single("image"),
  authSeller,
  createSellerProduct
);
router.delete("/deleteserverProduct/:id", authSeller, deleteServerProduct);
router.put(
  "/updatesellerproduct/:id",
  upload.single("image"),
  updateSellerProduct
);
router.get("/serviceproductlist", authSeller, getSellerProductList);
router.get("/getuserorders", authSeller, getAllsellerUserOrders);

export default router;
