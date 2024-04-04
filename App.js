// import { useEffect } from "react";
// import * as SplashScreen from "expo-splash-screen";
// import { Platform } from "react-native";
import { Navigation } from "./screens/Navigation";

export default function App() {
  // useEffect(() => {
  //   if (Platform.OS === "android") {
  //     SplashScreen.hideAsync();
  //   }
  // }, []);
  return <Navigation />;
}
