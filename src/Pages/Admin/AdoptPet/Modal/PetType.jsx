import React, { useState } from "react";

const PetType = ({ petType, setPetType, setPetTypeDropdown }) => {
  const [Pet, setPet] = useState(["Dog", "Cat", "Fish", "Other"]);
  return (
    <div>
      <div className="bg-white w-52  rounded">
        <ul className="space-y-3 border rounded-xl p-3">
          {Pet?.map((pet, index) => {
            return (
              <li
                onClick={() => {
                  setPetType(pet);
                  setPetTypeDropdown(false);
                }}
                className="border-b-2 hover:bg-[#F5895A] hover:text-white p-1 rounded-lg cursor-pointer"
              >
                {pet}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default PetType;
