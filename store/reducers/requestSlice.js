import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../env";
import { listMyApplicationData } from "../../helpers/Data";

const initialState = {
  preloader: false,
  chech: "",
  listMyApplication: [],
};

/// logInAccount
export const logInAccount = createAsyncThunk(
  "logInAccount",
  async function (info, { dispatch, rejectWithValue }) {
    const { login, password, navigation } = info;
    dispatch(changePreloader(true));
    setTimeout(() => {
      navigation.navigate("Main");
      dispatch(changePreloader(false));
    }, 500);
    try {
      const response = await axios({
        method: "POST",
        url: ``,
        data: {
          login,
          password,
        },
        // headers: {
        //   Authorization: `Bearer ${tokenA}`,
        // },
      });
      if (response.status >= 200 && response.status < 300) {
        // return response?.data?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// getMyApplication
export const getMyApplication = createAsyncThunk(
  "getMyApplication",
  async function ({ obj }, { dispatch, rejectWithValue }) {
    // console.log(obj, "obj");
    // console.log(`${API}/${obj?.pathApi}`);
    dispatch(changePreloader(true));
    setTimeout(() => {
      dispatch(changeApplication(listMyApplicationData));
      dispatch(changePreloader(false));
    }, 500);

    try {
      const response = await axios({
        method: "GET",
        url: `${API}`,
        // headers: {
        //   Authorization: `Bearer ${tokenA}`,
        // },
      });
      if (response.status >= 200 && response.status < 300) {
        // return response?.data?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


/// changeStatus
export const changeStatus = createAsyncThunk(
  "changeStatus",
  async function ({ obj }, { dispatch, rejectWithValue }) {
    // console.log(obj, "obj");
    // console.log(`${API}/${obj?.pathApi}`);
    dispatch(changePreloader(true));
    setTimeout(() => {
      dispatch(changeApplication(listMyApplicationData));
      dispatch(changePreloader(false));
    }, 500);

    try {
      const response = await axios({
        method: "GET",
        url: `${API}`,
        // headers: {
        //   Authorization: `Bearer ${tokenA}`,
        // },
      });
      if (response.status >= 200 && response.status < 300) {
        // return response?.data?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const requestSlice = createSlice({
  name: "requestSlice",
  initialState,
  extraReducers: (builder) => {
    /// logInAccount
    // builder.addCase(logInAccount.fulfilled, (state, action) => {
    //   state.preloader = false;
    //   state.chech = action.payload;
    // });
    // builder.addCase(logInAccount.rejected, (state, action) => {
    //   state.error = action.payload;
    //   state.preloader = false;
    // });
    // builder.addCase(logInAccount.pending, (state, action) => {
    //   state.preloader = true;
    // });
    /// getMyApplication
    // builder.addCase(getMyApplication.fulfilled, (state, action) => {
    //   state.preloader = false;
    //   state.listMyApplication = action.payload;
    // });
    // builder.addCase(getMyApplication.rejected, (state, action) => {
    //   state.error = action.payload;
    //   state.preloader = false;
    // });
    // builder.addCase(getMyApplication.pending, (state, action) => {
    //   state.preloader = true;
    // });
  },
  reducers: {
    changePreloader: (state, action) => {
      state.preloader = action.payload;
    },
    changeApplication: (state, action) => {
      state.listMyApplication = action.payload;
    },
  },
});
export const { changePreloader, changeApplication } = requestSlice.actions;

export default requestSlice.reducer;
