import mongoose from "mongoose";

const productOrderSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  price: { type: Number, required: true },
  qty: { type: Number, required: true },
  totalAmount: {
    type: Number,
    required: true 
  },
  image: {
          filename: { type: String }, 
          url: { type: String, default: "uploads/default.jpg" }
        },
   order_status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    default: "pending"
  }
});

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  order: {
    type: [productOrderSchema],
    default: []
  },
  
   
 
}, { timestamps: true });

export const Order = mongoose.model("Order", orderSchema);
