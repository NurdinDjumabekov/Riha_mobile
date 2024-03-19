import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../env";
import {
  listLeftovers,
  listMyApplicationData,
  listPrihod,
} from "../../helpers/Data";
import { clearLogin } from "./stateSlice";
import { changeToken } from "./saveDataSlice";

const initialState = {
  preloader: false,
  chech: "",
  listMyApplication: [],
  listComming: [],
  listLeftovers: [],
};

/// logInAccount
export const logInAccount = createAsyncThunk(
  "logInAccount",
  async function (info, { dispatch, rejectWithValue }) {
    const { login, password, navigation } = info;
    dispatch(changePreloader(true));
    setTimeout(() => {
      dispatch(changeToken(login));
      navigation.navigate("Main");
      dispatch(changePreloader(false));
      dispatch(clearLogin());
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

/// getMyComming
export const getMyComming = createAsyncThunk(
  "getMyComming",
  async function ({ obj }, { dispatch, rejectWithValue }) {
    // console.log(obj, "obj");
    // console.log(`${API}/${obj?.pathApi}`);
    dispatch(changePreloader(true));
    setTimeout(() => {
      dispatch(changeComming(listPrihod));
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

/// getMyLeftovers
export const getMyLeftovers = createAsyncThunk(
  "getMyLeftovers",
  async function ({ obj }, { dispatch, rejectWithValue }) {
    // console.log(obj, "obj");
    // console.log(`${API}/${obj?.pathApi}`);
    dispatch(changePreloader(true));
    setTimeout(() => {
      dispatch(changeLeftovers(listLeftovers));
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
    changeComming: (state, action) => {
      state.listComming = action.payload;
    },
    changeLeftovers: (state, action) => {
      state.listLeftovers = action.payload;
    },
  },
});
export const {
  changePreloader,
  changeApplication,
  changeComming,
  changeLeftovers,
} = requestSlice.actions;

export default requestSlice.reducer;
