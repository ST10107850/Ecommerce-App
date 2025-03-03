import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../userSlice/userApiSlice";
import { logout } from "../userSlice/authSlice";

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutApiCall] = useLogoutMutation();

  const handleLogout = async () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (!confirmLogout) return;

    try {
      const response = await logoutApiCall(undefined).unwrap();
      console.log("Logout API Response:", response); 
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error("Logout Failed:", error);
      alert(`Logout failed: ${error?.data?.message || error.message || "Unknown Error"}`);
    }
  };

  return handleLogout;
};

export default useLogout;
