const express = require("express");
const mongoose = require("mongoose");
const app = express();

let layout = require("express-ejs-layouts");
app.use(layout);
app.set("layout", "ParentPage");

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

let ProductsTable = require("./Routes/adminRoutes/products.controller");
app.use(ProductsTable);



app.get("/", (req, res) => {
    return res.render("Home" , {title : "Layers Bakeshop"});
});

app.get("/contact" , (req, res) => {
    return res.render("contact", {title: "Contact-us"});
});



let connectionString = "mongodb://localhost:27017/products";
mongoose.connect(connectionString)
        .then( () => console.log("connected to the MongoDB : " + connectionString))
        .catch( (error) => console.log(error.message));



app.listen(5000, () => {
    console.log("Server started at port 5000");
});