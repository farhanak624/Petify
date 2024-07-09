import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminPrivateRoute = () => {
  const user = JSON.parse(localStorage.getItem("encryptedToken"));
  return user?.role === "admin" ? <Outlet /> : <Navigate to="/login" />;
};

export default AdminPrivateRoute;
