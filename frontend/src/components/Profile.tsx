import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserMutation } from "../userSlice/userApiSlice";
import { RootState } from "../types/State";
import { setCredentials } from "../userSlice/authSlice";

export const Profile = () => {
  // State management
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    role: "",
    status: "",
    email: "",
    phone: 0,
    idNumber: 0,
    profileImage: "",
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [addressList, setAddressList] = useState<any[]>([]);
  const [newAddress, setNewAddress] = useState({
    street: "",
    town: "",
    city: "",
    country: "",
    postalCode: "",
  });

  const dispatch = useDispatch();
  const [updateUser] = useUpdateUserMutation();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (userInfo) {
      setFormData({
        firstName: userInfo?.firstName || "",
        lastName: userInfo.lastName || "",
        email: userInfo.email || "",
        phone: userInfo.phone || 0,
        idNumber: userInfo.idNumber || 0,
        profileImage:
          userInfo.profileImage ||
          "https://cdn-icons-png.flaticon.com/512/6522/6522516.png",
        role: userInfo.role || "",
        status: userInfo.status || "",
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      setAddressList(userInfo.address || []);
    }
  }, [userInfo]);

  // Handle form input change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  // Handle address input change
  const handleAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setNewAddress({ ...newAddress, [field]: e.target.value });
  };

  // Handle image selection
  const handleImageClick = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = () => {
      const file = fileInput.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFormData({ ...formData, profileImage: reader.result as string });
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  };

  // Update user profile
  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUser({
        _id: userInfo?._id,
        ...formData,
        address: addressList,
      }).unwrap();
      dispatch(setCredentials(updatedUser.data));
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  // Update password
  const handlePasswordChange = async (e: FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmNewPassword) {
      alert("New passwords do not match.");
      return;
    }

    try {
      const res = await fetch("/api/users/update-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
        }),
      });

      if (!res.ok) {
        throw new Error("Incorrect old password or error updating.");
      }
      alert("Password updated successfully!");
      setFormData({
        ...formData,
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (error) {
      console.error("Password update failed", error);
      alert("Failed to update password. Please check your old password.");
    }
  };

  // Add new address
  const handleAddAddress = () => {
    if (Object.values(newAddress).some((val) => !val)) {
      alert("Please fill in all address fields.");
      return;
    }
    setAddressList([...addressList, newAddress]);
    setNewAddress({
      street: "",
      town: "",
      city: "",
      country: "",
      postalCode: "",
    });
  };

  // Remove address
  const handleRemoveAddress = (index: number, addressId: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this address?"
    );
    if (isConfirmed) {
      deleteAddress(addressId);
      const updatedAddressList = addressList.filter((_, i) => i !== index);
      setAddressList(updatedAddressList);
    }
  };

  // Delete address from backend
  const deleteAddress = async (addressId: string) => {
    try {
      const response = await fetch(`/api/users/delete-address/${addressId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        alert("Address deleted successfully");
      } else {
        alert(data.message || "Failed to delete address");
      }
    } catch (error) {
      console.error("Error deleting address:", error);
      alert("An error occurred while deleting the address.");
    }
  };

  return (
    <div className="max-w-full mx-auto py-6 md:px-32 px-8 flex flex-col justify-center">
      {/* Profile Header */}
      <div className="flex items-center space-x-6 mb-8 justify-center">
        <img
          src={formData.profileImage}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover cursor-pointer"
          onClick={handleImageClick}
        />
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">
            {formData.firstName} {formData.lastName}
          </h1>
          <p className="text-lg text-gray-500">{formData.email}</p>
        </div>
      </div>

      {/* Profile Form */}
      <div className="flex space-x-40 flex-col md:flex-row">
        <div className="space-y-4 w-full">
          {["firstName", "lastName", "email", "phone", "idNumber"].map(
            (field) => (
              <div key={field}>
                <label className="block text-lg font-semibold text-gray-700">
                  {field.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type="text"
                  value={formData[field as keyof typeof formData]}
                  onChange={(e) => handleInputChange(e, field)}
                  className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
            )
          )}

          <div>
            <label className="block text-lg font-semibold text-gray-700">
              Role:
            </label>
            <input
              type="text"
              value={formData.role}
              className="mt-2 p-2 border border-gray-300 rounded-md w-full"
              readOnly
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700">
              Status:
            </label>
            <input
              type="text"
              value={formData.status}
              className="mt-2 p-2 border border-gray-300 rounded-md w-full"
              readOnly
            />
          </div>

          {/* Save Profile Changes */}
          <div className="flex justify-end mt-6">
            <button
              onClick={handleUpdate}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>

        <div className="space-y-4 w-full mt-8">
          <h2 className="text-2xl font-semibold">Update Password</h2>
          {["oldPassword", "newPassword", "confirmNewPassword"].map((field) => (
            <div key={field}>
              <label className="block text-lg font-semibold text-gray-700">
                {field.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type="password"
                value={formData[field as keyof typeof formData]}
                onChange={(e) => handleInputChange(e, field)}
                className="mt-2 p-2 border border-gray-300 rounded-md w-full"
              />
            </div>
          ))}
          <div className="flex justify-end mt-6">
            <button
              onClick={handlePasswordChange}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Update Password
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Your Addresses</h2>
        <div className="flex flex-col items-center max-w-full md:flex-row md:space-x-40">
          <div className="space-y-4 w-full">
            {Object.keys(newAddress).map((field) => (
              <div key={field}>
                <label className="block text-lg font-semibold text-gray-700">
                  {field.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  type="text"
                  value={newAddress[field as keyof typeof newAddress]}
                  onChange={(e) => handleAddressChange(e, field)}
                  className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
            ))}
            <button
              onClick={handleAddAddress}
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Add Address
            </button>
          </div>

          {addressList.length > 0 && (
            <div className="md:mt-0 mt-8 w-full">
              <h3 className="text-xl font-semibold">Your Saved Addresses</h3>
              <ul className="space-y-4">
                {addressList.map((address, index) => (
                  <li key={index} className="border p-4 rounded-md">
                    <p>{address.street}</p>
                    <p>
                      {address.town}, {address.city}
                    </p>
                    <p>{address.country}</p>
                    <p>{address.postalCode}</p>
                    <button
                      onClick={() => handleRemoveAddress(index, address._id)}
                      className="mt-2 text-red-600 hover:underline"
                    >
                      Remove Address
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
