import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MobileNavbarClinic = ({ titles, setTitle, logout }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const links = ["/clinics/dashboard", "/clinics/service"];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="ml-auto p-4">
      <div className="ml-auto">
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="focus:outline-none text-white"
          >
            <svg
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
        <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
          <div
            className="fixed inset-0 bg-gray-800 bg-opacity-75 z-50"
            onClick={toggleMenu}
          ></div>
          <div
            className="fixed inset-y-25 right-0 max-w-xs w-full border border-gray-100 h-1/6 p-8 z-50 shadow-lg"
            style={{
              transition: "transform 3s ease-in-out",
              transform: isOpen ? "translateX(0)" : "translateX(100%)",
            }}
          >
            <ul className="space-y-4">
              {titles.map((title, i) => (
                <li
                  key={i}
                  className="block text-white font-medium hover:text-gray-800"
                  onClick={() => {
                    toggleMenu();
                    setTitle("Dashboard");
                    navigate(links[i]);
                  }}
                >
                  {title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MobileNavbarClinic;
