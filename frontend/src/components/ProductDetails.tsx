import React, { useEffect, useState } from "react";
import { Heart, Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFetchProductDetails } from "../hooks/useFetchProductDetails";
import { RootState } from "../types/State";
import { useAddToCart } from "../hooks/useAddToCart";
import { FaCartPlus } from "react-icons/fa";
import { useFetchCart } from "../hooks/useFetchCart";
import { useWishList } from "../hooks/useWishlist";

export const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [productAdded, setProductAdded] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const { addToCart } = useFetchCart();

  const { createWishlist } = useWishList();
  const type = userInfo?.role === "admin";

  const { product, handleDelete } = useFetchProductDetails();
  const [mainImage, setMainImage] = useState("");
  useEffect(() => {
    if (product?.ImageUri?.length) {
      setMainImage(product.ImageUri[0]);
    }
  }, [product]);

  const handleQuantityChange = (type: string) => {
    setQuantity((prev) =>
      type === "increase" ? prev + 1 : Math.max(1, prev - 1)
    );
  };

  const handleAddToCart = () => {
    if (product) {
      addToCart(product._id, quantity, selectedColor, selectedSize, () =>
        setProductAdded(true)
      );
    }
  };

  const handleReviewSubmit = () => {
    if (review.trim() && rating > 0) {
      console.log("Review submitted:", { review, rating });
      setReview("");
      setRating(0);
    }
  };

  return (
    <div className="flex flex-col px-20">
      <div className="-mx-20 h-[30vh] flex justify-center items-center bg-secondaryColor flex-col mb-10">
        <h1 className="text-4xl text-[#1c1c1c] font-bold uppercase">
          Product Details
        </h1>
        <h2 className="mt-4 text-[#6f6f6f] ">
          <span className="text-[#D19c97] text-lg">Home</span> - Product Details
        </h2>
      </div>
      <div className={`flex h-auto gap-20 ${type ? "px-0 py-10" : " py-20"}`}>
        <div className="w-1/6 h-[70vh] flex flex-col gap-6">
          {product?.ImageUri?.slice(1, 5).map((src, index) => (
            <div
              key={index}
              className="flex justify-center  items-center w-60 h-[16.5vh] cursor-pointer"
              onClick={() => setMainImage(src)} 
            >
              <img
                src={src}
                alt={`Product thumbnail ${index + 1}`}
                className="w-full h-full object-contain rounded-md"
              />
            </div>
          ))}
        </div>

        <div className="w-2/5 h-[70vh]  flex justify-center items-center ">
          <img
            src={mainImage}
            alt="Large product"
            className="w-full max-h-full object-contain rounded-md"
          />
        </div>

        <div className="w-2/5 space-y-6">
          <h1 className="text-3xl font-bold">{product?.productName}</h1>
          <p className="text-yellow-500 text-lg">★★★★☆ (123 Reviews)</p>
          <p className="text-2xl font-semibold text-green-600">
            R{product?.price}
          </p>
          <p className="text-gray-600">{product?.description}</p>
          <hr />

          {/* Color Selection */}
          <div>
            <p className="text-lg font-semibold mb-2">Colors</p>
            <div className="flex gap-4">
              {product?.colours?.map((color) => (
                <label
                  key={color}
                  className="relative flex items-center space-x-2 cursor-pointer"
                >
                  {/* Hidden radio button */}
                  <input
                    type="radio"
                    name="color"
                    value={color}
                    checked={selectedColor === color}
                    onChange={() => setSelectedColor(color)}
                    className="absolute opacity-0 w-0 h-0"
                  />

                  <span
                    className={`w-6 h-6 rounded-full border-2 ${
                      selectedColor === color
                        ? "border-black"
                        : "border-transparent"
                    }`}
                    style={{
                      backgroundColor: color,
                      boxShadow:
                        selectedColor === color
                          ? "0 0 0 4px rgba(0,0,0,0.1)"
                          : "none",
                    }}
                  ></span>
                  <span>{color}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <p className="text-lg font-semibold mb-2">Size</p>
            <div className="flex gap-4">
              {product?.size?.map((size) => (
                <label key={size} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="size"
                    value={size}
                    checked={selectedSize === size}
                    onChange={() => setSelectedSize(size)}
                    className="px-4 py-2 border  border-secondaryColor cursor-pointer"
                  />
                  <span>{size}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Discount */}
          <div>
            <p className="text-lg font-semibold mb-2">
              Discount: {product?.discount || "0"}%
            </p>
          </div>

          {!type && (
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center space-x-0">
                <button
                  className="bg-primaryColor text-black text-3xl flex items-center justify-center font-bold w-10 h-10 hover:bg-gray-300"
                  onClick={() => handleQuantityChange("decrease")}
                >
                  <Minus className="font-bold" />
                </button>
                <span className="w-10 h-10 flex items-center justify-center bg-secondaryColor">
                  {quantity}
                </span>
                <button
                  className="bg-primaryColor text-black text-3xl flex items-center justify-center font-bold w-10 h-10 hover:bg-gray-300"
                  onClick={() => handleQuantityChange("increase")}
                >
                  <Plus className="font-bold" />
                </button>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className="bg-primaryColor text-black px-6 py-2 flex space-x-3 items-center text-xl hover:bg-blue-700 transition"
                >
                  <FaCartPlus />
                  <p>Add to Cart</p>
                </button>
                <button
                  onClick={() => createWishlist(product?._id)}
                  className="border border-secondaryColor p-2 hover:bg-gray-100"
                >
                  <Heart className="w-5 h-5 text-red-500" />
                </button>
              </div>
            </div>
          )}

          {!type && (
            <div className="mt-4">
              <p className="text-green-600">✅ Free Delivery</p>
              <p className="text-gray-500">🔄 Return Delivery within 30 days</p>
              <button
                className="text-blue-500 "
                onClick={() => setShowReviews(!showReviews)}
              >
                View Reviews
              </button>
            </div>
          )}

          {type && (
            <div className="flex space-x-6">
              <Link
                to={`/admin/products/${product?._id}`}
                className="bg-primaryColor text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      {showReviews && (
        <div className="flex mt-10 gap-10">
          <div className="w-1/2">
            <h2 className="text-xl font-bold">Customer Reviews</h2>
            <p>No reviews yet...</p>
          </div>
          <div className="w-1/2">
            <h2 className="text-xl font-bold">Write a Review</h2>
            <textarea
              className="w-full border p-2 rounded-md"
              placeholder="Write your review here..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
            ></textarea>
            <div className="flex items-center mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={`cursor-pointer text-xl ${
                    rating >= star ? "text-yellow-500" : "text-gray-400"
                  }`}
                  onClick={() => setRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
            <button
              onClick={handleReviewSubmit}
              className="mt-2 bg-primaryColor text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Submit Review
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
