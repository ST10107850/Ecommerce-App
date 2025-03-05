import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetchProductDetails } from "../hooks/useFetchProductDetails";
import { useCategory } from "../hooks/useCategory";
import imageCompression from "browser-image-compression";

export const EditProduct = () => {
  const navigate = useNavigate();
  const { product, _id } = useFetchProductDetails();
  const { category } = useCategory();

  const [ImageUri, setImageUri] = useState<string[]>([]);
  const [productName, setProductName] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [categories, setCategories] = useState<
    { _id: string; categoryName: string }[]
  >([]);
  const [size, setSize] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>(["S", "M", "L", "XL"]);
  const [colours, setColours] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>(["Red", "Blue", "Green"]);
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (product) {
      setProductName(product.productName || "");
      setImageUri(product.ImageUri || []);
      setSize(product.size || []);
      setColours(product.colours || []);
      setDescription(product.description || "");
      setPrice(product.price);
      setCategoryId(product.categoryId || "");
      setDiscount(product.discount || 0);
    }
  }, [product]);

  useEffect(() => {
    if (category) {
      setCategories(category);
    }
  }, [category]);

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
  
      // Append new images to the existing ones
      setImageUri((prev) => [...prev, ...newImageUris]);
      console.log("Updated Image URIs:", [...ImageUri, ...newImageUris]);
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

  const handleDeleteImage = (index: number) => {
    setImageUri((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/product/${_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName,
          ImageUri,
          categoryId,
          size,
          colours,
          description,
          price,
          discount,
        }),
      });

      if (!response.ok) throw new Error("Failed to update product");

      alert("Product updated successfully!");
      navigate(`/admin/product/${_id}`);
    } catch (err) {
      setError("Error updating product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10 px-6 sm:px-10 md:px-16">
      <h1 className="text-3xl font-bold mb-8">Edit Product</h1>
      {error && <p className="text-red-500">{error}</p>}

      {/* ✅ Image Upload Section */}
      <div className="flex justify-center items-center">
        <div className="mt-4">
          <label className="block text-sm font-medium text-black">
            Upload Product Images
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-2 p-2 border border-blue-500 bg-blue-500 text-white rounded-md"
            multiple
          />

          {/* ✅ Display Uploaded Images */}
          <div className="mt-4 flex space-x-4">
            {ImageUri.length > 0 ? (
              ImageUri.map((image, index) => (
                <div key={index} className="relative rounded-md">
                  <img
                    src={image}
                    alt={`Uploaded ${index + 1}`}
                    className="w-32 h-32 object-cover rounded-md"
                  />
                  <button
                    className="absolute top-0 right-0 text-red-500"
                    onClick={() => handleDeleteImage(index)}
                  >
                    X
                  </button>
                </div>
              ))
            ) : (
              <p>No images uploaded yet.</p>
            )}
          </div>
        </div>
      </div>

      {/* ✅ Product Form */}
      <div className="mt-10 shadow-md bg-white p-10 rounded-lg">
        <h1 className="text-2xl font-bold mb-6">Product Details</h1>

        <div className="space-y-6">
          <div className="flex w-full space-x-6">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                placeholder="Enter Product Name"
              />
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* ✅ Sizes & Colors */}
          <div className="flex w-full space-x-6">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Size
              </label>
              <div className="space-y-2 mt-1">
                {sizes.map((sizeOption) => (
                  <label key={sizeOption} className="flex items-center">
                    <input
                      type="checkbox"
                      value={sizeOption}
                      checked={size.includes(sizeOption)}
                      onChange={() =>
                        setSize((prev) =>
                          prev.includes(sizeOption)
                            ? prev.filter((s) => s !== sizeOption)
                            : [...prev, sizeOption]
                        )
                      }
                      className="mr-2"
                    />
                    {sizeOption}
                  </label>
                ))}
              </div>
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Color
              </label>
              <div className="space-y-2 mt-1">
                {colors.map((colorOption) => (
                  <label key={colorOption} className="flex items-center">
                    <input
                      type="checkbox"
                      value={colorOption}
                      checked={colours.includes(colorOption)}
                      onChange={() =>
                        setColours((prev) =>
                          prev.includes(colorOption)
                            ? prev.filter((c) => c !== colorOption)
                            : [...prev, colorOption]
                        )
                      }
                      className="mr-2"
                    />
                    {colorOption}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full h-[20vh]"
              placeholder="Enter Product Description"
            ></textarea>
          </div>
          <div className="flex w-full space-x-6">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                placeholder="Enter Product Price"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="text"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                placeholder="Enter Product Price"
              />
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="bg-primaryColor text-black py-2 px-4 rounded-md hover:bg-amber-900 mt-8"
        disabled={loading}
      >
        {loading ? "Updating..." : "Edit Product"}
      </button>
    </div>
  );
};
