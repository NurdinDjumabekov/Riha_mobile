import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";

export const EveryProduct = ({ obj, index }) => {
  //// список продуктов для ТА
  const dispatch = useDispatch();

  return (
    <TouchableOpacity>
      <View style={styles.block}>
        <Text style={styles.title}>{index + 1}. </Text>
        <Text style={styles.title}>{obj?.product_name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  block: {
    backgroundColor: "#fff",
    minWidth: "100%",
    marginTop: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "rgb(217 223 232)",
    display: "flex",
    flexDirection: "row",
    padding: 10,
    paddingLeft: 15,
  },

  title: {
    fontSize: 16,
    fontWeight: "400",
    color: "#222",
    borderRadius: 4,
    // paddingLeft: 5,
  },
});
