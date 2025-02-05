const express = require("express");
const app = express();
var cookieParser = require('cookie-parser')


app.use(cookieParser())

app.get("/showcookie",(req,res)=>{
    console.log(req.cookies);
    res.send(req.cookies);
})

app.get("/sendcookie",(req,res)=>{
    res.cookie("name","rahulkar"); //sending cookie
    res.send("cookie recieved");
})

app.listen(8080,(req,res)=>{
    console.log("app is listening on port 8080");
})