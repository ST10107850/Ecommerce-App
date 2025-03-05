import React from "react";

export const Footer = () => {
  return (
    <div className="bg-secondaryColor text-black py-16 mt-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* First Column: Exclusive, Subscribe, and Input Box */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Exclusive</h3>
            <p className="mb-6">Get the latest updates on exclusive offers and new arrivals.</p>
            <div className="flex items-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 w-2/3 rounded-l-md border-2 border-gray-700"
              />
              <button className="bg-primaryColor text-white px-4 py-2 rounded-r-md hover:bg-amber-700">
                Subscribe
              </button>
            </div>
          </div>

          
          <div>
            <h3 className="text-xl font-semibold mb-4">Support</h3>
            <p className="mb-2">Address: 1234 Street Name, City, Country</p>
            <p className="mb-2">Email: support@example.com</p>
            <p className="mb-6">Phone: +1 234 567 890</p>
            <p className="mb-6">Our team is here to assist you 24/7.</p>
          </div>

         
          <div>
            <h3 className="text-xl font-semibold mb-4">Account</h3>
            <ul>
              <li><a href="#" className="text-primaryColor hover:underline">My Account</a></li>
              <li><a href="#" className="text-primaryColor hover:underline">Login/Register</a></li>
              <li><a href="#" className="text-primaryColor hover:underline">Cart</a></li>
              <li><a href="#" className="text-primaryColor hover:underline">Wishlist</a></li>
              <li><a href="#" className="text-primaryColor hover:underline">Shop</a></li>
            </ul>
          </div>

          
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul>
              <li><a href="#" className="text-primaryColor hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="text-primaryColor hover:underline">Terms of Use</a></li>
              <li><a href="#" className="text-primaryColor hover:underline">FAQ</a></li>
              <li><a href="#" className="text-primaryColor hover:underline">Contact Us</a></li>
            </ul>
          </div>
        </div>

      <hr></hr>
        <div className="text-center text-gray-500 mt-12">
          <p>&copy; 2025 Copyright. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};
