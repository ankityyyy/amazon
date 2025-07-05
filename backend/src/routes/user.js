import express from 'express';
const router=express.Router();
import { register,signin } from '../controller/user.js';

import passport from 'passport';


router.post("/register",register)


router.post("/login", passport.authenticate("local", {
    failureRedirect: "/login-failure",
    failureMessage: true
  }),
  signin
  


);



router.all("/login-failure", (req, res) => {
  res.status(400).json({
    message: "Login failed",
    reason: req.session?.messages || "Invalid credentials"
  });
});



router.get("/jj",(req,res)=>{
     res.send("<a href='/auth/google'>login</a>");

})

router.get("/auth/google", passport.authenticate("google", {
  scope: ["profile", "email"]
}))



// router.get("/auth/google/callback",
//   passport.authenticate("google", {
//     failureRedirect: "/login",
// //     successRedirect: "http://localhost:3000/chatbot"
//   },(req,res)=>{
//      res.redirect("/profile");
//   })
// );

router.get("/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login"
  }),
  (req, res) => {
    // This runs **only** after successful authentication
    res.redirect("/profile");
  }
);


router.get("/profile",(req,res)=>{
     res.send(req?.user)
})



export {router}; 