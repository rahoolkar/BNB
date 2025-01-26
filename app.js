const express = require("express");
const app = express();
const mongoose = require('mongoose');
const port = 8080;
const Listing = require("./models/listing.js");
const path = require("path");


app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

async function main() {
    mongoose.connect('mongodb://127.0.0.1:27017/bnb');
}

main().then(()=>{
    console.log("connection is created");
}).catch((error)=>{
    console.log("error :(")
})

//index route 
app.get("/listings",(req,res)=>{
    Listing.find({}).then((result)=>{
        let allListing = result;
        //res.send(allListing);
        res.render("index.ejs",{allListing});
    }).catch((error)=>{
        res.send("error :(")
    })
})

app.listen(port,()=>{
    console.log("app is running on server 8080")
})