const express = require("express");
const app = express();
const mongoose = require('mongoose');
const port = 8080;
let Listing = require("./models/listing.js");

async function main() {
    mongoose.connect('mongodb://127.0.0.1:27017/test');
}

main().then(()=>{
    console.log("connection is created");
}).catch((error)=>{
    console.log("error :(")
})

app.listen(port,()=>{
    console.log("app is running on server 8080")
})