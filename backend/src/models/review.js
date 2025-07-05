
import mongoose from "mongoose";

const reviewSchema=new mongoose.Schema({
      userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User",
       },
       productId:{
          type: mongoose.Schema.Types.ObjectId,
         ref: "Product",
       },
        comment:{
        type:String,
        required:true

    },
    rating:{
        type:Number,
        min: 1,
        max: 5,
    },
    
},{ timestamps: true })

export const review=mongoose.model("Review", reviewSchema);