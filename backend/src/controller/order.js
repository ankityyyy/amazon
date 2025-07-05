import { StatusCodes } from "http-status-codes";
import { Order } from "../models/order.js";
import { Product } from "../models/product.js";

export const getuserOrder = async (req, res, next) => {
  let allOrder = await Order.find({ userId: req.user._id }).populate(
    "order.productId",
    " qty price "
  );
  return res.status(StatusCodes.OK).json({ message:"Order fetch successfully", data:allOrder });
}; 

export const orderPlaced = async (req, res, next) => {
  const { items } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return next(new ExpressError("No items provided", StatusCodes.BAD_REQUEST));
  }

  const orderData = [];

  for (const item of items) {
    const product = await Product.findById(item.productId);
    if (!product) {
      return next(new ExpressError(`Product not found: ${item.productId}`, StatusCodes.BAD_REQUEST));
    }

    const price = product.price;
    const totalAmount = price * item.qty;
    const image = product.image;
   

    orderData.push({
      productId: item.productId,
      qty: item.qty,
      price,
      totalAmount,
      image
    });
  }

  const newOrder = new Order({
    userId: req.user._id,
    order: orderData,
  });

  await newOrder.save();
  return res.status(StatusCodes.OK).json({ message: "Order placed successfully" });
};

