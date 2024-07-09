import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getProfileStatus } from "../Api/ClinicApi";
import { useDispatch, useSelector } from "react-redux";

const ClinicPrivateRoute = () => {
  const dispatch = useDispatch();
  const [userStatus, setUserStatus] = useState();
  const user = JSON.parse(localStorage.getItem("encryptedToken"));
  
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("encryptedToken"));
  //   console.log("user", user);
  //   getStatus(user?.clinicId);
  // }, []);
  // const getStatus = (clinicId) => {
  //   getProfileStatus(clinicId).then((res) => {
  //     console.log("res", res.data);
  //     setUserStatus(res.data.clinicDetails);
  //   });
  // };
  if (!user) {
    return <Navigate to="/login" />;
  }
  console.log("user", user);
  if (user.isSlotCompleted === false) {
    console.log("in slot");
    return <Navigate to="/clinic-fillup" />;
  }
  if (
    user.role === "clinic" &&
    user.verificationStatus === "approved" &&
    user.isAdminVerified === true
  ) {
    console.log("here");
    return <Outlet />;
  }
  if (
    user.role === "clinic" &&
    user.verificationStatus === "pending" &&
    user.isAdminVerified === false
  ) {
    console.log("in pending");
    return <Navigate to="/loading" />;
  }
  if (
    user.role === "clinic" &&
    user.verificationStatus === "rejected" &&
    user.isAdminVerified === false
  ) {
    return <Navigate to="/declined" />;
  }
  if (
    user.role === "clinic" &&
    user.verificationStatus === "blocked" &&
    user.isAdminVerified === false
  ) {
    return <Navigate to="/blocked" />;
  }
};

export default ClinicPrivateRoute;
