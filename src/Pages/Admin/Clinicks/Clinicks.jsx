import React, { useEffect, useState } from "react";
import Card from "./Card";
import DropDown from "../Dashboard/DropDown";
import BookingTable from "./ClinicksOverView/BookingTable";
import RequestTable from "../Dashboard/RequestTable";
import Table from "./Table";
import { useNavigate } from "react-router-dom";
import { getTopClinics } from "../../../Api/AdminApi";
import ClinicBookings from "./ClinicBookings";
import { useDispatch } from "react-redux";
import { loadSpinner } from "../../../Redux/Features/ClinicSlice";
//import clinicsDashboard from './clinicsDashboard/clinicsDashboard'

const clinics = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [bookingSelected, setBookingSelected] = useState("Yearly");
  const [topClinics, setTopClinics] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        dispatch(loadSpinner());
        const res = await getTopClinics();
        setTopClinics(res.data?.data);
        dispatch(loadSpinner());
      } catch (error) {
        console.log(error);
        dispatch(loadSpinner());
      }
    })();
  }, []);
  return (
    <div className="p-2.5 m-7">
      <div>
        <h1 className="font-semibold text-xl mx-1 ">Top 10 clinics</h1>
      </div>
      <div className="flex overflow-x-auto scroll-none space-x-4 py-6">
        {topClinics.map((clinic, index) => {
          return (
            <>
              <div
                key={index}
                onClick={() => {
                  navigate(`/clinicOverview/${clinic._id}`);
                }}
                className="cursor-pointer min-w-full md:min-w-[300px] grid-cols-1 space-y-3 mx-2"
              >
                <Card
                  img={clinic.image || "notfound.jpg"}
                  title={clinic.clinicName}
                  location={clinic.city}
                />
              </div>
            </>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
        <div
          className=" col-span-3 overflow-x-auto shadow-md rounded-3xl"
          style={{ border: "0.01px solid rgba(0, 0, 0, 0.14)" }}
        >
          <div className=" mx-7 flex justify-between pt-6">
            <h1 className="font-semibold text-lg">Bookings </h1>
            <DropDown
              opt={["Yearly", "Monthly", "Weekly"]}
              selected={bookingSelected}
              setselected={setBookingSelected}
            />
          </div>
          <ClinicBookings selected={bookingSelected} />
        </div>
        <div
          className=" md:col-span-2 col-span-3 shadow-md rounded-3xl"
          style={{ border: "0.01px solid rgba(0, 0, 0, 0.14)" }}
        >
          <Table />
        </div>
      </div>
    </div>
  );
};

export default clinics;
