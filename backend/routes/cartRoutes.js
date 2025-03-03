import express from "express";
import { createCart, deleteCartItem, getCartItems, updateCartQuantity } from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/", protect, roleMiddleware(["customer"]), createCart);
router.get("/", protect, roleMiddleware(["customer"]), getCartItems);
router.put('/:id', protect, updateCartQuantity);
router.delete("/:id", protect, deleteCartItem);


export default router;
