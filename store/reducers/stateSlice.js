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

  createEveryInvoiceTA: {
    seller_guid: "",
    agent_guid: "b3120f36-3fcd-4ca0-8346-484881974846",
    comment: "",
  }, // для создания каждой накладной ТА
};

const stateSlice = createSlice({
  name: "stateSlice",
  initialState,
  reducers: {
    changeDataLogin: (state, action) => {
      state.dataLogin = action.payload;
    },
    clearLogin: (state) => {
      state.dataLogin = {
        login: "",
        password: "",
      };
    },
    changeAcceptInvoiceTA: (state, action) => {
      state.acceptConfirmInvoice = action.payload;
    },
    clearAcceptInvoiceTA: (state) => {
      state.acceptConfirmInvoice = { invoice_guid: "", products: [] };
    },
    changeEveryInvoiceTA: (state, action) => {
      state.createEveryInvoiceTA = action.payload;
    },
    clearEveryInvoiceTA: (state, action) => {
      state.createEveryInvoiceTA = {
        seller_guid: "",
        agent_guid: "b3120f36-3fcd-4ca0-8346-484881974846",
        comment: "",
      };
    },
  },
});
export const {
  changeDataLogin,
  clearLogin,
  changeAcceptInvoiceTA,
  clearAcceptInvoiceTA,
  changeEveryInvoiceTA,
  clearEveryInvoiceTA,
} = stateSlice.actions;

export default stateSlice.reducer;
