const mongoose = require("mongoose");

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
    country:String
})

const Listing = mongoose.model("Listing",listingSchema);

module.exports = Listing;