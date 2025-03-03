import React, { useEffect, useState } from "react";
import login from "../assets/dl.beatsnoop 1.png";
import Google from "../assets/google.png";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../types/State";
import { useRegisterUserMutation } from "../userSlice/userApiSlice";
import { setCredentials } from "../userSlice/authSlice";

export const SignUp = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [conPassword, setConPassword] = useState<string>("");

  const navigate = useNavigate();
  const { userInfo } = useSelector((state: RootState) => state.auth);

  const [register] = useRegisterUserMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      navigate("/login");
    }
  }, [navigate, userInfo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password != conPassword) {
      alert("Password do not match");
    } else {
      try {
        const res = await register({
          firstName,
          lastName,
          email,
          password,
        }).unwrap();
        console.log("Register Response:", res);
        dispatch(setCredentials({ ...res }));
        alert("User registered successfully");
        navigate("/login");
      } catch (error) {
        console.error("Registration Error:", error);
        alert(error.data?.message || "Registration failed");
      }
    }
  };
  return (
    <div className="flex h-[75vh] mt-20">
      {/* Left Side - Image Section */}
      <div className="w-1/2 md:block hidden h-full bg-[#d0e4ec] ">
        <img
          src={login}
          alt="Login Illustration"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Right Side - Form Section */}
      <div className="md:w-1/2 w-full flex items-center justify-center">
        <div className="max-w-sm w-full">
          <h2 className="text-3xl font-bold text-center uppercase text-primaryColor mb-8">Create Account</h2>

          <form>
            {/* Email Input */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                id="fName"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 "
                placeholder="Enter your first name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                id="lName"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 "
                placeholder="Enter your first name"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 "
                placeholder="Enter your email"
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 "
                placeholder="Enter your password"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Confirm Password
              </label>
              <input
                type="password"
                id="password"
                value={conPassword}
                onChange={(e) => setConPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 "
                placeholder="Enter your password"
              />
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end mb-4">
              <a href="#" className="text-blue-600 hover:underline text-sm">
                Forgot Password?
              </a>
            </div>

            {/* Sign-In Button */}
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-primaryColor text-white py-2 hover:bg-amber-700 transition mb-4"
            >
              Sign In
            </button>

            {/* Sign-In with Google */}
            <button
              type="button"
              className="w-full flex items-center justify-center border py-2  hover:bg-gray-100 transition"
            >
              <img src={Google} alt="Google Logo" className="w-5 h-5 mr-2" />
              Sign In with Google
            </button>
          </form>
          <p className="mt-6 text-lg">
            Alredy An Have Account?{" "}
            <span className="text-blue-500 hover:text-blue-700">
              <Link to="/login">Login</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
