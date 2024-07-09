import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { uploadImageV2 } from "../../imageUpload";
import { addEmployee, updateEmployee } from "../../Api/ClinicApi";
import { useDispatch } from "react-redux";
import { loadSpinner } from "../../Redux/Features/ClinicSlice";

const AddEmployee = ({ text, employeeEditData, onClose, getList,setEditModal }) => {
  const dispatch = useDispatch();
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    department: Yup.string().required("Department is required"),
  });
  const initialValues = {
    name: employeeEditData?.name ? employeeEditData?.name : "",
    department: employeeEditData?.department
      ? employeeEditData?.department
      : "",
  };
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };
  const handleSubmit = async (values, { setSubmitting }) => {
    dispatch(loadSpinner());

    try {
      let response;
      if (employeeEditData) {
        if (imageFile) {
          console.log("imageFile", imageFile);
          const imageResponse = await uploadImageV2(imageFile);
          values.profileImage = imageResponse.images[0].imageUrl;
        } else {
          console.log("no image");
          values.profileImage = employeeEditData.profileImage;
        }
        response = await updateEmployee(values, employeeEditData._id);
        console.log("Response", response);
        toast.success("Employee updated successfully");
      } else {
        if (!imageFile) {
          toast.error("Please select an image");
          // dispatch(loadSpinner());
          return;
        }
        const imageResponse = await uploadImageV2(imageFile);
        setSubmitting(false);
        values.profileImage = imageResponse.images[0].imageUrl;
        console.log("Form data", values);
        response = await addEmployee(values);
        console.log("Response", response);
        toast.success("Employee added successfully");
      }
      console.log("Response", response);
      setImageFile(null);
      if (employeeEditData) {
        getList();
        setEditModal(false);
      } else {
        onClose();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
      dispatch(loadSpinner());
    }

    // Add your form submission logic here
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-80 overflow-y-auto z-30 p-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-[90vh]">
        <div className="flex justify-end ">
          <button
            onClick={onClose}
            className=" text-gray-500 hover:text-gray-700 p-3 text-2xl font-bold transition duration-300 ease-in-out"
          >
            &times;
          </button>
        </div>
        <div className="flex justify-center ">
          <h2 className="text-2xl font-semibold">{text}</h2>
        </div>
        <div className="flex justify-center mt-2">
          <p className="text-sm font-thin">
            {employeeEditData ? "change member to your clinic" : "Welcome a new member to your clinic"}
          </p>
        </div>
        <div>
          <div class="relative flex justify-center mb-4 mt-3">
            {!imageFile && employeeEditData?.profileImage ? (
              <img
                onClick={handleButtonClick}
                class="w-20 h-20 rounded-full object-cover object-center"
                src={employeeEditData?.profileImage}
                alt="User avatar"
              />
            ) : (
              <img
                onClick={handleButtonClick}
                class="w-20 h-20 rounded-full object-cover object-center"
                src={imageFile ? URL.createObjectURL(imageFile) : "/user.png"}
                alt="User avatar"
              />
            )}
            <div className="absolute w-5 h-5 rounded-full bg-[#F5895A] flex items-center justify-center bottom-0  transform translate-x-3/4 translate-y-1/4 ">
              <svg
                // onClick={handleButtonClick}
                width="13"
                height="10"
                viewBox="0 0 13 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.39493 2.42578C4.7366 2.42578 3.38672 3.82368 3.38672 5.5413C3.38672 7.25891 4.73666 8.65681 6.39493 8.65681C8.05321 8.65681 9.40315 7.25891 9.40315 5.5413C9.40315 3.82368 8.05321 2.42578 6.39493 2.42578ZM6.39493 8.20013C4.97876 8.20013 3.82762 7.00781 3.82762 5.5413C3.82762 4.07479 4.97883 2.88247 6.39493 2.88247C7.81104 2.88247 8.96225 4.07479 8.96225 5.5413C8.96225 7.00781 7.81104 8.20013 6.39493 8.20013Z"
                  fill="white"
                />
                <path
                  d="M6.39579 3.35547C5.23316 3.35547 4.28516 4.33537 4.28516 5.54139C4.28516 6.74741 5.2308 7.72731 6.39579 7.72731C7.56078 7.72731 8.50642 6.74741 8.50642 5.54139C8.50642 4.33537 7.55849 3.35547 6.39579 3.35547ZM6.39579 7.27048C5.47527 7.27048 4.72605 6.49386 4.72605 5.54139C4.72605 4.58891 5.47526 3.8123 6.39579 3.8123C7.31632 3.8123 8.06553 4.58891 8.06553 5.54139C8.06553 6.49386 7.31632 7.27048 6.39579 7.27048Z"
                  fill="white"
                />
                <path
                  d="M6.39638 4.18896C5.67687 4.18896 5.08984 4.79654 5.08984 5.54119C5.08984 5.66681 5.18806 5.7696 5.3114 5.7696C5.43474 5.7696 5.53296 5.66681 5.53296 5.54119C5.53296 5.04781 5.92126 4.6458 6.39866 4.6458C6.51972 4.6458 6.62022 4.54301 6.62022 4.41738C6.62022 4.29175 6.51743 4.18896 6.39638 4.18896Z"
                  fill="white"
                />
                <path
                  d="M5.84265 1.42558H6.94819C7.06924 1.42558 7.16974 1.32279 7.16974 1.19717C7.16974 1.07154 7.07153 0.96875 6.94819 0.96875H5.84265C5.72159 0.96875 5.62109 1.07154 5.62109 1.19717C5.62109 1.32279 5.71931 1.42558 5.84265 1.42558Z"
                  fill="white"
                />
                <path
                  d="M11.5373 1.44131H8.11783L7.90768 0.527644C7.83687 0.216998 7.57191 0 7.26356 0H5.5276C5.21924 0 4.95427 0.216998 4.88348 0.527644L4.67333 1.44131H3.1818V0.824577C3.1818 0.698947 3.08358 0.596161 2.96024 0.596161H1.32252C1.20146 0.596161 1.10096 0.698947 1.10096 0.824577V1.45272C0.481946 1.5281 0 2.07629 0 2.73871V8.70032C0 9.41754 0.56191 10 1.254 10H11.535C12.2271 10 12.789 9.41754 12.789 8.70032V2.73871C12.7913 2.02377 12.2294 1.44131 11.5373 1.44131ZM2.74096 1.05301V1.44131H1.54406V1.05301H2.74096ZM12.3504 8.70263C12.3504 9.16632 11.9849 9.54548 11.5372 9.54548H1.25388C0.806187 9.54548 0.440722 9.1663 0.440722 8.70263V2.73868C0.440722 2.27499 0.806187 1.89583 1.25388 1.89583H4.84684C4.95191 1.89583 5.03413 1.82045 5.05698 1.71995H5.06155L5.31282 0.630412C5.33566 0.527626 5.42474 0.454536 5.52753 0.454536H7.26583C7.36862 0.454536 7.45542 0.527629 7.48055 0.630412L7.73181 1.71995H7.73638C7.75922 1.82045 7.84374 1.89583 7.94653 1.89583H11.5395C11.9872 1.89583 12.3526 2.27501 12.3526 2.73868V8.70263H12.3504Z"
                  fill="white"
                />
              </svg>
              <input
                id="profileImageInput"
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>
        <div className="p-3">
          {/* Modal body content */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className=" gap-2 w-full">
                <div className="p-4 flex flex-col sm:flex-row sm:gap-4">
                  <div className="w-full sm:w-1/2 mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="name"
                    >
                      Employee Name
                    </label>
                    <Field
                      className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter name"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-xs italic mt-1"
                    />
                  </div>
                  <div className="w-full sm:w-1/2 mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="department"
                    >
                      Department
                    </label>
                    <Field
                      as="select"
                      className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="department"
                      name="department"
                    >
                      <option value="">Select Department</option>
                      <option value="Doctor">Doctor</option>
                      <option value="Groomer">Groomer</option>
                    </Field>
                    <ErrorMessage
                      name="department"
                      component="div"
                      className="text-red-500 text-xs italic mt-1"
                    />
                  </div>
                </div>
                <div className="p-4 ">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#F5895A] text-white hover:bg-white hover:text-[#F5895A] border-2 hover:border-[#F5895A] py-2 px-4 rounded-lg text-sm transition duration-300 ease-in-out"
                  >
                    {employeeEditData ? "Update Employee" : "Create Employee"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
