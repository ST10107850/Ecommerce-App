import React, { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useCategory } from "../hooks/useCategory";

export const CreateCategory: React.FC = () => {

  const {
    handleFileChange,
    handleSubmit,
    setCategoryName,
    setImageUri,
    categoryName,
    ImageUri,
  } = useCategory();

 
  return (
    <div>
      <h2 className="text-2xl font-bold">Create New Category</h2>
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">
            Category Image (Max 2MB)
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="border border-gray-300 p-2 w-full rounded-md"
          />
          {ImageUri && (
            <img
              src={ImageUri}
              alt="Selected category"
              className="mt-4 h-32 object-cover rounded-md"
            />
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Category Name</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="border border-gray-300 p-2 w-full rounded-md"
            placeholder="Enter category name"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Save Category
        </button>
      </form>
    </div>
  );
};
