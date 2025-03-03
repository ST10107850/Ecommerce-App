import React, { useEffect, useState } from "react";

export const useWishList = () => {
  const [wishlist, setWishList] = useState<string[]>([]);

  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const userToken = userInfo?._id;

  const createWishlist = async (productId: string) => {
    if (!userToken) {
      console.error("No user token found");
      return;
    }

    try {
      const response = await fetch(`/api/wishlist/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error(
          errorData.message || "Error adding product to wishlist"
        );
      }

      const data = await response.json();
      console.log(data);
      setWishList((prevState) => [...prevState, data.wishlistItem]);
      alert(data.message);
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
      alert(error.message);
    }
  };

  const removeWishlistItem = async (productId: string) => {
    if (!userToken) {
      console.error("No user token found");
      return;
    }

    try {
      const response = await fetch(`/api/wishlist/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error(
          errorData.message || "Error removing product from wishlist"
        );
      }

      const data = await response.json();
      console.log(data);
      fetchWishlist();
      setWishList((prevState) =>
        prevState.filter((item) => item !== productId)
      );
      alert(data.message);
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
      alert(error.message);
    }
  };

  const fetchWishlist = async () => {
    try {
      const res = await fetch("/api/wishlist");
      if (!res.ok) {
        throw new Error("Failed to fetch category");
      }
      const data = await res.json();
      setWishList(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchWishlist();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return { createWishlist, removeWishlistItem, wishlist };
};
