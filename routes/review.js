const express = require("express");
const router = express.Router({mergeParams : true});
const Review = require("../models/reviews.js")
const Listing = require("../models/listings.js");
const wrapAsync = require("../utils/wrapAsync.js");
const myError = require("../utils/myError.js");
const {reviewschema} = require("../schema.js");


//Reviews
//middleware for the post route for the review
let validateReviews = (req,res,next)=>{
    let data = req.body;
    let ans = reviewschema.validate(data);
    if(ans.error){
        throw new myError(400,ans.error);
    }else{
        next();
    }
}

//middleware for authenticating
const isLoggedIn = function(req,res,next){
    if(!req.isAuthenticated()){
            req.flash("error","Please Login in :(");
            return res.redirect("/login");
    }
    next();
}

//delete request for the review
router.delete("/:rid",wrapAsync(async(req,res)=>{
    let {lid,rid} = req.params;
    await Review.findByIdAndDelete(rid);
    await Listing.findByIdAndUpdate(lid,{ $pull : {reviews : rid} });
    req.flash("success","Review deleted !")
    res.redirect(`/listings/${lid}`);
}))

//post route for the review 
router.post("/",isLoggedIn,validateReviews,wrapAsync(async (req,res)=>{
    let data = req.body;
    let {id} = req.params;
    let newReview = new Review(data);
    newReview.author = req.user._id; 
    let listing = await Listing.findById(id);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success","Review posted !")
    res.redirect(`/listings/${id}`);
}))

module.exports = router;