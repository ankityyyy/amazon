import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema=new mongoose.Schema({
    
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: Number,
    unique: true
  },
 
  provider: {
    type: String, // 'google', 'github', 'local', etc.
    default: 'local'
   
  },
  providerId: {
    type: String, // the unique ID from Google/GitHub
   
  },
  role: {
  type: String,
  enum: ["admin", "seller", "customer"],
  default: "customer" 
},

// isAdmin: {
//     type: Boolean,
//     default: false
// },

  createdAt: {
    type: Date,
    default: Date.now
  }
});



userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email'
});

export const User=mongoose.model("User",userSchema);