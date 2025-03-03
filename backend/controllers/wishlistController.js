import expressAsyncHandler from "express-async-handler";
import Wishlist from "../models/wishListModel.js";

export const createWishlist = expressAsyncHandler(async (req, res) => {
  const { productId } = req.params;

  if (!req.user._id) {
    res.status(401);
    throw new Error("User not found");
  }

  const existingWishlistItem = await Wishlist.findOne({
    userId: req.user._id,
    productId,
  });

  if (existingWishlistItem) {
    res.status(400);
    throw new Error("Product already in wishlist");
  }

  const wishlistItem = new Wishlist({
    userId: req.user._id,
    productId,
  });

  await wishlistItem.save();
  res.status(201).json({ message: "Product added to wishlist", wishlistItem });
});

export const getUserWishlist = expressAsyncHandler(async (req, res) => {
  if (!req.user._id) {
    res.status(401);
    throw new Error("User not found");
  }

  const wishlist = await Wishlist.find({ userId: req.user._id })
    .populate("productId", "productName price description ImageUri")
    .sort({ createdAt: -1 });
  res.json(wishlist);
});

export const deleteWishlistItem = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const wishlistItem = await Wishlist.findById(id);

  if (!wishlistItem) {
    res.status(404);
    throw new Error("Wishlist item not found");
  }

  if (wishlistItem.userId.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error("Not authorized to delete this wishlist item");
  }

  await wishlistItem.deleteOne();

  res.json({ message: "Wishlist item removed successfully" });
});
