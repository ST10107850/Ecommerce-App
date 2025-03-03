import { FaTruck, FaShoppingBag, FaPlusCircle, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../types/State";
import { useFetchCart } from "../hooks/useFetchCart";
import { useShippingAddress } from "../hooks/useShippingAddress";
import { usePayments } from "../hooks/usePayments";
import { useOrderSummary } from "../hooks/useOrderSummary";
import { useCreateOrder } from "../hooks/useCreateOrder";
import { useState } from "react";

export const CheckOut = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const addresses = userInfo?.address || [];
  const { cart, removeItem } = useFetchCart();
  const [deliveryOption, setDeliveryOption] = useState("delivery");

  const { selectedAddress, handleAddressChange } =
    useShippingAddress(addresses);
  const {
    paymentMethod,
    cardDetails,
    handlePaymentMethodChange,
    handleCardDetailsChange,
    handleCardTypeChange,
  } = usePayments();
  const { subtotal, discountTotal } = useOrderSummary(cart);

  const taxRate = 0.15;
  const tax = subtotal * taxRate;

  const discount = cart.items.map((item) => {
    const itemTotal: number = item.product.price * item.quantity;
    const itemDiscount: number = (itemTotal * item.product.discount) / 100;
    return itemDiscount;
  });

  const deliveryFee = 50;
  const { handleOrderSubmit } = useCreateOrder(
    cart,
    selectedAddress,
    paymentMethod,
    cardDetails,
    subtotal,
    tax,
    deliveryFee,
    discount,
    deliveryOption
  );

  const finalDeliveryFee = deliveryOption === "pickup" ? 0 : deliveryFee;

  return (
    <div className="my-20 px-32">
      <div className="flex space-x-20">
        <div className="w-1/2 shadow-2xl rounded-2xl bg-white">
          <div className="bg-secondaryColor py-2 px-6 rounded-t-2xl">
            <h1 className="text-3xl font-bold mb-4">Payment Information</h1>
          </div>
          <div className=" p-6">
            <div className="flex items-center mb-4 border-2 border-secondaryColor rounded-lg cursor-pointer p-4">
              <input
                type="radio"
                id="delivery"
                name="deliveryOption"
                checked={deliveryOption === "delivery"}
                onChange={() => setDeliveryOption("delivery")}
                className="mr-2"
              />
              <label htmlFor="delivery" className="flex items-center">
                <FaTruck className="mr-2 text-xl" />
                Get It delivered to your favorite place
              </label>
            </div>

            <div className="flex items-center mb-4 border-2 border-secondaryColor rounded-lg p-4 cursor-pointer">
              <input
                type="radio"
                id="pickup"
                name="deliveryOption"
                checked={deliveryOption === "pickup"}
                onChange={() => setDeliveryOption("pickup")}
                className="mr-2"
              />
              <label htmlFor="pickup" className="flex items-center">
                <FaShoppingBag className="mr-2 text-xl" />
                Pickup available in stores near you
              </label>
            </div>

            <h2 className="text-2xl font-bold mb-4">Shipping Address</h2>
            <select
              id="address"
              value={selectedAddress}
              onChange={handleAddressChange}
              className="w-full border-2 border-secondaryColor p-2 rounded-lg mb-4 focus:outline-none focus:border-primaryColor"
            >
              <option value="">--Select Address--</option>
              {addresses.map((address) => (
                <option key={address._id} value={address._id}>
                  {address.street}, {address.town}, {address.city},{" "}
                  {address.postalCode}
                </option>
              ))}
            </select>

            <h2 className="text-2xl font-bold mt-6 mb-4">Payment Options</h2>
            <div className="flex items-center mb-4">
              <input
                type="radio"
                id="cardPayment"
                name="paymentOption"
                value="card"
                onChange={handlePaymentMethodChange}
                className="mr-2"
              />
              <label htmlFor="cardPayment" className="mr-6">
                Card
              </label>
              <input
                type="radio"
                id="cash"
                name="paymentOption"
                value="cash"
                onChange={handlePaymentMethodChange}
                className="mr-2"
              />
              <label htmlFor="cash">Cash on Delivery</label>
            </div>
            {paymentMethod === "card" && (
              <div>
                <div className="mb-5">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Select Card Type
                  </label>
                  <div className="flex space-x-5">
                    <button
                      className={`border-2 p-3 rounded-lg w-32 h-20 flex items-center justify-center ${
                        cardDetails.cardType === "mastercard"
                          ? "border-blue-500"
                          : "border-secondaryColor"
                      }`}
                      onClick={() => handleCardTypeChange("mastercard")}
                    >
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg"
                        alt="MasterCard"
                        className="w-20 h-12"
                      />
                    </button>
                    <button
                      className={`border-2 p-3 rounded-lg w-32 h-20 flex items-center justify-center ${
                        cardDetails.cardType === "visa"
                          ? "border-blue-500"
                          : "border-secondaryColor"
                      }`}
                      onClick={() => handleCardTypeChange("visa")}
                    >
                      <img
                        src="https://logos-world.net/wp-content/uploads/2020/05/Visa-Logo.png"
                        alt="Visa"
                        className="w-20 h-12"
                      />
                    </button>
                  </div>
                </div>

                {/* Card Details */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Card Holder
                  </label>
                  <input
                    type="text"
                    name="cardHolder"
                    placeholder="Cardholder Name"
                    value={cardDetails.cardHolder}
                    onChange={handleCardDetailsChange}
                    className="w-full border-2 border-secondaryColor p-2 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Card Number */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={cardDetails.cardNumber}
                    onChange={handleCardDetailsChange}
                    className="w-full border-2 border-secondaryColor p-2 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                {/* Expiry Date and CVV */}
                <div className="flex space-x-4">
                  <div className="w-1/2">
                    <label className="block text-gray-700 font-semibold mb-2">
                      Expiry Date (MM/YY)
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={cardDetails.expiryDate}
                      onChange={handleCardDetailsChange}
                      className="w-full border-2 border-secondaryColor p-2 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-gray-700 font-semibold mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      value={cardDetails.cvv}
                      onChange={handleCardDetailsChange}
                      className="w-full border-2 border-secondaryColor p-2 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="w-1/2">
          <div className="shadow-2xl rounded-2xl bg-white  h-auto">
            <div className="bg-secondaryColor py-2 px-6 rounded-t-2xl">
              <h1 className="text-2xl font-bold mb-4">Order Summary</h1>
            </div>
            <div className="p-6">
              <div className="space-y-4 max-h-full overflow-y-auto">
                {cart.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between items-center border-b py-2"
                  >
                    <span className="mr-2">{item.product.productName}</span>
                    <span className="text-gray-500">x{item.quantity}</span>
                    <span>
                      R{(item.product.price * item.quantity).toFixed(2)}
                    </span>
                    <FaTrash
                      className="text-red-500 cursor-pointer"
                      onClick={() => removeItem(item._id)}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>R{finalDeliveryFee}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span>-R{discountTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Subtotal (exc. vat)</span>
                  <span>R{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>R{tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span>Order Total</span>
                  <span>
                    R
                    {subtotal + tax + finalDeliveryFee - discountTotal}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleOrderSubmit}
        className="bg-primaryColor text-white py-4 px-5  text-2xl mt-6"
      >
        Confirm Order R
        {subtotal + tax + finalDeliveryFee - discountTotal}
      </button>
    </div>
  );
};
