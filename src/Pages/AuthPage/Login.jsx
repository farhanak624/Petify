import React, { useState } from "react";
import { login } from "../../Api/ClinicApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  loadSpinner,
  setClinicEmail,
  setClinicId,
} from "../../Redux/Features/ClinicSlice";
import { toast } from "react-toastify";
import LoadingSpinner from "../../Component/Spinner/LoadingSpinner";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/
      );
  };
  const handleSubmit = async (event) => {
    dispatch(loadSpinner());
    event.preventDefault();
    console.log("Form Submitted");
    // Handle form submission here (e.g., send login data to server)
    if (email === "" || password === "") {
      dispatch(loadSpinner());
      toast.error("All fields are required");
      return;
    }
    if (!validateEmail(email)) {
      dispatch(loadSpinner());
      toast.error("Invalid Email");
      return false;
    }
    console.log(`Email: ${email}, Password: ${password}`);
    dispatch(setClinicEmail(email));
    try {
      const response = await login({ email, password });
      console.log("loggged in", response);
      dispatch(setClinicId(response.data.clinicId));
      localStorage.setItem("encryptedToken", JSON.stringify(response.data));
      localStorage.setItem("token", response?.data?.encryptedToken);
      dispatch(loadSpinner());
      if (response.data.isSlotCompleted === false) {
        console.log("in slot");
        return navigate("/clinic-fillup");
      }
      if (
        response.data.role === "clinic" &&
        response.data.verificationStatus === "approved" &&
        response.data.isAdminVerified === true
      ) {
        navigate("/clinics/dashboard");
      } else if (
        response.data.role === "clinic" &&
        response.data.verificationStatus === "pending" &&
        response.data.isAdminVerified === false
      ) {
        console.log("in pending");
        navigate("/loading");
      } else if (
        response.data.role === "clinic" &&
        response.data.verificationStatus === "rejected" &&
        response.data.isAdminVerified === false
      ) {
        console.log("in rejected");
        navigate("/declined");
      } else if (
        response.data.role === "clinic" &&
        response.data.verificationStatus === "blocked" &&
        response.data.isAdminVerified === false
      ) {
        console.log("in blocked");
        navigate("/blocked");
      } else if (response.data.role === "admin") {
        navigate("/dashboard");
      } else if (
        response.data.role === "clinic" &&
        response.data.isSlotCompleted === false
      ) {
        navigate("/clinic-fillup");
      }
    } catch (error) {
      console.log("error", error);
      dispatch(loadSpinner());
      if (
        error.response.status === 401 &&
        error.response.data.message === "Otp Not Verified"
      ) {
        toast.warning("Otp Not Verified");
        navigate("/otp");
      } else if (error.response.status === 400) {
        toast.error(error.response.data.message);
      } else if (
        error.response.status === 401 &&
        error.response.statusText === "Unauthorized"
      ) {
        toast.error("Invalid Email or Password");
      } else if (
        error.response.status === 401 &&
        error.response.data.verificationStatus === "pending"
      ) {
        navigate("/loading");
      } else if (
        error.response.status === 401 &&
        error.response.data.verificationStatus === "rejected"
      ) {
        navigate("/declined");
      } else if (
        error.response.status === 401 &&
        error.response.data.verificationStatus === "blocked"
      ) {
        navigate("/blocked");
      }
    }
  };

  return (
    <>
    <LoadingSpinner/>
      <div className="flex items-center justify-center lg:justify-between min-h-screen">
        {/* Right Side: Background Image */}

        <div
          className="hidden lg:block lg:absolute inset-0 w-full h-screen bg-cover bg-right bg-no-repeat"
          style={{
            backgroundImage: `url('/pet_right2.png')`,
            backgroundSize: "50%",
          }}
        >
          <div className="w-auto h-full"></div>
        </div>
        {/* Left Side: Login Form */}
        <div className="relative max-w-md w-full  space-y-8 rounded-xl bg-white p-10 shadow-md ml-32">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
            <p className="text-gray-500">Please Sign In To Continue</p>
          </div>
          <div className="space-y-7">
            <div className="flex flex-col">
              <label
                htmlFor="username"
                className="text-sm font-medium mb-3 text-gray-700"
              >
                Email
              </label>
              <input
                id="username"
                type="text"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-xl relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:ring-w-1 text-gray-700 bg-[#F3F3F5]"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-sm font-medium mb-3 text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                placeholder="Enter Your Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="appearance-none rounded-xl relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:ring-w-1 text-gray-700 bg-[#F3F3F5]"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="inline-flex w-full rounded-xl text-white justify-center px-4 cursor-pointer py-2 bg-orange-500"
                onClick={handleSubmit}
              >
                Sign In
              </button>
            </div>
            <div className="flex items-center justify-center">
              <p
                onClick={() => {
                  navigate("/otp");
                }}
                className="text-black"
              >
                Forgott Password?
              </p>{" "}
              <p
                onClick={() => {
                  navigate("/signup");
                }}
                className="text-orange-500 cursor-pointer hover:text-orange-700"
              >
                Sign up
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
