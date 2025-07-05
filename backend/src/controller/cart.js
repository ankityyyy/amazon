import { Cart } from "../models/cart.js";
import { StatusCodes } from "http-status-codes";
import ExpressError from "../util/ExpressError.js";
import { Product } from "../models/product.js";


export const getProduct = async (req, res) => {
  let allCartProduct = await Cart.find({ userId:req.user._id }).populate(
    "items.productId",
    "title qty price totalAmount"
  );
  return res.status(StatusCodes.OK).json({ message:"all cart product add by user", item:allCartProduct });
};

export const createCart = async (req, res, next) => {
  const { id } = req.params;
  const { qty } = req.body;

  const product = await Product.findById(id);
  if (!product) {
    return next(new ExpressError("Product not found", StatusCodes.BAD_REQUEST));
  }

  const price = product.price;
  const totalAmount = qty * price;
  const title = product.title;
  const description = product.description;
  const image = product.image;

  let cart = await Cart.findOne({ userId: req.user._id });

  if (!cart) {
    // New cart
    cart = new Cart({
      userId: req.user._id,
      items: [{ productId: id, title, description, qty, price, totalAmount, image }],
    });
  } else {
    // Update existing cart
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === id
    );

    if (existingItem) {
      existingItem.qty += qty;
      existingItem.totalAmount = existingItem.qty * price;
    } else {
      cart.items.push({ productId: id, title, description, qty, price, totalAmount, image });
    }
  }

  await cart.save();
  return res.status(StatusCodes.OK).json({ message: "Product added to cart", cart });
};

export const deleteCart = async (req, res, next) => {
  const { id } = req.params;

  const cart = await Cart.findOne({ userId:req.user._id });
  if (!cart) {
    return next(new ExpressError("Cart not found", StatusCodes.NOT_FOUND));
  }

  if (cart.userId.toString() !== req.user._id.toString()) {
            return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'You are not authorized to remove ' });
        }

  cart.items = cart.items.filter(
    (item) => item.productId.toString() !== id
  );
 
  await cart.save();

  return res.status(StatusCodes.OK).json({ message: "Item removed from cart", data:cart });
};

