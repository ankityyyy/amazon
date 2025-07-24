import { Product } from "../models/product.js";
import { StatusCodes } from "http-status-codes";
import ExpressError from "../util/ExpressError.js";

const checkProductOwner = async (req, res, next) => {
  try {
    let { id } = req.params; 
    let product = await Product.findById(id);
    if (!product) {
      return next(
        new ExpressError("product not found", StatusCodes.BAD_REQUEST)
      );
    }
    console.log("productUser",product.userId.toString());
    console.log("requser",req.user._id.toString());
    if (
      req.user.role === "seller" &&
      product.userId.toString() !== req.user._id.toString()
    ) {
      return next(
        new ExpressError(
          "You are not authorized to update this product",
          StatusCodes.FORBIDDEN 
        )
      );
    }
    req.product = product;

    next();
  } catch (error) {
    next(
      new ExpressError(
        "Internal Server Error",
        StatusCodes.INTERNAL_SERVER_ERROR
      )
    );
  }
};
 
export default checkProductOwner;
