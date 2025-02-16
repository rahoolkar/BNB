const mongoose = require('mongoose');
const Listing = require("../models/listings.js");
const {data} = require("./data.js");

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/bnb');
}

function deleteDatabase(){
    Listing.deleteMany({}).then((result)=>{
        console.log(result);
    }).catch((error)=>{
        console.log(error);
    })
}

deleteDatabase();

async function initDatabase(){
    let newdata = data.map((obj)=>{
        return {...obj,owner : '67b22d8a4fb6cb9325721164'}
    })
    await Listing.insertMany(newdata);
}

initDatabase();