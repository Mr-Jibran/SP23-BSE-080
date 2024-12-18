// const mongoose = require("mongoose");

// let Pschema = mongoose.Schema({
//     title: String,
//     description: String,
//     price : Number,
// });


// let productModel = mongoose.model("Products", Pschema);


// module.exports = productModel;


const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    createdAt: {
        type: Date,
        default: Date.now // Automatically set the creation date
    }
});

module.exports = mongoose.model("Product", productSchema);
