import { useEffect, useRef, useState } from "react";
import {
  Search,
  Heart,
  ShoppingCart,
  CircleUser,
  User,
  Package,
  LogOut,
  LogIn,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../types/State";
import useLogout from "../hooks/useLogout";
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";
import { useFetchCart } from "../hooks/useFetchCart";
import Barner from "./Barner";

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const profileRef = useRef(null);
  const location = useLocation();

  const { userInfo } = useSelector((state: RootState) => state.auth);
  const handleLogout = useLogout();
  const { cart } = useFetchCart();

  const itemCount = Array.isArray(cart.items)
    ? cart.items.reduce((acc, item) => acc + parseInt(item.quantity), 0)
    : 0;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);



  return (
    <nav className="bg-white px-20 flex flex-col border-t-2 border-secondaryColor items-center">
    <div className="w-full flex justify-between items-center ">
      <div className="relative w-1/4">
        <button
          className="text-2xl font-bold bg-primaryColor text-white px-4 py-2 flex items-center justify-between w-full"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          Categories
          {isDropdownOpen ? (
            <MdOutlineArrowDropUp />
          ) : (
            <MdOutlineArrowDropDown />
          )}
        </button>
      </div>

      <div className="hidden md:flex space-x-8">
        <Link to="/" className="text-primaryColor hover:text-primaryColor">Home</Link>
        <a href="products" className="text-tertiaryColor hover:text-primaryColor">Products</a>
        <a href="#contact" className="text-tertiaryColor hover:text-primaryColor">Contact</a>
        <a href="#about" className="text-tertiaryColor hover:text-primaryColor">About</a>
      </div>
      <div className="flex items-center space-x-4">
        {!userInfo ? (
          <>
            <Link to="/login" className="flex items-center space-x-1 text-tertiaryColor hover:text-primaryColor">
              <LogIn className="w-5 h-5 text-primaryColor" />
              <span>Login</span>
            </Link>
            <Link to="/sign-up" className="flex items-center space-x-1 text-tertiaryColor hover:text-primaryColor">
              <User className="w-5 h-5 text-primaryColor" />
              <span>Register</span>
            </Link>
          </>
        ) : (
          <div className="relative flex items-center space-x-2" ref={profileRef}>
            <span className="text-tertiaryColor">My Account</span>
            <CircleUser className="text-tertiaryColor hover:text-blue-500 w-6 h-6 cursor-pointer"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            />
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-[#5e5e5e] shadow-lg rounded-lg py-2 text-white">
                <Link to="/profile" className="flex items-center px-4 py-2 hover:bg-gray-400">
                  <User className="w-5 h-5 mr-2" /> Manage Account
                </Link>
                <Link to="/orders" className="flex items-center px-4 py-2 hover:bg-gray-400">
                  <Package className="w-5 h-5 mr-2" /> My Orders
                </Link>
                <button onClick={handleLogout} className="flex items-center px-4 py-2 text-red-500 hover:bg-gray-400 w-full">
                  <LogOut className="w-5 h-5 mr-2" /> Log Out
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>

  </nav>

  );
};

export default Navbar;
