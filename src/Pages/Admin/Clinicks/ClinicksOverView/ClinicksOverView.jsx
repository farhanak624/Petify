import React, { useEffect, useState } from "react";
import Card from "./Card";
import Barchart from "./Barchart";
import DropDown from "../../Dashboard/DropDown";
import Calendar from "./Calender";
import LineChart from "../../Dashboard/Charts/LineChart";
import BookingTable from "./BookingTable";
import "./calender.css";
import {
  blockClinic,
  getBookingAnalytics,
  getClinicStats,
  getLeaves,
  getVisitors,
  unblockClinic,
} from "../../../../Api/AdminApi";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadSpinner } from "../../../../Redux/Features/ClinicSlice";

const clinicsDashboard = () => {
  const dispatch=useDispatch();
  const clinic = useParams()?.id;
  const [data, setData] = useState({});
  const [bookingSelected, setBookingSelected] = useState("Yearly");
  const [visitorsFilter, setVisitorsFilter] = useState("Weekly");
  const [bookingFilter, setBookingFilter] = useState("Yearly");
  const [visitors, setVisitors] = useState({});
  const [booking, setBooking] = useState({});
  const [dates, setDates] = useState([]);
  const [change, setChange] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        dispatch(loadSpinner());
        const res = await getLeaves(clinic);
        setDates(res.data.leaveDates);
        dispatch(loadSpinner());
      } catch (error) {
        console.log(error);
        dispatch(loadSpinner());
      }
    })();
  }, []);
  const events = dates.map((date, index) => {
    date = new Date(date);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    const formattedDate = `${year}-${month}-${day}`;
    return {
      id: `event-${index + 1}`,
      color: "rgba(238, 81, 88, 0.2)",
      date: formattedDate,
    };
  });
  useEffect(() => {
    (async () => {
      try {
        const res = await getClinicStats(clinic);
        console.log(res.data?.response);
        setData(res.data?.response);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [change]);
  useEffect(() => {
    (async () => {
      try {
        const res = await getVisitors(visitorsFilter, clinic);
        setVisitors(res.data);
      } catch (error) {}
    })();
  }, [visitorsFilter]);
  useEffect(() => {
    (async () => {
      try {
        const res = await getBookingAnalytics(bookingFilter, clinic);
        setBooking(res.data);
      } catch (error) {}
    })();
  }, [bookingFilter]);
  const handleBlock = async () => {
    try {
      const res = await blockClinic(clinic);
      setChange(!change);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUnblock = async () => {
    try {
      const res = await unblockClinic(clinic);
      data.clinicData.adminVerifyStatus = "approved";
      setChange(!change);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-6">
      {data.serviceData?.length ? (
        <div>
          <h1 className="font-semibold text-xl mx-1 gap-4">
            Available Services
          </h1>
        </div>
      ) : (
        ""
      )}
      <div className="flex overflow-x-auto overflow-y-hidden">
        {data.serviceData?.map((service, index) => (
          <div key={index} className="cursor-pointer w-52 p-2">
            <Card
              color={"linear-gradient(321.77deg, #FE8EAB 0%, #FFBC96 100%)"}
              title={service.serviceName}
              total={service.totalBookings}
              status={service.totalBookings - service.lastweekBookings}
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-6 mb-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="shadow-md rounded-3xl overflow-x-auto p-3">
          <div className="m-3 mx-7 flex justify-between pt-3">
            <h1 className="font-semibold text-lg">Visitors</h1>
            <DropDown
              opt={["Yearly", "Monthly", "Weekly"]}
              selected={visitorsFilter}
              setselected={setVisitorsFilter}
            />
          </div>
          <Barchart visitors={visitors} />
        </div>
        <div className="shadow-md rounded-3xl p-3 flex flex-col md:flex-row">
          <div className="md:w-5/12">
            <img className="h-full p-2.5" src="/clinick2.png" alt="" />
          </div>
          <div className="my-auto md:w-7/12 p-2">
            <h1 className="font-semibold py-1.5 text-lg">
              {data.clinicData?.clinicName}
            </h1>
            <div className="flex mb-3">
              <svg
                width="12"
                height="18"
                viewBox="0 0 12 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.99998 0C2.707 0 0 2.56787 0 6.23075C0 7.53791 0.307898 8.44721 0.879804 9.4543L5.59613 17.762C5.63606 17.8341 5.69457 17.8942 5.76559 17.9361C5.8366 17.9779 5.91754 18 5.99998 18C6.08241 18 6.16335 17.9779 6.23437 17.9361C6.30539 17.8942 6.3639 17.8341 6.40382 17.762L11.1201 9.4543C11.6921 8.44719 12 7.53789 12 6.23075C12 2.56787 9.29296 0 5.99998 0ZM5.99998 3.23076C7.52938 3.23076 8.7692 4.47058 8.7692 5.99998C8.7692 7.52935 7.52938 8.7692 5.99998 8.7692C4.47058 8.7692 3.23076 7.52935 3.23076 5.99998C3.23076 4.47058 4.47058 3.23076 5.99998 3.23076Z"
                  fill="#B6B6B8"
                />
              </svg>
              <h3 className="text-gray-500 text-sm mx-1">
                {data.clinicData?.city}
              </h3>
            </div>
            <div className="w-full line-clamp-4">
              <p className="text-xs text-gray-400">
                {data.clinicData?.description}
              </p>
            </div>
            <div className="flex my-5">
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="15"
                  cy="15"
                  r="15"
                  fill="#F5895A"
                  fillOpacity="0.2"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12.7855 17.5124C13.6653 18.3921 14.6341 19.145 15.6749 19.7727C16.7252 20.4063 17.8498 20.9139 19.0312 21.298L21.298 19.0311L18.7949 16.5281L17.117 18.2058C17.0834 18.2395 17.0301 18.2478 16.9869 18.2231C15.9424 17.623 14.9908 16.9326 14.1626 16.124C13.3352 15.3163 12.6304 14.3897 12.0779 13.3164C12.051 13.2744 12.0559 13.2179 12.0925 13.1812L13.7705 11.5033L11.2675 9.00049L9.00049 11.2675C9.38472 12.4489 9.89239 13.5733 10.5259 14.6236C11.1537 15.6644 11.9059 16.6328 12.7855 17.5124Z"
                  fill="#F5895A"
                />
              </svg>
              <p className="px-1.5 pt-0.5">{data.clinicData?.phone}</p>
            </div>
            {data.clinicData?.adminVerifyStatus === "blocked" ? (
              <button
                className="w-full bg-[#F6884F] p-2 rounded-lg text-white mt-5"
                onClick={handleUnblock}
              >
                Unblock
              </button>
            ) : (
              <button
                className="w-full bg-[#F6884F] p-2 rounded-lg text-white mt-5"
                onClick={handleBlock}
              >
                Block
              </button>
            )}
          </div>
        </div>
        <div className="rounded-3xl overflow-x-auto p-3 pt-10 shadow-lg">
          <div className="flex items-end align-middle justify-center">
            <img src="/Svg Search Bar.svg" alt="" className="hidden md:block" />
            <Calendar events={events} />   
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 mb-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-2 shadow-md rounded-3xl p-3">
          <div className="m-3 mx-7 flex justify-between pt-3">
            <h1 className="font-semibold text-lg">Booking Analytics</h1>
            <DropDown
              opt={["Yearly", "Monthly", "Weekly"]}
              selected={bookingFilter}
              setselected={setBookingFilter}
            />
          </div>
          <LineChart bookingStats={booking} />
        </div>
        <div className="shadow-md rounded-3xl overflow-x-auto p-3">
          <div className="mx-7 flex justify-between pt-6">
            <h1 className="font-semibold text-lg">Latest Booking</h1>
            <DropDown
              opt={["Yearly", "Monthly", "Weekly"]}
              selected={bookingSelected}
              setselected={setBookingSelected}
            />
          </div>
          <BookingTable selected={bookingSelected} />
        </div>
      </div>
    </div>
  );
};

export default clinicsDashboard;
