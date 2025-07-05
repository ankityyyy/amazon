// import productSchema from '../joiSchema/productSchema.js';
import ExpressError from '../util/ExpressError.js'
import { StatusCodes } from "http-status-codes";

// const validateproduct=(req,res,next)=>{
//      let {error}=productSchema.validate(req.body);
//      if(error){
//   let errMsg=error.details.map((el)=>el.message).join(",");
//       throw new ExpressError(errMsg,StatusCodes.BAD_REQUEST);
//      }
//      next()

     
// }

const validate=(schema)=>{
     return (req,res,next)=>{
            let {error}=schema.validate(req.body);
           if (error) {
    const errMsg = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(errMsg, StatusCodes.BAD_REQUEST);
  }
  next();
     }
}

export {validate}