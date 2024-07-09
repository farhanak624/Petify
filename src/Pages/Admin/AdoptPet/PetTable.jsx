import React, { useEffect, useState } from "react";
import { getAdoption } from "../../../Api/AdminApi";
import { toast } from "react-toastify";
import { calculateAge } from "../../../Utils/Breeds";
import { useDispatch } from "react-redux";
import { loadSpinner } from "../../../Redux/Features/ClinicSlice";
import DetailedModal from "./Modal/DetailedModal";

const PetTable = ({showModal}) => {
  const dispatch = useDispatch();
  const [petList, setPetList] = useState([]);
  const [currency, setCurrency] = useState("");
  const [currentData, setCurrentData] = useState()
  const [showDetailed, setShowDetailed] = useState(false)

  useEffect(() => {
    fetchPets();
  }, [showModal]);

  const fetchPets = async () => {
    dispatch(loadSpinner());
    try {
      const response = await getAdoption();
      console.log(response?.data?.adoptions);
      setPetList(response?.data?.adoptions);
      setCurrency(response?.data?.currencyCode);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch pets");
    } finally {
      dispatch(loadSpinner());
    }
  };

  return (
    <div>
      {showDetailed && <DetailedModal petData={currentData} setShowDetailed={setShowDetailed} currency={currency} />}
      <div class="overflow-x-auto p-4 border rounded-xl h-[30rem]">
        <table class="min-w-full bg-white text-transform: capitalize">
          <thead className="rounded-lg ">
            <tr className="bg-[#F3F3FF] p-3">
              <th class="px-4 py-3 text-left rounded-s-lg ">Pet Name</th>
              <th class="px-4 py-3  text-left ">Pet Type</th>
              <th class="px-4 py-3 text-left ">Breed</th>
              <th class="px-4 py-3 text-left ">Gender</th>
              <th class="px-4 py-3 text-left ">Age</th>
              <th class="px-4 py-3 text-left ">Weight</th>
              <th class="px-4 py-3 text-left ">Height</th>
              <th class="px-4 py-3 text-left ">Contact</th>
              <th class="px-4 py-3 text-left ">Price</th>
              <th class="px-4 py-3 text-center rounded-e-lg ">Location</th>
            </tr>
          </thead>
          <tbody>
            {petList?.length > 0 ? (
              petList?.map((pet, index) => {
                return (
                  <tr
                    key={pet?._id}
                    class="border-b dark:border-zinc-700 text-xs"
                  >
                    <td class="px-4 py-5 flex items-center">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={pet?.image}
                        alt="Pet image"
                      />
                      <a
                        href="#"
                        onClick={()=>{
                          setCurrentData(pet)
                          setShowDetailed(true)
                        
                        }}
                        className="text-blue-700 ml-3 hover:underline"
                      >
                        {pet?.petName}
                      </a>
                    </td>
                    <td class="px-4 py-5">{pet?.petType}</td>
                    <td class="px-4 py-5">{pet?.breed}</td>
                    <td class="px-4 py-5">{pet?.gender}</td>
                    <td class="px-4 py-5">{calculateAge(pet?.birthday)}</td>
                    <td class="px-4 py-5">{pet?.weight} Kg</td>
                    <td class="px-4 py-5">{pet?.height} cm</td>
                    <td class="px-4 py-5">{pet?.phone}</td>
                    <td class="px-4 py-5">
                      {currency} {pet?.prize}
                    </td>
                    <td class="px-4 py-5 text-center text-wrap text-xs">
                      {pet?.location}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="10" className="text-center text-red-700 py-5">
                  No Pets
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PetTable;
