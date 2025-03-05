export const CategoryCard = ({ categoryName, image, numberOfProduct }) => {
  return (
    <div className="bg-white  border-gray-300 border p-4 max-w-[500px] relative">
      <p className="text-end text-tertiaryColor">{numberOfProduct} Products</p>
      <div className="flex max-h-[250px] w-full justify-center mt-5">
        <img
          src={image}
          alt="Product"
          className="h-full w-full object-container hover:cursor-zoom-in"
        />
      </div>

      <div className="mt-4 text-start">
        <h3 className="text-2xl text-black font-bold">{categoryName}</h3>
      </div>
    </div>
  );
};
