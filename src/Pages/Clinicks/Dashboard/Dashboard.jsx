import React, { useEffect, useState } from "react";
import AreaChart from "./AreaChart";
import Card from "../../Admin/Dashboard/Card";
import ServiceTable from "./Table/ServiceTable";
import BookingRequestTable from "./Table/BookingRequestTable";
import Datepicker from "./Datepicker";
import AcceptedBooking from "./Table/AcceptedBooking";
import CompletedBooking from "./Table/CompletedBooking";
import DropDown from "../../Admin/Dashboard/DropDown";
import { getBookingRequest, getDashboardData } from "../../../Api/ClinicApi";
import { loadSpinner } from "../../../Redux/Features/ClinicSlice";
import { useDispatch } from "react-redux";

const Dashboard = () => {
  const [selected, setselected] = useState("This Year");
  const [data, setdata] = useState({});
  const [acceptedDate, setAcceptedDate] = useState();
  const [completedDate, setCompletedDate] = useState();
  const [bookingRequestDate, setBookingRequestDate] = useState();
  const [bookingFilter, setBookingFilter] = useState(false);
  const [acceptedFilter, setAcceptedFilter] = useState(false);
  const [completedFilter, setCompletedFilter] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadSpinner());
    getDashboardData(selected)
      .then((res) => {
        setdata(res.data);
      })
      .catch((err) => {
        // dispatch(loadSpinner());
        console.log(err);
      })
      .finally(() => {
        dispatch(loadSpinner());
      });
  }, [selected]);
  console.log({ completedDate });

  return (
    <div>
      <div className="pt-2 grid grid-cols-1 gap-4 lg:grid-cols-6 md:grid-cols-6 md:gap-6 m-5">
        <div className="lg:col-span-2 md:col-span-6 w-full">
          <div className="z-50 right-0 top-2 flex w-full">
            <h1 className="left-0 font-semibold text-xl">Booking Analytics</h1>
            <DropDown
              opt={["This Year", "Last Year"]}
              selected={selected}
              setselected={setselected}
            />
          </div>
          <div className="">
            <AreaChart
              months={data.months}
              bookedData={data.bookedData}
              cancelledData={data.cancelledData}
            />
          </div>
        </div>
        <div>
          <Card
            title={data.totalBookings || 0}
            des={"Total Appointments"}
            height={"285px"}
            color={"linear-gradient(151.78deg, #FF905F 0.9%, #FFD1BC 100%)"}
            img={"/calender.png"}
          />
        </div>
        <div>
          <Card
            title={data.totalPendingBookings || 0}
            des={"Pending Appointments"}
            color={"linear-gradient(151.15deg, #687DFF 0%, #A2AEFF 100%)"}
            img={"/pending.png"}
          />
        </div>
        <div>
          <Card
            title={data.totalCompletedBookings || 0}
            des={"Completed Appointments"}
            color={"linear-gradient(151.15deg, #FF8DC7 0%, #FFD2E9 100%)"}
            img={"/completed.png"}
          />
        </div>
        <div>
          <Card
            title={data.totalRejectedBookings || 0}
            des={"Total Cancelled Bookings"}
            color={"linear-gradient(151.15deg, #59AA81 0%, #87FFC1 100%)"}
            img={"/Cancelled.png"}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-6 m-5">
        <div
          className=" col-span-3 scroll-none overflow-x-auto shadow-md rounded-3xl"
          style={{ border: "0.01px solid rgba(0, 0, 0, 0.14)" }}
        >
          <div className=" mx-4 flex justify-between pt-4">
            <h1 className="font-semibold text-lg">Top 5 Services </h1>
          </div>
          <ServiceTable />
        </div>
        <div
          className=" col-span-3 shadow-md rounded-3xl min-h-[24rem]"
          style={{ border: "0.01px solid rgba(0, 0, 0, 0.14)" }}
        >
          <div className={`flex justify-between mx-4 relative`}>
            <h1 className="font-semibold text-lg pt-3">Booking Request</h1>
            <div
              className="mt-5 mr-2 cursor-pointer"
              onClick={() => setBookingFilter(!bookingFilter)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.18681 2.08316H2.39512C2.68677 2.08316 2.91591 1.85402 2.91591 1.56237V0.520791C2.91591 0.229148 2.68677 0 2.39512 0H2.18681C1.89516 0 1.66602 0.229148 1.66602 0.520791V1.56237C1.66602 1.85402 1.89516 2.08316 2.18681 2.08316Z"
                  fill="black"
                />
                <path
                  d="M4.89555 2.08316H5.10386C5.39551 2.08316 5.62465 1.85402 5.62465 1.56237V0.520791C5.62465 0.229148 5.39551 0 5.10386 0H4.89555C4.6039 0 4.37476 0.229148 4.37476 0.520791V1.56237C4.37476 1.85402 4.6039 2.08316 4.89555 2.08316Z"
                  fill="black"
                />
                <path
                  d="M7.60404 2.08316H7.81236C8.104 2.08316 8.33315 1.85402 8.33315 1.56237V0.520791C8.33315 0.229148 8.104 0 7.81236 0H7.60404C7.3124 0 7.08325 0.229148 7.08325 0.520791V1.56237C7.08325 1.85402 7.3124 2.08316 7.60404 2.08316Z"
                  fill="black"
                />
                <path
                  d="M0 8.95853C0 9.54181 0.479128 10.0001 1.04158 10.0001H8.12434V8.33358C8.12434 8.27108 8.14517 8.22942 8.18683 8.18776C8.2285 8.14609 8.27016 8.12526 8.33265 8.12526H9.99919V3.33398H0V8.95853ZM7.08276 4.37557H7.91602V4.7922H7.08276V4.37557ZM7.08276 5.62546H7.91602V6.0421H7.08276V5.62546ZM7.08276 6.87536H7.91602V7.292H7.08276V6.87536ZM5.41623 4.37557H6.24949V4.7922H5.41623V4.37557ZM5.41623 5.62546H6.24949V6.0421H5.41623V5.62546ZM5.41623 6.87536H6.24949V7.292H5.41623V6.87536ZM5.41623 8.12526H6.24949V8.54189H5.41623V8.12526ZM3.74969 4.37557H4.58296V4.7922H3.74969V4.37557ZM3.74969 5.62546H4.58296V6.0421H3.74969V5.62546ZM3.74969 6.87536H4.58296V7.292H3.74969V6.87536ZM3.74969 8.12526H4.58296V8.54189H3.74969V8.12526ZM2.08316 4.37557H2.91643V4.7922H2.08316V4.37557ZM2.08316 5.62546H2.91643V6.0421H2.08316V5.62546ZM2.08316 6.87536H2.91643V7.292H2.08316V6.87536ZM2.08316 8.12526H2.91643V8.54189H2.08316V8.12526Z"
                  fill="black"
                />
                <path
                  d="M8.54077 9.87424L9.874 8.54102H8.54077V9.87424Z"
                  fill="black"
                />
                <path
                  d="M9.37424 0.834961H8.74929V1.56407C8.74929 2.08486 8.33265 2.50149 7.81186 2.50149H7.60355C7.08276 2.50149 6.66612 2.08486 6.66612 1.56407V0.834961H6.04117V1.56407C6.04117 2.08486 5.62454 2.50149 5.10375 2.50149H4.89543C4.37464 2.50149 3.95801 2.08486 3.95801 1.56407V0.834961H3.33306V1.56407C3.33306 2.08486 2.91643 2.50149 2.39564 2.50149H2.18732C1.66653 2.50149 1.2499 2.08486 1.2499 1.56407V0.834961H0.624949C0.291643 0.834961 0 1.10577 0 1.45991V2.91812H9.99919V1.45991C9.99919 1.10577 9.72837 0.834961 9.37424 0.834961Z"
                  fill="black"
                />
              </svg>
            </div>

            <div
              className={`absolute right-0 top-10 ${
                bookingFilter ? "flex" : "hidden"
              }`}
            >
              <Datepicker fn={(newDate) => setBookingRequestDate(newDate)} />
            </div>
          </div>
          <BookingRequestTable dates={bookingRequestDate} />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-6 mx-5">
        <div
          className=" col-span-3 scroll-none overflow-x-auto shadow-md rounded-3xl min-h-[30rem]"
          style={{ border: "0.01px solid rgba(0, 0, 0, 0.14)" }}
        >
          <div className="flex justify-between m-4 h-5 relative">
            <h1 className="font-semibold text-lg pt-3">Accepted Booking</h1>
            <div
              className="mt-5 mr-2 cursor-pointer"
              onClick={() => setAcceptedFilter(!acceptedFilter)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.18681 2.08316H2.39512C2.68677 2.08316 2.91591 1.85402 2.91591 1.56237V0.520791C2.91591 0.229148 2.68677 0 2.39512 0H2.18681C1.89516 0 1.66602 0.229148 1.66602 0.520791V1.56237C1.66602 1.85402 1.89516 2.08316 2.18681 2.08316Z"
                  fill="black"
                />
                <path
                  d="M4.89555 2.08316H5.10386C5.39551 2.08316 5.62465 1.85402 5.62465 1.56237V0.520791C5.62465 0.229148 5.39551 0 5.10386 0H4.89555C4.6039 0 4.37476 0.229148 4.37476 0.520791V1.56237C4.37476 1.85402 4.6039 2.08316 4.89555 2.08316Z"
                  fill="black"
                />
                <path
                  d="M7.60404 2.08316H7.81236C8.104 2.08316 8.33315 1.85402 8.33315 1.56237V0.520791C8.33315 0.229148 8.104 0 7.81236 0H7.60404C7.3124 0 7.08325 0.229148 7.08325 0.520791V1.56237C7.08325 1.85402 7.3124 2.08316 7.60404 2.08316Z"
                  fill="black"
                />
                <path
                  d="M0 8.95853C0 9.54181 0.479128 10.0001 1.04158 10.0001H8.12434V8.33358C8.12434 8.27108 8.14517 8.22942 8.18683 8.18776C8.2285 8.14609 8.27016 8.12526 8.33265 8.12526H9.99919V3.33398H0V8.95853ZM7.08276 4.37557H7.91602V4.7922H7.08276V4.37557ZM7.08276 5.62546H7.91602V6.0421H7.08276V5.62546ZM7.08276 6.87536H7.91602V7.292H7.08276V6.87536ZM5.41623 4.37557H6.24949V4.7922H5.41623V4.37557ZM5.41623 5.62546H6.24949V6.0421H5.41623V5.62546ZM5.41623 6.87536H6.24949V7.292H5.41623V6.87536ZM5.41623 8.12526H6.24949V8.54189H5.41623V8.12526ZM3.74969 4.37557H4.58296V4.7922H3.74969V4.37557ZM3.74969 5.62546H4.58296V6.0421H3.74969V5.62546ZM3.74969 6.87536H4.58296V7.292H3.74969V6.87536ZM3.74969 8.12526H4.58296V8.54189H3.74969V8.12526ZM2.08316 4.37557H2.91643V4.7922H2.08316V4.37557ZM2.08316 5.62546H2.91643V6.0421H2.08316V5.62546ZM2.08316 6.87536H2.91643V7.292H2.08316V6.87536ZM2.08316 8.12526H2.91643V8.54189H2.08316V8.12526Z"
                  fill="black"
                />
                <path
                  d="M8.54077 9.87424L9.874 8.54102H8.54077V9.87424Z"
                  fill="black"
                />
                <path
                  d="M9.37424 0.834961H8.74929V1.56407C8.74929 2.08486 8.33265 2.50149 7.81186 2.50149H7.60355C7.08276 2.50149 6.66612 2.08486 6.66612 1.56407V0.834961H6.04117V1.56407C6.04117 2.08486 5.62454 2.50149 5.10375 2.50149H4.89543C4.37464 2.50149 3.95801 2.08486 3.95801 1.56407V0.834961H3.33306V1.56407C3.33306 2.08486 2.91643 2.50149 2.39564 2.50149H2.18732C1.66653 2.50149 1.2499 2.08486 1.2499 1.56407V0.834961H0.624949C0.291643 0.834961 0 1.10577 0 1.45991V2.91812H9.99919V1.45991C9.99919 1.10577 9.72837 0.834961 9.37424 0.834961Z"
                  fill="black"
                />
              </svg>
            </div>
            <div
              className={`absolute top-10 right-0 ${
                acceptedFilter ? "flex" : "hidden"
              }`}
            >
              <Datepicker fn={(newDate) => setAcceptedDate(newDate)} />
            </div>
          </div>
          <AcceptedBooking
            dates={acceptedDate}
            setAcceptedFilter={setAcceptedFilter}
            acceptedFilter={acceptedFilter}
          />
        </div>
        <div
          className=" col-span-3 shadow-md rounded-3xl"
          style={{ border: "0.01px solid rgba(0, 0, 0, 0.14)" }}
        >
          <div className="flex justify-between m-4 h-5 relative">
            <h1 className="font-semibold text-lg pt-3">Completed Booking</h1>
            <div
              className="mt-5 mr-2 cursor-pointer"
              onClick={() => setCompletedFilter(!completedFilter)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 10 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.18681 2.08316H2.39512C2.68677 2.08316 2.91591 1.85402 2.91591 1.56237V0.520791C2.91591 0.229148 2.68677 0 2.39512 0H2.18681C1.89516 0 1.66602 0.229148 1.66602 0.520791V1.56237C1.66602 1.85402 1.89516 2.08316 2.18681 2.08316Z"
                  fill="black"
                />
                <path
                  d="M4.89555 2.08316H5.10386C5.39551 2.08316 5.62465 1.85402 5.62465 1.56237V0.520791C5.62465 0.229148 5.39551 0 5.10386 0H4.89555C4.6039 0 4.37476 0.229148 4.37476 0.520791V1.56237C4.37476 1.85402 4.6039 2.08316 4.89555 2.08316Z"
                  fill="black"
                />
                <path
                  d="M7.60404 2.08316H7.81236C8.104 2.08316 8.33315 1.85402 8.33315 1.56237V0.520791C8.33315 0.229148 8.104 0 7.81236 0H7.60404C7.3124 0 7.08325 0.229148 7.08325 0.520791V1.56237C7.08325 1.85402 7.3124 2.08316 7.60404 2.08316Z"
                  fill="black"
                />
                <path
                  d="M0 8.95853C0 9.54181 0.479128 10.0001 1.04158 10.0001H8.12434V8.33358C8.12434 8.27108 8.14517 8.22942 8.18683 8.18776C8.2285 8.14609 8.27016 8.12526 8.33265 8.12526H9.99919V3.33398H0V8.95853ZM7.08276 4.37557H7.91602V4.7922H7.08276V4.37557ZM7.08276 5.62546H7.91602V6.0421H7.08276V5.62546ZM7.08276 6.87536H7.91602V7.292H7.08276V6.87536ZM5.41623 4.37557H6.24949V4.7922H5.41623V4.37557ZM5.41623 5.62546H6.24949V6.0421H5.41623V5.62546ZM5.41623 6.87536H6.24949V7.292H5.41623V6.87536ZM5.41623 8.12526H6.24949V8.54189H5.41623V8.12526ZM3.74969 4.37557H4.58296V4.7922H3.74969V4.37557ZM3.74969 5.62546H4.58296V6.0421H3.74969V5.62546ZM3.74969 6.87536H4.58296V7.292H3.74969V6.87536ZM3.74969 8.12526H4.58296V8.54189H3.74969V8.12526ZM2.08316 4.37557H2.91643V4.7922H2.08316V4.37557ZM2.08316 5.62546H2.91643V6.0421H2.08316V5.62546ZM2.08316 6.87536H2.91643V7.292H2.08316V6.87536ZM2.08316 8.12526H2.91643V8.54189H2.08316V8.12526Z"
                  fill="black"
                />
                <path
                  d="M8.54077 9.87424L9.874 8.54102H8.54077V9.87424Z"
                  fill="black"
                />
                <path
                  d="M9.37424 0.834961H8.74929V1.56407C8.74929 2.08486 8.33265 2.50149 7.81186 2.50149H7.60355C7.08276 2.50149 6.66612 2.08486 6.66612 1.56407V0.834961H6.04117V1.56407C6.04117 2.08486 5.62454 2.50149 5.10375 2.50149H4.89543C4.37464 2.50149 3.95801 2.08486 3.95801 1.56407V0.834961H3.33306V1.56407C3.33306 2.08486 2.91643 2.50149 2.39564 2.50149H2.18732C1.66653 2.50149 1.2499 2.08486 1.2499 1.56407V0.834961H0.624949C0.291643 0.834961 0 1.10577 0 1.45991V2.91812H9.99919V1.45991C9.99919 1.10577 9.72837 0.834961 9.37424 0.834961Z"
                  fill="black"
                />
              </svg>
            </div>
            <div
              className={`absolute top-10 right-0 ${
                completedFilter ? "flex" : "hidden"
              }`}
            >
              <Datepicker fn={(newDate) => setCompletedDate(newDate)} />
            </div>
          </div>
          <CompletedBooking
            dates={completedDate}
            completedFilter={completedFilter}
            setCompletedFilter={setCompletedFilter}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
