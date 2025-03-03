import React from "react";
import { Truck, Headphones, HandCoins } from "lucide-react";

export const Details = () => {
  return (
    <div className="flex justify-center mt-20 space-x-20 mb-10">
      {/* Delivery */}
      <div className="flex flex-col items-center text-center">
        <div className="bg-gray-300 w-20 h-20 rounded-full flex items-center justify-center">
          <div className="bg-black w-12 h-12 rounded-full flex items-center justify-center">
            <Truck className="text-white" />
          </div>
        </div>
        <h1 className="mt-4 font-bold text-xl mb-2 uppercase">Free And Fast Delivery</h1>
        <p className="text-sm text-gray-600">
          Free delivery for all orders over R1000
        </p>
      </div>

      {/* Customer Service */}
      <div className="flex flex-col items-center text-center">
        <div className="bg-gray-300 w-20 h-20 rounded-full flex items-center justify-center">
          <div className="bg-black w-12 h-12 rounded-full flex items-center justify-center">
            <Headphones className="text-white" />
          </div>
        </div>
        <h1 className="mt-4 font-bold text-xl mb-2">24/7 CUSTOMER SERVICE</h1>
        <p className="text-sm text-gray-600">Friendly 24/7 customer support</p>
      </div>

      {/* Money Back Guarantee */}
      <div className="flex flex-col items-center text-center">
        <div className="bg-gray-300 w-20 h-20 rounded-full flex items-center justify-center">
          <div className="bg-black w-12 h-12 rounded-full flex items-center justify-center">
            <HandCoins className="text-white" /> 
          </div>
        </div>
        <h1 className="mt-4 font-bold text-xl mb-2">MONEY BACK GUARANTEE</h1>
        <p className="text-sm text-gray-600">We return money within 30 days</p>
      </div>
    </div>
  );
};
