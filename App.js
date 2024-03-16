import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import styled from "styled-components/native";
import MainScreen from "./screens/MainScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { Navigation } from "./screens/Navigation";

export default function App() {
  return <Navigation />;
}
