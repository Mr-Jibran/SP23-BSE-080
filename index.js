const express = require("express");
let server = express();
var layouts = require("express-ejs-layouts");

server.set("view engine", "ejs");

server.use(express.static("public"));

server.get("/",(req,res)=>{
    return res.render("LayersIndex");
})

server.get("/contact", (req, res) =>{
    return res.render("contact");
});


server.listen(5000,()=>{
    console.log('server started at localhost:5000');
});