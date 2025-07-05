import { Product } from "../models/product.js";
import { StatusCodes } from "http-status-codes";
import ExpressError from "../util/ExpressError.js";

export const allProduct = async (req, res, next) => {
  let alldata = await Product.find({});
  return res.status(StatusCodes.OK).json({ product: [ ...alldata] ,message:"featch all product"});
};

export const showProduct = async (req, res, next) => {
  let { id } = req.params;
  let product = await Product.findById(id);
  if (!product) {
    return next(new ExpressError("product not found", StatusCodes.BAD_REQUEST));
  }
  return res.status(StatusCodes.OK).json({ "productId":product });
};

export const createdPost = async (req, res, next) => {
  const { title, description, price, qty, category } = req.body;
  if (!req.file) {
    return next(new ExpressError("No file uploaded", StatusCodes.BAD_REQUEST));
  }

  let url = req.file.path;
  let filename = req.file.filename;

  let newPoduct = new Product({
    userId: req.user._id,
    title,
    description,
    price,
    qty,
    category,
    image:{ url, filename }
  });
  await newPoduct.save();
  return res.status(StatusCodes.OK).json({ message: newPoduct });
};

export const updateProduct = async (req, res, next) => {
  let product = req.product;
  let id = product._id;
  let updateData = await Product.findByIdAndUpdate(id, req.body, { new: true });

  res
    .status(StatusCodes.OK)
    .json({ message: "product updated", product: updateData });
};

export const deleteProduct = async (req, res, next) => {
  let product = req.product;
  let id = product._id;

  let deleteData = await Product.findByIdAndDelete(id);
  res.status(StatusCodes.OK).json({ message: "product deleted", deleteProduct:deleteData });
};
