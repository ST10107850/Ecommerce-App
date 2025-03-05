import Calendar from "react-calendar";
import { Orders } from "./Orders";
import { useState } from "react";
import { Customers } from "./Customers";
import { useProduct } from "../hooks/useProduct";

export const Dashboard = () => {
  const [date, setDate] = useState(new Date());

  const { products } = useProduct();

  const productCount = products?.length || 0;
  console.log(productCount);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="flex flex-col justify-between space-x-1">
      <div>
        <div className="flex flex-col justify-center w-full mx-auto my-7 space-y-4">
          <h1 className="text-2xl font-semibold text-blue-400 text-center">
            Welcome to your Admin Dashboard!
          </h1>
          <p className="text-center text-gray-700">
            This is your central hub to efficiently manage all users on the
            platform. From here, you can easily add new users, edit existing
            profiles, and delete records as necessary. Stay in full control of
            your user management tasks and ensure a smooth, organized experience
            for both administrators and users alike.
          </p>
        </div>

        <hr className="border-t border-gray-300 mt-8" />

        <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mt-8 mb-8 w-full px-6 sm:px-10">
          <div className="p-4 rounded shadow bg-white">
            <h3 className="text-lg font-light">Total Number Of Orders</h3>
            <p className="text-2xl">0</p>
          </div>
          <div className="p-4 rounded shadow bg-white">
            <h3 className="text-lg font-light">Total Number Of Product</h3>
            <p className="text-2xl">0</p>
          </div>
          <div className="p-4 rounded shadow bg-white">
            <h3 className="text-lg font-light">Total Number Of Customers</h3>
            <p className="text-2xl">0</p>
          </div>
        </div>
      </div>

      <div className="flex space-x-6">
        <div className="flex flex-col items-center flex-grow space-y-6">
          <div className="w-full ">
            <Orders isDashboard={true} />
          </div>
        </div>

        <div className="flex flex-col items-start w-[500px] space-y-6">
          <div className="bg-white shadow-lg rounded-lg p-6 w-full">
            <h2 className="text-xl font-semibold text-center mb-4">Calendar</h2>
            <Calendar
              onChange={handleDateChange}
              value={date}
              className="w-full"
            />
          </div>

          <Customers dashboardView={true} />
        </div>
      </div>
    </div>
  );
};
