const express = require("express");
const app = express();
const mongoose = require('mongoose');
const port = 8080;
const path = require("path");
var methodOverride = require('method-override');
var engine = require('ejs-mate')
const myError = require("./utils/myError.js");
const listings = require("./routes/listings.js")
const reviews = require("./routes/reviews.js")

app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.engine('ejs', engine);
app.use(express.static(path.join(__dirname,"/public")));

async function main() {
    mongoose.connect('mongodb://127.0.0.1:27017/bnb');
}

main().then(()=>{
    console.log("connection is created");
}).catch((error)=>{
    console.log(":(")
})


//Listings Route Router
app.use("/listings",listings);

//Review Route Router
app.use("/listings/:id/reviews", reviews)

//Root Route
app.get("/",(req,res)=>{
    res.send("hello konichiwa arigatto namaste nodejs");
})

//defining a route jo upar vale sabse check karega and then if it doesnot match with anything then this route will work
app.all("*",(req,res,next)=>{
    next(new myError(404,"Route doesnot exists"));
})

//defining a error handling middleware
app.use((err,req,res,next)=>{
    let {status=500,message="some error occured and we are working on it"} = err ;
    res.render("error.ejs",{status,message});
})



app.listen(port,()=>{
    console.log("app is running on server 8080")
})