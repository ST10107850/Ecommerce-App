import { Heart, Eye, ShoppingCart, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useWishList } from "../hooks/useWishList";

export const Card = ({
  itemName,
  price,
  discount,
  ratings,
  image,
  isWhishList = false,
  userToken,
  id,
}) => {
  const [addedToCart, setAddedToCart] = useState(false);
  const { createWishlist, removeWishlistItem } = useWishList();

  const handleAddToWishlist = () => {
    createWishlist(id);
  };

  const handleRemoveFromWishlist = () => {
    removeWishlistItem(id);
  };

  return (
    <div className="bg-white border-2 border-secondaryColor p-4 w-full max-w-sm relative overflow-hidden group">
      {discount && (
        <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-lg z-10">
          -{discount}% OFF
        </div>
      )}

      <div className="absolute top-4 right-4 z-20 cursor-pointer bg-white">
        <button
          onClick={isWhishList ? handleRemoveFromWishlist : handleAddToWishlist}
        >
          {isWhishList ? (
            <Trash2 className="text-red-500" />
          ) : (
            <Heart className="text-red-500" />
          )}
        </button>
      </div>

      <div className="w-full h-[300px] overflow-hidden ">
        <img
          src={image}
          alt="Product"
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <hr className="my-4 border-t-2 border-gray-300 w-full" />

      <div className="mt-4 px-2 flex flex-col justify-center">
        <div className="text-center">
          <h3 className="text-lg font-bold text-gray-900">{itemName}</h3>
          <div className="flex justify-center items-center space-x-2 mt-2">
            <p className="text-red-500 font-bold text-lg">{`R${price}`}</p>
            {discount && (
              <p className="text-gray-500 line-through text-md">
                {`R${(price / (1 - discount / 100)).toFixed(2)}`}
              </p>
            )}
          </div>
          <div className="flex justify-center items-center space-x-1 mt-2">
            <p className="text-yellow-500 text-lg">
              {"★".repeat(ratings > 0 ? ratings : 0)}
              {"☆".repeat(5 - (ratings > 0 ? ratings : 0))}
            </p>
            <p className="text-sm text-gray-500">
              ({ratings * 50 || 0} ratings)
            </p>
          </div>
        </div>

        <hr className="my-4 border-t-2 border-gray-300 w-full" />

        <div className="flex justify-between items-center text-md text-tertiaryColor">
          <Link to={`/product/${id}`}>
            <div className="flex items-center space-x-1">
              <Eye className="text-primaryColor" />
              <p>View Details</p>
            </div>
          </Link>
          <div className="flex items-center space-x-1 text-md">
            <ShoppingCart className="text-primaryColor" />
            <p>Add to Cart</p>
          </div>
        </div>

        {addedToCart && (
          <div className="mt-2 text-center text-green-500 font-semibold">
            Added to Cart
          </div>
        )}
      </div>
    </div>
  );
};
