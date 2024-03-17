import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { LoginScreen } from "./LoginScreen";
import { MainScreen } from "./MainScreen";

import { Provider, useSelector } from "react-redux";
import { store } from "../store/index";
import { StatusBar } from "expo-status-bar";
import { Preloader } from "../components/Preloader";
import { MyApplicationScreen } from "./MyApplicationScreen";
import { MyCommingScreen } from "./MyCommingScreen";

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Preloader />
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            // options={{ title: "Вход" }}
            options={{ headerShown: false }}
          />
          <>
            <Stack.Screen
              name="Main"
              component={MainScreen}
              // options={{ title: "Main" }}
              options={{ headerShown: false }}
            />
            {/* //////// */}
            <Stack.Screen
              name="Application"
              component={MyApplicationScreen}
              options={{ title: "Мои заявки" }}
            />
            <Stack.Screen
              name="Comming"
              component={MyCommingScreen}
              options={{ title: "Приходы" }}
            />
          </>
        </Stack.Navigator>
        <StatusBar theme="auto" />
      </NavigationContainer>
    </Provider>
  );
};
