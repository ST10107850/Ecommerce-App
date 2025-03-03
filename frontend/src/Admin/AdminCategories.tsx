import { useState, useEffect } from "react";
import { useCategory } from "../hooks/useCategory";
import { CategoriesType } from "../types/State";
import { Link } from "react-router-dom";

export const AdminCategories = () => {
  const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false);
  const [category, setCategory] = useState<CategoriesType[]>([]);

  const openCreateCategory = () => setIsCreateCategoryOpen(true);
  const closeCreateCategory = () => setIsCreateCategoryOpen(false);

  const { category: fetchedCategory, deleteCategory,handleSubmit,
    handleFileChange,
    ImageUri,
    categoryName,
    setCategoryName, } = useCategory();

  const handleDelete = (categoryId: string) => {
    deleteCategory(categoryId, () => {
      setCategory((prevCategories) =>
        prevCategories.filter((cat) => cat._id !== categoryId)
      );
    });
  };

  useEffect(() => {
    setCategory(fetchedCategory);
  }, [fetchedCategory]);

  return (
    <div className="px-4 sm:px-8 mt-32 mb-20 w-full shadow-md bg-white p-4 rounded-3xl">
      <h2 className="text-3xl sm:text-4xl uppercase font-bold mt-3 text-primaryColor">
        Category management
      </h2>
      <div className="flex items-center justify-between mt-10">
        <div className="flex justify-between space-x-4 w-full">
          <button
            onClick={openCreateCategory}
            className="bg-primaryColor text-balance p-2 rounded-md hover:bg-blue-600"
          >
            Add New Category
          </button>
        </div>
      </div>

      <div className="overflow-x-auto shadow-2xl rounded-2xl mt-6">
        <table className="w-full table-auto border-collapse shadow-md rounded-lg">
          <thead className="bg-secondaryColor">
            <tr>
              <th className="text-left py-3 px-4 font-semibold text-balance">
                Category Image
              </th>
              <th className="text-left py-3 px-4 font-semibold text-balance">
                Category Name
              </th>
              <th className="text-left py-3 px-4 font-semibold text-balance">
                Created At
              </th>
              <th className="text-left py-3 px-4 font-semibold text-balance">
                Created By
              </th>
              <th className="text-left py-3 px-4 font-semibold text-balance">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {category.map((categories) => (
              <tr key={categories._id} className="hover:bg-gray-100">
                <td className="py-3 px-4">
                  <div className="w-24 h-24 rounded-full">
                    <img
                      src={categories.ImageUri}
                      alt={categories.categoryName}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </td>
                <td className="py-3 px-4">{categories.categoryName}</td>
                <td className="py-3 px-4">
                  {categories.createdAt
                    ? new Date(categories.createdAt).toLocaleString("en-ZA", {
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
                  {categories.userId
                    ? `${categories.userId.firstName} ${categories.userId.lastName}`
                    : "Unknown"}
                </td>

                <td className="py-3 px-2 space-x-2">
                  <Link
                    to=""
                    // to={`/admin/product-details`}
                    className="bg-primaryColor text-balance p-2 rounded-md hover:bg-blue-600"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(categories._id)}
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

      {isCreateCategoryOpen && (
        <div className="fixed inset-0 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold">Create New Category</h2>
            <form
              className="mt-4"
              onSubmit={(e) => handleSubmit(e, setCategory)}
            >
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
                className="bg-primaryColor text-balance p-2 rounded-md hover:bg-blue-600"
              >
                Save Category
              </button>
              <button
                onClick={closeCreateCategory}
                className="ml-4 bg-red-500 text-balance p-2 rounded-md hover:bg-red-600"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
