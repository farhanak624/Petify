import React, { useRef, useState } from "react";
import PetType from "./PetType";
import Breed from "./Breed";
import Gender from "./Gender";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { uploadImageV2 } from "../../../../imageUpload";
import { addAdoption } from "../../../../Api/AdminApi";
import { useDispatch } from "react-redux";
import { loadSpinner } from "../../../../Redux/Features/ClinicSlice";

const NewPet = ({ closeModal }) => {
    const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    petName: Yup.string().required("Pet name is required"),
    petType: Yup.string().notOneOf(
      ["Select Pet Type"],
      "Please select a pet type"
    ),
    breed: Yup.string().notOneOf(["Select Breed"], "Please select a breed"),
    birthdate: Yup.date().required("Birth date is required"),
    height: Yup.number()
      .positive("Height must be positive")
      .required("Height is required"),
    weight: Yup.number()
      .positive("Weight must be positive")
      .required("Weight is required"),
    gender: Yup.string().notOneOf(["Select Gender"], "Please select a gender"),
    contact: Yup.string().required("Contact information is required"),
    location: Yup.string().required("Location is required"),
    price: Yup.number()
      .positive("Price must be positive")
      .required("Price is required"),
    description: Yup.string().required("Description is required"),
  });

  const initialValues = {
    petName: "",
    petType: "Select Pet Type",
    breed: "Select Breed",
    birthdate: "",
    height: "",
    weight: "",
    gender: "Select Gender",
    contact: "",
    location: "",
    price: "",
    description: "",
  };

  const fileInputRef = useRef(null);
  const [petTypeDropdown, setPetTypeDropdown] = useState(false);
  const [breedDropDown, setBreedDropDown] = useState(false);
  const [genderDropDown, setGenderDropDown] = useState(false);
  const [imageFile, setImageFile] = useState();

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };
  const handleImageUpload = async (file) => {
    try {
      const imageresponse = await uploadImageV2(file);
      return imageresponse.images[0].imageUrl;
    } catch (error) {
        dispatch(loadSpinner())
      toast.error("Failed to upload image");
    }
  };
  const hadleSubmit = async (values, { setSubmitting }) => {
    dispatch(loadSpinner())
    if (!imageFile) {
      toast.error("Please upload an image");
      dispatch(loadSpinner())
      return;
    }
    const imageUrl = await handleImageUpload(imageFile);

    const wholeData = {
      petName: values.petName,
      petType: values.petType,
      breed: values.breed,
      birthday: values.birthdate,
      height: values.height,
      weight: values.weight,
      phone: values.contact,
      location: values.location,
      prize: values.price,
      description: values.description,
      image: imageUrl,
      gender: values.gender,
    };
    console.log({ wholeData });
    try {
      const response = await addAdoption(wholeData);
      console.log("Success", response );
      if (response.status === 200) {
        dispatch(loadSpinner())
        toast.success("Pet added successfully");
        closeModal();
      }
    } catch (error) {
      toast.error("Failed to add pet");
      dispatch(loadSpinner())
    }
    setSubmitting(false);
  };
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
        <div
          style={{ scrollbarWidth: "none" }}
          className="bg-white rounded-lg shadow-lg  max-h-[95%] w-full max-w-[100vh] overflow-y-auto p-6"
        >
          <div className="flex justify-end">
            <button
              className="text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <h2 className="text-xl font-semibold text-center">Create New Pet</h2>
          <p className="text-sm text-gray-300 text-center font-thin mb-4 mt-2">
            Add New Adopt Pet
          </p>
          <div class="relative flex justify-center mb-6">
            <img
              onClick={handleButtonClick}
              class="w-16 h-16 rounded-full"
              src={imageFile ? URL.createObjectURL(imageFile) : "/pet1.png"}
              alt="User avatar"
            />
            <div className="absolute w-5 h-5 rounded-full bg-[#F5895A] flex items-center justify-center bottom-0  transform translate-x-3/4 translate-y-1/4 ">
              <svg
                onClick={handleButtonClick}
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
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={hadleSubmit}
          >
            {({ values, setFieldValue, isSubmitting }) => {
              return (
                <Form className="">
                  <div className="grid lg:grid-cols-2  sm:grid-cols-1 gap-4">
                    <div>
                      <label
                        htmlFor="pet-name"
                        className="block text-sm font-medium text-muted-foreground"
                      >
                        Pet Name
                      </label>
                      <Field
                        type="text"
                        id="petName"
                        name="petName"
                        className="block w-full rounded-md border border-input bg-background text-foreground p-2 text-sm"
                        placeholder="Enter pet name"
                      />

                      <ErrorMessage
                        name="petName"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="pet-type"
                        className="block text-sm font-medium text-muted-foreground"
                      >
                        Pet Type
                      </label>
                      <div
                        onClick={() => setPetTypeDropdown(!petTypeDropdown)}
                        className=" block relative w-full rounded-md border border-input bg-background text-foreground p-2 text-sm flex justify-between"
                      >
                        <p>{values.petType}</p>
                        <svg
                          width="20px"
                          height="20px"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"
                              fill="#000000"
                            ></path>{" "}
                          </g>
                        </svg>
                      </div>
                      {petTypeDropdown && (
                        <div className="absolute">
                          <PetType
                            petTypeDropdown={petTypeDropdown}
                            setPetTypeDropdown={setPetTypeDropdown}
                            petType={values.petType}
                            setPetType={(value) =>
                              setFieldValue("petType", value)
                            }
                          />
                        </div>
                      )}
                      <ErrorMessage
                        name="petType"
                        component="div"
                        className="text-red-500 text-xs "
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="breed"
                        className="block text-sm font-medium text-muted-foreground"
                      >
                        Breed
                      </label>
                      <div
                        onClick={() => setBreedDropDown(!breedDropDown)}
                        className=" block relative w-full rounded-md border border-input bg-background text-foreground p-2 text-sm flex justify-between"
                      >
                        <>
                          <p>{values.breed}</p>
                          <svg
                            width="20px"
                            height="20px"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g
                              id="SVGRepo_tracerCarrier"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></g>
                            <g id="SVGRepo_iconCarrier">
                              {" "}
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"
                                fill="#000000"
                              ></path>{" "}
                            </g>
                          </svg>
                        </>
                      </div>
                      {breedDropDown && (
                        <div className="absolute">
                          <Breed
                            breedDropDown={breedDropDown}
                            setBreedDropDown={setBreedDropDown}
                            breed={values.breed}
                            setBreed={(value) => {
                              setFieldValue("breed", value);
                            }}
                          />
                        </div>
                      )}
                      <ErrorMessage
                        name="breed"
                        component="div"
                        className="text-red-500 text-xs "
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="birthdate"
                        className="block text-sm font-medium text-muted-foreground"
                      >
                        Birth date
                      </label>
                      <Field
                        type="date"
                        id="birthdate"
                        name="birthdate"
                        className="block w-full rounded-md border border-input bg-background text-foreground p-2 text-sm"
                      />
                      <ErrorMessage
                        name="birthdate"
                        component="div"
                        className="text-red-500 text-xs "
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="gender"
                        className="block text-sm font-medium text-muted-foreground"
                      >
                        Height (cm)
                      </label>
                      <Field
                        type="number"
                        id="height"
                        name="height"
                        placeholder="Enter Height"
                        value={values.height}
                        className="block w-full rounded-md border border-input bg-background text-foreground p-2 text-sm"
                      />
                      <ErrorMessage
                        name="height"
                        component="div"
                        className="text-red-500 text-xs "
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact"
                        className="block text-sm font-medium text-muted-foreground"
                      >
                        Weight (kg)
                      </label>
                      <Field
                        type="number"
                        id="weight"
                        className=" block w-full rounded-md border border-input bg-background text-foreground p-2 text-sm"
                        placeholder="Enter Weight"
                        value={values.weight}
                      />
                      <ErrorMessage
                        name="weight"
                        component="div"
                        className="text-red-500 text-xs "
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="gender"
                        className="block text-sm font-medium text-muted-foreground"
                      >
                        Gender
                      </label>
                      <div
                        onClick={() => setGenderDropDown(!genderDropDown)}
                        className="block relative w-full rounded-md border border-input bg-background text-foreground p-2 text-sm flex justify-between"
                      >
                        <p>{values.gender}</p>
                        <svg
                          width="20px"
                          height="20px"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                          <g
                            id="SVGRepo_tracerCarrier"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></g>
                          <g id="SVGRepo_iconCarrier">
                            {" "}
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289C6.68342 7.90237 7.31658 7.90237 7.70711 8.29289L12 12.5858L16.2929 8.29289C16.6834 7.90237 17.3166 7.90237 17.7071 8.29289C18.0976 8.68342 18.0976 9.31658 17.7071 9.70711L12.7071 14.7071Z"
                              fill="#000000"
                            ></path>{" "}
                          </g>
                        </svg>
                      </div>
                      {genderDropDown && (
                        <div className="absolute">
                          <Gender
                            gender={values.gender}
                            setGender={(value) => {
                              setFieldValue("gender", value);
                            }}
                            genderDropDown={genderDropDown}
                            setGenderDropDown={setGenderDropDown}
                          />
                        </div>
                      )}
                      <ErrorMessage
                        name="gender"
                        component="div"
                        className="text-red-500 text-xs "
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="contact"
                        className="block text-sm font-medium text-muted-foreground"
                      >
                        Contact
                      </label>
                      <Field
                        type="number"
                        id="contact"
                        className=" block w-full rounded-md border border-input bg-background text-foreground p-2 text-sm"
                        placeholder="Enter contact"
                        value={values.contact}
                      />
                      <ErrorMessage
                        name="contact"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="location"
                        className="block text-sm font-medium text-muted-foreground"
                      >
                        Location
                      </label>
                      <Field
                        type="text"
                        id="location"
                        className=" block w-full rounded-md border border-input bg-background text-foreground p-2 text-sm"
                        placeholder="Enter location"
                        value={values.location}
                      />
                      <ErrorMessage
                        name="location"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="prize"
                        className="block text-sm font-medium text-muted-foreground"
                      >
                        Price
                      </label>
                      <Field
                        type="number"
                        id="price"
                        className=" block w-full rounded-md border border-input bg-background text-foreground p-2 text-sm"
                        placeholder="Enter price"
                        value={values.price}
                      />
                      <ErrorMessage
                        name="price"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                  </div>
                  <div className="pb-2 pt-3">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-muted-foreground"
                    >
                      Description
                    </label>
                    <Field
                      as="textarea"
                      id="description"
                      name="description"
                      className="block w-full rounded-md border border-input bg-background text-foreground p-2 text-sm"
                      rows="2"
                      placeholder="Enter description"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-red-500 text-xs "
                    />
                  </div>
                  <div className="flex justify-start ">
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="bg-[#F5895A] text-white hover:bg-white hover:text-[#F5895A] border-2 hover:border-[#F5895A] py-2 px-4 rounded-md text-sm transition duration-300 ease-in-out"
                    >
                      Create Pet
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default NewPet;
