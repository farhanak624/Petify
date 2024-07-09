import React, { useState } from "react";

const Gender = ({ gender, setGender, genderDropDown, setGenderDropDown }) => {
  const [genderList, setGenderList] = useState(["Male", "Female", "Other"]);
  return (
    <div>
      <div className="bg-white w-52  rounded">
        <ul className="space-y-3 border rounded-xl p-3">
          {genderList.map((gender) => {
            return (
              <li
                onClick={() => {
                  setGender(gender);
                  setGenderDropDown(false);
                }}
                className="border-b-2 hover:bg-[#F5895A] hover:text-white p-1 rounded-lg cursor-pointer"
              >
                {gender}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Gender;
