import Users from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Users.findById(decoded.userId).select("-password");

    if (!user) {
      console.log("User not found for decoded ID:", decoded.userId);
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; 
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

