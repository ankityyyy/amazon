import express from 'express';
const router=express.Router();
import { createReview,allReview,deleteReview } from '../controller/review.js';
import wrapAsync from '../util/wrapAsync.js'
import {isLogin} from "../middleware/roleMiddleware.js"
import reviewJoiSchema from "../joiSchema/reviewSchema.js"
import { validate } from '../middleware/productJoiVali.js';


router.post("/new/:id",isLogin,validate(reviewJoiSchema),wrapAsync(createReview))
router.get("/",allReview)
router.delete("/:id",isLogin,wrapAsync(deleteReview))

export default router; 