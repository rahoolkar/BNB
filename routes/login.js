const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/",(req,res)=>{
    res.render("users/login.ejs");
})

router.post('/', 
    passport.authenticate('local', { failureRedirect: '/login', failureFlash : true }),
    function(req, res) {
        req.flash("success","Welcome to BNB !");
        res.redirect('/listings');
    });

module.exports = router;