import React, { useState, useRef, useEffect } from "react";
import { getAcceptedBooking } from "../../../../Api/ClinicApi";
import BookingOverview from "./BookingOverview";

const AcceptedBooking = ({ dates, setAcceptedFilter, acceptedFilter }) => {
  console.log(dates);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState({});

  const formatDateFromISOString = (isoString) => {
    let date = isoString ? new Date(isoString) : new Date();
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    return `${year}-${month}-${day}`;
  };

  const formatTimeFromISOString = (isoString) => {
    const date = new Date(isoString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12 || 12;
    const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
    const hoursStr = hours < 10 ? `0${hours}` : hours;
    return `${hoursStr}:${minutesStr} ${ampm}`;
  };

  const [date, setDate] = useState();
  const loader = useRef(null);

  useEffect(() => {
    setDate(formatDateFromISOString(dates));

    const isScrollRequired = () =>
      document.documentElement.scrollHeight > window.innerHeight;
    const options = { root: null, rootMargin: "20px", threshold: 0 };

    const observerCallback = (entities) => {
      const target = entities[0];
      const totalPages = Math.ceil(count / 10);
      if (target.isIntersecting && page < totalPages) {
        setPage((prev) => prev + 1);
      } else {
        setPage((prev) => Math.max(prev - 1, 1));
      }
    };

    const observer = new IntersectionObserver(observerCallback, options);

    const setupObserver = () => {
      if (loader.current && isScrollRequired()) {
        observer.observe(loader.current);
      } else {
        setTimeout(setupObserver, 500);
      }
    };

    setupObserver();

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [dates]);

  useEffect(() => {
    if (dates?.from && dates?.to) {
      setAcceptedFilter(!acceptedFilter);
      (async () => {
        try {
          let startDate = new Date(dates.from);
          let endDate = new Date(dates.to);
          console.log({ startDate, endDate });
          startDate.setDate(startDate.getDate() + 1);
          endDate.setDate(endDate.getDate() + 1);
          startDate = startDate.toISOString().split("T")[0];
          endDate = endDate.toISOString().split("T")[0];
          console.log({ startDate, endDate });
          const res = await getAcceptedBooking(startDate, endDate, page);
          setData(res.data.acceptedBookings);
          console.log(res);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [page, date, dates]);
  const handleClick = (item) => {
    setOpen(true);
    setSelectedBooking(item);
  };

  return (
    <>
      <div className="w-full bg-containerWhite px-3 rounded-lg scroll-none overflow-x-auto">
        <table className="w-full mt-4  text-nowrap">
          <thead className="bg-gray-100 h-12">
            <tr className="font-semibold text-sm text-center">
              <td>Booking Id</td>
              <td>Pet Name</td>
              <td>Service</td>
              <td>Booking Date</td>
              <td>Service On</td>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data?.map((item, index) => (
                <tr
                  key={index}
                  className="border-b text-sm text-gray-700 cursor-pointer hover:bg-gray-50"
                  onClick={() => handleClick(item)}
                >
                  <td className="p-4 underline">{item.bookingId}</td>
                  <td>{item.petName}</td>
                  <td className="p-4">{item.serviceName}</td>
                  <td className="p-4">
                    {formatDateFromISOString(item.requestedDate)}
                  </td>
                  <td className="flex flex-col items-end pr-5">
                    <p>{formatDateFromISOString(item.date)}</p>
                    <p>{formatTimeFromISOString(item.bookingTime)}</p>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-center text-red-700">
                <td colSpan="5" className="p-5">No Data Found</td>
              </tr>
            )}
          </tbody>
        </table>
        <div ref={loader} className="h-10" />
      </div>
      {open && (
        <BookingOverview
          setOpen={setOpen}
          booking={selectedBooking}
          isRequest={false}
          type={"accepted"}
        />
      )}
    </>
  );
};

export default AcceptedBooking;
