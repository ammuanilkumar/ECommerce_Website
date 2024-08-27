import express  from 'express';
import userRouter from './userRouter.js'
import productRouter from './productRouter.js';
import adminRouter from './adminRouter.js';
import cartRouter from './cartRouter.js';
import ratingRouter from './ratingRouter.js';
import wislistRouter from './wislistRouter.js';
import paymentRouter from './paymentRouter.js';




const v1Router = express.Router()

v1Router.use('/user',userRouter);
v1Router.use('/product', productRouter);
v1Router.use('/admin', adminRouter);
v1Router.use('/cart',cartRouter );
v1Router.use('/rating',ratingRouter );
v1Router.use('/wislist', wislistRouter);
v1Router.use('/payment', paymentRouter);
export default v1Router;


