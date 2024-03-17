import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  preloader: false,
  chech: "",
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
    }, 1800);
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
  },
  reducers: {
    changePreloader: (state, action) => {
      state.preloader = action.payload;
    },
  },
});
export const { changePreloader } = requestSlice.actions;

export default requestSlice.reducer;
