const express = require("express");
let router = express.Router();

let Product = require("../../models/products.model");

router.get("/admin/products/create", (req, res) => {
    res.render("admins_ejs_files/form-products", {
        layout : "AdminParent",
        title: "Create Your Products"
    });
});

router.get("/admin/products/delete/:id" , async(req, res) => {
    let params = req.params;
    let product = await Product.findByIdAndDelete(req.params.id);
    // let query = req.query;
    // res.send({query, params});
    // res.send(product);
    return res.redirect("/admin/products");
});


router.get("/admin/products/edit/:id" , async(req, res) => {
    
    let product = await Product.findById(req.params.id);
    
    return res.render("admins_ejs_files/edit-form-products",
    {
        layout : "AdminParent",
        title: "Edit Your Products",
        product,
    });
});



router.post("/admin/products/edit/:id" , async (req, res) => {
    
    let product = await Product.findById(req.params.id);

    product.title = req.body.title;
    product.description = req.body.description;
    product.price = req.body.price;
    
    await product.save();
    return res.redirect("/admin/products");
});


router.post("/admin/products/create" , async (req, res) => {
    let data = req.body;
    let newProduct = new Product(data);
    newProduct.title = data.title;

    await newProduct.save();

    return res.redirect("/admin/products");
});

router.get("/admin/products" , async (req, res) => {
    
    let products = await Product.find();

    res.render("admins_ejs_files/products" , {
        layout: 'AdminParent',
        title: "Products List",
        Heading: "Manage your Products",
        products,
    });
});


router.get("/admin" , (req, res) => {

    let Users = [
        {
            _id: 1,
            Name : "Jibran Ali",
            email: "abcXYZ@gmail.com",
            Pass: "***************",
            address: "ABC town, Lahore Pakistan"
        },
    ];
    res.render("admins_ejs_files/users" , {
        layout: 'AdminParent',
        title: "Users List",
        Heading: "Manage Users",
        Users,
    });
});


module.exports = router;