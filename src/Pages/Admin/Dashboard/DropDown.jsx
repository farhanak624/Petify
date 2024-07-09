import React, { useState } from "react";

const DropDown = ({ opt, setselected, selected }) => {
  const [dropdown, setdropdown] = useState(false);
  return (
    <div
      className="p-1 mb-4 w-28 ml-auto relative flex justify-center min-w-[14%] items-center rounded-3xl"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}
      onClick={() => setdropdown(!dropdown)}
    >
      <p className="px-2 cursor-pointer hover:text-gray-900">{selected}</p>

      <svg
        width="10"
        height="6"
        viewBox="0 0 10 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.375076 1.70711L3.96086 5.29289C4.35139 5.68342 4.98455 5.68342 5.37508 5.29289L8.96086 1.70711C9.59083 1.07714 9.14466 0 8.25376 0H1.08218C0.191278 0 -0.254888 1.07714 0.375076 1.70711Z"
          fill="black"
        />
      </svg>

      {dropdown && (
        <ul className="absolute hover:cursor-pointer text-nowrap bg-white border border-gray-200 top-9 w-fit p-2 text-black rounded-xl left-0 z-40 ">
          {opt.map((li, i) => (
            <>
              <li
                className="p-2 z-50 flex justify-center hover:bg-gray-300 rounded-xl text-sm"
                onClick={() => setselected(li)}
              >
                {li}
              </li>
              <div className="absolutes w-20 border border-slate-300"></div>
            </>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDown;
