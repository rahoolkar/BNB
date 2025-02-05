const express = require("express");
const app = express();

app.get("/cookie",(req,res)=>{
    res.cookie("name","rahulkar"); //sending cookie
    res.send("cookie recieved");
})

app.listen(8080,(req,res)=>{
    console.log("app is listening on port 8080");
})