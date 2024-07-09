import React from "react";

const Card = ({ title, color, des, img, height }) => {
  return (
    <div className="">
      <div
        style={{ backgroundImage: color }}
        className="relative rounded-3xl h-[250px] sm:h-[280px] md:h-[300px] lg:h-[320px] xl:h-[340px] flex flex-col justify-between p-6"
      >
        <div>
          <h1 className="font-semibold text-white  text-xl sm:text-3xl md:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-white mt-2">
            {des}
          </p>
        </div>
        <img
          src={img}
          className="absolute bottom-0 right-0 w-20 sm:w-24 md:w-28 lg:w-12 xl:w-36"
          alt=""
        />
      </div>
    </div>
  );
};

export default Card;
