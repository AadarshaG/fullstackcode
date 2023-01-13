const express = require('express');

const ProductController = require('../app/controllers/product.controller');
const productController = new ProductController();

const uploader = require('../app/middleware/uploader');

const router = express.Router();

//routes 

router.route('/')
.get(productController.getAllProducts)
.post(uploader.array('image',10),productController.addProduct);

router.route('/:id')
.put(uploader.array('image',10),productController.updateProduct)
.delete(productController.deleteProduct)
.get(productController.getProduct);

module.exports = router;