import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import connectDb from "./config/connectDb.js";
import { notFound, errorHandle } from "./middleware/errorMiddleware.js";
import categoryRouter from "./routes/categoryRoute.js";
import userRouter from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRoute from "./routes/orderRoutes.js";
import wishlistRouter from "./routes/wishlistRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
app.use(cookieParser());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: "50mb" })); 
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(express.json());
// app.use(bodyParser.json({ limit: "50mb" }));
// app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use("/api/category", categoryRouter);
app.use("/api/users", userRouter);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRouter);
app.use("/api/orders", orderRoute);
app.use("/api/wishlist", wishlistRouter);

app.use(notFound);
app.use(errorHandle);

app.listen(port, () => {
  connectDb();
  console.log(`Server started on port ${port}`);
});
