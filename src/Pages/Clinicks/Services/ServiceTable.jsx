import React, { useState } from "react";
import ServiceModal from "../../../Component/Modal/ServiceModal";

const ServiceTable = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
        {
            showModal && <ServiceModal/>
        }
      <div class="overflow-x-auto p-4 border rounded-xl h-[30rem]">
        <div className="flex justify-between p-5">
          <p className="font-bold text-xl">Pets</p>
          <button
            className="border-[#F5895A] border-2  font-bold py-2 px-4 rounded-xl text-[#F5895A] hover:bg-[#F5895A] hover:text-white transition duration-300 ease-in-out"
            onClick={() => setShowModal(true)}
          >
            Create New Sub Service
          </button>
        </div>
        <table class="min-w-full bg-white text-transform: capitalize">
          <thead className="rounded-lg ">
            <tr className="bg-[#F3F3FF] p-3">
              <th class="px-4 py-3 text-left rounded-s-lg ">Service Name</th>
              <th class="px-4 py-3  text-left ">Price</th>
              <th class="px-4 py-3 text-left ">Service Time</th>
              <th class="px-4 py-3 text-left ">Pet Type</th>
              <th class="px-4 py-3 text-center rounded-e-lg ">Service type</th>
            </tr>
          </thead>
          <tbody>
            {/* {petList?.length > 0 ? (
              petList?.map((pet, index) => {
                return ( */}
            <tr
              // key={pet?._id}
              class="border-b dark:border-zinc-700 text-xs"
            >
              <td class="px-4 py-5">asd</td>
              <td class="px-4 py-5">asd Kg</td>
              <td class="px-4 py-5">asd cm</td>
              <td class="px-4 py-5">asd</td>
              <td class="px-4 py-5 text-center text-wrap text-xs">asd</td>
            </tr>
            {/* );
              })
            ) : ( */}
            {/* <tr>
                <td colSpan="10" className="text-center text-red-700 py-5">
                  No Pets
                </td>
              </tr> */}
            {/* )} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceTable;
