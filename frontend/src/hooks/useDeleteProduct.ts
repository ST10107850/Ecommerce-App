import React from "react";
import { useNavigate } from "react-router-dom";

export const useDeleteProduct = () => {
  const navigate = useNavigate();

  const deleteProduct = async (productId: string, onSuccess: () => void) => {
    const confirmDelete = window.confirm(
      "Are sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/product/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(errorResponse.message || "Failed to delete category");
      }

      alert("Product deleted successfully!!!");
      onSuccess();
      navigate("/admin/product");
    } catch (error: any) {
      console.error(
        error.message || "An error occurred while deleting the category"
      );
    }
  };
  return {deleteProduct};
};
