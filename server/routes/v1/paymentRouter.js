import express from 'express';
const router =express.Router();

router.get('/',async (req, res,next) => {
    console.log('user get method accessed');
})

router.post('/', async (req, res, next) => {
    console.log('user post method accessed');
})


export default router