import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { deleteEmployee, getEmployee } from "../../Api/ClinicApi";
import AddEmployee from "../Modal/AddEmployee";

const Card = ({ employeeData, onDelete,callback }) => {
  const [showMenu, setShowMenu] = useState(false);

  const [editModal, setEditModal] = useState(false);
  const menuRef = useRef(null);
  useEffect(() => {
    console.log("employeeData", employeeData);
  }, [employeeData]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const onEdit = () => {
    setEditModal(false);
  };
  return (
    <>
      {editModal && (
        <AddEmployee
          text={"Edit Employee"}
          employeeEditData={employeeData}
          onClose={onEdit}
          getList={onDelete}
          setEditModal={setEditModal}
        />
      )}
      <div className="bg-white p-4 rounded-3xl shadow-md border hover:shadow-xl text-transform: capitalize relative">
        <div className="flex justify-end">
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="focus:outline-none w-8 h-8 rounded-xl bg-[#fbf1ec] inline-flex justify-center items-center hover:bg-[#F5895A] transition duration-300 ease-in-out"
            >
              <svg
                width="4"
                height="14"
                className=""
                viewBox="0 0 4 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.8525 3.66983C2.87454 3.66983 3.70306 2.84831 3.70306 1.83491C3.70306 0.821519 2.87454 0 1.8525 0C0.830473 0 0.00195312 0.821519 0.00195312 1.83491C0.00195312 2.84831 0.830473 3.66983 1.8525 3.66983Z"
                  fill="black"
                />
                <path
                  d="M1.85161 8.82915C2.87422 8.82915 3.70322 8.00716 3.70322 6.99319C3.70322 5.97922 2.87422 5.15723 1.85161 5.15723C0.828993 5.15723 0 5.97922 0 6.99319C0 8.00716 0.828993 8.82915 1.85161 8.82915Z"
                  fill="black"
                />
                <path
                  d="M1.8525 13.9989C2.87454 13.9989 3.70306 13.1774 3.70306 12.164C3.70306 11.1506 2.87454 10.3291 1.8525 10.3291C0.830473 10.3291 0.00195312 11.1506 0.00195312 12.164C0.00195312 13.1774 0.830473 13.9989 1.8525 13.9989Z"
                  fill="black"
                />
              </svg>
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 bg-transparent rounded-md z-10 transition-all duration-300 ease-in-out">
                <button
                  onClick={() => {
                    // onEdit(employeeData);
                    setEditModal(true);
                    setShowMenu(false);
                  }}
                  className="w-8 h-8 bg-[#fbf1ec] text-left mb-2 text-sm text-red-600 hover:bg-gray-100 flex items-center justify-center rounded-xl"
                  style={{
                    opacity: showMenu ? 1 : 0,
                    transform: showMenu
                      ? "translateY(0) scale(1)"
                      : "translateY(10px) scale(0.95)",
                  }}
                >
                  <svg
                    width="11"
                    height="16"
                    viewBox="0 0 11 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.02921 13.2182L1 15L1.20513 11.4914L7.54501 1.11333C7.57806 1.05973 7.63096 1.02138 7.69217 1.00663C7.75339 0.991888 7.81795 1.00195 7.87178 1.03461L10.2904 2.51344C10.344 2.54649 10.3823 2.59939 10.3971 2.66061C10.4118 2.72182 10.4018 2.78639 10.3691 2.84022L4.02921 13.2182Z"
                      stroke="black"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6.53711 2.76709L9.36119 4.49398"
                      stroke="black"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M1.06836 13.7285L2.09877 14.3582"
                      stroke="black"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent click from bubbling to the card div
                    Swal.fire({
                      title: "Are you sure?",
                      text: "You want to delete this Employee!",
                      icon: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#3085d6",
                      cancelButtonColor: "#d33",
                      confirmButtonText: "Yes, delete it!",
                    }).then((result) => {
                      if (result.isConfirmed) {
                        // If confirmed, perform the delete operation
                        // You can place your delete logic here
                        deleteEmployee(employeeData?._id)
                          .then((data) => {
                            console.log("success", data?.data);
                            if (result.isConfirmed) {
                            }
                            setShowMenu(false);
                            onDelete();
                          })
                          .catch((err) => {
                            console.log(err?.response?.data);
                          });
                        Swal.fire(
                          "Deleted!",
                          "Employee has been deleted.",
                          "success"
                        );
                        // For demonstration purposes, let's just log the deletion
                        console.log("Item deleted");
                      }
                    });
                  }}
                  style={{
                    opacity: showMenu ? 1 : 0,
                    transform: showMenu
                      ? "translateY(0) scale(1)"
                      : "translateY(10px) scale(0.95)",
                    transitionDelay: "50ms",
                  }}
                  className="w-8 h-8 bg-[#fbf1ec] text-left mb-2 text-sm text-red-600 hover:bg-[#332324] flex items-center justify-center rounded-xl"
                >
                  <svg
                    width="11"
                    height="14"
                    viewBox="0 0 11 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M8.65441 14C8.44782 14 8.28012 13.8323 8.28012 13.6257C8.28012 13.4179 8.4454 13.252 8.66171 13.252C8.8683 13.252 9.03601 13.4191 9.03601 13.6257C9.03601 13.8335 8.87073 14 8.65441 14ZM0.374219 1.96331H3.31281V0.37369C3.31281 0.167097 3.48051 0 3.6865 0H6.81891C7.0255 0 7.19321 0.167704 7.19321 0.37369V1.96331H10.1318C10.3384 1.96331 10.5061 2.13101 10.5061 2.3376V3.78439C10.5061 3.99098 10.3384 4.15869 10.1318 4.15869L0.374297 4.15808C0.167704 4.15808 0 3.99098 0 3.78378V2.337C0 2.1304 0.167704 1.9627 0.374297 1.9627L0.374219 1.96331ZM9.75792 2.71131H0.747862V3.41009H9.7573V2.71131H9.75792ZM7.42584 13.252H2.1589L0.81724 5.42621H9.6887L8.50138 12.352C8.46674 12.5555 8.60346 12.7482 8.80701 12.7828C9.01057 12.8174 9.2032 12.6807 9.23782 12.4772L10.4962 5.13574C10.5461 4.88539 10.3644 4.67759 10.1316 4.67759L0.374141 4.67819C0.145662 4.67819 -0.0329777 4.886 0.00591111 5.11509L1.47275 13.6694C1.49402 13.8553 1.6526 13.9999 1.84462 13.9999H7.4264C7.63299 13.9999 7.80009 13.8322 7.80009 13.6256C7.80009 13.419 7.63239 13.2519 7.4264 13.2519L7.42584 13.252ZM6.44511 0.748049H4.06139V1.96332H6.44511V0.748049Z"
                      fill="#EE5158"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center p-1 ">
          <div className="w-24 h-24 rounded-full border-[#F5895A] border-2 overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={employeeData?.profileImage}
              alt=""
            />
          </div>
        </div>
        <div className="flex justify-center p-1 mt-4">
          <p className="">{employeeData?.name}</p>
        </div>
        <div className="flex justify-center">
          <p className="font-thin text-sm">{employeeData?.department}</p>
        </div>
      </div>
    </>
  );
};

export default Card;
