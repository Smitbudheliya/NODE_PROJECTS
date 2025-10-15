const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const productPath = "/uploads/productsimages";

const productSchema = mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subcategory",
    },
    extracategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "extracategory",
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
    quantity: {
        type: Number,
    },
    image: {
        type: String,
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", productPath));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

productSchema.statics.uploadProductImage = multer({ storage }).single("image");
productSchema.statics.productImage = productPath;
const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;