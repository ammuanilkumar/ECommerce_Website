import express from 'express';
const router =express.Router();

router.get('/',async (req, res,next) => {
    console.log('rating get method accessed');
})

router.post('/', async (req, res, next) => {
    console.log('rating post method accessed');
})


export default router