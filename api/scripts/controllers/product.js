const Product = require("../models/product");

exports.createProduct = (req, res) => {
    new Product(req.body).save().then(() => res.status(200).json({res: "product added"}))
    .catch(() => res.status(400).json({error: "error"}));
}

exports.getAllProducts = (req, res) => {
    Product.find({userid: req.body.userid}).then(userProducts => Product.find({userid: null}).then(otherProducts => res.status(200).json([...userProducts, ...otherProducts])))
    .catch(() => res.status(400).json({error: "error"})); 
}