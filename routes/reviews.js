const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const myError = require("../utils/myError.js");
const {listingschema,reviewSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");

//Reviews 
//defining a middleware for the review post route
const validateReview = (req,res,next)=>{
    let data = req.body;
    let result = reviewSchema.validate(data);
    if(result.error){
        throw new myError(400,result.error);
    }else{
        next();
    }
}
//Post Review Route
router.post("/",validateReview,wrapAsync(async(req,res)=>{
    let {id} = req.params;
    let data = req.body;

    let new_review = new Review(data);
    let rr = await new_review.save();

    let listing = await Listing.findById(id);
    listing.reviews.push(rr);

    await listing.save();

    res.redirect(`/listings/${id}`);
}))

//Delete Review Route
router.delete("/:rid",wrapAsync(async(req,res)=>{
    let{id,rid} = req.params;

    await Listing.findByIdAndUpdate(id,{$pull:{reviews:rid}});

    await Review.findByIdAndDelete(rid);

    res.redirect(`/listings/${id}`);
}))

module.exports = router;