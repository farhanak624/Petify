import React from "react";
import { acceptBooking, rejectBooking } from "../../../../Api/ClinicApi";
import { toast } from 'react-toastify'; // Make sure to import toast for error handling

const BookingOverview = ({ setOpen, booking, isRequest, setChange, type }) => {
  console.log(booking);
  const handleAccept = async () => {
    try {
      const res = await acceptBooking(booking);
      setOpen(false);
      setChange((prev) => !prev);
    } catch (e) {
      toast.error("Something went wrong");
    }
  };

  const handleReject = async () => {
    try {
      const res = await rejectBooking(booking);
      setOpen(false);
      setChange((prev) => !prev);
    } catch (e) {
      toast.error("Something went wrong");
    }
  };

  const formatDateTo12Hour = (dateString) => {
    const date = new Date(dateString);
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const minutesStr = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] overflow-y-auto scroll-none h-full w-full flex justify-center items-center p-2 z-40">
      <div className="bg-slate-50 p-5 rounded-md w-full max-w-4xl">
        <div className="relative">
          <div className="w-full h-44 bg-[#F5895A] rounded-xl p-5">
            <p className="text-white text-xl font-medium">Booking Details</p>
            <div className="flex mt-3 items-center h-24">
              <img src={booking?.petImage} alt="" className="w-24 h-24 rounded-lg object-cover" />
              <div className="ml-5">
                <p className="text-white text-4xl font-semibold">#{booking.bookingId?.slice(-10)}</p>
                <p className="text-white">#Booking Id</p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-5 right-5">
            <div className="flex">
              <button
                className="px-7 py-2 bg-white rounded-md font-medium"
                onClick={handleAccept}
                disabled={isRequest ? false : true}
              >
                {type === 'accepted' ? "Pending" : type === 'completed' ? "Completed" : "Accept"}
              </button>
              <button
                className={`px-7 py-2 bg-transparent border-2 border-white rounded-md text-white font-medium ml-3 ${
                  isRequest ? 'block' : 'hidden'
                }`}
                onClick={handleReject}
              >
                Reject
              </button>
            </div>
          </div>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-3 right-3 cursor-pointer"
            onClick={() => setOpen(false)}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M22.2612 9.74006C22.8053 10.2841 22.8053 11.1661 22.2612 11.7102L17.9737 15.9977L22.2612 20.2872C22.8053 20.8313 22.8053 21.7133 22.2612 22.2573C21.7172 22.8014 20.8352 22.8014 20.2911 22.2573L16.0036 17.9678L11.7141 22.2573C11.1701 22.8014 10.288 22.8014 9.74396 22.2573C9.19993 21.7133 9.19993 20.8313 9.74396 20.2872L14.0335 15.9977L9.74396 11.7102C9.19993 11.1661 9.19993 10.2841 9.74396 9.74006C10.288 9.19602 11.1701 9.19602 11.7141 9.74006L16.0036 14.0276L20.2911 9.74006C20.8352 9.19602 21.7172 9.19602 22.2612 9.74006Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>
        <div className="m-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="mb-5">
            <p className="text-lg">Pet Name</p>
            <p className="text-lg font-medium">{booking?.petName}</p>
          </div>
          <div>
            <p className="text-lg">Service</p>
            <p className="text-lg font-medium">{booking?.serviceName}</p>
          </div>
          <div>
            <p className="text-lg">Booking Date</p>
            <p className="text-lg font-medium">{booking?.requestedDate?.split('T')[0]}</p>
          </div>
          <div>
            <p className="text-lg">Preferred Service on</p>
            <p className="text-lg font-medium">{booking?.date?.split('T')[0]}</p>
          </div>
          <div>
            <p className="text-lg">Service Time</p>
            <p className="text-lg font-medium">{formatDateTo12Hour(booking?.bookingTime)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingOverview;

