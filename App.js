import { useEffect } from "react";
import { Navigation } from "./screens/Navigation";
import * as SplashScreen from "expo-splash-screen";
import { Platform } from "react-native";

export default function App() {
  useEffect(() => {
    if (Platform.OS === "android") {
      SplashScreen.hideAsync();
    }
  }, []);
  return <Navigation />;
}
