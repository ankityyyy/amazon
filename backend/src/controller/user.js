import { User } from "../models/user.js";
import {StatusCodes} from "http-status-codes"

const register=async(req,res)=>{
     const { email, phone, password ,role} = req.body;
  const user = new User({ email, phone, provider: "local" ,role});
  await User.register(user, password);
          return  res.status(StatusCodes.CREATED).json({ message: "User Registered" });
         
}


const signin = async (req, res) => {
  res.json({ message:"user login",user:req.user});
};

export {register,signin};