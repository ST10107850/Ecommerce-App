import { useState } from "react";

export const usePayments = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardDetails, setCardDetails] = useState({
    cardType: "",
    cardNumber: "",
    cardHolder: "",
    cvv: "",
    expiryDate: "",
  });

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleCardDetailsChange = (e) => {
    setCardDetails({
      ...cardDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleCardTypeChange = (cardType) => {
    setCardDetails((prevDetails) => ({
      ...prevDetails,
      cardType,
    }));
  };
  return {
    paymentMethod,
    cardDetails,
    setPaymentMethod,
    handlePaymentMethodChange,
    handleCardDetailsChange,
    handleCardTypeChange,
  };
};
