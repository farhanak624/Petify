import React, { useEffect, useMemo, useState } from "react";
import { BreedsList } from "../../../../Utils/Breeds";
import { set } from "lodash";

const Breed = ({ breedDropDown, setBreedDropDown, breed, setBreed }) => {
  const [searchKey, setSearchKey] = useState("");
  const [showAll, setShowAll] = useState(false);
  const filteredBreeds = useMemo(() => {
    if (showAll || searchKey === "") {
      return BreedsList;
    }

    const lowerSearchKey = searchKey.toLowerCase();
    return BreedsList.filter((breed) =>
      breed.toLowerCase().startsWith(lowerSearchKey)
    );
  }, [searchKey, showAll]);
  return (
    <div className="z-30 fixed">
      <div className="bg-white w-52  rounded h-[25rem]">
        <div>
          <input
            type="text"
            value={searchKey}
            onChange={(e) => {
              setSearchKey(e.target.value);
              setShowAll(false);
            }}
            onFocus={() => setShowAll(true)}
            placeholder="Search breed..."
            className="border-2 border-gray-300 p-2 rounded-lg w-full"
          />
        </div>
        <ul
          style={{ scrollbarWidth: "none" }}
          className="space-y-3 border rounded-xl p-3 h-60 overflow-y-auto"
        >
          {filteredBreeds.length > 0 ? (
            filteredBreeds.map((breed, index) => {
              return (
                <li
                  onClick={() => {
                    setBreedDropDown(false);
                    setBreed(breed);
                  }}
                  className="border-b-2 hover:bg-[#F5895A] hover:text-white p-1 rounded-lg cursor-pointer"
                >
                  {breed}
                </li>
              );
            })
          ) : (
            <p>No data</p>
          )}

          <li className="border-b-2 hover:bg-[#F5895A] hover:text-white p-1 rounded-lg cursor-pointer">
            Other
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Breed;
