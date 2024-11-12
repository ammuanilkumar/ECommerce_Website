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


