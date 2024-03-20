import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { LoginScreen } from "./LoginScreen";
import { MainScreen } from "./MainScreen";

import { Provider } from "react-redux";
import { store } from "../store/index";
import { StatusBar } from "expo-status-bar";
import { Preloader } from "../components/Preloader";
import { MyApplicationScreen } from "./MyApplicationScreen";
import { MyCommingScreen } from "./MyCommingScreen";
import { LogOut } from "../components/LogOut";
import { LeftoversScreen } from "./LeftoversScreen";
import { Realization } from "./Realization";

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Preloader />
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#fff", /// f2f2f2
            },
          }}
        >
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
              options={({ navigation }) => ({
                title: "Главная страница",
                headerLeft: () => <></>,
                headerRight: () => <LogOut navigation={navigation} />,
              })}
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
            <Stack.Screen
              name="Leftovers"
              component={LeftoversScreen}
              options={{ title: "Остатки" }}
            />
            <Stack.Screen
              name="Realiz"
              component={Realization}
              options={{ title: "Реализация" }}
            />
          </>
        </Stack.Navigator>
        <StatusBar theme="auto" />
      </NavigationContainer>
    </Provider>
  );
};
