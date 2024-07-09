import React, { useEffect, useRef, useState } from "react";
import GoogleMapReact from "google-map-react";
import { uploadImageV2 } from "../../imageUpload";
import { toast } from "react-toastify";
import { set } from "lodash";
import { clinicInfoFill } from "../../Api/ClinicApi";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { loadSpinner } from "../../Redux/Features/ClinicSlice";
import LoadingSpinner from "../../Component/Spinner/LoadingSpinner";
import Multiselect from "multiselect-react-dropdown";
import { servicesList } from "../../Utils/Breeds";
import PhoneInput from "react-phone-number-input";
import { validateBankForm } from "../../Utils/Validation";

const AnyReactComponent = ({ text }) => (
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

const ClinicInfoFillPage = () => {
  const [selectedServices, setSelectedServices] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { clinicId } = useSelector((state) => {
    return state.clinic;
  });
  const [clinicName, setClinicName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [Nationality, setNationality] = useState("");
  const [Location, setLocation] = useState("");
  const [Description, setDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState();
  const [accounNumber, setAccounNumber] = useState("");
  const [accounNumber2, setAccounNumber2] = useState("");
  const [Ifsc, setIfsc] = useState("");
  const [bankName, setBankName] = useState("");
  const [branch, setBranch] = useState("");
  const [iban, setIban] = useState("");
  const [dinNumber, setDinNumber] = useState("");

  const [selectedCoordinates, setSelectedCoordinates] = useState({
    lat: "",
    lng: "",
  });
  const [currentLocation, setCurrentLocation] = useState({
    lat: 0,
    lng: 0,
  });
  const [cityName, setCityName] = useState("");
  const initialSchedule = [
    { day: "Sunday", open: "", close: "", isClosed: false },
    { day: "Monday", open: "", close: "", isClosed: false },
    { day: "Tuesday", open: "", close: "", isClosed: false },
    { day: "Wednesday", open: "", close: "", isClosed: false },
    { day: "Thursday", open: "", close: "", isClosed: false },
    { day: "Friday", open: "", close: "", isClosed: false },
    { day: "Saturday", open: "", close: "", isClosed: false },
  ];
  const [staffNumber, setStaffNumber] = useState("");
  const fileInputRef = useRef(null);
  const [schedule, setSchedule] = useState(initialSchedule);
  const apikey = "AIzaSyBOHuJ-4CqJBjmSi_RugeonwPU5cBVqbeA";
  const handleInputClick = () => {
    setIsModalOpen(true);
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.log("Error getting current location:", error);
        toast.error("Error getting current location");
      }
    );
  }, []);

  const onSelect = (selectedList, selectedItem) => {
    setSelectedServices(selectedList);
    console.log("selectedList", selectedList, "selectedItem", selectedItem);
  };

  const onRemove = (selectedList, removedItem) => {
    setSelectedServices(selectedList);
    console.log("selectedList", selectedList, "removedItem", removedItem);
  };
  const [tradeLicenceFile, setTradeLicenceFile] = useState();
  const [rocFile, setRocFile] = useState();

  const handleFileChange = (event, setFile) => {
    const fileName = event.target.files[0];
    console.log(fileName);
    setFile(fileName);
  };

  const handleMapClick = async ({ lat, lng }) => {
    console.log(lat, lng);
    setLocation("");
    setSelectedCoordinates({ lat, lng });
    const resp = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apikey}`
    );
    console.log(resp.data.results[0].address_components[3].long_name);
    setCityName(resp.data.results[0].address_components[3].long_name);
    const locationAdresss = resp.data.results[0].formatted_address;
    setLocation(locationAdresss);
    setIsModalOpen(false);
  };
  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file) {
      setImage(file);
    }
  };
  const validateForm = () => {
    // Add validation logic here
    setErrors("");
    let errors = "";
    if (
      clinicName === "" ||
      contactNumber === "" ||
      Nationality === "" ||
      Description === "" ||
      !Location ||
      image === null ||
      schedule.length === 0 ||
      staffNumber === ""
    ) {
      errors = "All fields are required";
      setErrors(errors);
      toast.error(errors);
      return false;
    }
    if (selectedServices.length === 0) {
      errors = "Please select atleast one service";
      setErrors(errors);
      toast.error(errors);
      return false;
    }
    if (!selectedCoordinates.lat || !selectedCoordinates.lng) {
      errors = "Please select location from map";
      setErrors(errors);
      toast.error(errors);
      return false;
    }
    if (!accounNumber) {
      errors = "Account number is required";
      setErrors(errors);
      toast.error(errors);
      return false;
    } else if (!/^\d+$/.test(accounNumber)) {
      errors = "Account number should only contain digits";
      setErrors(errors);
      toast.error(errors);
      return false;
    }

    // Re-entered Account Number validation
    if (!accounNumber2) {
      errors = "Please re-enter the account number";
      setErrors(errors);
      toast.error(errors);
      return false;
    } else if (accounNumber !== accounNumber2) {
      errors = "Account numbers do not match";
      setErrors(errors);
      toast.error(errors);
      return false;
    }

    // IFSC validation
    if (!Ifsc) {
      errors = "IFSC is required";
      setErrors(errors);
      toast.error(errors);
      return false;
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(Ifsc)) {
      errors = "Invalid IFSC format";
      setErrors(errors);
      toast.error(errors);
      return false;
    }

    // IBAN validation (basic check, might need to be adjusted based on specific country requirements)
    if (!iban) {
      console.log(iban);
      errors = "IBAN is required";
      setErrors(errors);
      toast.error(errors);
      return false;
    }

    // Bank Name validation
    if (!bankName) {
      errors = "Bank name is required";
      setErrors(errors);
      toast.error(errors);
      return false;
    }

    // Branch validation
    if (!branch) {
      errors = "Branch name is required";
      setErrors(errors);
      toast.error(errors);
      return false;
    }
    return true;
  };
  const handleSubmit = async (event) => {
    setErrors("");
    dispatch(loadSpinner());
    console.log("Form Submitted");
    event.preventDefault();

    if (!validateForm()) {
      dispatch(loadSpinner());
      return;
    }
    setErrors("");
    console.log("hi", clinicId);
    // Handle form submission here (e.g., send login data to server)
    let imageupload;
    let licenseupload;
    let rocupload;
    try {
      imageupload = await uploadImageV2(image);
      if (tradeLicenceFile) {
        licenseupload = await uploadImageV2(tradeLicenceFile);
      }
      if (rocFile) {
        rocupload = await uploadImageV2(rocFile);
      }
    } catch (error) {
      toast.error("Image Upload Failed");
      dispatch(loadSpinner());
    }
    const imageUrl = imageupload?.images[0]?.imageUrl;
    const cliniCsId = JSON.parse(localStorage.getItem("clinicId"));
    console.log({ cliniCsId });
    const wholeForm = {
      clinicName: clinicName,
      contactNumber: contactNumber,
      nationality: Nationality,
      lat: selectedCoordinates.lat,
      lng: selectedCoordinates.lng,
      description: Description,
      image: imageUrl,
      workingDays: schedule,
      id: cliniCsId,
      providingServices: selectedServices,
      location: cityName,
      serviceProvidingCount: parseInt(staffNumber),
      licence: licenseupload.images[0].imageUrl,
      roc: rocupload?.images[0]?.imageUrl,
      din: dinNumber,
      accountNumber: accounNumber,
      ifsc: Ifsc,
      bankName: bankName,
      branch: branch,
      iban: iban,
    };
    console.log({ wholeForm });
    clinicInfoFill(wholeForm)
      .then((response) => {
        console.log("success", response);
        localStorage.setItem("encryptedToken", JSON.stringify(response.data));
        toast.success("Clinic Information Added Successfully");
        localStorage.removeItem("clinicId");
        dispatch(loadSpinner());
        navigate("/loading");
        setErrors("");
      })
      .catch((error) => {
        console.log(error);
        toast.error(error?.response?.data?.message);
      });
  };
  // Function to handle changes in schedule data
  const handleScheduleChange = (index, key, value) => {
    const updatedSchedule = [...schedule];
    console.log("key", key, "value", value);
    if (key === "open" && !isTimeAM(value)) {
      toast.error("Please select a time in the AM.");
      return;
    }
    updatedSchedule[index][key] = value;
    setSchedule(updatedSchedule);
  };

  const isTimeAM = (time) => {
    console.log("time", time);
    const [hours] = time.split(":");
    return hours < 12;
  };
  const renderScheduleRows = () => {
    return schedule.map((dayData, index) => (
      <tr className="text-center" key={index}>
        <td>{dayData.day}</td>
        <td>
          {dayData.isClosed ? (
            <input
              type="time"
              className="w-auto rounded-lg border-2 border-gray-300 bg-gray-200"
              value=""
              disabled
            />
          ) : (
            <input
              type="time"
              className="w-auto rounded-lg border-2 border-gray-300"
              value={dayData.open}
              onChange={(e) =>
                handleScheduleChange(index, "open", e.target.value)
              }
            />
          )}
        </td>
        <td>
          {dayData.isClosed ? (
            <input
              type="time"
              className="w-auto rounded-lg border-2 border-gray-300 bg-gray-200"
              value=""
              disabled
            />
          ) : (
            <input
              type="time"
              className="w-auto rounded-lg border-2 border-gray-300"
              value={dayData.close}
              onChange={(e) =>
                handleScheduleChange(index, "close", e.target.value)
              }
            />
          )}
        </td>
        <td>
          <div className="flex justify-center items-center gap-3">
            <input
              type="checkbox"
              className="rounded-lg h-6 w-6 border-2 border-gray-300 appearance-none checked:bg-orange-500 checked:border-transparent"
              checked={dayData.isClosed}
              onChange={(e) =>
                handleScheduleChange(index, "isClosed", e.target.checked)
              }
            />
            <p className="inline-flex items-center"> Close</p>
          </div>
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <LoadingSpinner />
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div
          className="space-y-8 rounded-xl p-10 shadow-md w-[50%]"
          style={{ backgroundColor: "rgba(243, 243, 245, 0.6)" }}
        >
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">
              Clinic Information
            </h1>
            <p className="text-red-500">{errors}</p>
          </div>
          <div className="space-y-4">
            <div className="flex flex-col-2 gap-2 w-[100%]">
              <div className="flex flex-col w-full">
                <label
                  htmlFor="firstName"
                  className="text-sm font-medium text-gray-700"
                >
                  Clinic Name
                </label>

                <input
                  id="firstName"
                  type="text"
                  placeholder="Enter Your clinic Name"
                  value={clinicName}
                  onChange={(e) => setClinicName(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:ring-w-1 text-gray-700"
                />
              </div>
              <div className="flex flex-col w-full">
                <label
                  htmlFor="lastName"
                  className="text-sm font-medium text-gray-700"
                >
                  Contact Number
                </label>
                <PhoneInput
                  defaultCountry="US"
                  placeholder="Enter phone number"
                  value={contactNumber}
                  onChange={setContactNumber}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:ring-w-1 text-gray-700 "
                  style={{ width: "100%" }}
                  buttonStyle={{ width: "1.5em", height: "1.5em" }}
                  buttonClass="flex items-center justify-center px-2"
                  inputClass=" border-none focus:ring-0 focus:outline-none w-full py-2 px-3"
                />
              </div>
            </div>
            <div className="flex flex-col-2 gap-2">
              <div className="flex flex-col w-full">
                <label
                  htmlFor="Nationality"
                  className="text-sm font-medium text-gray-700"
                >
                  Nationality
                </label>

                <input
                  id="nationality"
                  type="text"
                  placeholder="Enter Your Nationality"
                  value={Nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:ring-w-1 text-gray-700"
                />
              </div>
              <div className="flex flex-col w-full">
                <label
                  htmlFor="lastName"
                  className="text-sm font-medium text-gray-700"
                >
                  Location
                </label>
                <input
                  id="lastName"
                  type=""
                  placeholder="Select Location"
                  value={Location}
                  onClick={handleInputClick}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:ring-w-1 text-gray-700"
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="lastName"
                className="text-sm font-medium text-gray-700"
              >
                How many services provided at a time
              </label>
              <input
                id=""
                onChange={(e) => {
                  setStaffNumber(e.target.value);
                }}
                type="number"
                onKeyDown={(e) =>
                  ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                }
                placeholder="Number of services provided at a time"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:ring-w-1 text-gray-700"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="lastName"
                className="text-sm font-medium text-gray-700"
              >
                Providing Services
              </label>
              <Multiselect
                options={servicesList}
                selectedValues={selectedServices}
                onSelect={onSelect}
                onRemove={onRemove}
                isObject={false}
                customCloseIcon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 ml-1 cursor-pointer"
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
                }
                placeholder="Select Services"
                className="w-full p-1 border rounded bg-input text-foreground"
                style={{
                  chips: {
                    background: "#F5895A",
                    color: "#FFFFFF",
                    borderRadius: "4px",
                  }, // Selected items
                  searchBox: { border: "none" }, // Search box
                  multiselectContainer: {
                    background: "#ffffff",
                    color: "#000000",
                    borderRadius: "4px",
                  },
                  optionContainer: {
                    background: "#FFFFFF", // Options container background
                    color: "#000000", // Options text color
                  },
                  option: {
                    background: "#FFFFFF", // Default option background
                    color: "#000000", // Default option text color
                  },
                }}
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                className="w-full px-3 py-3 h-28 rounded-lg border border-gray-300"
                name=""
                id=""
                placeholder="Enter Description"
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="3"
              ></textarea>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 mb-2"
              >
                Clinic Image
              </label>
            </div>
            <div>
              {/* Clinic Image upload */}
              <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md">
                <label
                  htmlFor="fileInput"
                  className="bg-pink-100 text-pink-600 p-2 rounded-full mb-2 cursor-pointer"
                >
                  {image ? (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="clinic"
                      className="w-20 h-20 rounded-full"
                    />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  )}
                </label>
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileInputChange}
                />
                <p className="text-zinc-800 font-semibold">
                  Drop your image here{" "}
                  <span
                    id="browseLink"
                    className="text-pink-600 cursor-pointer"
                    onClick={handleBrowseClick}
                  >
                    Browse
                  </span>
                </p>
                <p className="text-sm text-zinc-500">Support: JPG, JPEG, PNG</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full">
              <div className="flex flex-col w-full sm:w-1/2">
                <label
                  htmlFor="trade-licence"
                  className="text-muted-foreground mb-2"
                >
                  Trade Licence (Optional)
                </label>
                <div className="relative">
                  <input
                    id="trade-licence"
                    type="file"
                    className="w-full bg-white p-2 border rounded-md pr-12 file:hidden "
                    onChange={(e) => handleFileChange(e, setTradeLicenceFile)}
                  />
                  <button className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 border border-[#F5895A] rounded-md text-accent border-accent">
                    <svg
                      width="24"
                      height="22"
                      viewBox="0 0 23 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.3783 7.9067e-10C11.0334 -1.13775e-05 10.6884 0.122783 10.4134 0.368506L5.56101 4.70333C5.32237 4.91645 5.30174 5.2827 5.51491 5.52133C5.72803 5.75988 6.09419 5.78068 6.33291 5.56743L10.799 1.57776V12.8053C10.799 13.1253 11.0585 13.3847 11.3784 13.3847C11.6983 13.3847 11.9576 13.1253 11.9576 12.8053V1.57776L16.4237 5.56743C16.5342 5.66614 16.6721 5.71483 16.8094 5.71483C16.9687 5.71483 17.1272 5.64951 17.2417 5.52142C17.4548 5.28279 17.4341 4.91663 17.1955 4.70342L12.3431 0.368506C12.068 0.122828 11.7232 1.13791e-05 11.3783 7.9067e-10ZM0.579279 13.7312C0.259309 13.7312 0 13.9906 0 14.3106V16.5242C0 18.4407 1.55927 20 3.47585 20H19.2807C21.1973 20 22.7565 18.4407 22.7565 16.5242V14.3106C22.7565 13.9906 22.4972 13.7312 22.1773 13.7312C21.8574 13.7312 21.5979 13.9906 21.5979 14.3106V16.5242C21.5979 17.8019 20.5584 18.8414 19.2807 18.8414H3.47585C2.19815 18.8414 1.15864 17.8019 1.15864 16.5242V14.3106C1.15864 13.9906 0.899248 13.7312 0.579279 13.7312ZM4.09653 16.0138C3.77665 16.0138 3.51717 16.2732 3.51717 16.5932C3.51717 16.9131 3.77656 17.1724 4.09653 17.1724H18.66C18.98 17.1724 19.2393 16.9131 19.2393 16.5932C19.2393 16.2732 18.9799 16.0138 18.66 16.0138H4.09653Z"
                        fill="#F5895A"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="flex flex-col w-full sm:w-1/2">
                <label htmlFor="roc" className="text-muted-foreground mb-2">
                  ROC (Optional)
                </label>
                <div className="relative">
                  <input
                    id="roc"
                    type="file"
                    className="w-full bg-white p-2 border rounded-md pr-12 appearance-none file:hidden"
                    onChange={(e) => handleFileChange(e, setRocFile)}
                  />
                  <button className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 border border-[#F5895A] rounded-md text-accent border-accent">
                    <svg
                      width="24"
                      height="22"
                      viewBox="0 0 23 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.3783 7.9067e-10C11.0334 -1.13775e-05 10.6884 0.122783 10.4134 0.368506L5.56101 4.70333C5.32237 4.91645 5.30174 5.2827 5.51491 5.52133C5.72803 5.75988 6.09419 5.78068 6.33291 5.56743L10.799 1.57776V12.8053C10.799 13.1253 11.0585 13.3847 11.3784 13.3847C11.6983 13.3847 11.9576 13.1253 11.9576 12.8053V1.57776L16.4237 5.56743C16.5342 5.66614 16.6721 5.71483 16.8094 5.71483C16.9687 5.71483 17.1272 5.64951 17.2417 5.52142C17.4548 5.28279 17.4341 4.91663 17.1955 4.70342L12.3431 0.368506C12.068 0.122828 11.7232 1.13791e-05 11.3783 7.9067e-10ZM0.579279 13.7312C0.259309 13.7312 0 13.9906 0 14.3106V16.5242C0 18.4407 1.55927 20 3.47585 20H19.2807C21.1973 20 22.7565 18.4407 22.7565 16.5242V14.3106C22.7565 13.9906 22.4972 13.7312 22.1773 13.7312C21.8574 13.7312 21.5979 13.9906 21.5979 14.3106V16.5242C21.5979 17.8019 20.5584 18.8414 19.2807 18.8414H3.47585C2.19815 18.8414 1.15864 17.8019 1.15864 16.5242V14.3106C1.15864 13.9906 0.899248 13.7312 0.579279 13.7312ZM4.09653 16.0138C3.77665 16.0138 3.51717 16.2732 3.51717 16.5932C3.51717 16.9131 3.77656 17.1724 4.09653 17.1724H18.66C18.98 17.1724 19.2393 16.9131 19.2393 16.5932C19.2393 16.2732 18.9799 16.0138 18.66 16.0138H4.09653Z"
                        fill="#F5895A"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div class="flex flex-col">
              <label for="din" class="text-muted-foreground mb-2">
                DIN (Optional)
              </label>
              <input
                id="din"
                value={dinNumber}
                onChange={(e) => setDinNumber(e.target.value)}
                type="text"
                class="p-2 border rounded-md"
              />
            </div>
            <div className="w-full scroll-none overflow-x-auto">
              <table className="w-full border-separate border-spacing-4 ">
                <thead>
                  <tr className="">
                    <th></th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th className=""></th>
                  </tr>
                </thead>
                <tbody>{renderScheduleRows()}</tbody>
              </table>
            </div>
          </div>
          <div class="">
            <h2 class="text-lg font-semibold text-card-foreground mb-4">
              Add Your Bank Account
            </h2>
            <form>
              <div class="mb-4">
                <label
                  for="account-number"
                  class="block text-sm font-medium text-muted-foreground"
                >
                  Account Number
                </label>
                <input
                  type="number"
                  onKeyDown={(e) =>
                    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                  }
                  id="account-number"
                  value={accounNumber}
                  onChange={(e) => setAccounNumber(e.target.value)}
                  class="mt-1 block w-full p-2 border border-input rounded-md bg-background text-foreground"
                />
              </div>
              <div class="mb-4">
                <label
                  for="reenter-account-number"
                  class="block text-sm font-medium text-muted-foreground"
                >
                  Re-enter Account Number
                </label>
                <input
                  type="number"
                  onKeyDown={(e) =>
                    ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
                  }
                  id="reenter-account-number"
                  value={accounNumber2}
                  onChange={(e) => setAccounNumber2(e.target.value)}
                  class="mt-1 block w-full p-2 border border-input rounded-md bg-background text-foreground"
                />
              </div>
              <div class="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    for="ifsc"
                    class="block text-sm font-medium text-muted-foreground"
                  >
                    Ifsc
                  </label>
                  <input
                    type="text"
                    id="ifsc"
                    value={Ifsc}
                    onChange={(e) => setIfsc(e.target.value)}
                    class="mt-1 block w-full p-2 border border-input rounded-md bg-background text-foreground"
                  />
                </div>
                <div>
                  <label
                    for="iban"
                    class="block text-sm font-medium text-muted-foreground"
                  >
                    Iban
                  </label>
                  <input
                    type="text"
                    id="iban"
                    value={iban}
                    onChange={(e) => setIban(e.target.value)}
                    class="mt-1 block w-full p-2 border border-input rounded-md bg-background text-foreground"
                  />
                </div>
              </div>
              <div class="mb-4">
                <label
                  for="bank-name"
                  class="block text-sm font-medium text-muted-foreground"
                >
                  Bank Name
                </label>
                <input
                  type="text"
                  id="bank-name"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  class="mt-1 block w-full p-2 border border-input rounded-md bg-background text-foreground"
                />
              </div>
              <div class="mb-4">
                <label
                  for="branch"
                  class="block text-sm font-medium text-muted-foreground"
                >
                  Branch
                </label>
                <input
                  type="text"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  id="branch"
                  class="mt-1 block w-full p-2 border border-input rounded-md bg-background text-foreground"
                />
              </div>
            </form>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex w-[40%] justify-center px-4 py-2 bg-orange-500 text-white rounded-xl hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
          <div className="w-3/4 h-3/4 bg-white rounded-lg shadow-lg scroll-none overflow-hidden">
            <GoogleMapReact
              bootstrapURLKeys={{
                key: import.meta.env.VITE_REACT_APP_GOOGLE_MAP_API_KEY,
              }} // Replace "YOUR_API_KEY" with your actual Google Maps API key
              // center={{ lat: 10.99835602, lng: 77.01502627 }}
              defaultCenter={currentLocation}
              defaultZoom={11}
              onClick={handleMapClick}
            >
              {selectedCoordinates.lat && selectedCoordinates.lng && (
                <AnyReactComponent
                  lat={selectedCoordinates.lat}
                  lng={selectedCoordinates.lng}
                  text="Selected Location"
                />
              )}
            </GoogleMapReact>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClinicInfoFillPage;
