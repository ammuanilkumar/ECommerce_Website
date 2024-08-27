import express from "express";
import {
  adminCreate,
  adminProfile,
  adminLogout,
  adminLogin,
} from "../../controller/adminController.js";
import { authAdmin } from "../../middlewares/authAdmin.js";

const router = express.Router();

router.post("/create", adminCreate);
router.post("/login", adminLogin);
router.get("/profile/:id",authAdmin, adminProfile);
router.post("/logout", adminLogout);

export default router;
