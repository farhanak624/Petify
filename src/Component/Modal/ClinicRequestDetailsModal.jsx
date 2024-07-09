import axios from "axios";
import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import ViewImage from "./ViewImage";
import { set } from "lodash";

const Marker = ({ text }) => (
  <div className="marker">
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 0C7.589 0 4 3.589 4 8C4 14 12 24 12 24C12 24 20 14 20 8C20 3.589 16.411 0 12 0ZM12 10.5C10.619 10.5 9.5 9.381 9.5 8C9.5 6.619 10.619 5.5 12 5.5C13.381 5.5 14.5 6.619 14.5 8C14.5 9.381 13.381 10.5 12 10.5Z"
        fill="#EA4335"
      />
    </svg>
    <div className="marker-text">{text}</div>
  </div>
);

const ClinicRequestDetailsModal = ({
  clinicData,
  closeModal,
  accept,
  reject,
}) => {
  const [selectedCoordinates, setSelectedCoordinates] = useState({
    lat: clinicData?.location?.lat,
    lng: clinicData?.location?.lng,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [location, setLocation] = useState("");
  const apikey = "AIzaSyBOHuJ-4CqJBjmSi_RugeonwPU5cBVqbeA";
  const [imageModal, setImageModal] = useState(false);
  const [currentImageData, setCurrentImageData] = useState();

  useEffect(() => {
    if (clinicData) {
      console.log("clinicData", clinicData);
      (async () => {
        try {
          setLocation("Loading...");
          const resp = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${clinicData?.lat},${clinicData?.lng}&key=${apikey}`
          );
          const locationAdresss = resp.data.results[0].formatted_address;
          setLocation(locationAdresss);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [clinicData]);
  const closeLocationModal = () => {
    setIsModalOpen(false);
  };
  const closeImageModal = () => {
    setImageModal(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-80 overflow-y-auto z-30">
      {imageModal && (
        <ViewImage image={currentImageData} onClose={closeImageModal} />
      )}
      <div className="flex items-center justify-center min-h-screen w-full p-4">
        <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="px-8 mt-0 sm:mt-8 flex flex-col sm:flex-row">
            <div className="w-full sm:w-1/3 sm:mr-8">
              <div className="flex sm:hidden justify-between mt-96">
                <label
                  onClick={() => setIsModalOpen(true)}
                  className="font-semibold text-lg m-3 sm:ml-auto text-[#EE5158] cursor-pointer hover:text-red-800"
                >
                  Locate in Map
                </label>
                <svg
                  onClick={closeModal}
                  className="m-3 mx-1 cursor-pointer"
                  width="26"
                  height="26"
                  viewBox="0 0 26 26"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.57896 17.4211L13 13M13 13L17.4211 8.57894M13 13L17.4211 17.4211M13 13L8.57896 8.57894M25 13C25 19.6274 19.6274 25 13 25C6.37258 25 1 19.6274 1 13C1 6.37258 6.37258 1 13 1C19.6274 1 25 6.37258 25 13Z"
                    stroke="black"
                    strokeWidth="1.25"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <img
                src={clinicData.image}
                className="w-48 rounded-lg"
                alt="Profile"
              />
              <div className="flex gap-8">
                <button
                  onClick={() => {
                    accept(clinicData._id);
                  }}
                  className="text-white p-1 mr-1.5 rounded-lg px-3 my-3"
                  style={{ backgroundColor: "rgba(89, 170, 129, 1)" }}
                >
                  Accept
                </button>
                <button
                  onClick={() => {
                    reject(clinicData._id);
                  }}
                  className="text-white p-1 ml-1.5 rounded-lg px-3 my-3"
                  style={{ backgroundColor: "rgba(238, 81, 88, 1)" }}
                >
                  Decline
                </button>
              </div>
            </div>
            <div className="w-full">
              <div className="mt-0 sm:mt-4 flex flex-col-reverse sm:flex-row p-4 justify-between">
                <h1 className="font-semibold  text-2xl my-3 -mx-4 sm:-mx-0 sm:m-3 ">
                  Clinic Details
                </h1>
                <div className="justify-between hidden sm:flex">
                  <label
                    onClick={() => setIsModalOpen(true)}
                    className="font-semibold text-lg m-3 sm:ml-auto text-[#EE5158] cursor-pointer hover:text-red-800"
                  >
                    Locate in Map
                  </label>
                  <svg
                    onClick={closeModal}
                    className="m-3 mx-1 cursor-pointer"
                    width="26"
                    height="26"
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.57896 17.4211L13 13M13 13L17.4211 8.57894M13 13L17.4211 17.4211M13 13L8.57896 8.57894M25 13C25 19.6274 19.6274 25 13 25C6.37258 25 1 19.6274 1 13C1 6.37258 6.37258 1 13 1C19.6274 1 25 6.37258 25 13Z"
                      stroke="black"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="sm:grid  gap-4 sm:grid-cols-2 mb-12">
                <div className="">
                  <label className="block  font-bold mb-2">Clinic Name</label>
                  <div className="rounded-lg my-3 bg-[#F3F3F5]">
                    <p
                      className="p-4 px-6"
                      style={{ color: "rgba(0, 0, 0, 0.38)" }}
                    >
                      {clinicData?.clinicName}
                    </p>
                  </div>
                </div>
                <div className="">
                  <h3 className="text-lg font-semibold">Nationality</h3>
                  <div className="rounded-lg my-2 flex bg-[#F3F3F5]">
                    <p className="p-4 mt-1 pl-6">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.38273 11.927V6.55666C8.6009 6.59022 8.81907 6.60701 9.02046 6.60701C9.80923 6.60701 10.4973 6.4224 11.1686 6.25458C12.2091 5.98606 13.1993 5.71754 14.5419 6.1371C14.6425 6.17066 14.7432 6.15388 14.8272 6.08675C14.9111 6.01962 14.9614 5.93571 14.9614 5.83502V5.14694V1.23665C14.9614 1.10239 14.8775 0.968132 14.7432 0.934568C13.2328 0.464662 12.1084 0.766744 11.0176 1.03526C10.1784 1.25343 9.37289 1.45482 8.39951 1.32056V0.414315C8.39951 0.212926 8.23169 0.0283203 8.01352 0.0283203H7.51005C7.30866 0.0283203 7.12405 0.196144 7.12405 0.414315V11.9438C3.39837 12.0948 0.411111 13.622 0.00833423 15.5352C-0.0420128 15.7702 0.142593 15.9716 0.377546 15.9716H15.1125C15.3474 15.9716 15.532 15.7534 15.4817 15.5352C15.0789 13.6052 12.0916 12.0948 8.38273 11.927Z"
                          fill="#B6B6B8"
                        />
                      </svg>
                    </p>
                    <p
                      className="p-4 pl-0 text-wrap"
                      style={{ color: "rgba(0, 0, 0, 0.38)" }}
                    >
                      {clinicData?.country}
                    </p>
                  </div>
                </div>
                <div className="">
                  <h3 className="text-lg font-semibold">Contact Number</h3>
                  <div className="rounded-lg my-3 flex bg-[#F3F3F5]">
                    <p className="p-4 mt-1 pl-6">
                      <svg
                        width="17"
                        height="17"
                        viewBox="0 0 17 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.04672 11.3492C6.21972 12.5222 7.51152 13.526 8.89926 14.363C10.2997 15.2077 11.799 15.8846 13.3742 16.3967L16.3967 13.3742L13.0593 10.0368L10.822 12.2738C10.7773 12.3187 10.7061 12.3298 10.6486 12.2968C9.25587 11.4966 7.98714 10.5761 6.88277 9.49808C5.77959 8.42107 4.83982 7.18559 4.10316 5.75461C4.06731 5.69861 4.07382 5.62318 4.12274 5.57434L6.36 3.33713L3.02268 0L0 3.02267C0.512312 4.59788 1.1892 6.09708 2.03391 7.49744C2.87091 8.88521 3.8739 10.1764 5.04672 11.3492Z"
                          fill="#B6B6B8"
                        />
                      </svg>
                    </p>
                    <p
                      className="p-4 pl-0"
                      style={{ color: "rgba(0, 0, 0, 0.38)" }}
                    >
                      {clinicData?.phone}
                    </p>
                  </div>
                </div>
                <div className="">
                  <h3 className="text-lg font-semibold">Location</h3>
                  <div className="rounded-lg my-3 flex cursor-pointer bg-[#F3F3F5]">
                    <div className="flex justify-center items-center mx-4">
                      <svg
                        width="12"
                        height="18"
                        viewBox="0 0 12 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.99998 0C2.707 0 0 2.56787 0 6.23075C0 7.53791 0.307898 8.44721 0.879804 9.4543L5.59613 17.762C5.63606 17
 8341 5.69457 5.76559 17.9361C5.8366 17.9779 5.91754 18 5.99998 18C6.08241 18 6.16335 17.9779 6.23437 17.9361C6.30539 17.8942 6.3639 17.8341 6.40382 17.762L11.1201 9.4543C11.6921 8.44719 12 7.53789 12 6.23075C12 2.56787 9.29296 0 5.99998 0ZM5.99998 3.23076C7.52938 3.23076 8.7692 4.47058 8.7692 5.99998C8.7692 7.52935 7.52938 8.7692 5.99998 8.7692C4.47058 8.7692 3.23076 7.52935 3.23076 5.99998C3.23076 4.47058 4.47058 3.23076 5.99998 3.23076Z"
                          fill="#B6B6B8"
                        />
                      </svg>
                    </div>
                    <p
                      className="p-5 pl-0 text-xs"
                      style={{ color: "rgba(0, 0, 0, 0.38)" }}
                    >
                      {clinicData?.location}
                    </p>
                  </div>
                </div>
                <div className="col-span-2">
                  <h3 className="text-lg font-semibold">Description</h3>
                  <div className="rounded-lg my-3 bg-[#F3F3F5]">
                    <p
                      className="p-4 px-6"
                      style={{ color: "rgba(0, 0, 0, 0.38)" }}
                    >
                      {clinicData?.description}
                    </p>
                  </div>
                </div>
                <div className="col-span-2">
                  <h3 className="text-lg font-semibold">Providing Services</h3>
                  <div className="rounded-lg my-3 bg-[#F3F3F5]">
                    <p
                      className="p-4 px-6"
                      style={{ color: "rgba(0, 0, 0, 0.38)" }}
                    >
                      {clinicData?.providingServices?.join(", ")}
                    </p>
                  </div>
                </div>
                <div className="col-span-2">
                  <h3 className="text-lg font-semibold">
                    How many service provided at a time
                  </h3>
                  <div className="rounded-lg my-3 bg-[#F3F3F5]">
                    <p
                      className="p-4 px-6"
                      style={{ color: "rgba(0, 0, 0, 0.38)" }}
                    >
                      {clinicData?.serviceProvidingCount}
                    </p>
                  </div>
                </div>
                <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label
                      htmlFor="trade-licence"
                      className="text-lg font-semibold mb-2"
                    >
                      Trade Licence
                    </label>
                    <div className="relative">
                      <input
                        id="trade-licence"
                        type="text"
                        readOnly
                        value={
                          clinicData?.licence ? clinicData?.licence : "N/A"
                        }
                        className="w-full bg-[#F3F3F5] p-3 rounded-md pr-12 file:hidden text-[#00000061]"
                      />
                      <button
                        onClick={() => {
                          setImageModal(true);
                          setCurrentImageData({
                            image: clinicData?.licence,
                            title: "Trade Licence",
                          });
                        }}
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 p-2 border bg-[#f3ded6] border-[#F5895A] rounded-md text-accent"
                      >
                        <svg
                          width="21"
                          height="20"
                          viewBox="0 0 21 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M4.2217 1.50675C2.25578 2.51796 0.710458 3.85729 0 5C0.710458 6.14271 2.25553 7.48204 4.2217 8.49325C8.12795 10.5022 12.0076 10.5022 15.9136 8.49325C17.8798 7.48204 19.4251 6.14271 20.1356 5C19.4251 3.85729 17.88 2.51796 15.9139 1.50675C12.0076 -0.502249 8.12795 -0.502249 4.2217 1.50675ZM11.6884 3.37943C12.5835 4.27434 12.5833 5.72566 11.6884 6.62083C10.2482 8.06075 7.77576 7.0356 7.77576 5C7.77576 2.9644 10.2484 1.93925 11.6884 3.37943ZM10.0678 1.86375C12.8526 1.86375 14.2565 5.24653 12.2853 7.21777C10.3146 9.18851 6.93153 7.78508 6.93153 5C6.93153 3.26794 8.33572 1.86375 10.0678 1.86375Z"
                            fill="#F5895A"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="roc" className="text-lg font-semibold mb-2">
                      ROC
                    </label>
                    <div className="relative">
                      <input
                        id="roc"
                        type="text"
                        readOnly
                        value={clinicData?.roc ? clinicData?.roc : "N/A"}
                        className="w-full bg-[#F3F3F5] p-3 rounded-md pr-12 file:hidden cursor-none text-[#00000061]"
                      />
                      <button
                        onClick={() => {
                          setCurrentImageData(clinicData?.roc);
                          setCurrentImageData({
                            image: clinicData?.roc,
                            title: "ROC",
                          });
                          setImageModal(true);
                        }}
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 p-2 border bg-[#f3ded6] border-[#F5895A] rounded-md text-accent"
                      >
                        <svg
                          width="21"
                          height="20"
                          viewBox="0 0 21 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M4.2217 1.50675C2.25578 2.51796 0.710458 3.85729 0 5C0.710458 6.14271 2.25553 7.48204 4.2217 8.49325C8.12795 10.5022 12.0076 10.5022 15.9136 8.49325C17.8798 7.48204 19.4251 6.14271 20.1356 5C19.4251 3.85729 17.88 2.51796 15.9139 1.50675C12.0076 -0.502249 8.12795 -0.502249 4.2217 1.50675ZM11.6884 3.37943C12.5835 4.27434 12.5833 5.72566 11.6884 6.62083C10.2482 8.06075 7.77576 7.0356 7.77576 5C7.77576 2.9644 10.2484 1.93925 11.6884 3.37943ZM10.0678 1.86375C12.8526 1.86375 14.2565 5.24653 12.2853 7.21777C10.3146 9.18851 6.93153 7.78508 6.93153 5C6.93153 3.26794 8.33572 1.86375 10.0678 1.86375Z"
                            fill="#F5895A"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col sm:col-span-2">
                    <label htmlFor="din" className="text-lg font-semibold mb-2">
                      DIN
                    </label>
                    <input
                      id="din"
                      type="text"
                      value={clinicData?.din ? clinicData?.din : "N/A"}
                      className="w-full bg-[#F3F3F5] p-2 rounded-md text-[#00000061]"
                      readOnly
                    />
                  </div>
                </div>

                <div className="col-span-2">
                  <h3 className="text-lg font-semibold">Availabilty</h3>
                  <div className="rounded-lg my-3 bg-[#F3F3F5] p-2">
                    <table className="min-w-full">
                      <thead>
                        <tr>
                          <th className="py-3"></th>
                          <th className="py-3">Open Time</th>
                          <th className="py-3">Close Time</th>
                          <th className="py-3"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {clinicData?.workingDays?.map((dayData, index) => (
                          <tr key={index} className="text-center">
                            <td className="py-3 ">{dayData.day}</td>
                            <td className="py-3 font-thin">
                              {dayData?.isClosed
                                ? "9:00 AM"
                                : new Date(dayData.open).toLocaleTimeString(
                                    [],
                                    {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    }
                                  )}
                            </td>
                            <td className="py-3 font-thin">
                              {dayData?.isClosed
                                ? "6:00 PM"
                                : new Date(dayData.close).toLocaleTimeString(
                                    [],
                                    {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    }
                                  )}
                            </td>
                            <td className="py-3">
                              {dayData.isClosed ? (
                                <>
                                  <p className="text-red-700">Close </p>
                                </>
                              ) : (
                                <>
                                  <p className="text-green-700">Open </p>
                                </>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
          <div className="w-full max-w-4xl h-3/4 bg-white rounded-lg shadow-lg overflow-hidden relative p-10">
            <button
              onClick={closeLocationModal}
              className="absolute top-0 right-0 mt-4 mr-4 bg-transparent text-gray-600 hover:text-gray-900"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 18L18 6M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div style={{ height: "100%", width: "100%" }}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyBOHuJ-4CqJBjmSi_RugeonwPU5cBVqbeA",
                }} // Replace with your actual Google Maps API key
                center={{
                  lat: parseFloat(clinicData.lat),
                  lng: parseFloat(clinicData.lng),
                }}
                defaultZoom={11}
                heatmapLibrary={true}
              >
                {clinicData.lat && clinicData.lng && (
                  <Marker
                    lat={parseFloat(clinicData.lat)}
                    lng={parseFloat(clinicData.lng)}
                    text="Selected Location"
                  />
                )}
              </GoogleMapReact>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClinicRequestDetailsModal;
