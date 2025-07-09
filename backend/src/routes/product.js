import express from 'express'
const router=express.Router();
import { allProduct,showProduct,createdPost,updateProduct,deleteProduct } from '../controller/product.js';
import {isLogin,roleMiddleware} from "../middleware/roleMiddleware.js"
import checkProductOwner from "../middleware/productOwner.js"
import wrapAsync from "../util/wrapAsync.js"
import {productSchema} from '../joiSchema/productSchema.js';
import { validate } from '../middleware/productJoiVali.js';
import multer from "multer";
import {storage} from "../cloudConfig.js";
const upload = multer({ storage});
// const upload = multer({ dest: 'uploads/' })


router.get('/', allProduct);

router.get('/:id',isLogin, wrapAsync(showProduct));

 router.post("/add",upload.single("image"), isLogin,roleMiddleware("admin", "seller"),validate(productSchema), wrapAsync(createdPost));
 
router.put("/update/:id",isLogin, roleMiddleware("admin", "seller"),checkProductOwner,validate(productSchema), wrapAsync(updateProduct));

router.delete("/delete/:id", isLogin, roleMiddleware("admin", "seller"), checkProductOwner, wrapAsync(deleteProduct));

export default router;
