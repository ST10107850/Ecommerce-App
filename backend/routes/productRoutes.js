import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProductByCategory,
  getProductDetails,
  updateProduct,
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/create", protect, roleMiddleware(["admin"]), createProduct);
router.get("/", getAllProduct);
router.get("/category/:categoryId", getProductByCategory);
router.put("/:id", protect, roleMiddleware(["admin"]), updateProduct);
router.delete("/:id", protect, roleMiddleware("admin"), deleteProduct);
router.get('/:id', getProductDetails)

export default router;
