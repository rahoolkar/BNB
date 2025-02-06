const express = require("express");
const app = express();
const session = require('express-session')
const flash = require('connect-flash');

app.use(session({
    secret: 'nazi',
    resave: false,
    saveUninitialized: true
}));
app.use(flash());

//register route
app.get("/register",(req,res)=>{
    let { name = "undefined" } = req.query;
    req.session.name = name; //setting up the temporary data
    console.log(req.session);
    if(name==="undefined"){
        req.flash("error","user is not mentioned"); //defining the flash message in the session
    }else{
        req.flash("success","user loggined");
    }
    res.redirect("/hello");
})

//hello route
app.get("/hello",(req,res)=>{
    res.locals.successflashMsg = req.flash("success");
    res.locals.errorflashMsg = req.flash("error");
    res.send(`hello,${req.session.name}`); //using the temporary data 
})

app.get("/session",(req,res)=>{
    if(req.session.count){
        req.session.count  = req.session.count + 1 ;
    }else{
        req.session.count = 1 ;
    }

    res.send(`you have requested this site ${req.session.count} times`);
})

app.listen(8080,()=>{
    console.log("app is running on server 8080")
})