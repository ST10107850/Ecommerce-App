import { Card } from "../reusableComponets/Card";
import { Link } from "react-router-dom";
import { ProductTypes } from "../types/State";

export const Product = ({ isHome = true, products = [] }) => {
  return (
    <div className={` ${isHome ? "md:px-32 px-8" : "px-0"} mt-32 w-full`}>
      <div className={`${isHome ? "mb-10 block" : "hidden"} `}>
        <h2 className="text-4xl text-center font-bold mt-3 text-gray-900">
          -------- Trendy Products --------
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 w-full">
        {products?.length > 0 ? (
          products.map((item: ProductTypes) => (
            <div key={item._id} className="block">
              <Card
                image={item.ImageUri?.[0] || "/default-image.jpg"} // Prevent errors if ImageUri is empty
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

      {isHome && (
        <div className="mt-10 flex justify-center">
          <Link
            to="/products"
            className="bg-[#1563DF] text-white py-3 px-6 rounded-md hover:bg-blue-700"
          >
            View All Products
          </Link>
        </div>
      )}
    </div>
  );
};
