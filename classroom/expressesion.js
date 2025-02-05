const express = require("express");
const app = express();
const session = require('express-session')

app.use(session({secret: 'nazi'}));

app.get("/session",(req,res)=>{
    res.send("test is sucessfull");
})

app.listen(8080,()=>{
    console.log("app is running on server 8080")
})