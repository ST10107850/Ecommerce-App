import { useState } from "react";

export const useShippingAddress = (addresses) => {
  const [selectedAddress, setSelectedAddress] = useState("");

  const handleAddressChange = (e:any) => {
    setSelectedAddress(e.target.value);
  };

  return {
    selectedAddress,
    handleAddressChange,
  };
};
