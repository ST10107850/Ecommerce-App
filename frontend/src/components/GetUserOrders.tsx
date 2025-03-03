import { Link } from "react-router-dom";
import { useCapitalize } from "../hooks/useCapitalize";
import { useGetCustomerOrders } from "../hooks/useGetCustomerOrders";

export const GetUserOrders = () => {
  const { customerOrders = [] } = useGetCustomerOrders();
  const { capitalizeFirstLetter } = useCapitalize();
  return (
    <div className="py-10  px-6 sm:px-10 md:px-32 shadow-2xl bg-white rounded-2xl">
      <h1 className="text-3xl font-bold mb-8">Orders</h1>

      <div className="overflow-x-auto shadow-2xl rounded-2xl">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-[#161E2D]">
            <tr>
             
              <th className="text-left py-3 px-4 font-semibold text-white">
                Order Number
              </th>
              <th className="text-left py-3 px-4 font-semibold text-white">
                Order Date
              </th>
              <th className="text-left py-3 px-4 font-semibold text-white">
                Number of Items
              </th>
              <th className={`text-left py-3 px-4 font-semibold text-white`}>
                Delivery Option
              </th>
              <th className={`text-left py-3 px-4 font-semibold text-white `}>
                Payment Method
              </th>
              <th className="text-left py-3 px-4 font-semibold text-white">
                Total Amount
              </th>
              <th className="text-left py-3 px-4 font-semibold text-white">
                Status
              </th>
              <th className={`text-left py-3 px-4 font-semibold text-white `}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {customerOrders.map((order) => {
              const totalItems = order.items.reduce(
                (total, item) => total + item.quantity,
                0
              );

              return (
                <tr key={order._id} className="hover:bg-gray-50">
                 
                  <td className="py-3 px-4">{order.orderNumber}</td>
                  <td className="py-3 px-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">{totalItems}</td>
                  <td className={`py-3 px-4 `}>
                    {capitalizeFirstLetter(order.deliveryOption)}
                  </td>
                  <td className={`py-3 px-4`}>
                    {capitalizeFirstLetter(order.paymentMethod)}
                  </td>
                  <td className="py-3 px-4">{order.totalAmount}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        order.orderStatus === "Shipped"
                          ? "bg-blue-500"
                          : order.orderStatus === "Pending"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td
                    className={`py-3 px-4`}
                  >
                    <Link to={`/order/${order._id}`}>View</Link>
                    <Link to={`/order/${order._id}`} className="bg-red-500 text-white px-2 py-1 rounded-full">Delete</Link>
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
