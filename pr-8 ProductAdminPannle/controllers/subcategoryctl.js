const categorymodel = require("../models/categorymodel");
const subcategorymodel = require("../models/subcategorymodel");

// Add Subcategory Page
module.exports.addsubcategorypage = async (req, res) => {
    try {
        const categories = await categorymodel.find();
        return res.render("subcategory/addSubcategory", { categories });
    } catch (err) {
        console.log(err);
    }
}

// Insert Subcategory
module.exports.insertsubcategory = async (req, res) => {
    try {
        await subcategorymodel.create({
            subcategory: req.body.subcategory,
            category: req.body.category // ObjectId from dropdown
        });
        return res.redirect("/subcategory/addsubcategorypage");
    } catch (err) {
        console.log(err);
    }
}

// View Subcategories
module.exports.viewsubcategorypage = async (req, res) => {
    try {
        const subcategories = await subcategorymodel.find().populate("category");
        return res.render("subcategory/viewSubcategory", { subcategories });
    } catch (err) {
        console.log(err);
    }
}

// Delete Subcategory
module.exports.deletesubcategory = async (req, res) => {
    try {
        await subcategorymodel.findByIdAndDelete(req.params.id);
        return res.redirect("/subcategory/viewsubcategorypage");
    } catch (err) {
        console.log(err);
    }
}

// Edit Subcategory Page
module.exports.editsubcategorypage = async (req, res) => {
    try {
        const subcategory = await subcategorymodel.findById(req.params.id).populate("category");
        const categories = await categorymodel.find();
        return res.render("subcategory/editSubcategory", { subcategory, categories });
    } catch (err) {
        console.log(err);
    }
}

// Update Subcategory
module.exports.updatesubcategory = async (req, res) => {
    try {
        let updateData = {
            subcategory: req.body.subcategory,
            category: req.body.categoryname
        };

        await subcategorymodel.findByIdAndUpdate(req.params.id, updateData);
        return res.redirect("/subcategory/viewsubcategorypage");
    } catch (err) {
        console.log(err);
    }
}