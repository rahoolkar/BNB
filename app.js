const express = require("express");
const app = express();
const mongoose = require('mongoose');
const port = 8080;
const Listing = require("./models/listing.js");
const path = require("path");
var methodOverride = require('method-override');
var engine = require('ejs-mate')
const wrapAsync = require("./utils/wrapAsync.js");
const myError = require("./utils/myError.js");
const {listingschema,reviewSchema} = require("./schema.js");
const Review = require("./models/reviews.js");
const listings = require("./routes/listings.js")

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

//Listings Middleware
const validateListing = (req,res,next)=>{
    let data = req.body;
    let result = listingschema.validate(data);
    if(result.error){
        throw new myError(400,result.error);
    }else{
        next();
    }
}

//Listings Route Router
app.use("/listings",listings);


//Reviews 
//defining a middleware for the review post route
const validateReview = (req,res,next)=>{
    let data = req.body;
    let result = reviewSchema.validate(data);
    if(result.error){
        throw new myError(400,result.error);
    }else{
        next();
    }
}
//Post Review Route
app.post("/listings/:id/reviews",validateReview,wrapAsync(async(req,res)=>{
    let {id} = req.params;
    let data = req.body;

    let new_review = new Review(data);
    let rr = await new_review.save();

    let listing = await Listing.findById(id);
    listing.reviews.push(rr);

    await listing.save();

    res.redirect(`/listings/${id}`);
}))

//Delete Review Route
app.delete("/listings/:id/reviews/:rid",wrapAsync(async(req,res)=>{
    let{id,rid} = req.params;

    await Listing.findByIdAndUpdate(id,{$pull:{reviews:rid}});

    await Review.findByIdAndDelete(rid);

    res.redirect(`/listings/${id}`);
}))

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