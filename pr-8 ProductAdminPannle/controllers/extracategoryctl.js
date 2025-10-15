const categorymodel = require("../models/categorymodel");
const subcategorymodel = require("../models/subcategorymodel");
const extracategorymodel = require("../models/extracategorymodel");

module.exports.addextracategorypage = async (req, res) => {
    try {
        const categories = await categorymodel.find();
        const subcategories = await subcategorymodel.find().populate("category");
        return res.render("extraCategory/addextracategory", { categories, subcategories })
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports.getSubcategories = async (req, res) => {
    try {
        const categoryId = req.query.categoryId;
        if (!categoryId) {
            return res.json({ message: "Category ID is required" });
        }

        const subcategories = await subcategorymodel.find({ category: categoryId });

        return res.json({ subcategory: subcategories });
    } catch (err) {
        console.log("Error fetching subcategories:", err);
        return res.json({ message: "Server error" });
    }
};


module.exports.insertextracategory = async (req, res) => {
    try {
        await extracategorymodel.create({
            extracategory: req.body.extracategory,
            subcategory: req.body.subcategory,
            category: req.body.category
        });
        return res.redirect("/extracategory/viewextracategorypage");
    } catch (err) {
        console.log(err);
    }
}

module.exports.viewextracategorypage = async (req, res) => {
    try {
        const extracategories = await extracategorymodel.find().populate("category").populate("subcategory");
        return res.render("extraCategory/viewextracategory", { extracategories });
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports.deleteextracategory = async (req, res) => {
    try {
        await extracategorymodel.findByIdAndDelete(req.params.id);
        return res.redirect("/extracategory/viewextracategorypage");
    } catch (err) {
        console.log(err);
    }
}

module.exports.editextracategorypage = async (req, res) => {
    try {
        const extracategory = await extracategorymodel.findById(req.params.id)
            .populate("category")
            .populate("subcategory");

        const categories = await categorymodel.find();
        const subcategories = await subcategorymodel.find();

        return res.render("extraCategory/editextracategory", { extracategory, categories, subcategories });
    } catch (err) {
        console.log(err);
    }
};

module.exports.updateextracategory = async (req, res) => {
    try {
        let updateData = {
            extracategory: req.body.extracategory,
            subcategory: req.body.subcategory,
            category: req.body.categoryname
        };

        await extracategorymodel.findByIdAndUpdate(req.params.id, updateData);
        return res.redirect("/extracategory/viewextracategorypage");
    } catch (err) {
        console.log(err);
    }
};
