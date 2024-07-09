import React, { useEffect, useState } from "react";
import Card from "../../../Component/Card/Card";
import AddEmployee from "../../../Component/Modal/AddEmployee";
import { getEmployee } from "../../../Api/ClinicApi";
import { useDispatch } from "react-redux";
import { loadSpinner } from "../../../Redux/Features/ClinicSlice";

const Employee = () => {
  const dispatch = useDispatch();
  const [employeeModal, setEmployeeModal] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    getEmployeeList();
  }, []);
  const getEmployeeList = async () => {
    dispatch(loadSpinner());
    try {
      const response = await getEmployee();
      console.log("Employee List", response);
      setEmployeeList(response?.data?.employees);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(loadSpinner());
    }
  };
  const onClose = () => {
    setEmployeeModal(false);
    getEmployeeList();
  };

  return (
    <div>
      {employeeModal && (
        <AddEmployee text={"Add New Employee"} onClose={onClose} />
      )}
      <div className="flex justify-between p-5">
        <p className="font-bold text-2xl">Employees</p>
        <button
          onClick={() => setEmployeeModal(true)}
          className="border-[#F5895A] border-2  font-bold py-2 px-4 rounded-xl text-[#F5895A] hover:bg-[#F5895A] hover:text-white transition duration-300 ease-in-out"
        >
          Create New Employee
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 p-5">
        {employeeList.map((employee) => {
          return <Card employeeData={employee} onDelete={getEmployeeList} />;
        })}
      </div>
      {employeeList.length === 0 && (
        <p className="text-center text-xl font-bold">No Employees Found</p>
      )}
    </div>
  );
};

export default Employee;
