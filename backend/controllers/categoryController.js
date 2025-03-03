import expressAsyncHandler from "express-async-handler";
import Category from "../models/categoryModel.js";

export const createCategory = expressAsyncHandler(async (req, res) => {
  const { categoryName, ImageUri } = req.body;

  if (!req.user._id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const categoryExist = await Category.findOne({ categoryName });

  if (categoryExist) {
    res.status(400);
    throw new Error("Category already exists");
  }

  const newCategory = await Category.create({
    userId: req.user._id,
    categoryName,
    ImageUri,
  });

  res.status(201).json({
    success: true,
    message: "Category Created",
    data: newCategory,
  });
});

export const updateCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { categoryName, ImageUri } = req.body;

  if (!id) {
    res.status(400);
    throw new Error("Category ID is required.");
  }

  const category = await Category.findById(id);
  if (!category) {
    res.status(404);
    throw new Error("Category not found.");
  }

  category.categoryName = categoryName || category.categoryName;
  category.ImageUri = ImageUri || category.ImageUri;
  category.userId = req.user._id || category.userId;

  const updatedCategory = await category.save();

  res.status(200).json({
    success: true,
    message: "Category updated successfully",
    data: updatedCategory,
  });
});

export const deleteCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400);
    throw new Error("Category ID is required.");
  }

  const category = await Category.findById(id);
  if (!category) {
    res.status(404);
    throw new Error("Category not found.");
  }

  await Category.deleteOne({ _id: id });

  res.status(200).json({
    success: true,
    message: "Category deleted successfully",
  });
});

export const getAllCategories = expressAsyncHandler(async (req, res) => {
  const categories = await Category.find().populate({path:"userId", select: "firstName lastName"});
  res.status(200).json({
    success: true,
    data: categories,
  });
});
