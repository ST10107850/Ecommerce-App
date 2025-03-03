import { useEffect, useState } from "react";
import { Orders } from "../types/State";

export const useFetchOrders = () => {
  const [orders, setOrders] = useState<Orders[]>([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/orders");

        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await res.json();
        setOrders(data.data);
        console.log(data.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchOrders();
  }, []);
  return { orders, setOrders };
};
