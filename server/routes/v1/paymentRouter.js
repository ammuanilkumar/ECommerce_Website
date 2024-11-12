import express from "express";
import {
  createCheckoutSession,
  sessionStatus,
} from "../../controller/paymentController.js";
import { authUser } from "../../middlewares/authUser.js";

const router = express.Router();

router.post("/create-checkout-session", authUser, createCheckoutSession);

router.get("/session-status", authUser, sessionStatus);

export default router;
