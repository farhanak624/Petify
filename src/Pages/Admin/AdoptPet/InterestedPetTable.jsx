import React, { useEffect, useState } from "react";
import { getInterests } from "../../../Api/AdminApi";

const InterestedPetTable = () => {
  const [interestList, setInterestList] = useState([]);

  useEffect(() => {
    getInterestList();
  }, []);
  // console.log("afagaf");
  const getInterestList = async () => {
    console.log("sdidsfsddfd");
    try {
      console.log("afafa");
      const response = await getInterests();
      console.log(response?.data?.adoptionInterests);
      setInterestList(response?.data?.adoptionInterests);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div class="overflow-x-auto p-4 border rounded-xl h-[30rem]">
        <table class="min-w-full bg-white ">
          <thead className="rounded-lg ">
            <tr className="bg-[#F3F3FF] p-3">
              <th class="px-4 py-3 text-left rounded-s-lg ">Pet Name</th>
              <th class="px-4 py-3  text-left">Interested Person</th>
              <th class="px-4 py-3 text-left">Interested Date</th>
              <th class="px-4 py-3 text-left rounded-e-lg">Contact No</th>
            </tr>
          </thead>
          <tbody>
            {interestList.length > 0 ? (
              interestList?.map((pet, index) => {
                return (
                  <tr class="border-b dark:border-zinc-700">
                    <td class="px-4 py-5 flex items-center">
                      <img
                        src={pet?.image}
                        className="w-10 h-10 rounded-full mr-2"
                        alt="Pet image"
                      />
                      <a href="#" class="text-blue-500 hover:underline">
                        {pet?.petName}
                      </a>
                    </td>
                    <td class="px-4 py-5 ">
                      <div className="flex">
                        <img
                          className="w-10 h-10 rounded-full mr-2"
                          src={
                            pet?.intrestedBy?.user?.petShopUserDetails?.profile
                          }
                          alt="Pet image"
                        />
                        <a
                          href="#"
                          class="text-blue-500 inline-flex items-center hover:underline"
                        >
                          {pet?.intrestedBy?.user?.name}
                        </a>
                      </div>
                    </td>
                    <td class="px-4 py-5">
                      {pet?.intrestedBy?.user?.phoneNumber}
                    </td>
                    <td class="px-4 py-5 ">{pet?.gender}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InterestedPetTable;
