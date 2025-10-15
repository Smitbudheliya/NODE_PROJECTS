const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const extracategoryschema = mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category"
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subcategory"
    },
    extracategory: {
        type: String
    }
}) 

const subcategory = mongoose.model("extracategory", extracategoryschema);

module.exports = subcategory;