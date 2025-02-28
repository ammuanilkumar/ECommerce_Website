import express from "express";
import userRouter from "./userRouter.js";
import productRouter from "./productRouter.js";
import adminRouter from "./adminRouter.js";
import cartRouter from "./cartRouter.js";
import ratingRouter from "./ratingRouter.js";
//import wishlistRouter from "./wishlistRouter.js";
import paymentRouter from "./paymentRouter.js";
import sellerRouter from "./sellerRoute.js";

import wishlistRouter from "./wishlistRouter.js";
import reviewsRouter from "./reviewsRouter.js";
const v1Router = express.Router();

v1Router.use("/product", productRouter);

v1Router.use("/user", userRouter);
v1Router.use("/admin", adminRouter);
v1Router.use("/cart", cartRouter);
v1Router.use("/rating", ratingRouter);
v1Router.use("/wishlist", wishlistRouter);
v1Router.use("/payment", paymentRouter);
v1Router.use("/seller", sellerRouter);
v1Router.use("/reviews", reviewsRouter);
export default v1Router;
