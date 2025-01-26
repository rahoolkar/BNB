const express = require("express");
const app = express();
const mongoose = require('mongoose');
const port = 8080;
const Listing = require("./models/listing.js");
const path = require("path");
var methodOverride = require('method-override');
var engine = require('ejs-mate')


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

//index route 
app.get("/listings",(req,res)=>{
    Listing.find({}).then((result)=>{
        let allListing = result;
        res.render("Listings/index.ejs",{allListing});
    }).catch((error)=>{
        res.send(":(")
    })
})

//new route 
app.get("/listings/new",(req,res)=>{
    res.render("Listings/new.ejs")
})

//post request
app.post("/listings",(req,res)=>{
    let data = req.body;

    let newData = new Listing(data);
    newData.save().then(()=>{
        res.redirect("/listings");
    }).catch(()=>{
        console.log(":(");
    })
    // let {title,description,image,price,location,country} = req.body;
    // let newData = new Listing({title:title,description:description,image:image,price:price,location:location,country:country});
    // newData.save().then(()=>{
    //     res.redirect("/listings")
    // }).catch(()=>{
    //     res.send(":(");
    // })
})

//edit route 
app.get("/listings/:id/edit",async (req,res)=>{
    let {id} = req.params;
    let node = await Listing.findById(id);
    res.render("Listings/edit.ejs",{node});
})

//put request
app.put("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    let node = req.body;
    await Listing.findByIdAndUpdate(id,node);
    res.redirect("/listings");
})

//show route
app.get("/listings/:id",(req,res)=>{
    let {id} = req.params;
    Listing.findById(id).then((result)=>{
        let data = result;
        res.render("Listings/show.ejs",{data});
    }).catch((error)=>{
        res.send(":(");
    })
})

//delete request
app.delete("/listings/:id",async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
})

app.listen(port,()=>{
    console.log("app is running on server 8080")
})