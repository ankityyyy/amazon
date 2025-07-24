import {User} from "../models/user.js"
import ExpressError from "../util/ExpressError.js";
import { StatusCodes } from "http-status-codes";



const isLogin=(req,res,next)=>{
  console.log(req.user)
  
    if(!req.isAuthenticated()){
        return next(new ExpressError("User not authenticated........ ", StatusCodes.UNAUTHORIZED));
    }
    next()
}

 const roleMiddleware = (...role) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!role.includes(req.user.role)) {
      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};


export {isLogin,roleMiddleware}