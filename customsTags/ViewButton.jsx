import { StyleSheet, Text } from "react-native";

export const ViewButton = ({ children, color, onclick }) => {
  return <Text style={styles.bbb}>{children}</Text>;
};

const styles = StyleSheet.create({
  bbb: {
    display: "block",
    margin: 80,
    borderRadius: 10,
    fontSize: 20,
    width: 100,
    height: 50,
    background: "blue",
  },
});
// color={color || "green"}
// title={children || ""}
