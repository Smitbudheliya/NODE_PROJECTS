const categorymodel = require("../models/categorymodel");
const subcategorymodel = require("../models/subcategorymodel");
const extracategorymodel = require("../models/extracategorymodel");
const productmodel = require("../models/productmodel");
const path = require("path");
const fs = require("fs");

// Add Product Page
module.exports.addproductpage = async (req, res) => {
    try {
        const categories = await categorymodel.find();
        const subcategories = await subcategorymodel.find();
        const extracategories = await extracategorymodel.find();
        res.render("product/addproduct", { categories, subcategories, extracategories });
    } catch (err) {
        console.log(err);
        return false;
    }
};

// Get Subcategories by Category ID
module.exports.getSubcategories = async (req, res) => {
    try {
        const categoryId = req.query.categoryId;
        const subcategories = await subcategorymodel.find({ category: categoryId });
        return res.json({ subcategory: subcategories });
    } catch (err) {
        console.log("Error fetching subcategories:", err);
        return res.json({ message: "Server error" });
    }
};

// Get Extra Categories by Subcategory ID
module.exports.getExtracategories = async (req, res) => {
    try {
        const subcategoryId = req.query.subcategoryId;
        const extracategories = await extracategorymodel.find({ subcategory: subcategoryId });
        return res.json({ extracategory: extracategories });
    } catch (err) {
        console.log("Error fetching extracategories:", err);
        return res.json({ message: "Server error" });
    }
};

// Insert Product
module.exports.insertproduct = async (req, res) => {
    try {
        console.log("Body:", req.body);
        console.log("File:", req.file);

        await productmodel.create({
            category: req.body.category,
            subcategory: req.body.subcategory,
            extracategory: req.body.extracategory,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity,
            image: req.file.filename
        });

        return res.redirect("/product/viewproductpage");
    } catch (err) {
        console.log("Error inserting product:", err);
        return res.status(500).send("Server Error while inserting product");
    }
};

// View All Products
module.exports.viewproductpage = async (req, res) => {
    try {
        const products = await productmodel.find()
            .populate("category")
            .populate("subcategory")
            .populate("extracategory");

        res.render("product/viewproduct", { products });
    } catch (error) {
        console.log("Error in viewproductpage:", error);
        res.status(500).send("Error loading products");
    }
};

// Delete Product
module.exports.deleteproduct = async (req, res) => {
    try {
        await productmodel.findByIdAndDelete(req.params.id);
        return res.redirect("/product/viewproductpage");
    } catch (err) {
        console.log(err);
    }
};

// Edit Product Page
module.exports.editproductpage = async (req, res) => {
    try {
        const product = await productmodel.findById(req.params.id)
            .populate("category")
            .populate("subcategory")
            .populate("extracategory");

        const categories = await categorymodel.find();
        const subcategories = await subcategorymodel.find();
        const extracategories = await extracategorymodel.find();

        return res.render("product/editproduct", { product, categories, subcategories, extracategories });
    } catch (err) {
        console.log(err);
    }
};

// Update Product
module.exports.updateproduct = async (req, res) => {
    try {
        console.log("Request Body:", req.body);
        console.log("Request File:", req.file);

        let productdata = await productmodel.findById(req.params.id);

        if (productdata) {
            if (req.file) {
                let imagepath = path.join(__dirname, "..", productdata.image);

                // Delete old image if exists
                if (fs.existsSync(imagepath)) {
                    fs.unlinkSync(imagepath);
                }

                req.body.image = req.file.filename;
            }
        } else {
            console.log("Product not found");
            return res.redirect("/product/addproductpage");
        }

        let updatedata = await productmodel.findByIdAndUpdate(req.params.id, req.body);

        if (updatedata) {
            console.log("Record Edited Successfully");
            return res.redirect("/product/viewproductpage");
        } else {
            console.log("Something went wrong, record not updated");
            return res.redirect("/product/addproductpage");
        }
    } catch (err) {
        console.log("Error updating product:", err);
        return res.redirect("/product/addproductpage");
    }
};

// Single Product Page
module.exports.viewSingleProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productmodel.findById(productId)
            .populate("category")
            .populate("subcategory")
            .populate("extracategory");

        if (!product) {
            return res.status(404).send("Product not found");
        }

        res.render("product/viewsingleproduct", { product });
    } catch (err) {
        console.log("Error fetching single product:", err);
        return res.status(500).send("Server Error");
    }
};



