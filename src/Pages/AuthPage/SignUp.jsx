import React, { useState } from "react";
import { signUp } from "../../Api/ClinicApi";
import { useNavigate } from "react-router-dom";
import { set } from "lodash";
import { useDispatch } from "react-redux";
import { loadSpinner, setClinicEmail } from "../../Redux/Features/ClinicSlice";
import { toast } from "react-toastify";
import LoadingSpinner from "../../Component/Spinner/LoadingSpinner";
import PhoneInput from "react-phone-number-input";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/
      );
  };
  const validateForm = () => {
    if (!validateEmail(email)) {
      dispatch(loadSpinner());
      toast.error("Invalid Email");
      return false;
    }
    // Add validation logic here
    let errors = {};
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      phoneNumber === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      console.log("phoneNumber", phoneNumber);
      errors = "All fields are required";
      dispatch(loadSpinner());
      toast.error(errors);
      return false;
    }
    if (password !== confirmPassword) {
      errors = "Passwords do not match";
      dispatch(loadSpinner());
      toast.error(errors);
      return false;
    }
    if (!validatePassword(password)) {
      errors = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character";
      dispatch(loadSpinner());
      toast.error(errors);
      return false;
    }
    setErrors(errors);
    return true;
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (event) => {
    dispatch(loadSpinner());
    setMessage("");
    console.log(
      `First Name: ${firstName}, Last Name: ${lastName}, Email: ${email}, Phone Number: ${phoneNumber}, Password: ${password}, Confirm Password: ${confirmPassword}`
    );
    const wholeForm = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phoneNumber,
      password: password,
    };
    dispatch(setClinicEmail(email));
    event.preventDefault();
    if (!validateForm()) {
      toast.error(errors);
      return;
    }
    signUp(wholeForm)
      .then((response) => {
        console.log("success", response);
        setMessage(response?.data?.message);
        const responseEmail = response?.data.email;
        console.log({ response });
        toast.success(response?.data?.message);
        navigate("/otp", { state: { email: responseEmail } });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.message);
      })
      .finally(() => {
        dispatch(loadSpinner());
      });

    // Handle form submission here (e.g., send signup data to server)
  };

  return (
    <>
      <LoadingSpinner />
      <div className="flex items-center justify-center lg:justify-between min-h-screen">
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
        <div className="relative max-w-md w-full  space-y-8 rounded-xl bg-white p-10 shadow-md ml-28">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 text-transform: capitalize">
              Sign up to continue
            </h1>
            <p className="text-gray-500 text-transform: capitalize">
              Please Sign up to continue
            </p>
            <p className="text-red-500">{message ? message : ""}</p>
          </div>
          <div className=" space-y-4">
            <div className="flex flex-col-2 gap-2">
              <div className="flex flex-col">
                <label
                  htmlFor="firstName"
                  className="text-sm font-medium text-gray-700"
                >
                  First Name
                </label>

                <input
                  id="firstName"
                  type="text"
                  placeholder="Enter Your First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="appearance-none rounded-xl relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:ring-w-1 text-gray-700 bg-[#F3F3F5]"
                />
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="lastName"
                  className="text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Enter Your Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="appearance-none rounded-xl relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:ring-w-1 text-gray-700 bg-[#F3F3F5]"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                placeholder="Enter Your Email"
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-xl relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:ring-w-1 text-gray-700 bg-[#F3F3F5]"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="phoneNumber"
                className="text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <PhoneInput
                defaultCountry={"US"}
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={setPhoneNumber}
                className="appearance-none rounded-xl relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:ring-w-1 text-gray-700 bg-[#F3F3F5]"
                style={{ width: "100%", backgroundColor: "#F3F3F5" }}
                buttonStyle={{ width: "1.5em", height: "1.5em" }}
                buttonClass="flex items-center justify-center px-2"
                inputClass="bg-[#F3F3F5] border-none focus:ring-0 focus:outline-none w-full py-2 px-3"
              />
              {/* <input
              id="phoneNumber"
              type="tel"
              max={10}
              min={10}
              onKeyDown={(e) =>
                ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
              }
              value={phoneNumber}
              onChange={(e) => {
                if (e.target.value.length > 10) {
                  return;
                }
                setPhoneNumber(e.target.value);
              }}
              placeholder="Enter Your Phone Number"
              className="appearance-none rounded-xl relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:ring-w-1 text-gray-700 bg-[#F3F3F5]"
            /> */}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                placeholder="Enter Your Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-xl relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:ring-w-1 text-gray-700 bg-[#F3F3F5]"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="appearance-none rounded-xl relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:ring-w-1 text-gray-700 bg-[#F3F3F5]"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                onClick={handleSubmit}
                className="inline-flex justify-center w-full px-4 py-2 bg-orange-500 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 "
              >
                Sign Up
              </button>
            </div>
            <div className="flex items-center justify-center">
              <p className="text-slate-400">Already have an account?</p>{" "}
              <span
                onClick={() => {
                  navigate("/login");
                }}
                className="text-orange-500 font-semibold cursor-pointer hover:text-orange-700"
              >
                {" "}
                Sign In
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Background Image */}
      </div>
    </>
  );
}

export default Signup;
