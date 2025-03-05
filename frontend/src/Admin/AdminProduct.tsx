import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCategory } from "../hooks/useCategory";
import { useProduct } from "../hooks/useProduct";
import { ProductTypes } from "../types/State";

export const AdminProduct = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [product, setProduct] = useState<ProductTypes[]>([]);

  const { category } = useCategory();
  const { products, deleteProduct } = useProduct();

  const handleDelete = (productId: string) => {
    deleteProduct(productId, () => {
      setProduct((prevProduct) =>
        prevProduct.filter((prod) => prod._id !== productId)
      );
    });
  };

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (product.categoryId?.categoryName &&
          product.categoryId.categoryName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()));

      const matchesCategory =
        selectedCategory === "All" ||
        product.categoryId?.categoryName === selectedCategory;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => a.stock - b.stock);

  return (
    <div className="py-10 px-6 sm:px-10 md:px-16 shadow-md bg-white">
      <h1 className="text-3xl uppercase text-primaryColor font-bold mb-8">
        Product Management
      </h1>

      <div className="flex justify-between mb-6">
        <div className="flex space-x-4 w-full max-w-xl">
          <div className="relative w-full">
            <input
              type="text"
              className="p-2 pl-10 border border-gray-300 rounded-md w-full"
              placeholder="Search by Product Name or Category"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="p-2 border border-gray-300 rounded-md"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="All">Select Category</option>
            {category.map((cat) => (
              <option key={cat._id} value={cat.categoryName}>
                {cat.categoryName}
              </option>
            ))}
          </select>
        </div>

        <Link
          to="/admin/product/create"
          className="bg-primaryColor text-black p-2  hover:bg-amber-700"
        >
          Add New Product
        </Link>
      </div>

      <div className="overflow-x-auto shadow-2xl rounded-2xl">
        <table className="w-full table-auto border-collapse shadow-md rounded-lg">
          <thead className="bg-secondaryColor">
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-balance">
                Product Image
              </th>
              <th className="text-left py-3 px-4 font-semibold text-balance">
                Product Name
              </th>
              <th className="text-left py-3 px-4 font-semibold text-balance">
                Category
              </th>
              <th className="text-left py-3 px-4 font-semibold text-balance">
                Price
              </th>
              <th className="text-left py-3 px-4 font-semibold text-balance">
                Create At
              </th>
              <th className="text-left py-3 px-4 font-semibold text-balance">
                Created By
              </th>
              <th className="text-left py-3 px-4 font-semibold text-balance">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product._id} className="hover:bg-gray-100">
                <td className="py-3 px-4 rounded-2xl">
                  <div className="w-24 h-24 rounded-full">
                    {product.ImageUri && product.ImageUri.length > 0 ? (
                      <img
                        src={product.ImageUri[0]}
                        alt={product.productName}
                        className="w-full h-full object-contain rounded-2xl"
                      />
                    ) : (
                      <img
                        src="/default-image.jpg"
                        alt="Default Product"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                </td>

                <td className="py-3 px-4">
                  {product.productName.length > 20
                    ? product.productName.slice(0, 20) + "..."
                    : product.productName}
                </td>

                <td className="py-3 px-4">
                  {product.categoryId?.categoryName}
                </td>
                <td className="py-3 px-4">R{product.price.toFixed(2)}</td>
                <td className="py-3 px-4">
                  {product.createdAt
                    ? new Date(product.createdAt).toLocaleString("en-ZA", {
                        timeZone: "Africa/Johannesburg",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                        hour12: false,
                      })
                    : "N/A"}
                </td>
                <td className="py-3 px-4">
                  {product.userId.firstName} {product.userId.lastName}
                </td>
                <td className="py-3 px-2 space-x-2">
                  <Link
                    to={`/admin/product/${product._id}`}
                    className="bg-primaryColor text-black p-2 rounded-md hover:bg-amber-700"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-balance p-2 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
