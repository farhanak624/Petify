import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const CheckLogin = () => {
  const user = JSON.parse(localStorage.getItem("encryptedToken"));
  console.log("CheckLogin", user);
  return user?.role == "admin" ? (
    <Navigate to="/" />
  ) : user?.isSlotCompleted ? (
    <Navigate to="/clinicks" />
  ) : user?.role == "clinic" && user?.isSlotCompleted ? (
    <Navigate to="/clinic-fillup" />
  ) : (
    <Outlet />
  );
};

export default CheckLogin;
