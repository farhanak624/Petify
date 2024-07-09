import React from "react";
import { useSelector } from "react-redux";

const LoadingSpinner = () => {
  const spinnerLoader = useSelector((state) => state.clinic.spinnerLoader);
  if (!spinnerLoader) return null;
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="flex justify-center">
          <svg class="loader" width="240" height="240" viewBox="0 0 240 240">
            <circle
              class="loader-ring loader-ring-a"
              cx="120"
              cy="120"
              r="105"
              fill="none"
              stroke="#000"
              stroke-width="20"
              stroke-dasharray="0 660"
              stroke-dashoffset="-330"
              stroke-linecap="round"
            ></circle>
            <circle
              class="loader-ring loader-ring-b"
              cx="120"
              cy="120"
              r="35"
              fill="none"
              stroke="#000"
              stroke-width="20"
              stroke-dasharray="0 220"
              stroke-dashoffset="-110"
              stroke-linecap="round"
            ></circle>
            <circle
              class="loader-ring loader-ring-c"
              cx="85"
              cy="120"
              r="70"
              fill="none"
              stroke="#000"
              stroke-width="20"
              stroke-dasharray="0 440"
              stroke-linecap="round"
            ></circle>
            <circle
              class="loader-ring loader-ring-d"
              cx="155"
              cy="120"
              r="70"
              fill="none"
              stroke="#000"
              stroke-width="20"
              stroke-dasharray="0 440"
              stroke-linecap="round"
            ></circle>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
