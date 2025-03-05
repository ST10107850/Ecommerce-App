import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ProductTypes } from "../types/State";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";

export const useProduct = () => {
  const [products, setProducts] = useState<ProductTypes[]>([]);
  const navigate = useNavigate();

  //Create Product Variables
  const [categoryId, setCategoryId] = useState("");
  const [productName, setProductName] = useState("");
  const [ImageUri, setImageUri] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [colours, setColours] = useState<string[]>([]);
  const [size, setSize] = useState<string[]>([]);

  //Fetch Products

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch("/api/product");

        if (!res.ok) {
          throw new Error("Failed to fetch product");
        }

        const data = await res.json();
        setProducts(data.data);
        console.log("Size", data.data);
      } catch (err: any) {
        console.error("Error fetching products:", err.message);
      }
    };
    fetchProduct();
  }, []);

  //Count product for each category

  //Delete Product
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
      fetchProduct();
      onSuccess();
      navigate("/admin/product");
    } catch (error: any) {
      console.error(
        error.message || "An error occurred while deleting the category"
      );
    }
  };

  //Create New Product

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const newImageUris: string[] = []; 

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (file.size > 2 * 1024 * 1024) {
          alert("File size should not exceed 2MB.");
          continue;
        }

        try {
          const base64 = await convertToBase64(file);
          newImageUris.push(base64);
        } catch (error) {
          console.error("Error converting image to Base64", error);
        }
      }

      setImageUri(newImageUris);
      console.log("Base64 Image URIs:", newImageUris);
    }
  };

  // Function to Convert File to Base64
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      categoryId,
      productName,
      ImageUri, 
      size,
      colours,
      description,
      price,
    };

    console.log("Payload before submission:", payload); 

    try {
      const res = await fetch("/api/product/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to create product.");
      }

      alert("New Product has been created!");
      navigate("/admin/product");
    } catch (err: any) {
      console.error("Error:", err.message);
      alert(err.message);
    }
  };

  const handleDeleteImage = (index: number) => {
    setImageUri((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedSizes = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSize(selectedSizes);
  };

  const handleColourChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedColours = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setColours(selectedColours);
  };

  return {
    products,
    deleteProduct,
    handleSubmit,
    handleFileChange,
    handleDeleteImage,
    handleSizeChange,
    handleColourChange,
    productName,
    setProductName,
    price,
    setPrice,
    description,
    setDescription,
    colours,
    setColours,
    size,
    setSize,
    categoryId,
    setCategoryId,
    ImageUri,
  };
};
