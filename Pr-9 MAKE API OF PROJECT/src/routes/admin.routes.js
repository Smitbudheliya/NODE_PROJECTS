const express = require('express');
const {
  registerAdmin,
  loginAdmin,
  myProfile,
  editAdmin,
  deleteAdmin,
  allAdmin,
  addManager,
  allManager,
  editManager,
  deleteManager,
  addEmployee,
  allEmployee,
  editEmployee,
  deleteEmployee
} = require('../controller/admin.controller');

const imageUpload = require('../middleware/imageUpload'); 
const verifyToken = require('../middleware/verifyToken'); 
const verifyRole = require('../middleware/verifyRole');
const routes = express();
routes.post('/registerAdmin', imageUpload.single('profile'), registerAdmin);
routes.post('/loginAdmin', loginAdmin);
routes.get('/myProfile', verifyToken, myProfile);
routes.put('/editAdmin', verifyToken, imageUpload.single('profile'), editAdmin);
routes.delete('/deleteAdmin', verifyToken, deleteAdmin);
routes.get('/allAdmin', verifyToken, allAdmin);
routes.post('/addManager', verifyToken, verifyRole('Admin'), imageUpload.single('profile'), addManager);
routes.get('/allManager', verifyToken, verifyRole('Admin', 'Manager'), allManager);
routes.put('/editManager', verifyToken, verifyRole('Admin'), imageUpload.single('profile'), editManager);
routes.delete('/deleteManager', verifyToken, verifyRole('Admin'), deleteManager);
routes.post('/addEmployee', verifyToken, verifyRole('Admin', 'Manager'), imageUpload.single('profile'), addEmployee);
routes.get('/allEmployee', verifyToken, verifyRole('Admin', 'Manager'), allEmployee);
routes.put('/editEmployee', verifyToken, verifyRole('Admin', 'Manager'), imageUpload.single('profile'), editEmployee);
routes.delete('/deleteEmployee', verifyToken, verifyRole('Admin', 'Manager'), deleteEmployee);

module.exports = routes;
