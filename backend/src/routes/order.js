import express from 'express';
const router=express.Router();
import {isLogin} from "../middleware/roleMiddleware.js";
import wrapAsync from '../util/wrapAsync.js';
import {getuserOrder,orderPlaced} from "../controller/order.js"

router.get('/',isLogin,wrapAsync(getuserOrder))
router.post('/',isLogin,wrapAsync(orderPlaced))

export default router;