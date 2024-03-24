import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  dataLogin: {
    login: "",
    password: "",
  },
  acceptConfirmInvoice: {
    invoice_guid: "",
    products: [],
  }, // для подтверждения и принятия товаров ТА

  createEveryAppTA: {}, // для создания каждой накладной ТА
};

const stateSlice = createSlice({
  name: "stateSlice",
  initialState,
  reducers: {
    changeDataLogin: (state, action) => {
      state.dataLogin = action.payload;
    },
    clearLogin: (state, action) => {
      state.dataLogin = {
        login: "",
        password: "",
      };
    },
    changeAcceptInvoiceTA: (state, action) => {
      state.acceptConfirmInvoice = action.payload;
    },
    clearAcceptInvoiceTA: (state, action) => {
      state.acceptConfirmInvoice = { invoice_guid: "", products: [] };
    },
    changeCreateEveryAppTA: (state, action) => {
      state.createEveryAppTA = action.payload;
    },
  },
});
export const {
  changeDataLogin,
  clearLogin,
  changeAcceptInvoiceTA,
  clearAcceptInvoiceTA,
  changeCreateEveryAppTA,
} = stateSlice.actions;

export default stateSlice.reducer;
