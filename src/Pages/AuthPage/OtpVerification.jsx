import { set } from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { resendOTP, verifyOTP } from "../../Api/ClinicApi";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../../Component/Spinner/LoadingSpinner";
import { loadSpinner } from "../../Redux/Features/ClinicSlice";

const OtpVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { clinicEmail } = useSelector((state) => {
    return state.clinic;
  });
  const [otp, setOtp] = useState("");
  const inputRefs = useRef([null, null, null, null]);
  const [otpArray, setOtpArray] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(180);
  const [emailStorage, setEmailStorage] = useState("");
  useEffect(() => {
    console.log("email in otp: ", clinicEmail);
    const clinicalEmail = JSON.parse(localStorage.getItem("clinicEmail"));
    setEmailStorage(clinicalEmail);
    resendOTP({ email: clinicalEmail });
  }, []);
  useEffect(() => {
    // Check if all OTP digits are entered
    if (otpArray.every((digit) => digit !== "")) {
      const otp = otpArray.join("");
    }
  }, [otpArray]); // Run this effect whenever the 'otp' state changes

  useEffect(() => {
    let timer;

    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [countdown]);
  // Function to format the countdown time
  const formatCountdown = (countdown) => {
    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  };
  const handleOtpChange = (e, index) => {
    const newOtp = [...otpArray];
    newOtp[index] = e.target.value;
    setOtpArray(newOtp);

    if (e.target.value && index < 5) {
      setTimeout(() => {
        inputRefs.current[index + 1].focus();
      }, 0);
    }
  };
  const resendOtpHandler = async () => {
    try {
      dispatch(loadSpinner());
      setOtpArray(["", "", "", "", "", ""]);
      const res = await resendOTP({ email: emailStorage });
      console.log("res in resend: ", res);
      setCountdown(180);
      dispatch(loadSpinner());
    } catch (error) {
      dispatch(loadSpinner());
      console.log("error resend: ", error);
      toast.error(error?.data?.message || error.error);
    }
  };
  const handleSubmit = async (event) => {
    dispatch(loadSpinner());
    event.preventDefault();
    // Handle form submission here (e.g., send login data to server)
    try {
      otpArray.every((digit) => digit !== "");
      const otp = otpArray.join("");
      //  const clinicalEmail= JSON.parse(localStorage.getItem("clinicEmail"));
      // console.log( otp, clinicalEmail);
      const res = await verifyOTP({ otp, email: emailStorage });
      console.log("res in verifyOTP: ", res);
      localStorage.setItem("clinicId", JSON.stringify(res?.data?.clinicId));
      localStorage.setItem("encryptedToken", JSON.stringify(res.data));
      localStorage.setItem("token", res?.data?.encryptedToken);
      dispatch(loadSpinner());
      if (res.status === 200 && res.data.message === "Otp Verified") {
        console.log("otp verified");
        if (res.data.role === "clinic") {
          console.log("in clinic");
          navigate("/clinic-fillup");
        }
      } else {
        dispatch(loadSpinner());
        console.log("error in verifyOTP");
      }
    } catch (error) {
      dispatch(loadSpinner());
      console.log("error otp verify: ", error);
      toast.error(error?.response?.data?.message);
    }
  };
  return (
    <>
      <LoadingSpinner />
      <div className="flex items-center justify-center lg:justify-between min-h-screen">
        {/* Right Side: Background Image */}

        <div
          className="hidden absolute lg:block inset-0 w-full h-screen bg-cover bg-right bg-no-repeat"
          style={{
            backgroundImage: `url('/pet_right2.png')`,
            backgroundSize: "50%",
          }}
        >
          <div className="w-auto h-full"></div>
        </div>
        {/* Left Side: Login Form */}
        <div className="relative max-w-md w-fit space-y-8 rounded-xl bg-white p-10 shadow-md ml-32">
          <div className="flex justify-center text-2xl font-bold text-gray-800">
            Get Verified
          </div>
          <p class="inline-flex text-center text-gray-500 text-base mb-8">
            A 4-digit code has been sent to your email or phone
          </p>
          <div className="flex text-sm mt-6">
            <span className="text-orange-400">
              {countdown > 0 ? (
                <p className="text-xs ">
                  Remaining Time{" "}
                  <span className="text-navblue">
                    {"\u00A0"}
                    {formatCountdown(countdown)}
                  </span>
                </p>
              ) : (
                <p className="text-xs ">
                  Time to enter OTP has expired. Click 'Resend OTP' to get a new
                  one.
                </p>
              )}
            </span>
          </div>
          <div class="flex justify-center gap-3 ">
            {Array.from({ length: 6 }).map((_, index) => (
              <input
                key={index}
                id="otp"
                type="text"
                onChange={(e) => handleOtpChange(e, index)}
                ref={(input) => (inputRefs.current[index] = input)}
                value={otpArray[index] || ""}
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && e.target.value === "") {
                    const previousSibling =
                      e.target.previousElementSibling ||
                      document.getElementById("resend-otp");
                    previousSibling && previousSibling.focus();
                  }
                }}
                maxLength="1"
                className="text-center appearance-none rounded-md relative block w-14 h-14 px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:ring-w-1 text-gray-700"
                style={{ backgroundColor: "rgba(243, 243, 245, 1)" }}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            class="inline-flex w-full justify-center px-4 py-2 bg-orange-500 text-white rounded-xl   mt-8"
          >
            Verify
          </button>
          <div class="flex justify-center text-gray-500">
            <span id="resend-otp">Didn't receive the code?</span>
            <p
              onClick={resendOtpHandler}
              href="#"
              className="text-orange-500 hover:underline cursor-pointer"
            >
              Resend
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtpVerification;
