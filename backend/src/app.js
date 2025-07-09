import express from 'express';
const app=express();
import mongoose from 'mongoose';
import GoogleStrategy from "passport-google-oauth20";
import dotenv from 'dotenv';
 dotenv.config();
 import { User } from "./models/user.js";
 import passport from "passport";
import session from "express-session";
import { Strategy as LocalStrategy } from "passport-local";
import { router } from './routes/user.js';
import productRouter from "./routes/product.js"
import reviewRouter from "./routes/review.js"
import cartRouter from "./routes/cart.js";
import orderRouter from './routes/order.js';
import  ExpressError from "./util/ExpressError.js"
// let dbUrl="mongodb://127.0.0.1:27017/amazon"
const dbUrl = process.env.ATLASDB_URL;    
import {StatusCodes} from "http-status-codes"
import cors from 'cors';
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import ejsMate from "ejs-mate";


async function Main(){
     try{
          await mongoose.connect(dbUrl);
           console.log("Connection successful");
     }catch(err){
          console.log("MongoDB Connection Error",err);
     }
}

Main()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, 
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

const isProduction = process.env.NODE_ENV === "production";

const sessionOption = {
  secret: "gsjghdshs",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction,
    maxAge: 7 * 24 * 60 * 60 * 1000
  }
};

app.use(session(sessionOption));
app.use(passport.initialize());
app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL:process.env.GOOGLE_CALLBACK_URL

},
async (accessToken, refreshToken, profile, done) => {
  try {
    const existingUser = await User.findOne({ providerId: profile.id });

    if (existingUser) {
      return done(null, existingUser);
    }

    const newUser = new User({
      email: profile.emails[0].value,
      provider: "google",
      providerId: profile.id
    });

    await newUser.save();
    done(null, newUser);
  } catch (err) {
    done(err, null);
  }
}));





app.get("/",(req,res)=>{
     res.send("it work ");

})

app.use("/", router);
app.use('/api/v1/product',productRouter);
app.use("/review",reviewRouter);
app.use("/api/v1/cart",cartRouter);
app.use('/api/v1/order',orderRouter);


app.use((req,res, next)=>{
  next(new ExpressError("page not found",StatusCodes.BAD_REQUEST))
})

app.use((err, req, res, next) => {
    console.log("ERROR:", err);
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong";
    res.status(statusCode).json({ message });
  });

app.listen(5000,(req,res)=>{
     console.log("app is listen on port no :5000");
})