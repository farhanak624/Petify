import axios from "axios";

const baseURL = import.meta.env.VITE_REACT_APP_BASE_URL;

// console.log(apptoken, "&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
const BulkInstance = axios.create({ baseURL });
BulkInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token"); //import.meta.env.VITE_REACT_APP_TOKEN;
    const appid = import.meta.env.VITE_REACT_APP_APPID;
    console.log(token, "token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    if (appid) {
      config.headers["appid"] = appid;
    }
    const getCountry = async () => {
      try {
        const response = await axios.get("https://ipapi.co/json/");
        console.log("Country: ", response.data.country_name);
        return response.data.country_name;
      } catch (error) {
        console.error("Error fetching country: ", error);
        return "India"; // Default to US or handle error appropriately
      }
    };
    config.headers["country"] = await getCountry();
    //Only set Content-Type to multipart/form-data if you're sending form data with files
    // config.headers["Content-Type"] = "multipart/form-data";
    return config;
  },
  (error) => {
    Promise.reject(error);
    console.log(error);
  }
);

export default BulkInstance;
