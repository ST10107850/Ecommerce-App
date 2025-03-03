import { useSelector } from "react-redux";
import { RootState } from "../types/State";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRouter = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};
