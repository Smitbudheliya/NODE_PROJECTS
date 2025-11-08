const express = require("express");
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require("../controllers/categoryController");
const { authMiddleware, adminOnly } = require("../middleware/authMiddleware");

// Public (authenticated users)
router.get("/", authMiddleware, getAllCategories);
router.get("/:id", authMiddleware, getCategoryById);

// Admin-only routes
router.post("/", authMiddleware, adminOnly, createCategory);
router.put("/:id", authMiddleware, adminOnly, updateCategory);
router.delete("/:id", authMiddleware, adminOnly, deleteCategory);

module.exports = router;
 