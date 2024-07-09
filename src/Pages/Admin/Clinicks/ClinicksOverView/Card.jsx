import React from 'react';

const Card = ({ color, title, total, status }) => {
  return (
    <div
      style={{ backgroundImage: color, height: '255px' }}
      className="p-5 rounded-3xl relative"
    >
      <h1 className="font-semibold text-white text-xl text-nowrap  pt-1">{title}</h1>
      <div className="flex justify-between">
        <div className='mt-3 pt-2'>
          <h1 className="text-5xl text-white pt-4 mr-6">{total}</h1>
          <p className="text-white text-xs mr-9">Total Booking</p>
          <div className="flex mt-12">
            <svg
              width="15"
              height="9"
              viewBox="0 0 15 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7.5 0L0 9H15L7.5 0Z" fill="#6AC597" />
            </svg>
            <p className="text-white text-xs -mt-0.5 px-1">{status} Bookings</p>
          </div>
          <p
            style={{ fontSize: '0.55rem', lineHeight: '0.8rem' }}
            className="text-white text-xs px-5"
          >
            Last Week
          </p>
        </div>
        <div className="relative">
          <div
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            className="absolute -top-3 -left-12 h-32 w-32 rounded-full"
          ></div>
          <div
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
            className="absolute h-32 w-32 rounded-full -bottom-12 -left-24"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Card;
