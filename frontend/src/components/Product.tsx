import { useState } from "react";
import { Card } from "../reusableComponets/Card";
import { Link } from "react-router-dom";
import { ProductTypes } from "../types/State";

export const Product = ({ isHome = true, products = [] }) => {
  const itemsPerPage = 6;

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / itemsPerPage);


  const displayedProducts = isHome
    ? products.slice(0, itemsPerPage)
    : products.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className={` ${isHome ? "md:px-32 px-8" : "px-0"} mt-32 w-full`}>
      <div className={`${isHome ? "mb-10 block" : "hidden"} `}>
        <h2 className="text-4xl text-center font-bold mt-3 text-gray-900">
          -------- Trendy Products --------
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 w-full">
        {displayedProducts.length > 0 ? (
          displayedProducts.map((item: ProductTypes) => (
            <div key={item._id} className="block">
              <Card
                image={item.ImageUri?.[0]}
                itemName={item.productName}
                price={item.price}
                id={item._id}
              />
            </div>
          ))
        ) : (
          <p className="text-center col-span-3 text-gray-600">
            No products match your criteria.
          </p>
        )}
      </div>

      {isHome ? (
        <div className="mt-10 flex justify-center">
          <Link
            to="/products"
            className="bg-primaryColor text-white py-3 px-6 hover:bg-amber-600"
          >
            View All Products
          </Link>
        </div>
      ) : (
        // Pagination Controls
        <div className="mt-10 flex justify-center space-x-3">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className={`py-2 px-4 border ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-primaryColor text-white hover:bg-amber-600"}`}
          >
            Prev
          </button>
          <span className="py-2 px-4 border bg-gray-200">
            Page {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className={`py-2 px-4 border ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed" : "bg-primaryColor text-white hover:bg-amber-600"}`}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
