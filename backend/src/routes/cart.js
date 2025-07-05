import express from 'express';
const router=express.Router();
import {isLogin} from "../middleware/roleMiddleware.js";
import wrapAsync from '../util/wrapAsync.js';
import {getProduct,createCart, deleteCart} from "../controller/cart.js"



router.get("/",isLogin,wrapAsync(getProduct));
router.post("/new/:id",isLogin,wrapAsync(createCart))
router.delete("/delete/:id",isLogin,wrapAsync( deleteCart));

export default  router;