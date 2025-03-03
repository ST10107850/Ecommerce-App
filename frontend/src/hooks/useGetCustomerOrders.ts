import  { useEffect, useState } from "react";
import { Orders } from "../types/State";

export const useGetCustomerOrders = () => {
  const [customerOrders, setCustomerOrders] = useState<Orders[]>([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders/customer");

        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await res.json();
        setCustomerOrders(data);
        console.log(data);
        
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchOrders();
  }, []);
  return { customerOrders };
};
