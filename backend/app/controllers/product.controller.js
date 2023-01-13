const ProductModel = require('../models/product.model');

class ProductController{
    getAllProducts = (req,res,next) => {
        //for loggedin seller product
        let filter;
        if(req.user.is_admin){
            filter = {}
        }else{
            filter = {
                seller_id: req.user._id
            }
        }

        // from admin all products
        ProductModel.find(filter)
        .populate('cat_id')
        .then((products)=>{
            res.json({
                data: products,
                msg: "Product Lists",
                status: true
            })
        })
        .catch((error)=>{
            res.json({
                data: null,
                msg: JSON.stringify(error),
                status: false
            })
        })
    }

    addProduct = (req,res,next) => {
        const product = new ProductModel(req.body);
        if(req.file.filename){
            product.image = req.file.filename;
        }
        if(product.seller_id == 'null'){
            product.seller_id = null;
        }
        if(product.child_cat_id == '' || product.child_cat_id == null ){
            product.child_cat_id = null;
        }
        product.save()
        .then((success)=>{
            res.json({
                data: req.body,
                msg: "Product Added Successfully.",
                status: true
            })
        })
        .catch((error)=>{
            res.json({
                data: null,
                msg: error,
                status: false
            })
        })
    }

    updateProduct = (req,res,next) => {
        let data = req.body;

        let old_images = data.images

        let images = [];

        if(old_images){
            images = old_images.split(',');
        }

        if(req.files){
            req.files.map((o) => {
                images.push(o.filename)
            })
            data.image = images;
        }
        if(data.seller_id == 'null'){
            data.seller_id = null;
        }
        if(data.child_cat_id == '' || data.child_cat_id == null ){
            data.child_cat_id = null;
        } 

        data.is_featured = req.body.is_featured ? true : false; 
        
        ProductModel.updateOne(
            {
                _id: req.params.id
            },
            {
                $set: req.body
            },
            {
                upsert: true
            }
        )
        .then((success)=>{
            res.json({
                data: req.body,
                msg: "Product Updated Succssfully.",
                status: true
            })
        })
        .catch((error)=>{
            res.json({
                data: null,
                msg: error,
                status: false
            })
        })
    }

    deleteProduct = (req,res,next) =>{
        ProductModel.deleteOne(
            {
                _id: req.params.id
            }
        )
        .then((success)=>{
            res.json({
                data: success,
                msg: "Product Deleted Succssfully.",
                status: true
            })
        })
        .catch((error)=>{
            res.json({
                data: null,
                msg: error,
                status: false
            })
        })
    }

    getProduct = (req,res,next) => {
        ProductModel.findOne(
            {
                _id: req.params.id
            }
        )
        .then((product)=>{
            res.json({
                data: product,
                msg: "Product Details Display.",
                status: true
            })
        })
        .catch((error)=>{
            res.json({
                data: null,
                msg: error,
                status: false
            })
        })
    }

}

module.exports = ProductController;