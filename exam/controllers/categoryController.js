const Category = require("../models/Category");

// ✅ Create Category (Admin only)
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const existing = await Category.findOne({ name });
    if (existing) return res.status(400).json({ message: "Category already exists" });

    const category = new Category({
      name,
      description,
      createdBy: req.user._id
    });

    await category.save();
    res.status(201).json({ message: "Category created", category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get All Categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate("createdBy", "username role");
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Get Single Category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate("createdBy", "username");
    if (!category) return res.status(404).json({ message: "Category not found" });

    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Update Category (Admin only)
exports.updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Category not found" });

    res.status(200).json({ message: "Category updated", updated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ Delete Category (Admin only)
exports.deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Category not found" });

    res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ✅ Render Edit Category Form (Admin only)