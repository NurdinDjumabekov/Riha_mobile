import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  start: true,
  dataLogin: {
    login: "",
    password: "",
  },
};

// export const dataServices = createAsyncThunk(
//   "dataServices",
//   async (info, { dispatch }) => {
//     try {
//       dispatch(changePreloader(true));
//       const { data } = await standartAxios(info?.url, info.lang);
//       if (info.url === "services/list") {
//         dispatch(toTakeDataServices(addDataID(data?.results)));
//         dispatch(changeDataForSearch(addDataID(data?.results)));
//         dispatch(changeDataServicesForServer(data?.results));
//       } else if (info.url === "language/list") {
//         dispatch(changeAllLang(data));
//       } else if (info.url === "industries/list") {
//         dispatch(changeDataIndustries(data?.results));
//         dispatch(changeDataIndustriesForServer(data?.results));
//       }
//       dispatch(changePreloader(false));
//     } catch (err) {
//       console.log(err);
//       dispatch(changePreloader(false));
//     }
//   }
// );

const stateSlice = createSlice({
  name: "stateSlice",
  initialState,
  reducers: {
    changeDataLogin: (state, action) => {
      state.dataLogin = action.payload;
    },
  },
});
export const { changeDataLogin } = stateSlice.actions;

export default stateSlice.reducer;
