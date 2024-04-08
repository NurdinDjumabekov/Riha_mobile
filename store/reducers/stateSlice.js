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

  temporaryData: {}, ///// временные данные(после добавления сюда, они добавляются в список(listProductForTT))
  dataInputsInv: { price: "", ves: "" },
  listProductForTT: [], /// список твоаров для ТТ
  amountExpenses: "", /// state для input суммы расходов ТТ
  stateForCategory: {}, // состояние для хранения временной категории(подсветка категории)
  temporaryGuidPoint: {
    comment: "",
    amount: "",
    seller_guid: "",
    agent_guid: "",
  },
  createReturnInvoice: {
    /// для создания накладной возврата товара ТА
    oper_guid: "",
    agent_guid: "",
    comment: "",
    stateModal: false,
  },

  returnProducts: {
    //// для возврата списка товаров
    invoice_guid: "",
    products: [],
  },
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
    changeTemporaryData: (state, action) => {
      state.temporaryData = action.payload;
    },
    changeListProductForTT: (state, action) => {
      state.listProductForTT = action.payload;
    },
    addListProductForTT: (state, action) => {
      state.listProductForTT = [...state.listProductForTT, action.payload];
    },
    removeListProductForTT: (state, action) => {
      const indexToRemove = state.listProductForTT.findIndex(
        (item) => item.guid === action.payload?.guid
      );

      if (indexToRemove !== -1) {
        state.listProductForTT.splice(indexToRemove, 1);
      }
    },
    changeDataInputsInv: (state, action) => {
      state.dataInputsInv = action.payload;
    },
    clearDataInputsInv: (state, action) => {
      state.dataInputsInv = { price: "", ves: "" };
    },
    changeStateForCategory: (state, action) => {
      state.stateForCategory = action.payload;
    },
    changeAmountExpenses: (state, action) => {
      state.amountExpenses = action.payload;
    },
    changeTempGuidPoint: (state, action) => {
      state.temporaryGuidPoint = action.payload;
    },
    clearTempGuidPoint: (state, action) => {
      state.temporaryGuidPoint = {
        comment: "",
        amount: "",
        seller_guid: "",
        agent_guid: "",
      };
    },
    changeReturnInvoice: (state, action) => {
      state.createReturnInvoice = action.payload;
    },
    cleareReturnInvoice: (state, action) => {
      state.createReturnInvoice = {
        oper_guid: "",
        agent_guid: "",
        comment: "",
        stateModal: false,
      };
    },
    changeReturnProd: (state, action) => {
      state.returnProducts = action.payload;
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
  changeTemporaryData,
  changeListProductForTT,
  addListProductForTT,
  removeListProductForTT,
  changeDataInputsInv,
  clearDataInputsInv,
  changeStateForCategory,
  changeAmountExpenses,
  changeTempGuidPoint,
  clearTempGuidPoint,
  changeReturnInvoice,
  cleareReturnInvoice,
  changeReturnProd,
} = stateSlice.actions;

export default stateSlice.reducer;
