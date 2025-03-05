import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export const useFetchCart = () => {
  const [cart, setCart] = useState({ items: [] });
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await fetch("/api/cart");
      if (!res.ok) throw new Error("Failed to fetch cart");

      const data = await res.json();
      setCart(data.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    
      fetchCart();

  }, []);

  //Update Cart

  const updateCartItem = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    try {
      const res = await fetch(`/api/cart/${itemId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (!res.ok) throw new Error("Failed to update cart item");

      fetchCart();
    } catch (err: any) {
      console.error(err.message);
    }
  };

  //Delete Cart
  const removeItem = async (itemId: string) => {
    try {
      const res = await fetch(`/api/cart/${itemId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to remove item");

      fetchCart();
    } catch (err: any) {
      console.error(err.message);
    }
  };

  //Add to cart
  const addToCart = async (
    productId: string,
    quantity: number,
    size: string,
    color: string,
    onSuccess: () => void
  ) => {
    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity, size, color }),
      });

      if (!response.ok) {
        throw new Error("Failed to add product to cart");
      }

      const data = await response.json();
      alert(data.message);
      onSuccess();
    } catch (err) {
      alert("Error adding product to cart");
      console.error(err);
    }
  };

  return { cart, updateCartItem, removeItem, addToCart };
};
