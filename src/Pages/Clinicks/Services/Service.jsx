import React, { useEffect, useState } from "react";
import clinicNav from "../../../Component/Layout/Clinick/ClinickNav";
import Card from "../../Admin/Clinicks/ClinicksOverView/Card";
import { Input } from "@mui/material";
import DragDrop from "./DragDrop";
import { CreateService, createServiceForm } from "../../../Api/ClinicApi";
import { getServices } from "../../../Api/ClinicApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { uploadImageV2 } from "../../../imageUpload";
import { loadSpinner } from "../../../Redux/Features/ClinicSlice";
const Service = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(false);
  const [bookingForm, setBookingForm] = useState(false);
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [formFields, setFormFields] = useState([]);
  const clinicId = useSelector((i) => i.clinic.clinicId);
  const [drop, setDrop] = useState(false);
  const [service, setService] = useState();
  const [services, setServices] = useState([]);
  const [availableServices, setAvailableServices] = useState([]);
  const [submit, setSubmit] = useState(false);
  const [type, setType] = useState({
    onsite: false,
    offsite: false,
  });
  useEffect(() => {
    dispatch(loadSpinner());
    (async () => {
      try {
        const res = await getServices();
        setServices(res.data.services);
        setAvailableServices(res.data.availableServicesData);
        dispatch(loadSpinner());
      } catch (error) {
        console.log(error);
        dispatch(loadSpinner());
      }
    })();
  }, [submit]);
  console.log(services);
  const handleChange = (event) => {
    const { name, checked } = event.target;
    setType((prevOptions) => ({
      ...prevOptions,
      [name]: checked,
    }));
  };
  const handleFileInputChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setImg(selectedFile);
    }
  };
  const addForm = () => {
    if (formFields.length > 0 && bookingForm) {
      setFormFields([]);
    }
    console.log("formFields", bookingForm);
    setBookingForm(!bookingForm);
  };
  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!duration.trim()) {
        toast.error("Service duration is required!");
      } else if (!type.onsite && !type.offsite) {
        toast.error("Service type is required!");
      } else {
        const res = await CreateService({});
        toast(res.data.message);
        setDuration("");
        setType({
          onsite: false,
          offsite: false,
        });
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  const handleServiceChange = (id,name) => {
    setDrop(false);
    setForm(true);
    setName(name);
    setService(`${id}`);
  };
  const handleForm = () => {
    console.log("drop");
    setDrop(!drop);
    setForm(true);
    setService("");
  };
  const addService = async () => {
    try {
      if (!name.trim()) {
        toast.error("Service name is required!");
      } else if (!duration.trim()) {
        toast.error("Service duration is required!");
      } else if (!type.onsite && !type.offsite) {
        toast.error("Service type is required!");
      } else if (formFields.length === 0) {
        toast.error("Service form is required!");
      } else {
        const res = await CreateService({
          serviceName: name,
          duration:parseInt(duration),
          isOnsite: type.onsite,
          isOffsite: type.offsite,
          formFields: [...formFields],
        });
        toast(res.data.message);
        setForm(false);
        setSubmit(true)
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const serviceSubmission = async () => {
    try {
      if (!duration.trim()) {
        toast.error("Service duration is required!");
      } else if (!type.onsite && !type.offsite) {
        toast.error("Service type is required!");
      } else if (formFields.length === 0) {
        toast.error("Service form is required!");
      } else {
        const res = await createServiceForm({
          serviceId: service,
          duration: parseInt(duration),
          isOnsite: type.onsite,
          isOffsite: type.offsite,
          formFields: [...formFields],
        });
        toast(res.data.message);
        setForm(false);
        setSubmit(true)
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (service) {
        serviceSubmission();
      } else {
        addService();
      }
      //   if (!name.trim()) {
      //     toast.error("Service name is required!");
      //   } else if (!duration.trim()) {
      //     toast.error("Service duration is required!");
      //   } else if (!maxConcurrency.trim()) {
      //     toast.error("No. of service at a time is required!");
      //   } else if (!img) {
      //     toast.error("Service image is required!");
      //   } else {
      //     const imageupload = await uploadImageV2(img);
      //     const imageUrl = imageupload.images[0].imageUrl;

      //     const res = await CreateService({
      //       clinic: clinicId,
      //       serviceName: name,
      //       serviceImage: imageUrl,
      //       maxConcurrency,
      //       duration,
      //       formFields: [...formFields],
      //     });

      //     toast(res.data.message);
      //     setFormFields([]);
      //     setName("");
      //     setDuration("");
      //     setImg();
      //     setMaxConcurrency("");
      //     setBookingForm(!bookingForm);
      //   }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    useEffect(() => {
      if (submit) {
        toast.success("Service added successfully");
      }
    },[submit])
  };
  return (
    <div className="">
      <div className="p-6">
        <div>
          <h1 className="font-semibold text-xl mx-1 ">Services</h1>
        </div>
        <div className="md:grid grid-cols-1 gap-4 md:space-y-0 space-y-3 md:grid-cols-5 my-6">
          {availableServices.map((service, index) => {
            return (
              <div>
                <Card
                  color={"linear-gradient(321.77deg, #FE8EAB 0%, #FFBC96 100%"}
                  title={`${service.serviceName}`}
                  total={service?.totalBookings}
                  status={service?.totalBookings - service?.lastweekBookings}
                />
              </div>
            );
          })}
        </div>
        <div className="relative">
          <button
            onClick={() => setDrop(!drop)}
            style={{ backgroundColor: "rgba(245, 137, 90, 0.1)" }}
            className=" rounded-lg p-2 px-3 flex"
          >
            Add Service{" "}
            <svg
              className="m-2.5"
              width="10"
              height="7"
              viewBox="0 0 10 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.142857 0.904948C-0.047619 1.09542 -0.047619 1.38114 0.142857 1.57162L4.66667 6.09542C4.85714 6.2859 5.14286 6.2859 5.33333 6.09542L9.85714 1.57162C9.95238 1.47638 10 1.35733 10 1.23828C10 1.11923 9.95238 1.00019 9.85714 0.904948C9.66667 0.714472 9.38095 0.714472 9.19048 0.904948L5 5.09542L0.809524 0.904948C0.619048 0.714472 0.333333 0.714472 0.142857 0.904948Z"
                fill="black"
              />
            </svg>
          </button>
          {drop && (
            <div className="top-12 absolute left-20 bg-orange-50 p-3 z-30 h-52 overflow-y-auto">
              <button onClick={handleForm} className=" text-sm flex text-orange-600 hover:text-orange-900">
                <svg
                  className=" mr-2"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.92866 0C-2.64163 0.334686 -2.64414 15.6637 7.92866 16C18.4988 15.6653 18.5013 0.336286 7.92866 0ZM7.92866 14.8571C-1.13146 14.5703 -1.13357 1.43103 7.92866 1.14286C16.9888 1.42971 16.9909 14.5689 7.92866 14.8571ZM11.9287 8.57143H8.50009V12C8.50009 12.1516 8.43988 12.2969 8.33272 12.4041C8.22556 12.5112 8.08021 12.5714 7.92866 12.5714C7.7771 12.5714 7.63176 12.5112 7.5246 12.4041C7.41743 12.2969 7.35723 12.1516 7.35723 12V8.57143H3.92866C3.7771 8.57143 3.63176 8.51123 3.5246 8.40406C3.41743 8.2969 3.35723 8.15155 3.35723 8C3.35723 7.84845 3.41743 7.7031 3.5246 7.59594C3.63176 7.48878 3.7771 7.42857 3.92866 7.42857H7.35723V4C7.35723 3.84845 7.41743 3.7031 7.5246 3.59594C7.63176 3.48878 7.7771 3.42857 7.92866 3.42857C8.08021 3.42857 8.22556 3.48878 8.33272 3.59594C8.43988 3.7031 8.50009 3.84845 8.50009 4V7.42857H11.9287C12.0802 7.42857 12.2256 7.48878 12.3327 7.59594C12.4399 7.7031 12.5001 7.84845 12.5001 8C12.5001 8.15155 12.4399 8.2969 12.3327 8.40406C12.2256 8.51123 12.0802 8.57143 11.9287 8.57143Z"
                    fill="#F5895A"
                  />
                </svg>
                Add New Service
              </button>
              <div className=" bg-">
                <input type="text" />
              </div>
              {services.map((service, index) => {
                return (
                  <p
                    key={index}
                    onClick={() => {
                      handleServiceChange(service._id,service.serviceName);
                    }}
                    className="py-2 rounded-lg px-1 text-sm hover:bg-white cursor-pointer"
                  >
                    {service.serviceName}
                  </p>
                );
              })}
            </div>
          )}
        </div>
      </div>
      {form && (
        <div className="px-6">
          <div className="border-b border-b-gray-200 shadow-sm pb-1 mb-2 w-fit">
            <h2 className="font-semibold">Create Service</h2>
          </div>
          <ToastContainer position="top-center" />
          <form onSubmit={handleSubmit}>
            <div className="md:grid-cols-3 my-3 grid grid-cols-1 justify-between  md:w-3/5">
              <div className="flex flex-col ">
                <label className="text-gray-500 text-sm" htmlFor="">
                  Service
                </label>
                <input
                  type="text"
                  className="my-2 mr-6 p-2 rounded-lg bg-gray-200 focus:outline-none z-20"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={service ? true : false}
                  id="name"
                />
              </div>

              <div className="flex flex-col mx-2 md:mt-0 mt-12 ">
                <label className="text-gray-500 text-sm" htmlFor="">
                  Service Duration
                </label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="my-2 p-2 mr-6 rounded-lg bg-gray-200 focus:outline-none"
                />
              </div>
              {/* add it in the above form 153 */}
              <div className="flex flex-col mx-2 md:mt-0 mt-12 ">
                <label className="text-gray-500 text-sm" htmlFor="">
                  Service Type
                </label>
                <div className="my-2 p-2 mr-6 rounded-lg w-full bg-gray-200 focus:outline-none flex">
                  <label style={{backgroundColor:'rgba(245, 137, 90, 0.8)'}} className="mx-3 p-1   rounded-lg px-3 text-sm font-semibold">
                    Onsite
                    <input
                    
                      type="checkbox"
                      name="onsite"
                      checked={type.onsite}
                      onChange={handleChange}
                    />
                  </label>
                  <br />
                  <label  style={{backgroundColor:'rgba(245, 137, 90, 0.8)'}}  className="mx-3 p-1 rounded-lg px-2 text-sm font-semibold">
                    Offsite
                    <input
                      type="checkbox"
                      name="offsite"
                      checked={type.offsite}
                      onChange={handleChange}
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className="flex w-fit h-12 mt-8" onClick={addForm}>
              <div
                className="text-white p-2 px-7 h-12 -ml-6 w-fit flex"
                style={{ backgroundColor: "rgba(245, 137, 90, 1)" }}
              >
                Add Form
              </div>
              <div
                className="text-3xl -ml-5 text-white text-center w-12 h-12 rounded-full "
                style={{ backgroundColor: "rgba(255, 150, 105, 1)" }}
              >
                <p className="z-50 pt-0.5">+</p>
              </div>
              <img
                src="/round-gif.gif"
                className="w-36 opacity-50 h-48 pt-1.5 pr-8 z-10 -ml-20 -mt-20 "
                alt=""
              />
            </div>

            <div
              className={`-mt-10 flex mb-3 ${
                bookingForm ? "slide-in" : "slide-out"
              } pt-12`}
            >
              <div className="w-1/3"></div>
              <svg
                width="760"
                height="14"
                viewBox="0 0 760 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  y1="6.7"
                  x2="760"
                  y2="6.7"
                  stroke="black"
                  stroke-opacity="0.4"
                  stroke-width="0.6"
                  stroke-dasharray="10 10"
                />
                <rect x="335" width="92" height="14" fill="white" />
                <path
                  d="M357.398 8.33984H358.119C358.061 8.91406 357.902 9.41016 357.645 9.82812C357.387 10.2422 357.035 10.5605 356.59 10.7832C356.145 11.0059 355.607 11.1172 354.979 11.1172C354.494 11.1172 354.055 11.0254 353.66 10.8418C353.27 10.6582 352.934 10.3984 352.652 10.0625C352.371 9.72266 352.154 9.31641 352.002 8.84375C351.85 8.37109 351.773 7.8457 351.773 7.26758V6.20117C351.773 5.62305 351.85 5.09961 352.002 4.63086C352.154 4.1582 352.373 3.75195 352.658 3.41211C352.943 3.07227 353.285 2.81055 353.684 2.62695C354.082 2.44336 354.531 2.35156 355.031 2.35156C355.637 2.35156 356.16 2.46289 356.602 2.68555C357.043 2.9043 357.391 3.2207 357.645 3.63477C357.902 4.04883 358.061 4.54883 358.119 5.13477H357.398C357.344 4.67383 357.223 4.2832 357.035 3.96289C356.848 3.64258 356.588 3.39844 356.256 3.23047C355.928 3.05859 355.52 2.97266 355.031 2.97266C354.633 2.97266 354.277 3.04883 353.965 3.20117C353.652 3.35352 353.387 3.57227 353.168 3.85742C352.949 4.13867 352.781 4.47656 352.664 4.87109C352.551 5.26562 352.494 5.70508 352.494 6.18945V7.26758C352.494 7.73633 352.549 8.16797 352.658 8.5625C352.768 8.95703 352.928 9.29883 353.139 9.58789C353.354 9.87695 353.615 10.1016 353.924 10.2617C354.232 10.4219 354.584 10.502 354.979 10.502C355.482 10.502 355.902 10.4219 356.238 10.2617C356.578 10.0977 356.842 9.85547 357.029 9.53516C357.217 9.21484 357.34 8.81641 357.398 8.33984ZM360.41 5.70898V11H359.713V4.66016H360.393L360.41 5.70898ZM362.654 4.61328L362.637 5.25781C362.559 5.24609 362.482 5.23633 362.408 5.22852C362.334 5.2207 362.254 5.2168 362.168 5.2168C361.863 5.2168 361.596 5.27344 361.365 5.38672C361.139 5.49609 360.947 5.65039 360.791 5.84961C360.635 6.04492 360.516 6.27539 360.434 6.54102C360.352 6.80273 360.305 7.08398 360.293 7.38477L360.035 7.48438C360.035 7.07031 360.078 6.68555 360.164 6.33008C360.25 5.97461 360.381 5.66406 360.557 5.39844C360.736 5.12891 360.961 4.91992 361.23 4.77148C361.504 4.61914 361.824 4.54297 362.191 4.54297C362.281 4.54297 362.369 4.55078 362.455 4.56641C362.545 4.57812 362.611 4.59375 362.654 4.61328ZM366.088 11.1172C365.674 11.1172 365.293 11.041 364.945 10.8887C364.602 10.7363 364.301 10.5215 364.043 10.2441C363.789 9.9668 363.592 9.63867 363.451 9.25977C363.314 8.87695 363.246 8.45898 363.246 8.00586V7.75391C363.246 7.26562 363.318 6.82422 363.463 6.42969C363.607 6.03516 363.807 5.69727 364.061 5.41602C364.314 5.13477 364.604 4.91992 364.928 4.77148C365.256 4.61914 365.6 4.54297 365.959 4.54297C366.361 4.54297 366.719 4.61523 367.031 4.75977C367.344 4.90039 367.605 5.10156 367.816 5.36328C368.031 5.62109 368.193 5.92773 368.303 6.2832C368.412 6.63477 368.467 7.02344 368.467 7.44922V7.87695H363.668V7.2793H367.77V7.19727C367.762 6.8418 367.689 6.50977 367.553 6.20117C367.42 5.88867 367.221 5.63477 366.955 5.43945C366.689 5.24414 366.357 5.14648 365.959 5.14648C365.662 5.14648 365.389 5.20898 365.139 5.33398C364.893 5.45898 364.68 5.63867 364.5 5.87305C364.324 6.10352 364.188 6.37891 364.09 6.69922C363.996 7.01562 363.949 7.36719 363.949 7.75391V8.00586C363.949 8.35742 364 8.68555 364.102 8.99023C364.207 9.29102 364.355 9.55664 364.547 9.78711C364.742 10.0176 364.973 10.1973 365.238 10.3262C365.504 10.4551 365.797 10.5195 366.117 10.5195C366.492 10.5195 366.824 10.4512 367.113 10.3145C367.402 10.1738 367.662 9.95312 367.893 9.65234L368.332 9.99219C368.195 10.1953 368.023 10.3828 367.816 10.5547C367.613 10.7266 367.369 10.8633 367.084 10.9648C366.799 11.0664 366.467 11.1172 366.088 11.1172ZM373.705 9.86328V6.59375C373.705 6.29297 373.643 6.0332 373.518 5.81445C373.393 5.5957 373.209 5.42773 372.967 5.31055C372.725 5.19336 372.426 5.13477 372.07 5.13477C371.742 5.13477 371.449 5.19336 371.191 5.31055C370.938 5.42383 370.736 5.57812 370.588 5.77344C370.443 5.96484 370.371 6.17773 370.371 6.41211L369.668 6.40625C369.668 6.16797 369.727 5.9375 369.844 5.71484C369.961 5.49219 370.127 5.29297 370.342 5.11719C370.557 4.94141 370.812 4.80273 371.109 4.70117C371.41 4.5957 371.74 4.54297 372.1 4.54297C372.553 4.54297 372.951 4.61914 373.295 4.77148C373.643 4.92383 373.914 5.15234 374.109 5.45703C374.305 5.76172 374.402 6.14453 374.402 6.60547V9.66992C374.402 9.88867 374.418 10.1152 374.449 10.3496C374.484 10.584 374.533 10.7773 374.596 10.9297V11H373.852C373.805 10.8594 373.768 10.6836 373.74 10.4727C373.717 10.2578 373.705 10.0547 373.705 9.86328ZM373.869 7.30859L373.881 7.84766H372.504C372.145 7.84766 371.822 7.88086 371.537 7.94727C371.256 8.00977 371.018 8.10352 370.822 8.22852C370.627 8.34961 370.477 8.49609 370.371 8.66797C370.27 8.83984 370.219 9.03516 370.219 9.25391C370.219 9.48047 370.275 9.6875 370.389 9.875C370.506 10.0625 370.67 10.2129 370.881 10.3262C371.096 10.4355 371.35 10.4902 371.643 10.4902C372.033 10.4902 372.377 10.418 372.674 10.2734C372.975 10.1289 373.223 9.93945 373.418 9.70508C373.613 9.4707 373.744 9.21484 373.811 8.9375L374.115 9.3418C374.064 9.53711 373.971 9.73828 373.834 9.94531C373.701 10.1484 373.527 10.3398 373.312 10.5195C373.098 10.6953 372.844 10.8398 372.551 10.9531C372.262 11.0625 371.934 11.1172 371.566 11.1172C371.152 11.1172 370.791 11.0391 370.482 10.8828C370.178 10.7266 369.939 10.5137 369.768 10.2441C369.6 9.9707 369.516 9.66211 369.516 9.31836C369.516 9.00586 369.582 8.72656 369.715 8.48047C369.848 8.23047 370.039 8.01953 370.289 7.84766C370.543 7.67188 370.848 7.53906 371.203 7.44922C371.562 7.35547 371.965 7.30859 372.41 7.30859H373.869ZM378.68 4.66016V5.23438H375.504V4.66016H378.68ZM376.67 3.03125H377.367V9.45898C377.367 9.75195 377.406 9.97266 377.484 10.1211C377.562 10.2695 377.664 10.3691 377.789 10.4199C377.914 10.4707 378.049 10.4961 378.193 10.4961C378.299 10.4961 378.4 10.4902 378.498 10.4785C378.596 10.4629 378.684 10.4473 378.762 10.4316L378.791 11.0234C378.705 11.0508 378.594 11.0723 378.457 11.0879C378.32 11.1074 378.184 11.1172 378.047 11.1172C377.777 11.1172 377.539 11.0684 377.332 10.9707C377.125 10.8691 376.963 10.6973 376.846 10.4551C376.729 10.209 376.67 9.875 376.67 9.45312V3.03125ZM383.965 2.46875V11H383.244V2.46875H383.965ZM387.938 6.39453V7.01562H383.725V6.39453H387.938ZM388.529 2.46875V3.08984H383.725V2.46875H388.529ZM389.314 7.92969V7.73633C389.314 7.27539 389.381 6.84961 389.514 6.45898C389.646 6.06836 389.836 5.73047 390.082 5.44531C390.332 5.16016 390.631 4.93945 390.979 4.7832C391.326 4.62305 391.713 4.54297 392.139 4.54297C392.568 4.54297 392.957 4.62305 393.305 4.7832C393.652 4.93945 393.951 5.16016 394.201 5.44531C394.451 5.73047 394.643 6.06836 394.775 6.45898C394.908 6.84961 394.975 7.27539 394.975 7.73633V7.92969C394.975 8.39062 394.908 8.81641 394.775 9.20703C394.643 9.59375 394.451 9.92969 394.201 10.2148C393.955 10.5 393.658 10.7227 393.311 10.8828C392.963 11.0391 392.576 11.1172 392.15 11.1172C391.721 11.1172 391.332 11.0391 390.984 10.8828C390.637 10.7227 390.338 10.5 390.088 10.2148C389.838 9.92969 389.646 9.59375 389.514 9.20703C389.381 8.81641 389.314 8.39062 389.314 7.92969ZM390.012 7.73633V7.92969C390.012 8.27734 390.059 8.60742 390.152 8.91992C390.246 9.22852 390.383 9.50391 390.562 9.74609C390.742 9.98438 390.965 10.1719 391.23 10.3086C391.496 10.4453 391.803 10.5137 392.15 10.5137C392.494 10.5137 392.797 10.4453 393.059 10.3086C393.324 10.1719 393.547 9.98438 393.727 9.74609C393.906 9.50391 394.041 9.22852 394.131 8.91992C394.225 8.60742 394.271 8.27734 394.271 7.92969V7.73633C394.271 7.39258 394.225 7.06641 394.131 6.75781C394.041 6.44922 393.904 6.17383 393.721 5.93164C393.541 5.68945 393.318 5.49805 393.053 5.35742C392.787 5.2168 392.482 5.14648 392.139 5.14648C391.795 5.14648 391.49 5.2168 391.225 5.35742C390.963 5.49805 390.74 5.68945 390.557 5.93164C390.377 6.17383 390.24 6.44922 390.146 6.75781C390.057 7.06641 390.012 7.39258 390.012 7.73633ZM397.125 5.70898V11H396.428V4.66016H397.107L397.125 5.70898ZM399.369 4.61328L399.352 5.25781C399.273 5.24609 399.197 5.23633 399.123 5.22852C399.049 5.2207 398.969 5.2168 398.883 5.2168C398.578 5.2168 398.311 5.27344 398.08 5.38672C397.854 5.49609 397.662 5.65039 397.506 5.84961C397.35 6.04492 397.23 6.27539 397.148 6.54102C397.066 6.80273 397.02 7.08398 397.008 7.38477L396.75 7.48438C396.75 7.07031 396.793 6.68555 396.879 6.33008C396.965 5.97461 397.096 5.66406 397.271 5.39844C397.451 5.12891 397.676 4.91992 397.945 4.77148C398.219 4.61914 398.539 4.54297 398.906 4.54297C398.996 4.54297 399.084 4.55078 399.17 4.56641C399.26 4.57812 399.326 4.59375 399.369 4.61328ZM401.133 5.97266V11H400.43V4.66016H401.104L401.133 5.97266ZM401.004 7.4375L400.664 7.26172C400.688 6.88672 400.758 6.53516 400.875 6.20703C400.996 5.87891 401.164 5.58984 401.379 5.33984C401.594 5.08984 401.852 4.89453 402.152 4.75391C402.453 4.61328 402.795 4.54297 403.178 4.54297C403.486 4.54297 403.766 4.58594 404.016 4.67188C404.27 4.75391 404.484 4.88477 404.66 5.06445C404.84 5.24023 404.979 5.4707 405.076 5.75586C405.174 6.04102 405.223 6.38281 405.223 6.78125V11H404.525V6.80469C404.525 6.38281 404.459 6.05273 404.326 5.81445C404.197 5.57617 404.016 5.40625 403.781 5.30469C403.551 5.20312 403.283 5.15234 402.979 5.15234C402.619 5.15234 402.314 5.22656 402.064 5.375C401.818 5.51953 401.617 5.70898 401.461 5.94336C401.309 6.17383 401.195 6.42188 401.121 6.6875C401.047 6.94922 401.008 7.19922 401.004 7.4375ZM405.217 6.88672L404.748 6.89844C404.768 6.58984 404.838 6.29492 404.959 6.01367C405.084 5.73242 405.254 5.48242 405.469 5.26367C405.684 5.04102 405.939 4.86523 406.236 4.73633C406.537 4.60742 406.875 4.54297 407.25 4.54297C407.578 4.54297 407.871 4.58789 408.129 4.67773C408.387 4.76367 408.604 4.90234 408.779 5.09375C408.959 5.28125 409.096 5.52148 409.189 5.81445C409.283 6.10742 409.33 6.45898 409.33 6.86914V11H408.627V6.86328C408.627 6.41406 408.561 6.06641 408.428 5.82031C408.299 5.57031 408.119 5.39648 407.889 5.29883C407.658 5.20117 407.389 5.15234 407.08 5.15234C406.775 5.15625 406.508 5.21289 406.277 5.32227C406.047 5.42773 405.854 5.56836 405.697 5.74414C405.545 5.91602 405.428 6.10156 405.346 6.30078C405.268 6.5 405.225 6.69531 405.217 6.88672Z"
                  fill="black"
                  fill-opacity="0.6"
                />
              </svg>
            </div>
            <DragDrop
              bookingForm={bookingForm}
              formFields={formFields}
              setFormFields={setFormFields}
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default Service;
