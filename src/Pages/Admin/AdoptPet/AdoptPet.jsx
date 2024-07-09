import React, { useState } from "react";
import PetTable from "./PetTable";
import InterestedPetTable from "./InterestedPetTable";
import NewPet from "./Modal/NewPet";

const AdoptPet = () => {
  const [showModal, setShowModal] = useState(false);
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <div>
      {showModal && <NewPet closeModal={closeModal} />}
      <div className="flex justify-between p-5">
        <p className="font-bold text-2xl">Pets</p>
        <button
          className="border-[#F5895A] border-2  font-bold py-2 px-4 rounded-xl text-[#F5895A] hover:bg-[#F5895A] hover:text-white transition duration-300 ease-in-out"
          onClick={() => setShowModal(true)}
        >
          Create New Pet
        </button>
      </div>
      <div className="p-5">
        <PetTable showModal={showModal} />
      </div>
      <div className="w-[60%] p-5">
        <div className="p-3">
          <p className="font-bold text-lg">Intrested Pets</p>
        </div>
        <InterestedPetTable />
      </div>
    </div>
  );
};

export default AdoptPet;
