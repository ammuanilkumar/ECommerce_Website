import express from "express";
import {
  userCreate,
  userLogin,
  userProfile,
  checkUser,
  userLogout,
} from "../../controller/userController.js";
import { authUser } from "../../middlewares/authUser.js";
const router = express.Router();
router.post("/create", userCreate);
router.post("/Login", userLogin);
router.get("/profile/:id", authUser, userProfile);
router.post("/logout", userLogout);
router.get("/check-user", authUser, checkUser);

export default router;
