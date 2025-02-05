const express = require("express");
const app = express();
var cookieParser = require('cookie-parser')


app.use(cookieParser("nazi"));

app.get("/sendsignedcookie",(req,res)=>{
    res.cookie("name","udayan",{signed : true});
    res.send("signed cookie sent")
})

app.get("/showsignedcookie",(req,res)=>{
    res.send(req.signedCookies);
})

app.get("/showcookie",(req,res)=>{
    console.log(req.cookies);
    res.send(req.cookies);
})

app.get("/sendcookie",(req,res)=>{
    res.cookie("name","rahulkar"); //sending cookie
    res.send("cookie recieved");
})

app.listen(8080,()=>{
    console.log("app is listening on port 8080");
})