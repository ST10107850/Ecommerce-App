import express from "express";
import {
  createOrder,
  deleteOrder,
  getAllOrders,
  getOrderDetails,
  getUserOders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/create", protect, createOrder);
router.get("/", protect, roleMiddleware(["admin"]), getAllOrders);
router.get("/customer", protect, roleMiddleware(["customer"]), getUserOders);
router.get("/:id", protect, getOrderDetails);
router.put("/:id", protect, updateOrderStatus);
router.delete("/:id", protect, roleMiddleware(["customer"]), deleteOrder);
export default router;
