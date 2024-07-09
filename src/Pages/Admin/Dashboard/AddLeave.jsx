import React, { useState } from 'react';
import { addLeave } from '../../../Api/ClinicApi';
import { toast } from 'react-toastify';
const AddLeave = ({ setOpen }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSubmit = async () => {
    try {
        const leaveData = {
            startDate,
            endDate,
            startTime,
            endTime,
          };
      
          const res = await addLeave(leaveData);
          toast.success(res.data.message);
          setOpen(false);
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-[rgba(0,0,0,0.8)] scroll-none overflow-y-auto h-full w-full flex flex-col justify-center items-center px-2 z-20"
    >
      <div className="bg-slate-50 p-5 rounded-md md:w-2/6 relative ">
        <p className="text-xl font-semibold text-black">Add Leave</p>
        <div className="flex w-full justify-between gap-4 my-8">
          <div className="w-1/2">
            <p className="ml-1 font-medium">Start</p>
            <div>
              <input
                type="date"
                placeholder="Date"
                className="w-full py-2 px-5 rounded-lg border border-gray-300 mt-3"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <input
                type="time"
                placeholder="Time"
                className="w-full py-2 px-5 rounded-lg border border-gray-300 mt-3"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
          </div>
          <div className="w-1/2">
            <p className="ml-1 font-medium">End</p>
            <div>
              <input
                type="date"
                placeholder="Date"
                className="w-full py-2 px-5 rounded-lg border border-gray-300 mt-3"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <div>
              <input
                type="time"
                placeholder="Time"
                className="w-full py-2 px-5 rounded-lg border border-gray-300 mt-3"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center gap-5">
          <button
            className="bg-[#F5895A] px-8 py-3 rounded text-white hover:cursor-pointer"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-3 right-3 hover:cursor-pointer"
          onClick={() => setOpen(false)}
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M22.2612 9.74006C22.8053 10.2841 22.8053 11.1661 22.2612 11.7102L17.9737 15.9977L22.2612 20.2872C22.8053 20.8313 22.8053 21.7133 22.2612 22.2573C21.7172 22.8014 20.8352 22.8014 20.2911 22.2573L16.0036 17.9678L11.7141 22.2573C11.1701 22.8014 10.288 22.8014 9.74396 22.2573C9.19993 21.7133 9.19993 20.8313 9.74396 20.2872L14.0335 15.9977L9.74396 11.7102C9.19993 11.1661 9.19993 10.2841 9.74396 9.74006C10.288 9.19602 11.1701 9.19602 11.7141 9.74006L16.0036 14.0276L20.2911 9.74006C20.8352 9.19602 21.7172 9.19602 22.2612 9.74006Z"
            fill="#F5895A"
          />
        </svg>
      </div>
    </div>
  );
};

export default AddLeave;
