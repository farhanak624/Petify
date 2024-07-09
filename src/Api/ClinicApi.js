import BulkInstance from "./Axios";

export const signUp = async (data) => {
  return await BulkInstance.post("/clinic/register", data);
};
export const verifyOTP = async (data) => {
  return await BulkInstance.post("/clinic/otp-verify", data);
};
export const resendOTP = async (data) => {
  return await BulkInstance.post("/clinic/resend-otp", data);
};
export const login = async (data) => {
  return await BulkInstance.post("/petShopAdmin/login", data);
};
export const clinicInfoFill = async (data) => {
  return await BulkInstance.post("/clinic/addDetails", data);
};
export const getProfileStatus = async (clinicId) => {
  return await BulkInstance.get(`/clinic/get-profile-requires?id=${clinicId}`);
}
export const getDashboardData = async (filter) => {
  let year = new Date().getFullYear();
  if (filter == 'Last Year') {
    year = year - 1;
  }
  return await BulkInstance.get(`/clinic/get-statistics?year=${year}`);
}
export const getTopServices = async () => {
  return await BulkInstance.get("/clinic/get-top-services");
}
export const getBookingRequest = async (startDate, endDate, page) => {
  const link = `/clinic/get-booking-requests?startDate=${startDate}&endDate=${endDate}&page=${page}`;
  console.log({link});
  return await BulkInstance.get(link);
}
export const getAcceptedBooking = async (startDate, endDate, page) => {
  return await BulkInstance.get(`clinic/get-accepeted-booking?startDate=${startDate}&endDate=${endDate}&page=${page}`);
}
export const getCompletedBooking = async (startDate, endDate, page) => {
  const link = `/clinic/get-completed-booking?startDate=${startDate}&endDate=${endDate}&page=${page}`;
  console.log({link});
  return await BulkInstance.get(link);
}
export const addLeave = async (data) => {
  return await BulkInstance.post("/clinic/add-leaves", data);
}
export const getServices = async () => {
  return await BulkInstance.get("/clinic/getAllServices");
}
export const CreateService = async (data) => {
  return await BulkInstance.post("clinic/addService",data);
};
export const createServiceForm = async (data) => {
  return await BulkInstance.post("clinic/addService-and-form",data);
}
export const acceptBooking = async ({bookingId,slotId,subSlotId}) => {
  console.log({bookingId,slotId,subSlotId});
  return await BulkInstance.post("/clinic/approve-booking", {bookingId,slotId,subSlotId});
}
export const rejectBooking = async ({bookingId,slotId,subSlotId}) => {
  return await BulkInstance.post("/clinic/reject-booking", {bookingId,slotId,subSlotId});
}
export const addEmployee= async (data) => {
  return await BulkInstance.post("clinic/addEmployee", data);
}
export const getEmployee = async () => {
  return await BulkInstance.get("clinic/getEmployees");
}
export const deleteEmployee = async (id) => {
  console.log({id});
  return await BulkInstance.put(`clinic/deleteEmployee/${id}`);
}
export const updateEmployee = async (data,id) => {
  console.log({data,id});
  return await BulkInstance.put(`clinic/updateEmployee/${id}`, data);
}