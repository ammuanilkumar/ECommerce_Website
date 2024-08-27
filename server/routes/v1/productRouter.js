import express from "express";
import { getProductList,createProduct,updateProduct} from '../../controller/productController.js';
//import {getProductList,} from "../../controller/productController.js";

import { authUser } from "../../middlewares/authUser.js";
import { upload } from "../../middlewares/uploadMiddleware.js";
const router = express.Router();

router.get("/productList", authUser, getProductList);
router.post("/create",upload.single("image") ,createProduct);
router.put("/update/:id", updateProduct);
router.delete("/delete");



export default router;
