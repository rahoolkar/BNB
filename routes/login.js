const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/",(req,res)=>{
    res.render("users/login.ejs");
})

//middleware for the redirecturl
const redirect = function(req,res,next){
    if(req.session.redirecturl){
        res.locals.redirecturl = req.session.redirecturl;
    }
    next();
}

router.post('/',redirect,
    passport.authenticate('local', { failureRedirect: '/login', failureFlash : true }),
    function(req, res) {
        req.flash("success","Welcome to BNB !");
        if(res.locals.redirecturl){
            res.redirect(res.locals.redirecturl);
        }else{
            res.redirect("/listings")
        }
    });

module.exports = router;