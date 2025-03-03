import React, { useState, useEffect } from "react";
import { UsersTypes } from "../types/State";
import { useFetchCustomer } from "../hooks/useFetchCustomer";
import { useCapitalize } from "../hooks/useCapitalize";

export const Customers = ({ dashboardView = false }) => {
  const [customers, setCustomers] = useState<UsersTypes[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const { capitalizeFirstLetter } = useCapitalize();

  const { users: fetchedUsers } = useFetchCustomer();

  useEffect(() => {
    setCustomers(fetchedUsers);
  }, [fetchedUsers]);

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      (
        (customer.firstName?.toLowerCase() ?? "") +
        " " +
        (customer.lastName?.toLowerCase() ?? "")
      ).includes(searchTerm.toLowerCase()) ||
      (customer.email?.toLowerCase() ?? "").includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === "All" || customer.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const handleDeactivate = (id: string) => {
    setCustomers((prevCustomers) =>
      prevCustomers.map((customer) =>
        customer._id === id ? { ...customer, status: "inactive" } : customer
      )
    );
  };

  const handleDelete = (id: string) => {
    setCustomers((prevCustomers) =>
      prevCustomers.filter((customer) => customer._id !== id)
    );
  };

  return (
    <div className="py-10 px-6 sm:px-10 md:px-16 shadow-md bg-white">
      <h1 className="text-3xl uppercase text-primaryColor font-bold mb-8">Customer Management</h1>

      <div
        className={`${dashboardView ? "hidden" : "flex"} justify-between mb-6`}
      >
        <div className="flex space-x-4 w-full max-w-xl">
          {/* Search Bar */}
          <div className="relative w-full">
            <input
              type="text"
              className="p-2 pl-10 border border-gray-300 rounded-md w-full"
              placeholder="Search by Customer Name or Email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="p-2 border border-gray-300 rounded-md"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <button
          className="bg-primaryColor text-balance p-2  hover:bg-amber-700"
          onClick={() => {
            setSearchTerm("");
            setSelectedStatus("All");
          }}
        >
          View All
        </button>
      </div>

      {dashboardView ? (
        <div className="grid grid-cols-2 gap-4">
          {filteredCustomers.slice(0, 2).map((customer) => (
            <div
              key={customer._id}
              className="p-4 rounded shadow bg-gray-100 hover:bg-gray-200"
            >
              <h3 className="font-medium text-lg">
                {capitalizeFirstLetter(customer.firstName)} {capitalizeFirstLetter(customer.lastName)}
              </h3>
              <p className="text-sm text-green-600">{capitalizeFirstLetter(customer.status)}</p>
              <p className="text-sm">{new Date(customer.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto shadow-2xl rounded-2xl">
          <table className="w-full table-auto border-collapse shadow-md rounded-lg">
            <thead className="bg-secondaryColor">
              <tr>
                <th className="text-left py-3 px-4 font-semibold text-balance">
                  Profile
                </th>
                <th className="text-left py-3 px-4 font-semibold text-balance">
                  Customer Name
                </th>
                <th className="text-left py-3 px-4 font-semibold text-balance">
                  Email
                </th>
                <th className="text-left py-3 px-4 font-semibold text-balance">
                  Phone Number
                </th>
                <th className="text-left py-3 px-4 font-semibold text-balance">
                  Id Number
                </th>
                <th className="text-left py-3 px-4 font-semibold text-balance">
                  Role
                </th>
                <th className="text-left py-3 px-4 font-semibold text-balance">
                  Status
                </th>
                <th className="text-left py-3 px-4 font-semibold text-balance">
                  Created At
                </th>

                <th className="text-left py-3 px-4 font-semibold text-balance">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="w-24 h-24 rounded-full">
                      <img
                        src={
                          customer.profileImage ||
                          "https://png.pngtree.com/png-clipart/20200224/original/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_5247852.jpg"
                        }
                        alt="Customer Profile"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    {customer.firstName} {customer.lastName || "N/A"}{" "}
                  </td>
                  <td className="py-3 px-4">{customer.email || "N/A"}</td>
                  <td className="py-3 px-4">{customer.phone || "N/A"}</td>
                  <td className="py-3 px-4">{customer.idNumber || "N/A"} </td>
                  <td className="py-3 px-4">
                    {capitalizeFirstLetter(customer.role) || "N/A"}{" "}
                  </td>
                  <td className="py-1 px-4 text-balance">
                    <span
                      className={`inline-block  py-2 px-4 rounded-full  ${
                        customer.status == "active"
                          ? "bg-green-400"
                          : "bg-amber-500"
                      }`}
                    >
                      {capitalizeFirstLetter(customer.status)}
                    </span>
                  </td>

                  <td className="py-3 px-4">
                    {new Date(customer.createdAt).toLocaleDateString()}
                  </td>

                  <td className="py-3 px-2 space-x-2">
                    
                    <button
                      onClick={() => handleDelete(customer._id)}
                      className="bg-red-500 text-balance p-2 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
