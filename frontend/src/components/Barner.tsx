import React from "react";
import Slider from "react-slick";
import pic1 from "../assets/barner/pic1.jpg";
import pic2 from "../assets/barner/pic2.jpg";
import pic3 from "../assets/barner/pic3.jpg";
import {
  Truck,
  Check,
  ArrowRightLeft,
  PhoneCall,
} from "lucide-react";
import { useCategory } from "../hooks/useCategory";

const Barner = () => {
  const { category } = useCategory();

  const carouselData = [
    {
      image: pic1,
      title: "Discover the Future of Technology",
      description: "Stay ahead with the latest gadgets and innovations",
    },
    {
      image: pic2,
      title: "10% Off Your First Order",
      description: "Reasonable prices for top-quality products",
    },
    {
      image: pic3,
      title: "10% Off Your First Order",
      description: "Reasonable prices for top-quality products",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div className="w-full px-20">
      <div className="flex">
        <div className="w-1/4 flex flex-col">
          <ul className="top-full w-full bg-white  border-2 max-h-[410px] border-secondaryColor z-50">
            {category.map((categorys) => (
              <li
                key={categorys._id}
                className="hover:bg-gray-100 px-4 py-2 border-b border-secondaryColor cursor-pointer"
              >
                {categorys.categoryName}
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full max-w-3/4 pl-10 flex flex-col justify-between">
          <Slider {...settings}>
            {carouselData.map((item, index) => (
              <div
                key={index}
                className="text-white flex justify-center items-center relative h-[410px]"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-md"
                />

                <div className="absolute inset-0 bg-opacity-50 z-10"></div>

                <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-20 p-4 rounded">
                  <p className="uppercase text-2xl font-semibold mb-4 text-white">
                    {item.description}
                  </p>
                  <h1 className="text-5xl md:text-4xl font-bold leading-tight text-white">
                    {item.title}
                  </h1>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className="w-full mt-28 flex flex-col justify-between md:flex-row text-center">
        <div className="flex flex-row space-x-10 items-center border-2 border-secondaryColor py-10 px-10">
          <Check className="text-primaryColor w-12 h-12" />
          <h1 className="text-2xl font-semibold">Quality Product</h1>
        </div>
        <div className="flex flex-row space-x-10 items-center border-2 border-secondaryColor py-10 px-10">
          <Truck className="text-primaryColor w-12 h-12" />
          <h1 className="text-2xl font-semibold">Free Shipping</h1>
        </div>
        <div className="flex flex-row space-x-10 items-center border-2 border-secondaryColor py-10 px-10">
          <ArrowRightLeft className="text-primaryColor w-12 h-12" />
          <h1 className="text-2xl font-semibold">30-Day Return</h1>
        </div>
        <div className="flex flex-row space-x-10 items-center border-2 border-secondaryColor py-10 px-10">
          <PhoneCall className="text-primaryColor w-12 h-12" />
          <h1 className="text-2xl font-semibold">24/7 Support</h1>
        </div>
      </div>
    </div>
  );
};

export default Barner;
