import expressAsyncHandler from "express-async-handler";
import Product from "../models/productModel.js";
import Cart from "../models/cartMode.js";

export const createCart = expressAsyncHandler(async (req, res) => {
  const { productId, quantity, color, size } = req.body;

  if (!req.user?._id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const productExist = await Product.findById(productId);
  if (!productExist) {
    res.status(404);
    throw new Error("Product not found");
  }

  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    cart = new Cart({
      user: req.user._id,
      items: [{ product: productId, quantity }],
    });
  } else {
    const itemIndex = cart.items.findIndex((item) =>
      item.product.equals(productId)
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity, color, size });
    }
  }

  await cart.save();
  res.status(201).json({ message: "Product added to cart", cart });
});

export const getCartItems = expressAsyncHandler(async (req, res) => {
  if (!req.user._id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const cart = await Cart.findOne({ user: req.user._id }).populate(
    "items.product"
  );

  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  res.status(200).json({ success: true, message: "Cart Found", data: cart });
});

export const updateCartQuantity = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  if (!req.user?._id) {
    return res
      .status(401)
      .json({ success: false, message: "User not authorized" });
  }

  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === id
    );

    if (itemIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found in cart" });
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    const updatedCart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );

    res.json({ success: true, message: "Cart updated", data: updatedCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error updating cart" });
  }
});

export const deleteCartItem = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!req.user?._id) {
    return res
      .status(401)
      .json({ success: false, message: "User not authorized" });
  }

  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === id
    );

    if (itemIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Item not found in cart" });
    }

    cart.items.splice(itemIndex, 1);
    await cart.save();

    const updatedCart = await Cart.findOne({ user: req.user._id }).populate(
      "items.product"
    );

    res.json({
      success: true,
      message: "Item removed from cart",
      data: updatedCart,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error removing item from cart" });
  }
});
