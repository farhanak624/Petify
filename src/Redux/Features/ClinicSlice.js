import { createSlice } from "@reduxjs/toolkit";
import { set } from "lodash";
import { act } from "react-dom/test-utils";

const initialState = {
  clinicEmail: "",
  clinicId:"",
  spinnerLoader: false,
};

const ClinicSlice = createSlice({
  name: "clinic",
  initialState,
  reducers: {
    setClinicEmail: (state, action) => {
        console.log(action.payload ,"payload");
        localStorage.setItem("clinicEmail", JSON.stringify(action.payload));
      state.clinicEmail = action.payload;
    },
    setClinicId: (state, action) => {
        console.log(action?.payload ,"clinic payload");
        localStorage.setItem("clinicId", JSON.stringify(action?.payload));
      state.clinicId = action?.payload;
    },
    loadSpinner: (state, action) => {
      state.spinnerLoader = !state.spinnerLoader;
      // console.log(state.spinnerLoader);
    },
  },
});
export default ClinicSlice.reducer;
export const { setClinicEmail,setClinicId,loadSpinner } = ClinicSlice.actions;
