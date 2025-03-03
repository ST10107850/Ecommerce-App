import { useState, useEffect } from "react";

export const useOrderSummary = (cart) => {
  const [summary, setSummary] = useState({
    subtotal: 0,
    discountTotal: 0,
    cartTotal: 0,
  });

  useEffect(() => {
    if (cart && Array.isArray(cart.items)) {
      const subtotal = cart.items
        .reduce((acc, item) => {
          const price = parseFloat(item.product.price) || 0;
          const quantity = parseInt(item.quantity, 10) || 0;
          return acc + price * quantity;
        }, 0)
        .toFixed(2);

      const discountTotal = cart.items
        .reduce((acc, item) => {
          const price = parseFloat(item.product.price) || 0;
          const quantity = parseInt(item.quantity, 10) || 0;
          const discount = parseFloat(item.product.discount) || 0;
          const discountAmount = price * (discount / 100) * quantity;
          return acc + discountAmount;
        }, 0)
        .toFixed(2);

      const shipping = 50;
      const cartTotal = (
        parseFloat(subtotal) -
        parseFloat(discountTotal) +
        shipping
      ).toFixed(2);

      setSummary({
        subtotal: parseFloat(subtotal),
        discountTotal: parseFloat(discountTotal),
        cartTotal,
      });
    }
  }, [cart]);

  return summary;
};
