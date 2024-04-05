import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export const ReturnScreen = ({ obj, index }) => {
  //// возрат товара
  const dispatch = useDispatch();

  const agent_guid = "B3120F36-3FCD-4CA0-8346-484881974846";

  const { stateForCategory } = useSelector((state) => state.stateSlice);

  return <></>;
};

const styles = StyleSheet.create({
  container: {},
});
