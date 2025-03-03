import React, { useState } from "react";
import { useFetchOrders } from "../hooks/useFetchOrders";
import { useCapitalize } from "../hooks/useCapitalize";
import { Link } from "react-router-dom";

export const Orders = ({ isDashboard = false }) => {
  const { orders } = useFetchOrders();
  const { capitalizeFirstLetter } = useCapitalize();

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const filterOrdersByDate = (orders) => {
    if (!fromDate || !toDate) return orders;

    const filteredOrders = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= new Date(fromDate) && orderDate <= new Date(toDate);
    });

    return filteredOrders;
  };

  const sortedOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, isDashboard ? 5 : orders.length);

  const filteredOrders = filterOrdersByDate(sortedOrders);

  return (
    <div className="py-10  px-6 sm:px-10 md:px-16 shadow-2xl bg-white rounded-2xl">
      <h1 className="text-3xl font-bold text-primaryColor uppercase mb-8">Orders</h1>

      <div className="flex justify-between items-center">
        <div className="mb-6 flex space-x-6">
          <div>
            <label className="block text-sm">From</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm">To</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        {isDashboard && (
          <Link
            to={"/admin/orders"}
            className="mt-4 px-4 py-2 mb- bg-primaryColor text-balance"
          >
            View All Orders
          </Link>
        )}
      </div>

      <div className="overflow-x-auto shadow-2xl rounded-2xl">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-secondaryColor">
            <tr>
              <th
                className={`text-left py-3 px-4 font-semibold text-balance ${
                  isDashboard ? "hidden" : "block"
                }`}
              >
                Customer Name
              </th>
              <th className="text-left py-3 px-4 font-semibold text-balance">
                Order Number
              </th>
              <th className="text-left py-3 px-4 font-semibold text-balance">
                Order Date
              </th>
              <th className="text-left py-3 px-4 font-semibold text-balance">
                Number of Items
              </th>
              <th
                className={`text-left py-3 px-4 font-semibold text-balance ${
                  isDashboard ? "hidden" : ""
                }`}
              >
                Delivery Option
              </th>
              <th
                className={`text-left py-3 px-4 font-semibold text-balance ${
                  isDashboard ? "hidden" : ""
                }`}
              >
                Payment Method
              </th>
              <th className="text-left py-3 px-4 font-semibold text-balance">
                Total Amount
              </th>
              <th className="text-left py-3 px-4 font-semibold text-balance">
                Status
              </th>
              <th
                className={`text-left py-3 px-4 font-semibold text-balance ${
                  isDashboard ? "hidden" : "block"
                }`}
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => {
              const totalItems = order.items.reduce(
                (total, item) => total + item.quantity,
                0
              );

              return (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td
                    className={`py-3 px-4 ${isDashboard ? "hidden" : "block"}`}
                  >
                    {capitalizeFirstLetter(order.userId.firstName)}{" "}
                    {capitalizeFirstLetter(order.userId.lastName)}
                  </td>
                  <td className="py-3 px-4">{order.orderNumber}</td>
                  <td className="py-3 px-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">{totalItems}</td>
                  <td
                    className={`py-3 px-4 ${isDashboard ? "hidden" : ""}`}
                  >
                    {capitalizeFirstLetter(order.deliveryOption)}
                  </td>
                  <td
                    className={`py-3 px-4 ${isDashboard ? "hidden" : ""}`}
                  >
                    {capitalizeFirstLetter(order.paymentMethod)}
                  </td>
                  <td className="py-3 px-4">R{(order.totalAmount).toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        order.orderStatus === "Shipped"
                          ? "bg-primaryColor"
                          : order.orderStatus === "Processing"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td
                    className={`py-3 px-4 ${isDashboard ? "hidden" : "block"}`}
                  >
                    <Link to={`/admin/order/${order._id}`}>View</Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
