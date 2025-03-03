import pic1 from "../assets/ps5-slim-goedkope-playstation_large 1.png";
import pic2 from "../assets/attractive-woman-wearing-hat-posing-black-background 1.png";
import pic3 from "../assets/69-694768_amazon-echo-png-clipart-transparent-amazon-echo-png 1.png";
import pic4 from "../assets/Frame 706.png";

export const NewArrivals = () => {
  return (
    <div className="px-8 md:px-32 mt-32 mb-20 w-full">
      {/* Header */}
      <div className="flex justify-center items-center">
        <h2 className="text-4xl text-center font-bold mt-3 text-gray-900">
        ------- New Arrival -------
        </h2>
      </div>

      <div className="mt-10 flex gap-4 w-full h-[800px]">
        <div className="w-1/2 relative bg-black pt-10 flex justify-center">
          <img
            src={pic1}
            alt="PlayStation 5"
            className="h-full object-cover max-h-full"
          />
          {/* Text overlay */}
          <div className="absolute inset-0 flex flex-col justify-end p-10 text-white  bg-opacity-30">
            <h1 className="text-3xl font-bold mb-5">PlayStation 5</h1>
            <p>
              Black and White version of the PS5
              <br />
              coming out on sale
            </p>
          </div>
        </div>

        {/* Right Column: Split into two parts */}
        <div className="w-1/2 flex flex-col gap-4">
          {/* Top Half */}
          <div className="relative h-1/2 bg-black">
            <img
              src={pic2}
              alt="PlayStation 5"
              className="w-full h-full object-cover max-h-full"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white bg-opacity-30">
              <h1 className="text-2xl font-bold mb-3">Womens Collections</h1>
              <p>
                Featured woman collections that
                <br />
                give you another vibe.
              </p>
            </div>
          </div>
          {/* Bottom Half: Two Images in a Row */}
          <div className="flex gap-4 h-1/2">
            <div className="w-1/2 relative bg-black py-10 flex justify-center">
              <img
                src={pic3}
                alt="PlayStation 5"
                className="h-full object-cover max-h-full"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
                <h1 className="text-xl font-bold mb-2">Speakers</h1>
                <p>Amazon wireless speakers</p>
              </div>
            </div>
            <div className="w-1/2 relative bg-black">
              <img
                src={pic4}
                alt="PlayStation 5"
                className="h-full object-cover max-h-full"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-4 text-white bg-opacity-30">
                <h1 className="text-xl font-bold mb-2">Perfume</h1>
                <p>Gucci Intense OUD EDP</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
