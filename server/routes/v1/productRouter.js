import express from "express";
import {
  getProductList,
  createProduct,
  updateProduct,
  getProductDetails,
} from "../../controller/productController.js";
//import {getProductList} from "../../controller/productController.js";

import { authUser } from "../../middlewares/authUser.js";
import { upload } from "../../middlewares/uploadMiddleware.js";
import { authAdmin } from "../../middlewares/authAdmin.js";
const router = express.Router();

router.get("/productList", getProductList);
router.get("/details/:id", authUser, getProductDetails);
router.put("/update/:id", upload.single("image"), updateProduct);


router.post("/create", upload.single("image"), authAdmin, createProduct);

export default router;
