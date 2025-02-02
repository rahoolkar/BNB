const mongoose = require("mongoose");
const Review = require("./reviews.js");

const listingSchema = new mongoose.Schema({
    title:{
        type:String,
        required : true
    },
    description:String,
    image:{
        type:String,
        default:"https://media.istockphoto.com/id/827247322/vector/danger-sign-vector-icon-attention-caution-illustration-business-concept-simple-flat-pictogram.jpg?s=1024x1024&w=is&k=20&c=2W5pNNJU2PjMWIKofixVDLkFD7mx9a55GDCRa74p1hE=",
        set:(v)=> v === "" ? "https://media.istockphoto.com/id/827247322/vector/danger-sign-vector-icon-attention-caution-illustration-business-concept-simple-flat-pictogram.jpg?s=1024x1024&w=is&k=20&c=2W5pNNJU2PjMWIKofixVDLkFD7mx9a55GDCRa74p1hE=" : v,
    },
    price:Number,
    location:String,
    country:String,
    reviews : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Review"
    }]
})

listingSchema.post("findOneAndDelete",async function(deletedListing){
    if(deletedListing.reviews){
        await Review.deleteMany({_id : {$in : deletedListing.reviews}}); 
    }
})

const Listing = mongoose.model("Listing",listingSchema);

module.exports = Listing;