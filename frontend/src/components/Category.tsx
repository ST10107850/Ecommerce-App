import { useState } from "react";
import { CategoryCard } from "../reusableComponets/CategoryCard";
import { useCategory } from "../hooks/useCategory";
import { CategoriesType } from "../types/State";

export const Category = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerSlide = 20;

  const { category = [] } = useCategory();
  const totalSlides = Math.ceil(category.length / itemsPerSlide);

  

  const startIndex = currentSlide * itemsPerSlide;
  const visibleItems = category.slice(startIndex, startIndex + itemsPerSlide);

  return (
    <div className="px-4 sm:px-8 md:px-32 mt-32 mb-20 w-full">
      <div className="mt-10 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {visibleItems.length > 0 ? (
          visibleItems.map((item: CategoriesType) => (
            <CategoryCard
              key={item._id}
              image={item.ImageUri}
              categoryName={item.categoryName}
              
            />
          ))
        ) : (
          <p className="text-center col-span-6 text-gray-500">
            No categories available.
          </p>
        )}
      </div>
    </div>
  );
};
