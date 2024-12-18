const express = require("express");
const mongoose = require("mongoose");
const app = express();

let layout = require("express-ejs-layouts");
app.use(layout);
app.set("layout", "ParentPage");

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const session = require("express-session");
app.use(session({
    secret:"my secret session",
    resave: false,
    saveUninitialized: false,
}));


let ProductsTable = require("./Routes/adminRoutes/products.controller");
app.use(ProductsTable);
let productModel = require("./models/products.model");


const webMiddleware = require("./middlewares/web.middleware");
const adminMiddleware = require("./middlewares/admin.middleware");
const authMiddleware = require("./middlewares/authentication.middle");
const restrictedRoutes = require("./middlewares/restrictedRoutes.middleware");
// app.use(webMiddleware);
// app.use(authMiddleware);
// app.use(adminMiddleware);
app.use(restrictedRoutes);

// app.use("/", ProductsTable);

app.get("/",  (req, res) => {
    // if (!req.session.user) {
    //     console.log("User not logged in. Redirecting to login. (login-route)");
    //     return res.redirect("/login");
    // }
    console.log("Session is found(login-route) : ");
    return res.render("Home" , {title : "Layers Bakeshop"});
});

app.get("/contact" ,(req, res) => {
    return res.render("contact", {title: "Contact-us"});
});

app.get("/logout", async (req, res) => {
    req.session.destroy();
    return res.redirect("/login");
});



// Add new route for checkout
app.get("/ViewCart/Checkout", async (req, res) => {
    let cart = req.cookies.cart || [];
    
    // Fetch products from the database that match the cart IDs
    let products = await productModel.find({ 
        _id: { $in: cart } 
    }).sort({ createdAt: -1 }); // Sort products by descending date (most recent first)

    res.render("admins_ejs_files/Checkout", { 
        layout: "AdminParent",
        products, 
        title: "Checkout" 
    });
});





let connectionString = "mongodb://localhost/LabTask4";
mongoose.connect(connectionString)
        .then( () => console.log("connected to the MongoDB : " + connectionString))
        .catch( (error) => console.log(error.message));



app.listen(5000, () => {
    console.log("Server started at port 5000");
});