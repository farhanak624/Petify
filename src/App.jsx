import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Pages/Admin/Dashboard/Dashboard";
import ClinickDashboard from "./Pages/Clinicks/Dashboard/Dashboard";
import ClinicksOverview from "./Pages/Admin/Clinicks/ClinicksOverView/ClinicksOverView";
import AdminHome from "./Pages/AdminHome";
import ClinicHome from "./Pages/ClinicHome";
import Login from "./Pages/AuthPage/Login";
import Signup from "./Pages/AuthPage/SignUp";
import OtpVerification from "./Pages/AuthPage/OtpVerification";
import ClinicInfoFillPage from "./Pages/AuthPage/ClinicInfoFillPage";
import Loading from "./Component/Loading/Loading";
import Blocked from "./Component/Loading/Blocked";
import ClinicPrivateRoute from "./PrivateRoutes/ClinicPrivateRoute";
import AdminPrivateRoute from "./PrivateRoutes/AdminPrivateRoute";
import { ToastContainer } from "react-toastify";
import Clinicks from "./Pages/Admin/Clinicks/Clinicks";
import CheckLoggedIn from "./PrivateRoutes/CheckLoggedIn";
import CheckVerifyStatus from "./PrivateRoutes/CheckVerifyStatus";
import Declined from "./Component/Loading/Declined";
import NotFound from "./Pages/NotFound";
import "react-toastify/dist/ReactToastify.css";
import ClinicDashboard from "./Pages/Clinicks/Dashboard/Dashboard";
import Service from "./Pages/Clinicks/Services/Service";
import AdoptPet from "./Pages/Admin/AdoptPet/AdoptPet";
import CheckLogin from "./PrivateRoutes/CheckLogin";
import Employee from "./Pages/Clinicks/Employee/Employee";
import Services from "./Pages/Clinicks/Services/Services";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer position="top-center" />
        <Routes>
          <Route element={<AdminPrivateRoute />}>
            <Route path="/" element={<Navigate replace to="/dashboard" />} />
            <Route element={<AdminHome />} path={""}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/clinics" element={<Clinicks />} />
              <Route
                path="/clinicOverview/:id"
                element={<ClinicksOverview />}
              />
              <Route path="/adoptpet" element={<AdoptPet />} />
            </Route>
          </Route>
          <Route element={<ClinicPrivateRoute />}>
            <Route element={<CheckVerifyStatus />} path="">
              <Route
                path="/clinicks"
                element={<Navigate replace to="/clinics/dashboard" />}
              />
              <Route element={<ClinicHome />} path="">
                <Route
                  path="/clinics/dashboard"
                  element={<ClinicDashboard />}
                />

                {/* <Route path="/clinics/service" element={<Service />} /> */}
                <Route path="/clinics/service" element={<Services/>}/>
                <Route path="/clinics/employee" element={<Employee />} />

              </Route>
            </Route>
          </Route>
          <Route path="" element={<CheckLoggedIn />}>
            <Route element={<Loading />} path={"/loading"} />
            <Route element={<Blocked />} path={"/blocked"} />
            <Route element={<Declined />} path={"/declined"} />
          </Route>
          <Route path="" element={<CheckLogin />}>
            <Route element={<Login />} path={"/login"} />
            <Route element={<OtpVerification />} path={"/otp"} />
            <Route element={<ClinicInfoFillPage />} path={"/clinic-fillup"} />
          </Route>
            <Route element={<Signup />} path={"/signup"} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate replace to="/404" />} />
        </Routes>
      </BrowserRouter>
      {/* <Dashboard />
      <ClinicksDashboard />
      <Service /> */}
    </>
  );
}

export default App;
