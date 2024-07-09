import React, { useState, useRef, useEffect } from "react";
import {
  ApproveRequest,
  RejectRequest,
  getclinicsRequest,
} from "../../../Api/AdminApi";
import axios from "axios";
import { toast } from "react-toastify";
import ClinicRequestDetailsModal from "../../../Component/Modal/ClinicRequestDetailsModal";

const RequestTable = () => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const loader = useRef(null);
  const [modalIndex, setModalIndex] = useState(0);
  const [locations, setLocations] = useState({});
  const [currentData, setCurrentData] = useState();
  const apikey = "AIzaSyBOHuJ-4CqJBjmSi_RugeonwPU5cBVqbeA";

  useEffect(() => {
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
  }, [count, page]);

  useEffect(() => {
    getData(page);
  }, [page]);

  const getData = async (page) => {
    try {
      setData([]);
      const res = await getclinicsRequest(page);
      console.log(res.data);
      setCount(res.data.total);
      const newData = res.data.data;
      setData((prev) => [...prev, ...newData]);
      fetchLocations(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLocations = async (clinics) => {
    const newLocations = {};
    for (let i = 0; i < clinics.length; i++) {
      const { lat, lng } = clinics[i].location;
      const id = clinics[i]._id;
      if (!locations[id]) {
        const resp = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apikey}`
        );
        const location = resp.data.results[0].formatted_address;
        newLocations[id] = location;
      }
    }
    setLocations((prev) => ({ ...prev, ...newLocations }));
  };

  const approve = async (id) => {
    try {
      const res = await ApproveRequest(id);
      toast(res.data.message);
      if (res.data.message === "Clinic Approved Successfully") {
        getData(page);
      }
      setShowModal(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const reject = async (id) => {
    try {
      const res = await RejectRequest(id);
      toast(res.data.message);
      if (res.data.message === "Clinic Rejected Successfully") {
        getData(page);
      }
      setShowModal(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (data, i) => {
    setModalIndex(i);
    setShowModal(true);
    setCurrentData(data);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div
      className="px-7 pt-8 col-span-2 overflow-x-auto shadow-lg rounded-3xl"
      style={{ backgroundColor: "rgba(254, 244, 236, 1)" }}
    >
      <div className="flex justify-between">
        <h1 className="font-semibold text-base md:text-xl">
          New Clinic Request
        </h1>
      </div>
      <table className="w-full border-collapse table">
        <tbody>
          {data.length ? (
            data.map((clinic, i) => {
              const location = locations[clinic._id];
              return (
                <tr key={i} className=" border-gray-300">
                  <td className="">
                    <div className="w-16 h-16 rounded-full border">
                      <img
                        className="w-16 h-16 rounded-full object-center object-cover"
                        src={clinic.image}
                        alt=""
                      />
                    </div>
                  </td>
                  <td className="p-3 align-middle">
                    <h1 className="text-lg font-semibold ml-3 text-nowrap">
                      {clinic.clinicName}
                    </h1>
                  </td>
                  <td className="align-middle">
                    {location && (
                      <p className="text-md text-gray-400 text-xs">
                        {clinic.location.city}
                      </p>
                    )}
                  </td>
                  <td className="p-3 align-middle">
                    <button
                      onClick={() => {
                        openModal(clinic, i);
                      }}
                      className="bg-white min-w-32 p-3 rounded-full hover:bg-gray-200"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-16">
                No Recent Clinic Requests
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div ref={loader} className="h-10" />

      {showModal && (
        <ClinicRequestDetailsModal
          clinicData={currentData}
          closeModal={closeModal}
          accept={approve}
          reject={reject}
        />
      )}
    </div>
  );
};

export default RequestTable;
