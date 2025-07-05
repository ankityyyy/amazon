import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
 
  },
   title: {
    type: String,
     required: true,
  },
  description: {
    type: String,
    required: true,
  },

  qty: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true
  },
  totalAmount: {
    type: Number,
    required: true
  },
  image: {
          filename: { type: String }, 
          url: { type: String, default: "uploads/default.jpg" }
        },
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
   
  },
  items: {
    type: [cartItemSchema],
    default: []
  }
}, { timestamps: true });

export const Cart = mongoose.model("Cart", cartSchema);
