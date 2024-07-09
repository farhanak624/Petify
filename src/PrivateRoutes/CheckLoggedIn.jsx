import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { getProfileStatus } from "../Api/ClinicApi";

const CheckLoggedIn = () => {
  const navigate = useNavigate();
  const [userStatus, setUserStatus] = useState()
  
  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem("encryptedToken"));
  //   console.log("checkloggedin", user?.role);
  //   getStatus(user?.clinicId);
  // }, [user?.clinicId]);
  // const getStatus = (clinicId) => {
  //   getProfileStatus(clinicId).then((res) => {
  //     console.log("res", res.data);
  //     setUserStatus(res.data.clinicDetails)
  //   });
  // };
  const user = JSON.parse(localStorage.getItem("encryptedToken"));

  if (!user) {
    console.log("hii");
    // Redirect to login if user not logged in
    return <Navigate to="/login" /> 
  }
//   return user?.role == "admin" ? (
//     <Navigate to="/admin" />
//   ) : user?.role == "clinic" ? (
//     <Navigate to="/" />
//   ) : (
//     <Outlet />
//   );
console.log("userStatus", userStatus);
if(user?.isAdminVerified === true && user?.adminVerifyStatus === "approved" && user?.isSlotCompleted === true){
  console.log("in approved");
  return <Navigate to={"/clinics"}/>
}
if(user?.isAdminVerified === false && user?.adminVerifyStatus === "pending" && user?.isSlotCompleted === false){
  console.log("infillup");
  return <Navigate to={"/clinic-fillup"}/>
}
console.log("to pending");
if(user?.isAdminVerified === false && user?.adminVerifyStatus === "pending"){
  console.log("in pending");
  return <Outlet/>
}
console.log("to declined");
if(user?.isAdminVerified === false && user?.adminVerifyStatus === "rejected"){
  return <Outlet/>
}
console.log("to blocked");
if(user?.isAdminVerified === false && user?.adminVerifyStatus === "blocked"){
  return <Outlet/>
}


return user?.isAdminVerified === false ? 
    <Outlet/>
    : <Navigate to={"/clinics"}/>

};

export default CheckLoggedIn;
