import { review } from "../models/review.js";
import { Product } from "../models/product.js";
import {StatusCodes} from "http-status-codes"
 import ExpressError from "../util/ExpressError.js"

export const createReview=async(req,res,next)=>{
     let {id}=req.params;
     let { rating, comment } = req.body;

     let product=await Product.findById(id);
     if(!product){
          return next(new ExpressError("product not found",StatusCodes.BAD_REQUEST))
          
     }
     

     let newReview=new review({
           productId:id,
          userId:req.user._id,
          rating,
          comment
     })

      await newReview.save();
     return res.status(StatusCodes.OK).json({message:newReview });

}

export const allReview=async(req,res)=>{
     let allReview=await review.find({});
     return res.status(StatusCodes.OK).json({message:allReview });
}

export const deleteReview=async(req,res,next)=>{
      let {id}=req.params;
      let reviews=await review.findById(id);
      if(!reviews){
           return next(new ExpressError(" review not found",StatusCodes.BAD_REQUEST))
     }

if (reviews.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'You are not authorized to delete this review' });
        }

     let deleteReview=await review.findByIdAndDelete(id)
     res.status(200).json({ message: 'Review deleted successfully',  deleteReview });


}