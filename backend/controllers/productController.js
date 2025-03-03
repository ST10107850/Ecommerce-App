import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";
import mongoose from "mongoose";

export const createProduct = expressAsyncHandler(async (req, res) => {
  const {
    productName,
    ImageUri,
    description,
    price,
    colours,
    size,
    categoryId,
  } = req.body;

  if (!req.user._id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    res.status(400);
    throw new Error("Invalid categoryId format");
  }

  const categoryExist = await Category.findById(categoryId);
  if (!categoryExist) {
    res.status(404);
    throw new Error("Category does not exist");
  }

  const productExist = await Product.findOne({ productName });

  if (productExist) {
    res.status(400);
    throw new Error("Product already exists");
  }

  const newProduct = await Product.create({
    userId: req.user._id,
    categoryId: new mongoose.Types.ObjectId(categoryId),
    productName,
    ImageUri,
    description,
    price,
    colours,
    size,
  });

  res.status(200).json({
    success: true,
    message: "New product has been created",
    data: newProduct,
  });
});

export const getAllProduct = expressAsyncHandler(async (req, res) => {
  try {
    const products = await Product.find()
      .populate({
        path: "categoryId",
        select: "categoryName", // Only select the categoryName field from Category
      })
      .populate({ path: "userId", select: "firstName lastName" });
    res.status(200).json({ success: true, data: products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export const getProductByCategory = expressAsyncHandler(async (req, res) => {
  const { categoryId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    res.status(400);
    throw new Error("Invalid categoryId format");
  }

  const products = await Product.find({ categoryId });

  if (products.length === 0) {
    res.status(404);
    throw new Error("No products found for this category");
  }

  res
    .status(201)
    .json({ success: true, message: `Product found`, data: products });
});

export const updateProduct = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const { productName, ImageUri, price, description, size, colours, discount } = req.body;

  const product = await Product.findById(id);

  if (!id) {
    res.status(400);
    throw new Error("Product ID is required.");
  }

  product.productName = productName || product.productName;
  product.ImageUri = ImageUri || product.ImageUri;
  product.description = description || product.description;
  product.price = price || product.price;
  product.size = size || product.size;
  product.colours = colours || product.colours;
  product.discount = discount || product.discount

  const updatedProduct = await product.save();

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: updatedProduct,
  });
});

export const deleteProduct = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400);
    throw new Error("Product ID is required.");
  }

  const product = await Product.findById(id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found.");
  }

  await Product.deleteOne({ _id: id });

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

export const getProductDetails = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400);
    throw new Error("Product ID is required.");
  }

  const product = await Product.findById(id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found.");
  }

  res.status(200).json({
    success: true,
    message: "Product found successfully",
    data: product,
  });
});
