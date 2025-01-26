const mongoose = require("mongoose");
const data = require("./data.js");
const Listing = require("../models/listing.js");

async function main() {
    mongoose.connect('mongodb://127.0.0.1:27017/bnb');
}

main().then(()=>{
    console.log("connection is created");
}).catch((error)=>{
    console.log("error :(")
})

async function initDB(){
    await Listing.deleteMany({});
    await Listing.insertMany(data);
    console.log("db is initialized");
}

initDB();