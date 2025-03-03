import { useCategory } from "../hooks/useCategory";
import { useProduct } from "../hooks/useProduct";

const sizes = ["S", "M", "L", "XL"];
const colors = ["Red", "Blue", "Green", "Black"];

export const AddProduct = () => {
  const {
    handleSubmit,
    handleFileChange,
    handleDeleteImage,
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
  } = useProduct();

  const { category: categories } = useCategory();

  return (
    <div className="py-10 px-6 sm:px-10 md:px-16">
      <h1 className="text-3xl font-bold mb-8">Add New Product</h1>

      {/* ✅ Image Upload Section */}
      <div className="flex justify-center items-center">
        <div className="mt-20">
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
          <div className="mt-10 flex space-x-4">
            {ImageUri.length > 0 ? (
              ImageUri.map((image, index) => (
                <div key={index} className="relative rounded-md">
                  <img
                    src={image}
                    alt={`Uploaded Image ${index + 1}`}
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
      <div className="mt-10 shadow-md bg-white p-10 rounded-4xl">
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

          <div className="flex w-full space-x-6">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Size
              </label>
              <div className="space-y-2 mt-1">
                {sizes.map((sizeOption, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`size-${index}`}
                      value={sizeOption}
                      checked={size.includes(sizeOption)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSize((prev) => [...prev, sizeOption]);
                        } else {
                          setSize((prev) =>
                            prev.filter((item) => item !== sizeOption)
                          );
                        }
                      }}
                      className="mr-2"
                    />
                    <label
                      htmlFor={`size-${index}`}
                      className="text-sm text-gray-700"
                    >
                      {sizeOption}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Color
              </label>
              <div className="space-y-2 mt-1">
                {colors.map((colorOption, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`color-${index}`}
                      value={colorOption}
                      checked={colours.includes(colorOption)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setColours((prev) => [...prev, colorOption]);
                        } else {
                          setColours((prev) =>
                            prev.filter((item) => item !== colorOption)
                          );
                        }
                      }}
                      className="mr-2"
                    />
                    <label
                      htmlFor={`color-${index}`}
                      className="text-sm text-gray-700"
                    >
                      {colorOption}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex w-full space-x-6">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                placeholder="Enter Product Description"
              />
            </div>
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                placeholder="Enter Product Name"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Submit Button */}
      <div className="mt-8">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Add Product
        </button>
      </div>
    </div>
  );
};
