import mongoose from "mongoose";

const Productlisting = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
     required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
     required: true,
  },
  qty: {
    type: Number,
     required: true,
  },
  category: {
    type: String,
    enum: ["clothing", "electronics", "sports"],
    required: true
  },
  image: {
          filename: { type: String }, 
          url: { type: String, default: "uploads/default.jpg" }
        },
});

export const Product=mongoose.model("Product",Productlisting);