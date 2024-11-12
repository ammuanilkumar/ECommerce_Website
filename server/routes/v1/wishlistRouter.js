import express from 'express';
import { 
      addToWishlist,
      getWishlist,
      removeFromWishlist } from '../../controller/wishlistController.js';
import { authUser } from '../../middlewares/authUser.js';

const router = express.Router();

router.post('/add/:id', authUser, addToWishlist);
router.get('/get', authUser, getWishlist);
router.delete('/remove/:id', authUser, removeFromWishlist);

export default router; // Add this default export



// import express from "express";
// import { authUser } from "../../middlewares/authUser.js";
// import {
//   addToWishlist,
//   getWishlist,
//   removeFromWishlist,
// } from "../../controller/wishlistController.js";

// const router = express.Router();

// router.post("/add/:id", authUser, addToWishlist);

// router.delete("/remove/:id", authUser, removeFromWishlist);

// router.get("/get", authUser, getWishlist);

// export default router;

// import express from 'express';
// import { addToWishlist, getWishlist, removeFromWishlist } from '../../controller/wishlistController.js';
// import { authUser } from './middlewares/authUser.js';

// const router = express.Router();

// router.post('/add/:id', authUser, addToWishlist);
// router.get('/get', authUser, getWishlist);
// router.delete('/remove/:id', authUser, removeFromWishlist);

// export default router;


// import express from 'express';
// import { addToWishlist,
//     getWishlist,removeFromWishlist} from ".../../controller/wislistController.js';"
// // import  { 
// //      addToWishlist,
// //      getWishlist,
// //      removeFromWishlist } from '.../../controller/wislistController.js';

// import { authUser } from './middlewares/authUser.js';

// const router = express.Router();

// router.post('/add/:id', authUser, addToWishlist);

// router.get('/get', authUser, getWishlist);

// router.delete('/remove/:id', authUser, removeFromWishlist);


// export default router