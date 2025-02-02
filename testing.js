const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const listingschema = require("./schema.js");
const Review = require("./models/reviews.js");


async function main() {
    mongoose.connect('mongodb://127.0.0.1:27017/bnb');
}

main().then(()=>{
    console.log("connection is created");
}).catch((error)=>{
    console.log(":(")
})


async function getdata() {
    let data = await Listing.findById("679a62509a6dbcf6e78f7f48").populate("reviews"); 
    console.log(data);

}

getdata();