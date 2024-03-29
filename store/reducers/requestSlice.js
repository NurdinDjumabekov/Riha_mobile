import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../env";
import {
  listLeftovers,
  listMyApplicationData,
  listPrihod,
} from "../../helpers/Data";
import {
  changeAcceptInvoiceTA,
  changeListProductForTT,
  clearLogin,
} from "./stateSlice";
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
  listLeftovers: [], // список остатков
  listInvoiceEveryTA: [], /// список накладных каждого ТА(типо истории)
  listProductEveryInvoiceTA: [], /// список товаров каждой накладной ТА(типо истории)

  listComming: [],
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
        const data = response?.data?.[0];
        // console.log(data, "sadas");
        dispatch(
          changeAcceptInvoiceTA({
            invoice_guid: data?.guid,
            products: data?.list?.map((i) => {
              return {
                guid: i?.guid,
                is_checked: false,
                change: i?.count,
              };
            }),
          })
        );
        return data;
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
        setTimeout(() => {
          navigation.navigate("everyInvoice", {
            codeid: response?.data?.codeid,
            guid: response?.data?.guid,
          });
        }, 200);
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
        // console.log(response?.data, "444");
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
  /// Отправка накладной с товарами для ТТ от ТА
  async function ({ data, navigation }, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "POST",
        url: `${API}/ta/create_invoice_products`,
        data,
      });
      if (response.status >= 200 && response.status < 300) {
        dispatch(changeListProductForTT([])); /// очищаю список , где лежат данные для отправки ТТ
        navigation.navigate("Main");
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
  async function (guid, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `${API}/ta/get_report_leftovers?agent_guid=${guid}&data=2024-03-28`,
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

/// getInvoiceEveryTA
/// список накладных каждого ТА(типо истории)
export const getInvoiceEveryTA = createAsyncThunk(
  "getInvoiceEveryTA",
  async function (guid, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `${API}/ta/get_agent_invoice?agent_guid=${guid}`,
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

/// getProductEveryInvoice
/// список товароы каждой накладной ТА(типо истории)
export const getProductEveryInvoice = createAsyncThunk(
  "getProductEveryInvoice",
  async function (guid, { dispatch, rejectWithValue }) {
    try {
      const response = await axios({
        method: "GET",
        url: `${API}/ta/get_agent__invoice_product?invoice_guid=${guid}`,
      });
      if (response.status >= 200 && response.status < 300) {
        // console.log(response?.data?.[0]?.list, "response?.data");
        return response?.data?.[0]?.list;
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
      Alert.alert("Принято!");
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
      Alert.alert("Успешно создано!");
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
        ({ codeid, category_name, category_guid }, ind) => ({
          label: `${ind + 1}. ${category_name}`,
          value: category_guid,
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
    });
    builder.addCase(getProductTA.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
    });
    builder.addCase(getProductTA.pending, (state, action) => {
      state.preloader = true;
    });
    //////// addProdInvoiceTT
    builder.addCase(addProdInvoiceTT.fulfilled, (state, action) => {
      state.preloader = false;
      Alert.alert("Товар был успешно передан!");
    });
    builder.addCase(addProdInvoiceTT.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      Alert.alert("Упс, что-то пошло не так! Не удалось передать товар");
    });
    builder.addCase(addProdInvoiceTT.pending, (state, action) => {
      state.preloader = true;
    });
    //////// getMyLeftovers
    builder.addCase(getMyLeftovers.fulfilled, (state, action) => {
      state.preloader = false;
      state.listLeftovers = action.payload?.map((item) => [
        `${item.product_name}`,
        `${item.start_outcome}`,
        `${item.income}`,
        `${item.outcome}`,
        `${item.end_outcome}`,
      ]);
    });
    builder.addCase(getMyLeftovers.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      Alert.alert("Упс, что-то пошло не так! Не удалось загрузить данные");
    });
    builder.addCase(getMyLeftovers.pending, (state, action) => {
      state.preloader = true;
    });
    ////// getInvoiceEveryTA
    builder.addCase(getInvoiceEveryTA.fulfilled, (state, action) => {
      state.preloader = false;
      state.listInvoiceEveryTA = action.payload;
    });
    builder.addCase(getInvoiceEveryTA.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      Alert.alert("Упс, что-то пошло не так! Не удалось загрузить данные");
    });
    builder.addCase(getInvoiceEveryTA.pending, (state, action) => {
      state.preloader = true;
    });
    ////// getProductEveryInvoice
    builder.addCase(getProductEveryInvoice.fulfilled, (state, action) => {
      state.preloader = false;
      state.listProductEveryInvoiceTA = action.payload;
    });
    builder.addCase(getProductEveryInvoice.rejected, (state, action) => {
      state.error = action.payload;
      state.preloader = false;
      Alert.alert("Упс, что-то пошло не так! Не удалось загрузить данные");
    });
    builder.addCase(getProductEveryInvoice.pending, (state, action) => {
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
