const categorymodel = require("../models/categorymodel");
const subcategorymodel = require("../models/subcategorymodel");
const extracategorymodel = require("../models/extracategorymodel");
const productmodel = require("../models/productmodel");
const fs = require('fs');
const path = require('path');

module.exports.addcategory = (req, res) => {
    try {
        return res.render("category/addCategory")
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports.insertcategory = async (req, res) => {
    try {
        console.log("Uploaded file:", req.file);

        if (req.file) {
            req.body.categoryimage = "/uploads/categoryimages/" + req.file.filename;
        } else {
            req.body.categoryimage = "";
            console.log("No image uploaded");
        }

        await categorymodel.create(req.body);
        console.log("✅ Category Inserted Successfully");

        res.redirect("/category/viewcategory");
    } catch (err) {
        console.log("Error inserting category:", err);
        res.status(500).send("Internal Server Error");
    }
};

module.exports.viewcategory = async (req, res) => {
    try {
        const category = await categorymodel.find();
        return res.render("category/viewCategory", { category })
    } catch (err) {
        console.log(err);
        return false;
    }
}

module.exports.deletecategory = async (req, res) => {
    try {
        console.log("Deleting category id:", req.params.id);

        let categoryRecord = await categorymodel.findById(req.params.id);

        if (categoryRecord) {
            try {
                let imagePath = path.join(__dirname, "..", categoryRecord.categoryimage);
                fs.unlinkSync(imagePath);
            } catch (err) {
                console.log("⚠️ Category image not found");
            }

            await subcategorymodel.deleteMany({ category: req.params.id });
            await extracategorymodel.deleteMany({category: req.params.id});
            await productmodel.deleteMany({ category: req.params.id });

            let deletedCategory = await categorymodel.findByIdAndDelete(req.params.id);
            if (deletedCategory) {
                console.log("✅ Category and related subcategories deleted");
                return res.redirect("/category/viewcategory");
            } else {
                console.log("❌ Category not deleted");
                return res.redirect("/category/addcategory");
            }
        } else {
            console.log("❌ Category not found");
            return res.redirect("/category/addcategory");
        }

    } catch (err) {
        console.log("❌ Error while deleting category:", err);
        return res.redirect("/category/viewcategory");
    }
};


module.exports.editcategory = async (req, res) => {
    try {
        let category = await categorymodel.findById(req.params.id);
        res.render("category/editCategory", { category });
    } catch (err) {
        console.log("Error in editCategoryPage:", err);
        res.redirect("category/viewCategory");
    }
}

module.exports.updatecategory = async (req, res) => {
    try {
        let updateData = {
            categoryname: req.body.categoryname
        };

        if (req.file) {
            updateData.categoryimage = "/uploads/categoryimages/" + req.file.filename;
        } else {
            let oldCategory = await categorymodel.findById(req.params.id);
            updateData.categoryimage = oldCategory.categoryimage;
        }

        await categorymodel.findByIdAndUpdate(req.params.id, updateData);

        console.log("Category updated successfully");
        res.redirect("/category/viewcategory");
    } catch (err) {
        console.log("Error in updateCategory:", err);
        res.redirect("/category/addcategory");
    }
};
