import expressAsyncHandler from "express-async-handler";
import Cart from "../models/cartMode.js";
import Users from "../models/userModel.js";
import Order from "../models/orderModel.js";
import Payment from "../models/paymentModel.js";

export const createOrder = expressAsyncHandler(async (req, res) => {
  const { shippingAddress, paymentMethod, cardDetails, deliveryOption } = req.body;
  const userId = req.user._id;

  if (!userId) {
    res.status(401);
    throw new Error("User not authorized");
  }

 
  const cart = await Cart.findOne({ user: userId }).populate("items.product");

  if (!cart || cart.items.length === 0) {
    res.status(400);
    throw new Error("Cart is empty. Add items before placing an order.");
  }

  const user = await Users.findById(userId);

  const userAddress = user.address.find(
    (address) => address._id.toString() === shippingAddress
  );

  if (!userAddress) {
    res.status(400);
    throw new Error("Invalid shipping address.");
  }

  let subtotal = 0;

 
  const items = cart.items.map((cartItem) => {
    const totalPrice = cartItem.product.price * cartItem.quantity;
    subtotal += totalPrice;

    return {
      productId: cartItem.product._id,
      quantity: cartItem.quantity,
      size: cartItem.size || "N/A",  
      color: cartItem.color || "N/A"
    };
  });

  const deliveryFee = deliveryOption === "pickup" ? 0 : 50;
  const tax = subtotal * 0.1;
  const discount = 0;
  const totalAmount = subtotal + deliveryFee + tax - discount;

  
  const order = new Order({
    userId,
    items,
    shippingAddress: {
      addressId: shippingAddress,
      street: userAddress.street,
      town: userAddress.town,
      city: userAddress.city,
      postalCode: userAddress.postalCode,
    },
    deliveryOption,
    paymentMethod,
    totalAmount,
    taxAmount: tax,
    deliveryFee,
    discount,
    orderStatus: "Processing",
  });

  await order.save();


  if (paymentMethod === "card" && cardDetails) {
    const payment = new Payment({
      orderId: order._id,
      userId,
      paymentMethod,
      cardDetails,
    });

    await payment.save();
  }

  // Clear user's cart after order placement
  await Cart.findOneAndDelete({ user: userId });

  res.status(201).json({ message: "Order placed successfully!", order });
});


export const getAllOrders = expressAsyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate("items.productId")
    .populate({ path: "userId", select: "firstName lastName" });

  res.status(200).json({ message: "oders found", data: orders });
});

export const getUserOders = expressAsyncHandler(async (req, res) => {
  const userId = req.user._id;

  if (!userId) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const orders = await Order.find().populate("items.productId");

  if (orders.length === 0) {
    res.status(404);
    throw new Error("No orders found for this user.");
  }

  res.status(200).json(orders);
});

export const getOrderDetails = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const order = await Order.findById(id)
    .populate("items.productId")
    .populate("userId");

  if (!order) {
    res.status(404);
    throw new Error("Order not found.");
  }

  res
    .status(200)
    .json({ message: "Order retrieved successfully", data: order });
});

export const updateOrderStatus = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { orderStatus } = req.body;

  const validStatuses = ["Processing", "Shipped", "Delivered", "Cancelled"];
  if (!validStatuses.includes(orderStatus)) {
    res.status(400);
    throw new Error("Invalid order status.");
  }

  const order = await Order.findById(id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found.");
  }

  if (order.orderStatus === "Cancelled") {
    res.status(400);
    throw new Error("Cannot update status. Order has already been cancelled.");
  }

  order.orderStatus = orderStatus;
  await order.save();

  res.status(200).json({
    message: `Order status updated to ${orderStatus}`,
    order,
  });
});

export const deleteOrder = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  if (!order) {
    res.status(401);
    throw new Error("Order not found");
  }

  if (order.orderStatus !== "Delivered") {
    res.status(401);
    throw new Error("Only delivered orders can be deleted");
  }

  await Order.findOneAndDelete(id);
  res.status(200).json({ message: "Order deleted successfully" });
});
