import { useWishList } from "../hooks/useWishlist";
import { Card } from "../reusableComponets/Card";


export const WhishList = () => {
  const { wishlist } = useWishList();

  console.log("Wishlistsss:", wishlist);

  return (
    <div className="px-8 md:px-20 w-full">
      <div className="-mx-20 h-[30vh] flex justify-center items-center bg-secondaryColor flex-col mb-10">
        <h1 className="text-4xl text-[#1c1c1c] font-bold uppercase">
          Wishlist Product
        </h1>
        <h2 className="mt-4 text-[#6f6f6f] ">
          <span className="text-[#D19c97] text-lg">Home</span> - Wishlist
        </h2>
      </div>

      <div className="grid grid-cols-4 gap-20 w-full">
        {Array.isArray(wishlist) && wishlist.length > 0 ? (
          wishlist.map((item) => (
            <Card
              image={item.productId?.ImageUri[0]}
              itemName={item.productId?.productName}
              price={item.productId?.price}
              isWhishList={true}
              id={item._id}
            />
          ))
        ) : (
          <p>No items in your wishlist yet!</p>
        )}
      </div>
    </div>
  );
};
