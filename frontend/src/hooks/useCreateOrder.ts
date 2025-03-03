import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

interface CartItem {
  product: {
    _id: string;
    quantity: number;
  };
}

interface CardDetails {
  cardHolder?: string;
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  cardType?: string;
}

export const useCreateOrder = (
  cart: CartItem[],
  selectedAddress: string,
  paymentMethod: string,
  cardDetails: CardDetails | null,
  orderTotalWithoutTax: number,
  tax: number,
  deliveryFee: number,
  discount: number,
  deliveryOption: string
) => {
  const navigate = useNavigate();

  const handleOrderSubmit = async () => {
    const orderData = {
      items: cart.items.map((item) => ({
        productId: item.product._id,
        quantity: item.product.quantity,
      })),
      deliveryOption,
      shippingAddress: selectedAddress,
      paymentMethod,
      totalAmount: (
        orderTotalWithoutTax +
        tax +
        (deliveryOption === "pickup" ? 0 : deliveryFee)
      ).toFixed(2),
      taxAmount: tax.toFixed(2),
      deliveryFee,
      discount,
      cardDetails: paymentMethod === "card" ? cardDetails : null,
    };
    try {
      const response = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Order placed successfully!");
        navigate("/");
      } else {
        alert("Failed to place order: " + data.message);
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };
  return { handleOrderSubmit };
};
