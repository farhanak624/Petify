import BulkInstance from "./Axios";

export const clinicRequest = async () => {
  return await BulkInstance.get("petShopAdmin/requestStatics");
};
export const RecentLostPet = async (page) => {
  return await BulkInstance.get(`petShopAdmin/lostPets?page=${page}&limit=5`);
};
export const getclinicsRequest = async (page) => {
  return await BulkInstance.get(`petShopAdmin/clinicRequest/?${page}`);
};
export const CreateService = async (data) => {
  return await BulkInstance.post("clinic/service", data);
};
export const getAllStatistics = async () => {
  return await BulkInstance.get("petShopAdmin/stats");
};
export const ApproveRequest = async (id) => {
  return await BulkInstance.post("petShopAdmin/clinicApprove", {
    clinicId: id,
  });
};
export const RejectRequest = async (id) => {
  return await BulkInstance.post("petShopAdmin/clinicReject", { clinicId: id });
};
export const getbookingStats = async (filter) => {
  let year = new Date().getFullYear();
  if (filter == "Last Year") {
    year = year - 1;
  }
  return await BulkInstance.get(`petShopAdmin/getbookingStats?year=${year}`);
};
export const getLatestBookings = async (page) => {
  return await BulkInstance.get(`petShopAdmin/latestBookings?page=${page}`);
};
export const getCommunityDetails = async (page, filter) => {
  return await BulkInstance.get(
    `petShopAdmin/communityDetails?page=${page}&limit=10&filter=${filter}`
  );
};
export const blockCommunity = async (id) => {
  return await BulkInstance.put(`petShopAdmin/blockCommunity`, {
    communityId: id,
  });
};
export const getblogs = async (filter, page) => {
  console.log("page", page, "limit", 10);
  return await BulkInstance.get(
    `petShopAdmin/blogs?filter=${filter}&page=${page}`
  );
};
export const getBlogDetails = async (blog) => {
  return await BulkInstance.get(`petShopAdmin/blog?blogId=${blog}`);
};
export const getTopClinics = async () => {
  return await BulkInstance.get(`petShopAdmin/getTopClinic`);
};
export const getBookings = async (filter, page) => {
  const filterMapping = {
    Weekly: "week",
    Monthly: "month",
    Yearly: "year",
  };
  filter = filterMapping[filter] || year;
  return await BulkInstance.get(
    `petShopAdmin/get-bookings?filter=${filter}&page=${page}`
  );
};
export const getAllClinics = async (page) => {
  return await BulkInstance.get(`petShopAdmin/getAllClinic?$page=${page}`);
};
export const getClinicStats = async (clinicId) => {
  return await BulkInstance.get(
    `petShopAdmin/clinic-stas?clinicId=${clinicId}`
  );
};
export const getVisitors = async (filter, clinicId) => {
  const filterMapping = {
    Weekly: "week",
    Monthly: "month",
    Yearly: "year",
  };
  filter = filterMapping[filter] || "week";
  return await BulkInstance.get(
    `petShopAdmin/clinic-booking-anlystics?filter=${filter}&clinicId=${clinicId}`
  );
};
export const getBookingAnalytics = async (filter, clinicId) => {
  const filterMapping = {
    Weekly: "week",
    Monthly: "month",
    Yearly: "year",
  };
  filter = filterMapping[filter] || "week";
  return await BulkInstance.get(
    `petShopAdmin/clinic-booking-anlystics?filter=${filter}&clinicId=${clinicId}`
  );
};
export const getLeaves = async (clinicId) => {
  return await BulkInstance.get(
    `petShopAdmin/clinicLeaves?clinicId=${clinicId}`
  );
};
export const getClinicLatestBookings = async (clinicId, filter, page) => {
  const filterMapping = {
    Weekly: "week",
    Monthly: "month",
    Yearly: "year",
  };
  filter = filterMapping[filter] || "week";
  return await BulkInstance.get(
    `petShopAdmin/clinic-latest-bookings?clinicId=${clinicId}&filter=${filter}&page=${page}`
  );
};
export const blockClinic = async (clinicId) => {
  return await BulkInstance.post(`petShopAdmin/blockClinic`, { clinicId });
};
export const unblockClinic = async (clinicId) => {
  return await BulkInstance.post(`petShopAdmin/unblockClinic`, { clinicId });
};
export const deleteBlog = async (blogId) => {
  return await BulkInstance.delete(`petShopAdmin/blog?blogId=${blogId}`);
};
export const addAdoption = async (data) => {
  return await BulkInstance.post("petShopAdmin/addAdoption", data);
};
export const getAdoption = async () => {
  return await BulkInstance.get("petShopAdmin/getAdoptions");
};
export const getInterests = async () => {
  return await BulkInstance.get("petShopAdmin/getAdoptionInterests");
};
