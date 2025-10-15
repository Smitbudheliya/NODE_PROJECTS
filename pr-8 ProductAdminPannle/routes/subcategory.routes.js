const express = require("express");
const routes = express.Router();
const subcategoryctl = require("../controllers/subcategoryctl")

routes.get("/addsubcategorypage",subcategoryctl.addsubcategorypage);

routes.post("/insertsubcategory",subcategoryctl.insertsubcategory);

routes.get("/viewsubcategorypage",subcategoryctl.viewsubcategorypage);

routes.get("/deletesubcategory/:id",subcategoryctl.deletesubcategory);

routes.get("/editsubcategorypage/:id", subcategoryctl.editsubcategorypage);

routes.post("/updatesubcategory/:id",subcategoryctl.updatesubcategory);

module.exports = routes;