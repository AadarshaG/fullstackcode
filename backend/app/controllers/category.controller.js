const CategoryModel = require('../models/category.model');

class CategoryController{
    getAllCats = (req,res,next) =>{
        CategoryModel.find()
        .then((cats)=>{
            res.json({
                data: cats,
                msg:"All Category Lists",
                status: true
            })
        })
        .catch((err)=>{
            res.json({
                data: null,
                msg:  JSON.stringify(err),
                status: false
            })
        })
    }

    addCategory = (req,res,next) =>{
        const category = new CategoryModel(req.body);
       

        if(req.file.filename){
            category.image = req.file.filename;
        }
        category.save()
        .then((success)=>{
            res.json({
                data: req.body,
                msg: "Category Added Successfully",
                status: true
            })
        })
        .catch((err)=>{
            res.json({ 
                data: null,
                msg:  JSON.stringify(err),
                status: false
            })
        })
    }
    updateCategory = (req,res,next) => {
        CategoryModel.updateOne(
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
                msg: " Category Updated Successfully.",
                status: true
            })
        })
        .catch((error)=>{
            res.json({
                data: null,
                msg: "Cannot updated at this moment.",
                status: false
            })
        })
    }
    deleteCategory = (req,res,next) =>{
        CategoryModel.deleteOne({
            _id: req.params.id
        })
        .then((success)=>{
            res.json({
                data: JSON.stringify(success),
                msg: "Category Deleted Successfully",
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
    getCategoryById = (req,res,next) =>{
        CategoryModel.findById({
            _id: req.params.id
        })
        .then((category)=>{
            res.json({
                data: category,
                msg: "Category Details",
                status: 200
            })
        })
        .catch((error)=>{
            res.json({
                data: null,
                msg: JSON.stringify(error),
                status: 400
            })
        })
    }
}

module.exports = CategoryController;