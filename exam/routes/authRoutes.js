const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer(); // form-data handle karega

// Yaha galti ho rahi thi: register aur login ko import nahi kiya tha sahi se
const { register, login } = require("../controllers/authcontroller");

// Routes
router.post("/register", upload.none(), register);
router.post("/login", upload.none(), login);

module.exports = router;
