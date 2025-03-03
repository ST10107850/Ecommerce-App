import mongoose from "mongoose";

const OrderSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  orderNumber: { type: String, unique: true },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true,
      },
      quantity: { type: Number, required: true },
      size: { type: String },
      color: { type: String },
    },
  ],
  shippingAddress: {
    addressId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users.address",
      required: true,
    },
    street: { type: String, required: true },
    town: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: Number, required: true },
  },
  deliveryOption: {
    type: String,
    enum: ["delivery", "pickup"],
    required: true,
  },
  paymentMethod: { type: String, enum: ["card", "cash"], required: true },
  totalAmount: { type: Number, required: true },
  taxAmount: { type: Number, required: true },
  deliveryFee: { type: Number, required: true, default: 50 },
  discount: { type: Number, default: 0 },
  orderStatus: {
    type: String,
    enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Processing",
  },
  createdAt: { type: Date, default: Date.now },
});

OrderSchema.pre("save", function (next) {
  if (!this.orderNumber) {
    this.orderNumber = "ORD-" + Math.floor(100000 + Math.random() * 900000);
  }
  next();
});

const Order = mongoose.model("Order", OrderSchema);
export default Order;
