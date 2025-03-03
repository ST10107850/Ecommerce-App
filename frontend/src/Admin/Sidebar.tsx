import { MdDashboard } from "react-icons/md";
import { GiTeacher } from "react-icons/gi";
import { PiStudentBold } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import { MdExitToApp } from "react-icons/md";
import useLogout from "../hooks/useLogout";

export const Sidebar = ({ title = "ExcLusive" }) => {
  const handleLogout = useLogout();
  const location = useLocation(); 

  const isActive = (path: any) => location.pathname === path ? 'bg-blue-500' : '';

  return (
    <div className="bg-[#161E2D] text-white h-screen w-64 flex flex-col">
      <div className="p-6 mb-16 text-4xl font-bold border-b">{title}</div>
      <nav className="flex text-lg font-medium flex-col mt-10">
        <Link
          to="/admin"
          className={`flex gap-4 p-4 hover:bg-blue-500 ${isActive('/admin')}`}
        >
          <MdDashboard />
          Dashboard
        </Link>
        <Link
          to="/admin/product"
          className={`flex gap-4 p-4 hover:bg-blue-500 ${isActive('/admin/product')}`}
        >
          <GiTeacher />
          Products
        </Link>
        <Link
          to="/admin/orders"
          className={`flex gap-4 p-4 hover:bg-blue-500 ${isActive('/admin/orders')}`}
        >
          <PiStudentBold />
          Orders
        </Link>
        <Link
          to="/admin/cumstores"
          className={`flex gap-4 p-4 hover:bg-blue-500 ${isActive('/admin/cumstores')}`}
        >
          <PiStudentBold />
          Customers
        </Link>
        <Link
          to="/admin/categories"
          className={`flex gap-4 p-4 hover:bg-blue-500 ${isActive('/admin/categories')}`}
        >
          <PiStudentBold />
          Categories
        </Link>
      </nav>

      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="flex gap-4 p-4 text-red-600 text-lg font-bold items-center"
        >
          <MdExitToApp />
          Log Out
        </button>
      </div>
    </div>
  );
};
