const express = require("express");
const app = express();
const mongoose = require('mongoose');
const port = 8080;
const Listing = require("./models/listing.js");

async function main() {
    mongoose.connect('mongodb://127.0.0.1:27017/bnb');
}

main().then(()=>{
    console.log("connection is created");
}).catch((error)=>{
    console.log("error :(")
})

app.get("/test",(req,res)=>{
    let data1 = new Listing({
        title:"title of the place",
        description:"discription of the place",
        price:34000,
        location:"rohtak",
        country:"india"
    })

    data1.save().then(()=>{
        res.send("successful");
    }).catch((error)=>{
        res.send("error");
    })
})

app.listen(port,()=>{
    console.log("app is running on server 8080")
})