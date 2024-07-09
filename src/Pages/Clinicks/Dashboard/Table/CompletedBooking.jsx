import React, { useEffect, useState, useRef } from "react";
import { getCompletedBooking } from "../../../../Api/ClinicApi";
import BookingOverview from "./BookingOverview";

const CompletedBooking = ({ dates, completedFilter, setCompletedFilter }) => {
  console.log({ dates });
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState({});
  const loader = useRef(null);
  const formatDateFromISOString = (isoString) => {
    console.log({ isoString });
    let date;
    if (!isoString) {
      date = new Date();
    } else {
      date = new Date(isoString);
    }
    console.log({ isoDate: date });
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

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
    const hoursStr = hours < 10 ? `0${hours}` : hours;

    return `${hoursStr}:${minutesStr} ${ampm}`;
  };
  const [date, setDate] = useState();
  useEffect(() => {
    setDate(formatDateFromISOString(dates));

    // Function to check if the document height is greater than the viewport height
    const isScrollRequired = () => {
      return document.documentElement.scrollHeight > window.innerHeight;
    };

    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };

    const observerCallback = (entities) => {
      const target = entities[0];
      const totalPages = Math.ceil(count / 10);
      if (target.isIntersecting) {
        if (page < totalPages) {
          setPage((prev) => prev + 1);
        }
      } else {
        // If scrolling back and the loader is not intersecting, decrement page
        setPage((prev) => Math.max(prev - 1, 1)); // Ensure page doesn't go below 1
      }
    };

    const observer = new IntersectionObserver(observerCallback, options);

    // Setup observer if scrolling is required
    const setupObserver = () => {
      if (loader.current && isScrollRequired()) {
        observer.observe(loader.current);
      } else {
        // Use a timeout to retry after some time, in case content or images are still loading
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
    console.log({ from: dates?.from, to: dates?.to});
    if (dates?.from && dates?.to) {
      console.log(dates);
      setCompletedFilter(!completedFilter);
      (async () => {
        try {
          let startDate = new Date(dates.from);
          let endDate = new Date(dates.to);
          startDate = startDate.toISOString().split("T")[0];
          endDate = endDate.toISOString().split("T")[0];
          const res = await getCompletedBooking(startDate, endDate, page);
          setData(res.data.acceptedBookings);
          console.log(res);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [page, date, dates]);

  const handleClick = (booking) => {
    setSelectedBooking(booking);
    setOpen(true);
  };
  return (
    <>
      <div className="w-full bg-containerWhite px-3 rounded-lg scroll-none overflow-x-auto">
        {/* buttondiv */}

        {/* table */}
        <div className="overflow-x-auto">
          <table className="w-full md:text-center mt-4 text-nowrap">
            <thead
              className="rounded-3xl border"
              style={{
                backgroundColor: "rgba(242, 242, 242, 1)",
                height: "50px",
              }}
            >
              <tr className="font-semibold text-sm border">
                <td>Booking Id</td>
                <td>Pet Name</td>
                <td>Service</td>
                <td>Booking Date</td>
                <td>Service On</td>
              </tr>
            </thead>
            <tbody>
              {data?.length > 0 ?
              data?.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className="rounded-md border-b text-gray-700 text-sm border-b-gray-300 m-4"
                    onClick={() => handleClick(item)}
                  >
                    <td className="p-4 underline">{item.bookingId}</td>
                    <td>{item.petName}</td>
                    <td className="md:p-4 p-7">{item.serviceName}</td>
                    <td className="p-4">
                      {formatDateFromISOString(item.requestedDate)}
                    </td>
                    <td className="flex flex-col items-end pr-5">
                      <p>{formatDateFromISOString(item.date)}</p>
                      <p>{formatTimeFromISOString(item.bookingTime)}</p>
                    </td>
                  </tr>
                );
              }):(
                <tr>
                  <td colSpan="5" className="text-center p-5 text-red-700">No Data Found</td>
                </tr>
              
              )}
            </tbody>
          </table>
        </div>

        <div ref={loader} className="h-10" />
      </div>
      {open && <BookingOverview setOpen={setOpen} booking={selectedBooking} isRequest={false} type={'completed'}/>}
    </>
  );
};

export default CompletedBooking;
