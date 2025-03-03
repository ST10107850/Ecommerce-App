import { ChangeEvent, useEffect, useState } from "react";
import { CategoriesType } from "../types/State";
import { useNavigate } from "react-router-dom";
import imageCompression from 'browser-image-compression';

export const useCategory = () => {
  const [category, setCategory] = useState<CategoriesType[]>([]);
  const navigate = useNavigate();

  //Create Category Variables
  const [categoryName, setCategoryName] = useState<string>("");
  const [ImageUri, setImageUri] = useState<string | null>(null);

  //Fetching Categories
  const fetchCategory = async () => {
    try {
      const res = await fetch("/api/category");
      if (!res.ok) {
        throw new Error("Failed to fetch category");
      }
      const data = await res.json();
      setCategory(data.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchCategory();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  //Create Category
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("File size should not exceed 2MB.");
        return;
      }
  
      const options = {
        maxSizeMB: 1, // Compress to below 1MB
        maxWidthOrHeight: 1024,
        useWebWorker: true
      };
  
      try {
        const compressedFile = await imageCompression(file, options);
        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onload = () => {
          if (typeof reader.result === "string") {
            setImageUri(reader.result);
          }
        };
      } catch (error) {
        console.error("Error compressing image", error);
      }
    }
  };

  const handleSubmit = async (e: FormEvent, setCategory: Function) => {
    e.preventDefault();

    if (!categoryName || !ImageUri) {
      alert("Please fill in all fields.");
      return;
    }

    const payload = { ImageUri, categoryName };

    try {
      const res = await fetch("/api/category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to create category.");
      }

      const newCategory = await res.json();
      setCategory((prev: any) => [...prev, newCategory]);

      alert("New Category has been created!");
    } catch (err: any) {
      console.error("Error:", err.message);
      alert(err.message);
    }
  };

  //Delete Category
  const deleteCategory = async (categoryId: string, onSuccess: () => void) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/category/${categoryId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        const errorResponse = await res.json();
        throw new Error(errorResponse.message || "Failed to delete category");
      }

      alert(`Category deleted successfully`);
      onSuccess();
      navigate("/admin/categories");
    } catch (error: any) {
      console.error(
        error.message || "An error occurred while deleting the category"
      );
    }
  };

  return {
    category,
    setCategory,
    deleteCategory,
    handleSubmit,
    handleFileChange,
    ImageUri,
    setImageUri,
    categoryName,
    setCategoryName,
  };
};
