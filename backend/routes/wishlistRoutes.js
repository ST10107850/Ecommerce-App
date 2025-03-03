import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createWishlist,
  deleteWishlistItem,
  getUserWishlist,
} from "../controllers/wishlistController.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/:productId",
  protect,
  roleMiddleware(["customer"]),
  createWishlist
);
router.delete(
  "/:id",
  protect,
  roleMiddleware(["customer"]),
  deleteWishlistItem
);
router.get("/", protect, getUserWishlist);

export default router;
