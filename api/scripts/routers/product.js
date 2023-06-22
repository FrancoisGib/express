const express = require("express");
const router = express.Router();
const productCtrl = require('../controllers/product');
router.post('/api/product/create', productCtrl.createProduct);
router.post('/api/product/get', productCtrl.getAllProducts);
module.exports = router;
