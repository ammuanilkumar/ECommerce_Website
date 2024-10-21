import express from "express";
import {
  getProductList,
  createProduct,
  updateProduct,getProductDetails
} from "../../controller/productController.js";
//import {getProductList} from "../../controller/productController.js";

import { authUser } from "../../middlewares/authUser.js";
import { upload } from "../../middlewares/uploadMiddleware.js";
import { authAdmin } from "../../middlewares/authAdmin.js";
const router = express.Router();

router.get("/productList", authUser, getProductList);
router.get("/details/:id", authUser, getProductDetails);
router.put("/update/:id", updateProduct);
router.delete("/delete");

router.post("/create", upload.single("image"),authAdmin, createProduct);

export default router;
