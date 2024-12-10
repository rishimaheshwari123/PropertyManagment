const Category = require("../models/categoryModel");

const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const newCategory = new Category({
      name,

    });
    await newCategory.save();
    res
      .status(201)
      .json({
        success: true,
        message: "Category created successfully",
        category: newCategory,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error in create category api" });
  }
};


const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res.status(404).json({ success: false, message: "Category not found" });
    }
    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      category: deletedCategory,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({
      success: true,
      categories,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
const updateCategoryCtrl = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    return res.json(updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error);
    return res.status(500).json({ message: "Error updating category" });
  }

};

















module.exports = {
  createCategory,
  getAllCategories,
  deleteCategory,
  updateCategoryCtrl
};
