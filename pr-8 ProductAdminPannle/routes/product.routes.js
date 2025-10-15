const express = require('express');
const router = express.Router();
const productctl = require('../controllers/productctl');
const productmodel = require('../models/productmodel');

router.get('/addproductpage', productctl.addproductpage);
router.get('/subcategory', productctl.getSubcategories);
router.get('/extracategory', productctl.getExtracategories);
router.post('/insertproduct', productmodel.uploadProductImage, productctl.insertproduct);
router.get('/viewproductpage', productctl.viewproductpage);
router.get('/delete/:id', productctl.deleteproduct);
router.get('/edit/:id', productctl.editproductpage);
router.post('/update/:id', productmodel.uploadProductImage, productctl.updateproduct);
router.get('/:id', productctl.viewSingleProduct);

module.exports = router;