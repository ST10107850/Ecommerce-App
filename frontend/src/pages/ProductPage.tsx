import React, { useState } from "react";
import { Product } from "../components/Product";
import { useCategory } from "../hooks/useCategory";
import { useProduct } from "../hooks/useProduct";

export const ProductPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [selectedPriceRange, setSelectedPriceRange] = useState([]);
  const [selectedColours, setSelectedColours] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const { category } = useCategory();
  const { products } = useProduct();
  // console.log("Size", products.size, "Colors ", products.colours);

  const priceRanges = [
    { label: "All Prices", min: 0, max: Infinity },
    { label: "R0 - R500", min: 0, max: 500 },
    { label: "R500 - R1000", min: 500, max: 1000 },
    { label: "R1000 - R1500", min: 1000, max: 1500 },
    { label: "R1500+", min: 1500, max: Infinity },
  ];

  const colours = ["Red", "Blue", "Green", "Black", "White"];
  const sizes = ["S", "M", "L", "XL", "XXL"];

  const handleCheckboxChange = (setter, value) => {
    setter((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  // Apply Filtering
  const filteredProducts = products
    .filter((product) =>
      searchQuery
        ? product.productName.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    )
    .filter((product) =>
      selectedCategory ? product.categoryId === selectedCategory : true
    )
    .filter((product) =>
      selectedPriceRange.length > 0
        ? selectedPriceRange.some((rangeLabel) => {
            const range = priceRanges.find((r) => r.label === rangeLabel);
            return range
              ? product.price >= range.min && product.price <= range.max
              : false;
          })
        : true
    )
    .filter((product) =>
      selectedColours.length > 0
        ? product.colours &&
          product.colours.some((c) => selectedColours.includes(c))
        : true
    )
    .filter((product) =>
      selectedSizes.length > 0
        ? product.size && product.size.some((s) => selectedSizes.includes(s))
        : true
    );

  // Apply Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "price-asc") return a.price - b.price;
    if (sortOption === "price-desc") return b.price - a.price;
    if (sortOption === "name-asc")
      return a.productName.localeCompare(b.productName);
    if (sortOption === "name-desc")
      return b.productName.localeCompare(a.productName);
    return 0;
  });

  return (
    <div className="px-20 bg-gray-100">
      <div className="-mx-20 h-[30vh] flex justify-center items-center bg-secondaryColor flex-col mb-10">
        <h1 className="text-7xl text-[#1c1c1c] font-bold uppercase">
          our products
        </h1>
        <h2 className="mt-4 text-[#6f6f6f]">
          <span className="text-[#D19c97] text-lg">Home</span> - Products
        </h2>
      </div>

      <div className="flex space-x-6 w-full">
        {/* Sidebar Filters */}
        <div className="w-1/4 pr-10">
          <h2 className="text-xl font-bold mb-4">Filter By</h2>

          {/* Category Filter */}
          <div className="mb-4">
            <h3 className="font-bold mb-5 text-2xl text-black">Category</h3>
            <div className="bg-white p-4">
              <select
                className="w-full p-2 border rounded-md"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                {category.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Price Filter */}
          <div className="mb-4">
            <h3 className="font-bold mb-5 text-2xl text-black">Price</h3>
            <div className="bg-white p-4">
              {priceRanges.map((range) => (
                <label
                  key={range.label}
                  className="text-xl mb-6 flex items-center"
                >
                  <input
                    type="checkbox"
                    checked={selectedPriceRange.includes(range.label)}
                    onChange={() =>
                      handleCheckboxChange(setSelectedPriceRange, range.label)
                    }
                    className="mr-2"
                  />
                  <span>{range.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Colour Filter */}
          <div className="mb-4">
            <h3 className="font-bold mb-5 text-2xl text-black">Colour</h3>
            <div className="bg-white p-4">
              {colours.map((colour) => (
                <label key={colour} className="text-xl mb-6 flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedColours.includes(colour)}
                    onChange={() =>
                      handleCheckboxChange(setSelectedColours, colour)
                    }
                    className="mr-2"
                  />
                  <span>{colour}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Size Filter */}
          <div className="mb-4">
            <h3 className="font-bold mb-5 text-2xl text-black">Size</h3>
            <div className="bg-white p-4">
              {sizes.map((size) => (
                <label key={size} className="text-xl mb-6 flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedSizes.includes(size)}
                    onChange={() =>
                      handleCheckboxChange(setSelectedSizes, size)
                    }
                    className="mr-2"
                  />
                  <span>{size}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Product List */}
        <div className="flex-1">
          <div className="flex space-x-20">
            {/* Search */}
            <input
              type="text"
              placeholder="Search products..."
              className="w-full p-2 border rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Sorting */}
            <select
              className="w-auto p-2 border rounded-md"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="">Sort by</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A-Z</option>
              <option value="name-desc">Name: Z-A</option>
            </select>
          </div>

          {/* Pass Filtered & Sorted Products */}
          <Product isHome={false} products={sortedProducts} />
        </div>
      </div>
    </div>
  );
};
