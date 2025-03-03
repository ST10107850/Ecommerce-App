import { Link } from "react-router-dom";
import { useFetchCart } from "../hooks/useFetchCart";
import { useOrderSummary } from "../hooks/useOrderSummary"; 
import { Minus, Plus, XIcon } from "lucide-react";

export const Cart = () => {
  const { cart, updateCartItem, removeItem } = useFetchCart();
  const { subtotal, discountTotal, cartTotal } = useOrderSummary(cart);

  return (
    <div className="px-32">
      <div className="-mx-32 h-[30vh] flex justify-center items-center bg-secondaryColor flex-col mb-10">
        <h1 className="text-4xl text-[#1c1c1c] font-bold uppercase">
          Shopping Cart
        </h1>
        <h2 className="mt-4 text-[#6f6f6f] ">
          <span className="text-[#D19c97] text-lg">Home</span> - Shopping Cart
        </h2>
      </div>
      <div className="flex space-x-6 w-full h-auto">
        <table className="flex-1 min-w-[60%] table-auto h-auto rounded-2xl px-5 border border-secondaryColor border-collapse">
          <thead className="bg-secondaryColor text-center">
            <tr>
              <th className="p-3 w-1/3">Product</th>
              <th className="p-3 w-1/6">Price</th>
              <th className="p-3 w-1/6">Quantity</th>
              <th className="p-3 w-1/5">Subtotal</th>
              <th className="p-3 w-1/5">Actions</th>
            </tr>
          </thead>

          <tbody>
            {Array.isArray(cart?.items) && cart.items.length > 0 ? (
              cart.items.map((item) => {
                if (!item?.product) return null;

                const price = parseFloat(item.product.price) || 0;
                const quantity = parseInt(item.quantity, 10) || 0;
                const subtotal = price * quantity;

                return (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50 text-center border-2 border-secondaryColor"
                  >
                    <td className="p-3 w-1/3 border-2 border-secondaryColor">
                      <div className="flex items-center  space-x-3">
                        {item.product?.ImageUri?.[0] ? (
                          <img
                            src={item.product.ImageUri[0]}
                            alt={item.product.productName}
                            className="w-16 h-16 rounded"
                          />
                        ) : (
                          <span>No Image</span>
                        )}
                        <span className="font-medium text-tertiaryColor">
                          {item.product.productName || "Unknown Product"}
                        </span>
                      </div>
                    </td>

                    <td className="p-3 w-1/6 border-2 border-secondaryColor text-tertiaryColor">
                      R{price.toFixed(2)}
                    </td>

                    <td className="p-3 w-1/6 border border-secondaryColor">
                      <div className="flex items-center justify-center space-x-0">
                        <button
                          className="bg-primaryColor text-black text-3xl flex items-center justify-center font-bold w-10 h-10 hover:bg-gray-300"
                          onClick={() => updateCartItem(item._id, quantity - 1)}
                        >
                          <Minus className="font-bold"/>
                        </button>
                        <span className="w-10 h-10 flex items-center justify-center bg-secondaryColor">
                          {quantity}
                        </span>
                        <button
                          className="bg-primaryColor text-black text-3xl flex items-center justify-center font-bold w-10 h-10 hover:bg-gray-300"
                          onClick={() => updateCartItem(item._id, quantity + 1)}
                        >
                          <Plus className="font-bold"/>
                        </button>
                      </div>
                    </td>

                    <td className="p-3 w-1/5 border-2 border-secondaryColor text-tertiaryColor">
                      R{subtotal.toFixed(2)}
                    </td>

                    <td className="p-3 w-1/5 border border-secondaryColor text-center">
                      <div className="flex justify-center">
                        <button
                          className="bg-primaryColor text-black text-3xl flex items-center justify-center font-bold w-10 h-10 hover:bg-gray-300"
                          onClick={() => removeItem(item._id)}
                        >
                          <XIcon/>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr className="border-2 border-secondaryColor">
                <td
                  colSpan="6"
                  className="text-center p-4 border-2 border-secondaryColor"
                >
                  No items in cart.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="min-w-[250px] w-1/4 flex-shrink-0 border-2 border-secondaryColor rounded-lg shadow-md">
          <div className="flex justify-center bg-secondaryColor py-5 px-4 font-bold text-2xl text-black rounded-t-lg">
            <span>Cart Summary</span>
          </div>

          <div className="space-y-4 px-6 py-4">
            <div className="flex justify-between text-gray-700">
              <span className="font-bold ">Subtotal:</span>
              <span className="font-medium">R{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span className="font-bold ">Discount:</span>
              <span className="font-medium text-red-500">
                -R{discountTotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span className="font-bold ">Shipping:</span>
              <span className="font-medium">R50.00</span>
            </div>

            <hr className="border-t-2 border-secondaryColor my-4" />

            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>R{cartTotal}</span>
            </div>
          </div>

          <Link
            to="/checkout"
            className="block w-full bg-primaryColor text-black font-semibold py-3 rounded-b-lg hover:bg-blue-300 transition text-center"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
