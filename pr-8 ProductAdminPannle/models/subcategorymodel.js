const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const subcategoryschema = mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    subcategory: {
        type: String,
    }
})

const subcategory = mongoose.model("subcategory", subcategoryschema);

module.exports = subcategory;