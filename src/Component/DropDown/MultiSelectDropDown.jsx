import React, { useEffect, useRef, useState } from "react";

const MultiSelectDropDown = () => {
  const dropdownRef = useRef(null);
  const [selectedValues, setSelectedValues] = useState([]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="w-full">
      <div className="">
        <div
          onClick={() => {
            //   console.log("hello");
            //   setShowDropdown(true);
            //   setOptionlist(countryData);
          }}
          className="rounded-lg shadow shadow-black/20 outline-none  border-none flex flex-wrap mb-3 px-2 py-2"
        >
          {" "}
          <div className="flex items-center justify-between w-full">
            <p className="text-slate-400">Pet services</p>
            <svg
              width="18"
              height="10"
              viewBox="0 0 18 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.91517 10C8.66739 10 8.42995 9.90026 8.2565 9.72326L0.263598 1.56782C-0.0929493 1.20407 -0.087038 0.62015 0.276742 0.263634C0.64049 -0.0928509 1.22444 -0.0870024 1.58093 0.276777L8.91517 7.76016L16.2494 0.276777C16.6059 -0.0870339 17.1898 -0.0929767 17.5536 0.263634C17.9174 0.620181 17.9233 1.20407 17.5667 1.56782L9.57383 9.72326C9.40038 9.90026 9.16298 10 8.91517 10Z"
                fill="black"
                fill-opacity="0.5"
              />
            </svg>
          </div>
          <div
            // key={value}
            className="bg-[#F5895A] rounded-md flex text-nowrap items-center px-2 py-1 mr-2 text-white"
          >
            {/* {value} */}
            <button
              type="button"
              //   onClick={() => handleRemove(value, index)}
              className="ml-1 focus:outline-none w-full "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div
            className=" w-full bg-transparent h-32 overflow-y-auto rounded-lg shadow-md mt-1 overflow-hidden mb-3"
            // ref={dropdownRef}
          >
            <ul className="py-1">
              <li
                //   key={option?.code}
                //   onClick={() => handleSelectionChange(option, index)}
                className={`px-4 py-2 cursor-pointer border rounded-lg text-nowrap hover:bg-gray-500 transition duration-300 ease-in-out ${"bg-gray-200"}`}
              >
                Pert
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiSelectDropDown;
