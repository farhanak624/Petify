import React, { useEffect } from "react";

const ViewImage = ({ image, onClose }) => {
  useEffect(() => {
    if (!image) {
      onClose();
    }
  }, [image, onClose]);

  if (!image) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-80 overflow-y-auto z-30">
      <div className="flex items-center justify-center min-h-screen w-full p-4">
        <div className="bg-white rounded-lg w-full max-w-2xl shadow-lg">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg md:text-xl font-semibold">{image.title}</h2>
            <button className="text-red-500" onClick={onClose}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
          <div className="p-4">
            <img
              src={image.image}
              alt={image.title}
              className="w-full h-auto max-h-[70vh] object-cover rounded-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewImage;
