import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductTypes } from "../types/State";
import { useDeleteProduct } from "./useDeleteProduct";

export const useFetchProductDetails = () => {
  const { _id } = useParams();


  const [product, setProduct] = useState<ProductTypes | null>(null);
  const { deleteProduct } = useDeleteProduct();

  const handleDelete = (productId: string) => {
    deleteProduct(productId, () => {
      setProduct((prevProduct) =>
        prevProduct.filter((prod:any) => prod._id !== productId)
      );
    });
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await fetch(`/api/product/${_id}`);

        if (!res.ok) {
          throw new Error("Product not found!");
        }

        const data = await res.json();
        setProduct(data.data);
      } catch (err: any) {
        console.error(err.message);
      }
    };
    fetchProductDetails();
  }, [_id]);

  return { product, setProduct, handleDelete, _id };
};
