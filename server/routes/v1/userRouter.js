import express from "express";
import {
  userCreate,
  userLogin,
  userProfile,
  checkUser,
  userLogout,
  seasonOdearDetails,
  updateUserProfile,
} from "../../controller/userController.js";
import { authUser } from "../../middlewares/authUser.js";
//import {authMiddleware} from "../../middlewares/authMiddleware.js";

//import { updateUserProfile } from "../../controller/userController.js";
const router = express.Router();
router.post("/create", userCreate);
router.post("/Login", userLogin);
router.get("/profile", authUser, userProfile);
router.post("/logout", userLogout);
router.get("/check-user", authUser, checkUser);
//router.put("/update",authMiddleware, updateUserProfile);
router.get("/order/:id", authUser, seasonOdearDetails);
router.post("/profile-update", authUser, updateUserProfile);

export default router;
