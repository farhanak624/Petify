import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import { getProfileStatus } from "../Api/ClinicApi";

const CheckVerifyStatus = () => {
  const navigate = useNavigate();
  const [userStatus, setUserStatus] = useState()
  console.log("in checkverifystatus");
  const user = JSON.parse(localStorage.getItem("encryptedToken"));
  
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("encryptedToken"));
  //   console.log("verifystatus", user);
  //   getStatus(user?.clinicId);
  // }, [user?.clinicId]);
  // const getStatus = (clinicId) => {
  //   getProfileStatus(clinicId).then((res) => {
  //     console.log("res", res.data);
  //     setUserStatus(res.data.clinicDetails)
  //   });
  // };
  if (!user) {
    // Redirect to login if user not logged in
    // return navigate("/login");
    return <Navigate to="/login" />;
    // return <Link to={"/login"}/>
  }

  // Check verification status and navigate accordingly
  if (
    user?.verificationStatus === "approved" &&
    user?.isAdminVerified === true &&
    user?.isSlotCompleted === true
  ) {
    console.log("in approved");
    return <Outlet />;
    // return <Navigate to="/" />;
    // return <Link to="/"/>
  } else if (
    user.verificationStatus === "pending" &&
    user.isAdminVerified === false &&
    user.isSlotCompleted === true
  ) {
    return navigate("/loading");
    // return <Navigate to="/loading" />;
  } else if (
    user.verificationStatus === "rejected" &&
    user.isAdminVerified === false
  ) {
    return navigate("/declined");
    // return <Navigate to="/declined" />;
  } else {
    // Handle other cases, e.g., blocked or any other status
    return <Navigate to="/blocked" />;
  }
};

export default CheckVerifyStatus;
