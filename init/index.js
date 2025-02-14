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
    newdata = data.map((obj)=>{
        return {...obj,owner : '67af090f4ba72dbf04885c38'}
    })
    let result = await Listing.insertMany(newdata);
    console.log(result);
}

initDatabase();