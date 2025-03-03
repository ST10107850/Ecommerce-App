import { useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import cardImage from "../assets/card/Frame 611.png";
import card1 from "../assets/card/Frame 604.png";
import card2 from "../assets/card/Frame 613.png";
import card3 from "../assets/card/ak-900-01-500x500 1.png";
import card4 from "../assets/card/sam-moghadam-khamseh-kvmdsTrGOBM-unsplash 1.png";
import { Card } from "../reusableComponets/Card";

const salesData = [
  {
    id: 1,
    itemName: "HAVIT HV-G92 Gamepad",
    price: 120,
    discount: 40,
    ratings: 3,
    image: cardImage,
  },
  {
    id: 2,
    itemName: "CANON EOS DSLR Camera",
    price: 360,
    discount: 10,
    ratings: 3,
    image: card1,
  },
  {
    id: 3,
    itemName: "AK-900 Wired Keyboard",
    price: 960,
    discount: 35,
    ratings: 4,
    image: card3,
  },
  {
    id: 4,
    itemName: "IPS LCD Gaming Monitor",
    price: 350,
    discount: 30,
    ratings: 2,
    image: card2,
  },
  {
    id: 5,
    itemName: "S-Series Comfort Chair ",
    price: 350,
    discount: 20,
    ratings: 5,
    image: card4,
  },
  {
    id: 6,
    itemName: "HAVIT HV-G92 Gamepad",
    price: 120,
    discount: 40,
    ratings: 3,
    image: card1,
  },
  {
    id: 7,
    itemName: "HAVIT HV-G92 Gamepad",
    price: 120,
    discount: 40,
    ratings: 3,
    image: card1,
  },
  {
    id: 8,
    itemName: "HAVIT HV-G92 Gamepad",
    price: 120,
    discount: 40,
    ratings: 3,
    image: card1,
  },
];

export const CurrentSales = () => {
  // Track which slide is currently active. Each slide shows 4 items.
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerSlide = 5;
  const totalSlides = Math.ceil(salesData.length / itemsPerSlide);

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  // Calculate the indices for the visible items
  const startIndex = currentSlide * itemsPerSlide;
  const visibleItems = salesData.slice(startIndex, startIndex + itemsPerSlide);

  return (
    <div className="px-4 sm:px-8 md:px-32 mt-32 w-full">
      <div className="flex justify-between items-center flex-wrap">
        <div>
          <div className="flex items-center space-x-4">
            <div className="bg-[#161E2D] w-3 h-6"></div>
            <p className="text-[#1563DF] text-lg font-medium">Today's</p>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mt-3 text-gray-900">
            Flash Sales
          </h2>
        </div>

        <div className="flex space-x-4 mt-4 md:mt-0">
          <button
            onClick={handlePrev}
            disabled={currentSlide === 0}
            className="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center hover:bg-gray-400 transition disabled:opacity-50"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <button
            onClick={handleNext}
            disabled={currentSlide >= totalSlides - 1}
            className="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center hover:bg-gray-400 transition disabled:opacity-50"
          >
            <ArrowRight className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      <div className="mt-10 grid gap-6 space-x-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
        {visibleItems.map((item) => (
          <Card
            key={item.id}
            image={item.image}
            itemName={item.itemName}
            price={item.price}
            discount={item.discount}
            ratings={item.ratings}
            isWhishList={true}
          />
        ))}
      </div>
    </div>
  );
};
