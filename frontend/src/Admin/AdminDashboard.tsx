import React from "react";
import { Sidebar } from "./Sidebar";
import { FooterAdmin } from "./FooterAdmin";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../types/State";

export const AdminDashboard = () => {

  const {userInfo} = useSelector((state:RootState) => state.auth);

  return (
    <div className="flex flex-row items-start pr-4 space-x-0 lg:space-x-10 bg-[#F7F7F2]">
      <div className="hidden lg:block sticky top-0 h-screen">
        <Sidebar />
      </div>
      <div className="w-full h-full flex flex-col">
        <main className="flex-1 py-10 text-tertiaryColor px-6 sm:px-10 md:px-16">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Hi, <span className="text-primaryColor">{userInfo?.firstName} {userInfo?.lastName}</span>
            </h1>
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 rounded-full overflow-hidden">
                <img
                  src="https://media.istockphoto.com/id/1495088043/vector/user-profile-icon-avatar-or-person-icon-profile-picture-portrait-symbol-default-portrait.jpg?s=612x612&w=0&k=20&c=dhV2p1JwmloBTOaGAtaA3AW1KSnjsdMt7-U_3EZElZ0="
                  alt="Profile Picture"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="font-medium text-lg text-gray-900">
                  {userInfo?.firstName} {userInfo?.lastName}
                </h2>
                <p className="text-gray-600 text-sm">{userInfo?.email}</p>
              </div>
            </div>
          </div>

          <hr className="border-t border-gray-300 mb-8" />

         
          <Outlet />
          <FooterAdmin />
        </main>
      </div>
    </div>
  );
};
