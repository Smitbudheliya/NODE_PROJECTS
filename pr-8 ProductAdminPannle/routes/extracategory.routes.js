const express = require("express");
const routes = express.Router();
const extracategoryctl = require("../controllers/extracategoryctl");

routes.get("/addextracategorypage", extracategoryctl.addextracategorypage);
routes.get("/subcategory", extracategoryctl.getSubcategories);
routes.post("/insertextracategory", extracategoryctl.insertextracategory);
routes.get("/viewextracategorypage", extracategoryctl.viewextracategorypage);
routes.get("/deleteextracategory/:id", extracategoryctl.deleteextracategory);
routes.get("/editextracategorypage/:id", extracategoryctl.editextracategorypage);
routes.post("/updateextracategory/:id", extracategoryctl.updateextracategory);

module.exports = routes;