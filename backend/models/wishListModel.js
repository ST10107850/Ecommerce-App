import mongoose, { Types } from "mongoose";

const WishlistSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products",
      required: true,
    },
  },
  { timestamps: true }
);

const Wishlist = mongoose.model("Wishlist", WishlistSchema);
export default Wishlist;
