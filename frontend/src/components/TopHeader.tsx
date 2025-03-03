import {
  FaCartPlus,
  FaFacebook,
  FaHeart,
  FaInstagram,
  FaLinkedin,
  FaSearch,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { useFetchCart } from "../hooks/useFetchCart";
import { Link } from "react-router-dom";
import { useWishList } from "../hooks/useWishlist";

export const TopHeader = () => {
  const [numberOfItems, setNumberOfItesm] = useState<number>();
  const [numberOfWishlist, setNumberOfWishlist] = useState<number>();
  const { cart } = useFetchCart();
  const { wishlist } = useWishList();
  useEffect(() => {
    const itemCount: number = Array.isArray(cart.items)
      ? cart.items.reduce((acc, item) => acc + parseInt(item.quantity), 0)
      : 0;
    setNumberOfItesm(itemCount);
  }, [cart.items]);

  useEffect(() => {
    const wishlistCount = Array.isArray(wishlist) ? wishlist.length : 0;
    setNumberOfWishlist(wishlistCount);
  }, [wishlist]);

  return (
    <div className="w-full">
      <div className="bg-secondaryColor text-black text-sm py-2 flex justify-between items-center px-20">
        <div className="space-x-4">
          <a href="#" className="hover:text-primaryColor">
            FAQs
          </a>
          <span>|</span>
          <a href="#" className="hover:text-primaryColor">
            Help
          </a>
          <span>|</span>
          <a href="#" className="hover:text-primaryColor">
            Support
          </a>
        </div>

        <div className="flex space-x-4">
          {[FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaYoutube].map(
            (Icon, index) => (
              <Icon
                key={index}
                className="hover:text-primaryColor cursor-pointer"
              />
            )
          )}
        </div>
      </div>

      <div className="bg-white py-5 px-20 flex justify-between items-center ">
        <h1 className="text-4xl font-extrabold">
          <span className="text-primaryColor border-2 border-secondaryColor px-3 mr-3">
            E
          </span>
          xclusive
        </h1>
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="Search for products"
            className="w-full border-2 border-secondaryColor py-2 pl-4 pr-10  focus:ring-primaryColor focus:border-primaryColor"
          />
          <FaSearch className="absolute right-3 top-3 text-primaryColor cursor-pointer hover:text-primaryColor" />
        </div>

        <div className="flex space-x-6">
          <Link to="/wishlist">
            <div className="relative border border-secondaryColor p-2 flex items-center cursor-pointer">
              <FaHeart className="text-xl text-primaryColor hover:text-primaryColor" />
              <span className="text-black text-xs w-5 h-5 flex items-center ml-2 justify-center rounded-full">
                {numberOfWishlist}
              </span>
            </div>
          </Link>
          <Link to="/cart">
            <div className="relative flex items-center cursor-pointer border border-secondaryColor p-2">
              <FaCartPlus className="text-xl text-primaryColor hover:text-primaryColor" />
              <span className=" text-black text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {numberOfItems}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
