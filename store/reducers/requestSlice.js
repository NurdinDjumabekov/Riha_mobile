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
import { Alert } from "react-native";

const initialState = {
  preloader: false,
  chech: "",
  listMyInvoice: [],
  everyInvoice: {},
  listSellersPoints: [],
  listCategoryTA: [], //  список категорий ТА
  listProductTA: [], //  список продуктов ТА (cписок прод-тов отсортированные селектами)

  listComming: [],
  listLeftovers: [],
  listSelectCategory: [],
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

/// getMyInvoice
export const getMyInvoice = createAsyncThunk(
  "getMyInvoice",
  /// для получения всех накладных
  async function ({ obj }, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `${API}/ta/get_invoices?agent_guid=${"B3120F36-3FCD-4CA0-8346-484881974846"}`,
      });
      if (response.status >= 200 && response.status < 300) {
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// getMyEveryInvoice
export const getMyEveryInvoice = createAsyncThunk(
  "getMyEveryInvoice",
  /// для получения каждой накладной
  async function (guid, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `${API}/ta/get_invoice?invoice_guid=${guid}`,
      });
      if (response.status >= 200 && response.status < 300) {
        // console.log(response?.data?.[0],"444");
        return response?.data?.[0];
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// acceptInvoiceTA
export const acceptInvoiceTA = createAsyncThunk(
  "acceptInvoiceTA",
  /// для принятия накладной торговым агентом
  async function ({ data, navigation }, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "POST",
        url: `${API}/ta/agent_conf_inv`,
        data,
      });
      if (response.status >= 200 && response.status < 300) {
        navigation.navigate("Main");
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// createInvoiceTA
export const createInvoiceTA = createAsyncThunk(
  "createInvoiceTA",
  /// создание накладной Торговым агентом
  async function ({ data, navigation }, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "POST",
        url: `${API}/ta/create_invoice`,
        data,
      });
      if (response.status >= 200 && response.status < 300) {
        // console.log(response?.data?.codeid, "444");
        // console.log(response?.data?.guid, "guid");
        setTimeout(() => {
          navigation.navigate("everyInvoice", {
            codeid: response?.data?.codeid,
            guid: response?.data?.guid,
          });
        }, 800);
        // return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// getAllSellersPoint
export const getAllSellersPoint = createAsyncThunk(
  "getAllSellersPoint",
  /// для получения списка точек (магазинов)
  async function (guid, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `${API}/ta/get_points?agent_guid=${guid}`,
      });
      if (response.status >= 200 && response.status < 300) {
        console.log(response?.data, "444");
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// getCategoryTA
export const getCategoryTA = createAsyncThunk(
  "getCategoryTA",
  /// для получения списка точек (магазинов)
  async function (agent_guid, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `${API}/ta/get_category?agent_guid=${agent_guid}`,
      });
      if (response.status >= 200 && response.status < 300) {
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// getProductTA
export const getProductTA = createAsyncThunk(
  "getProductTA",
  /// для получения списка точек (магазинов)
  async function ({ guid, agent_guid }, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `${API}/ta/get_product?categ_guid=${guid}&agent_guid=${agent_guid}`,
      });
      if (response.status >= 200 && response.status < 300) {
        return response?.data;
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

/// addProdInvoiceTT
export const addProdInvoiceTT = createAsyncThunk(
  "addProdInvoiceTT",
  /// Добавление в накладную товаров для ТТ от ТА
  async function (data, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "POST",
        url: `${API}/ta/create_invoice_products`,
        data,
      });
      if (response.status >= 200 && response.status < 300) {
        // console.log(response?.data, "444");
        // console.log(response?.data, "guid");
      } else {
        throw Error(`Error: ${response.status}`);
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

////////////////////////////////////////

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
      dispatch(changeListInvoices(listMyApplicationData));
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
    //// logInAccount
    builder.addCase(logInAccount.fulfilled, (state, action) => {
      state.preloader = false;
      state.chech = action.payload;
    });
    builder.addCase(logInAccount.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(logInAccount.pending, (state, action) => {
      state.preloader = true;
    });
    //// getMyInvoice
    builder.addCase(getMyInvoice.fulfilled, (state, action) => {
      state.preloader = false;
      state.listMyInvoice = action.payload;
    });
    builder.addCase(getMyInvoice.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getMyInvoice.pending, (state, action) => {
      state.preloader = true;
    });
    //// getMyEveryInvoice
    builder.addCase(getMyEveryInvoice.fulfilled, (state, action) => {
      state.preloader = false;
      state.everyInvoice = action.payload;
    });
    builder.addCase(getMyEveryInvoice.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getMyEveryInvoice.pending, (state, action) => {
      state.preloader = true;
    });
    ///// acceptInvoiceTA
    builder.addCase(acceptInvoiceTA.fulfilled, (state, action) => {
      state.preloader = false;
      Alert.alert("Накладная была успешно принята!");
    });
    builder.addCase(acceptInvoiceTA.rejected, (state, action) => {
      state.error = action.payload;
      Alert.alert("Упс, что-то пошло не так!");
      state.preloader = false;
    });
    builder.addCase(acceptInvoiceTA.pending, (state, action) => {
      state.preloader = true;
    });
    ///// getAllSellersPoint
    builder.addCase(getAllSellersPoint.fulfilled, (state, action) => {
      state.preloader = false;
      state.listSellersPoints = action.payload?.map(
        ({ address, name, guid }) => ({
          label: `${name}, ${address}`,
          value: guid,
        })
      );
    });
    /// [ { label: "Колбаса ", value: "********************************" },]
    builder.addCase(getAllSellersPoint.rejected, (state, action) => {
      state.error = action.payload;
      Alert.alert("Упс, что-то пошло не так!");
      state.preloader = false;
    });
    builder.addCase(getAllSellersPoint.pending, (state, action) => {
      state.preloader = true;
    });
    //// createInvoiceTA
    builder.addCase(createInvoiceTA.fulfilled, (state, action) => {
      state.preloader = false;
      Alert.alert("Накладная была успешно создана!");
    });
    builder.addCase(createInvoiceTA.rejected, (state, action) => {
      state.error = action.payload;
      Alert.alert("Упс, что-то пошло не так! Не удалось создать накладную");
      state.preloader = false;
    });
    builder.addCase(createInvoiceTA.pending, (state, action) => {
      state.preloader = true;
    });
    /////// getCategoryTA
    builder.addCase(getCategoryTA.fulfilled, (state, action) => {
      state.preloader = false;
      state.listCategoryTA = action?.payload?.map(
        ({ codeid, category_name, guid }, ind) => ({
          label: `${ind + 1}. ${category_name}`,
          value: guid,
        })
      );
    });
    builder.addCase(getCategoryTA.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getCategoryTA.pending, (state, action) => {
      state.preloader = true;
    });
    ////// getProductTA
    builder.addCase(getProductTA.fulfilled, (state, action) => {
      state.preloader = false;
      state.listProductTA = action.payload;
      // state.listProductTA = [
      //   ...action.payload,
      //   ...action.payload,
      //   ...action.payload,
      // ];
    });
    builder.addCase(getProductTA.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getProductTA.pending, (state, action) => {
      state.preloader = true;
    });
  },
  reducers: {
    changePreloader: (state, action) => {
      state.preloader = action.payload;
    },
    changeListInvoices: (state, action) => {
      state.listMyInvoice = action.payload;
    },
    changeComming: (state, action) => {
      state.listComming = action.payload;
    },
    changeLeftovers: (state, action) => {
      state.listLeftovers = action.payload;
    },
    changeListSellersPoints: (state, action) => {
      state.listSellersPoints = action.payload;
    },
  },
});
export const {
  changePreloader,
  changeListInvoices,
  changeComming,
  changeLeftovers,
  changeListSellersPoints,
} = requestSlice.actions;

export default requestSlice.reducer;
