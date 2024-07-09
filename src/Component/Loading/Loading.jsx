import React from "react";
import { useNavigate } from "react-router-dom";

function Loading({ text }) {
  const navigate = useNavigate();
  return (
    <div className="relative w-[100%] h-screen p-5 items-center flex border">
      <div
        style={{ backgroundColor: "rgba(243, 243, 245, 0.6)" }}
        className={`absolute top-[25%] border rounded-xl shadow left-[30%] w-[40%] border"
      } `}
      >
        <div className=" flex items-center justify-center p-4 w-full rounded-3xl h-[300px]">
          <div>
            <div className="flex items-center justify-center">
              <img src="/Loading (2).gif" className="h-40 w-32" alt="" />
            </div>
            <h1 className="text-center text-2xl font-semibold">
              Please wait...
            </h1>
            <p className="text-xs mt-3 text-gray-600">
              You will get the access to the page when admin approves your
              request.
            </p>
            <p
              onClick={() => {
                navigate("/login");
                localStorage.clear();
              }}
              className="text-xs mt-3 text-amber-500 text-center cursor-pointer hover:text-amber-700"
            >
              Back to login
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
