import express from "express";
import {
  authUser,
  createUser,
  deleteAddress,
  getCustomerUser,
  getuserProfile,
  logout,
  updateProfile,
  updateUserPassword,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", protect, getCustomerUser);
router.post("/auth", authUser);
router.post("/logout", logout);
router.get("/profile", protect, getuserProfile);
router.put("/profile", protect, updateProfile);
router.put("/update-password", protect, updateUserPassword);
router.delete("/delete-address/:addressId", protect, deleteAddress);
export default router;
