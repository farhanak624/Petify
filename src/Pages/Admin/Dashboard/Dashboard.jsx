import React, { useEffect, useState } from "react";
import BarChart from "./Charts/BarChart";
import Card from "./Card";
import LineChart from "./Charts/LineChart";
import DropDown from "./DropDown";
import RequestTable from "./RequestTable";
import BookingTable from "./BookingTable";
import LostPetTable from "./LostPetTable";
import CommunityTable from "./CommunityTable";
import BlogTable from "./BlogTable";
import {
  clinicRequest,
  getAllStatistics,
  getLatestBookings,
  getbookingStats,
} from "../../../Api/AdminApi";
import { useDispatch } from "react-redux";
import { loadSpinner } from "../../../Redux/Features/ClinicSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("This Year");
  const [bookingSelected, setBookingSelected] = useState("Yearly");
  const [communitySelected, setCommunitySelected] = useState("All");
  const [blogSelected, setBlogSelected] = useState("All");
  const [allStatistics, setAllStatistics] = useState();
  const [bookingStats, setBookingStats] = useState({});

  useEffect(() => {
    getAllStatistic();
  }, []);
  async function getAllStatistic() {
    dispatch(loadSpinner());
    try {
      const res = await getAllStatistics();
      setAllStatistics(res.data.data);
      dispatch(loadSpinner());
    } catch (error) {
      console.log(error);
      dispatch(loadSpinner());
    }
  }
  useEffect(() => {
    (async () => {
      try {
        const res = await getbookingStats(selected);
        setBookingStats(res.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [selected]);
  console.log(bookingStats);
  return (
    <div className="mb-10">
      <div className="md:grid grid-cols-1 gap-4 space-y-3 md:space-y-0 md:grid-cols-6 m-10 ">
        <div
          className=" col-span-2 scroll-none overflow-x-auto"
          style={{ backgroundColor: "#F3F3FF" }}
        >
          <BarChart />
        </div>
        <div>
          <Card
            title={allStatistics?.TotalBookings}
            des={"Total Bookings"}
            height={"245px"}
            color={"linear-gradient(151.78deg, #FF905F 0.9%, #FFD1BC 100%)"}
            img={"/booking.png"}
          />
        </div>
        <div>
          <Card
            title={allStatistics?.totalLostPets}
            des={"Total Lost Pet"}
            height={"245px"}
            color={"linear-gradient(151.15deg, #687DFF 0%, #A2AEFF 100%)"}
            img={"/lost.png"}
          />
        </div>
        <div>
          <Card
            title={allStatistics?.totalClinics}
            des={"Total clinics"}
            height={"245px"}
            color={"linear-gradient(151.15deg, #FF8DC7 0%, #FFD2E9 100%)"}
            img={"/clinick.png"}
          />
        </div>
        <div>
          <Card
            title={allStatistics?.totalPets}
            des={"Pets"}
            height={"245px"}
            color={"linear-gradient(151.15deg, #59AA81 0%, #87FFC1 100%)"}
            img={"/pets.png"}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 mb-4 md:grid-cols-5 m-0 md:m-10 p-3">
        <div
          className=" col-span-3  shadow-md rounded-3xl"
          style={{ border: "0.01px solid rgba(0, 0, 0, 0.14)" }}
        >
          <div className="m-3 mx-7 flex justify-between pt-3">
            <h1 className="font-semibold text-lg">Booking Analytics</h1>
            <DropDown
              opt={["This Year", "Last Year"]}
              selected={selected}
              setselected={setSelected}
            />
          </div>
          <LineChart bookingStats={bookingStats} />
        </div>
        <RequestTable />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-5 mx-1 md:mx-10 p-3">
        <div
          className=" col-span-3 overflow-x-auto scroll-none shadow-md rounded-3xl"
          style={{ border: "0.01px solid rgba(0, 0, 0, 0.14)" }}
        >
          <div className=" mx-7 flex justify-between pt-6">
            <h1 className="font-semibold text-lg">Latest Booking </h1>
          </div>
          <BookingTable />
        </div>
        <div
          className=" col-span-2 overflow-x-auto scroll-none shadow-md rounded-3xl"
          style={{ border: "0.01px solid rgba(0, 0, 0, 0.14)" }}
        >
          <div className="m-3 mx-7">
            <h1 className="font-semibold text-lg pt-3">Recent Lost Pet </h1>
          </div>
          <LostPetTable />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-5 mx-1 md:mx-10 p-3">
        <div
          className=" col-span-3  shadow-md rounded-3xl"
          style={{ border: "0.01px solid rgba(0, 0, 0, 0.14)" }}
        >
          <div className=" mx-7 flex justify-between pt-6">
            <h1 className="font-semibold text-lg">Communities </h1>
            <DropDown
              opt={["All", "Most Members Group", "Inactive", "active"]}
              selected={communitySelected}
              setselected={setCommunitySelected}
            />
          </div>
          <CommunityTable selected={communitySelected} />
        </div>
        <div
          className=" col-span-2 shadow-md rounded-3xl"
          style={{ border: "0.01px solid rgba(0, 0, 0, 0.14)" }}
        >
          <div className="mx-7 flex justify-between pt-6">
            <h1 className="font-semibold text-lg pt-1">Blogs </h1>
            <DropDown
              opt={["All", "Recent", "Most Viewed"]}
              selected={blogSelected}
              setselected={setBlogSelected}
            />
          </div>
          <BlogTable selected={blogSelected} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
