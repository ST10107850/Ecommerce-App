import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Footer } from "./components/Footer";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import { RootState } from "./types/State";
import { useEffect, useState } from "react";
import { Loading } from "./pages/Loading";
import { TopHeader } from "./components/TopHeader";

function App() {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      if (userInfo) {
        if (
          userInfo.role === "admin" &&
          !location.pathname.startsWith("/admin")
        ) {
          navigate("/admin");
        } else if (
          userInfo.role !== "admin" &&
          location.pathname === "/admin"
        ) {
          navigate("/");
        }
      }
    }, 1500);
  }, [userInfo, navigate, location]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full">
      {userInfo?.role !== "admin" && (
        <>
          <TopHeader />
          <Navbar />
        </>
      )}
      <Outlet />
      {userInfo?.role !== "admin" && <Footer />}
    </div>
  );
}

export default App;
