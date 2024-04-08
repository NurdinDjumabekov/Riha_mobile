import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { LoginScreen } from "./LoginScreen";
import { MainScreen } from "./MainScreen";
import { Provider } from "react-redux";
import { store } from "../store/index";
import { StatusBar } from "expo-status-bar";
import { Preloader } from "../components/Preloader";
import { MyApplicationScreen } from "./MyApplicationScreen";
import { MyShipmentScreen } from "./MyShipmentScreen";
import { LogOut } from "../components/LogOut";
import { LeftoversScreen } from "./LeftoversScreen";
import { DetailedInvoiceScreen } from "./DetailedInvoiceScreen";
import { EveryInvoiceScreen } from "./EveryInvoiceScreen";
import { EveryInvoiceListScreen } from "./EveryInvoiceListScreen";
import { EveryInvoiceHistoryScreen } from "./EveryInvoiceHistoryScreen";
import UserInfo from "../components/UserInfo";
import { ReturnScreen } from "./ReturnScreen";
import { PayMoneyScreen } from "./PayMoneyScreen";
import { ReturnProdScreen } from "./ReturnProdScreen";
import { EveryListInvoiceReturn } from "../components/ReturnProducts/EveryListInvoiceReturn";
import { AcceptInvoiceHistory } from "../components/InvoiceTA/AcceptInvoiceHistory/AcceptInvoiceHistory";
import { EveryInvoiceAcceptScreen } from "./EveryInvoiceAcceptScreen";

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  const white = { backgroundColor: "#fff" };
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Preloader />
        <Stack.Navigator screenOptions={{ headerStyle: white }}>
          {/* //////////////////////////////////////////////////////////////// Login ///////////////////////*/}
          {/* <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          /> */}
          <>
            {/* //////////////////////////////////////////////////////////////// Main ///////////////////////*/}
            <Stack.Screen
              name="Main"
              component={MainScreen}
              options={({ navigation }) => ({
                title: "",
                headerLeft: () => <UserInfo />,
                headerRight: () => <LogOut navigation={navigation} />,
              })}
            />
            {/* //////////////////////////////////////////////////////////////// Main ///////////////////////*/}
            <Stack.Screen
              name="Application"
              component={MyApplicationScreen}
              options={{ title: "Список накладных" }}
            />
            <Stack.Screen
              name="detailedInvoice"
              component={DetailedInvoiceScreen}
            />
            <Stack.Screen
              name="InvoiceHistory"
              component={AcceptInvoiceHistory}
              options={{ title: "Список принятых накладных" }}
            />
            <Stack.Screen
              name="EveryInvoiceHistory"
              component={EveryInvoiceAcceptScreen}
            />
            {/* //////////////////////////////////////////////////////////////// Остатки ///////////////////////*/}
            <Stack.Screen
              name="Leftovers"
              component={LeftoversScreen}
              options={{ title: "Остатки" }}
            />
            {/* //////////////////////////////////////////////////////////////// Отгрузки ///////////////////////*/}
            <Stack.Screen
              name="Shipment"
              component={MyShipmentScreen}
              options={{ title: "Отгрузки" }}
            />
            <Stack.Screen
              name="everyInvoiceHistoryScreen"
              component={EveryInvoiceHistoryScreen}
            />
            <Stack.Screen name="everyInvoice" component={EveryInvoiceScreen} />
            <Stack.Screen
              name="everyInvoiceList"
              component={EveryInvoiceListScreen}
            />
            {/* //////////////////////////////////////////////////////////////// Money /////////////////////// */}
            <Stack.Screen
              name="PayMoney"
              component={PayMoneyScreen}
              options={{ title: "Оплата" }}
            />
            {/* //////////////////////////////////////////////////////////////// ReturnScreen /////////////////////// */}
            <Stack.Screen
              name="ReturnInvoice"
              component={ReturnScreen}
              options={{ title: "Возврат товара" }}
            />
            <Stack.Screen name="ReturnProd" component={ReturnProdScreen} />
            <Stack.Screen
              name="listReturnProd"
              component={EveryListInvoiceReturn}
            />
            {/* //////////////////////////////////////////////////////////////// ReturnScreen /////////////////////// */}
          </>
        </Stack.Navigator>
        <StatusBar theme="auto" />
      </NavigationContainer>
    </Provider>
  );
};
