const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const myError = require("../utils/myError.js");
const {listingschema,reviewSchema} = require("../schema.js");
const Listing = require("../models/listing.js");

//index route 
router.get("/",(req,res,next)=>{
    Listing.find({}).then((result)=>{
        let allListing = result;
        res.render("Listings/index.ejs",{allListing});
    }).catch((error)=>{
        next(err);
    })
})

//new route 
router.get("/new",(req,res)=>{
    res.render("Listings/new.ejs")
})

//defining a middleware for the post route
const validateListing = (req,res,next)=>{
    let data = req.body;
    let result = listingschema.validate(data);
    if(result.error){
        throw new myError(400,result.error);
    }else{
        next();
    }
}

//post request
router.post("/",validateListing,wrapAsync(async(req,res,next)=>{
    let data = req.body;
    let newData = new Listing(data);
    await newData.save();
    res.redirect("/listings");
    
    // let data = req.body;
    // let newData = new Listing(data);
    // newData.save().then(()=>{
    //     res.redirect("/listings");
    // }).catch((err)=>{
    //     next(err);
    // })


    // let {title,description,image,price,location,country} = req.body;
    // let newData = new Listing({title:title,description:description,image:image,price:price,location:location,country:country});
    // newData.save().then(()=>{
    //     res.redirect("/listings")
    // }).catch(()=>{
    //     res.send(":(");
    // })
}))

//edit route 
router.get("/:id/edit",wrapAsync(async (req,res)=>{
    let {id} = req.params;
    let node = await Listing.findById(id);
    res.render("Listings/edit.ejs",{node});
}))

//put request
router.put("/:id",wrapAsync(async (req,res)=>{
    let {id} = req.params;
    let node = req.body;
    await Listing.findByIdAndUpdate(id,node);
    res.redirect("/listings");
}))

//show route
router.get("/:id",(req,res,next)=>{
    let {id} = req.params;
    Listing.findById(id).populate("reviews").then((result)=>{
        let data = result;
        res.render("Listings/show.ejs",{data});
    }).catch((error)=>{
        next(err);
    })
})

//delete request
router.delete("/:id",wrapAsync(async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
}))

module.exports = router;