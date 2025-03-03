import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Orders } from "../types/State";

export const useFetchOrderDetails = () => {
  const { id } = useParams();

  const [order, setOrder] = useState<Orders | null>(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await fetch(`/api/orders/${id}`);
        if (!res.ok) {
          throw new Error("Order not found!");
        }

        const data = await res.json();
        setOrder(data.data);
        console.log(data.data);
      } catch (err) {
        console.error(err.message);
      }
    };
    fetchOrderDetails();
  }, [id]);

  const updateOrderStatus = async (status: string) => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderStatus: status,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update order status");
      }

      const data = await res.json();
      setOrder(data.order);
      alert(data.message);
      console.log(data.message);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDeleteOrder = async () => {
    try {
      const response = await fetch(`/api/orders/${order?._id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete order");
      }

      alert("Order deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };
  return { order, setOrder, updateOrderStatus, handleDeleteOrder };
};
