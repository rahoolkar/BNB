const express = require("express");
const router = express.Router();
const User = require("../models/users");
const wrapAsync = require("../utils/wrapAsync");

router.get("/",(req,res)=>{
    res.render("users/signup.ejs");
})

router.post("/",wrapAsync(async(req,res)=>{
    try{
        let {username,email,password} = req.body;
        let newUser = new User ({username,email});
        let registeredUser = await User.register(newUser,password);
        req.login(registeredUser,(error)=>{
            if(error){
                return next(error);
            }
            req.flash("success","Welcome to BNB");
            res.redirect("/listings");
        })
    }catch(error){
        req.flash("error",error.messege);
        res.redirect("/signup");
    }
}))

module.exports = router;